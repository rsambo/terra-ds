/**
 * Transform an arbitrary DESIGN.md into Terra DS's fixed token structure.
 *
 * Terra's token *names* are the constant target schema; the selected spec only
 * supplies values. When the source uses a different vocabulary (different token
 * names, fewer colors, light-only, etc.) we map it with a Claude API call that
 * emits the full Terra structure — all colors (light + dark), spacing, radius,
 * and typography — adopting the source's visual identity and filling anything
 * the source omits.
 *
 * Localhost dev authoring tool ONLY. Requires ANTHROPIC_API_KEY in the env.
 */

import Anthropic from '@anthropic-ai/sdk';
import {
  ALL_COLOR_TOKENS,
  ALL_SPACING_TOKENS,
  ALL_RADIUS_TOKENS,
  ALL_TYPOGRAPHY_ROLES,
} from './write-tokens.mjs';

const MODEL = 'claude-opus-4-8';
const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

// System prompt is static → cached. (Structured-output JSON-schema mode is not
// used: the full Terra schema compiles to a grammar too large for the API, so
// we ask for raw JSON and validate the shape in code instead.)
const SYSTEM = `You map an arbitrary design specification onto the Terra DS token structure.

Terra DS has a FIXED set of token names. Your job: read the source design spec and produce VALUES
for every Terra token, adopting the source's visual identity (its palette, type, spacing, radius,
and overall character). The token names never change — only the values.

# Terra color tokens (produce a hex "#rrggbb" for EACH, for BOTH light and dark themes)
Brand/action: primary, primary-container, on-primary, secondary, secondary-container, on-secondary,
  accent, accent-container, on-accent
UI surfaces:  surface, surface-raised, surface-overlay, on-surface, on-surface-muted
Content:      surface-content, surface-content-raised, on-content, on-content-muted
Chat:         surface-chat-user, surface-chat-assistant, on-chat
Lines/state:  border, border-subtle, error, on-error, focus-ring, neutral

Semantics: "<x>" is a fill color; "on-<x>" is the text/icon color placed ON that fill; "<x>-container"
is a softer tonal companion to "<x>". "surface*" are backgrounds with three elevations
(surface < surface-raised < surface-overlay). "surface-content*" is the long-form reading canvas;
"surface-chat-*" are chat bubbles.

# Other tokens (produce a value for EACH)
spacing (px): 2xs, xs, sm, md, lg, xl, 2xl, 3xl  (ascending; e.g. "2px".."64px")
rounded (px): none, sm, md, lg, xl, full  (full is the pill radius, e.g. "9999px")
typography roles — each needs fontFamily, fontSize (px), fontWeight (e.g. "500"), lineHeight, letterSpacing:
  display-lg, display-sm, heading-xl, heading-lg, heading-md, heading-sm,
  body-lg, body-md, body-sm, label-lg, label-sm, code-md,
  content-display, content-heading-lg, content-heading-md, content-heading-sm,
  content-body-lg, content-body-md, content-caption, content-blockquote
(The "content-*" roles are the long-form reading register — give them the source's serif/reading font
if it has one, otherwise its body font. "code-md" is monospace.)

# Mapping rules
- Map by ROLE, not by name. e.g. a source "accent"/"primary"/brand color → Terra accent + primary;
  a source page background → Terra surface/surface-raised/surface-overlay (give 3 distinct elevations);
  source body text color → on-surface / on-content; muted/secondary text → on-surface-muted / on-content-muted.
- Fill EVERY token. When the source doesn't specify something, derive a sensible value consistent with
  the source's identity (e.g. tint a neutral toward the source's hue; create container/hover tones by
  lightening/darkening the base).
- Derive a DARK theme even when the source is light-only: invert surface/text relationships, keep the
  source's hues, and brighten accents so they read on dark backgrounds.
- WCAG AA: every on-*/<fill> pair (on-surface/surface, on-surface-muted/surface, on-primary/primary,
  on-accent/accent, on-content(-muted)/surface-content, on-chat/chat surfaces, on-error/error) must
  reach at least 4.5:1 contrast. Adjust the "on-*" or fill value until it passes — do not emit a failing pair.
- The three surface elevations (and the chat-user vs chat-assistant bubbles) must be visibly distinct.
- Spacing must be ascending; if the source's scale is degenerate (e.g. 1px steps), produce a sane
  ascending ramp in the source's spirit. rounded.full is always the pill value (~9999px).

# Output format
Respond with ONLY a single minified JSON object — no markdown fences, no commentary — of exactly this shape:
{"colors":{"light":{<all 27 color tokens>:"#hex"},"dark":{<all 27 color tokens>:"#hex"}},
 "spacing":{<8 spacing tokens>:"px"},"rounded":{<6 radius tokens>:"px"},
 "typography":{<20 roles>:{"fontFamily":"...","fontSize":"..px","fontWeight":"..","lineHeight":"..","letterSpacing":".."}}}
All colors must be 6-digit hex (#rrggbb). Include every listed token name.`;

function extractJson(text) {
  const trimmed = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start !== -1 && end > start) return JSON.parse(trimmed.slice(start, end + 1));
    throw new Error('Model output was not valid JSON.');
  }
}

function validate(tokens) {
  const missing = [];
  for (const theme of ['light', 'dark']) {
    if (!tokens.colors?.[theme]) return `colors.${theme} missing`;
    for (const n of ALL_COLOR_TOKENS) {
      const v = tokens.colors[theme][n];
      if (!v) missing.push(`colors.${theme}.${n}`);
      else if (!HEX_RE.test(v)) return `colors.${theme}.${n} is not #rrggbb: ${v}`;
    }
  }
  for (const n of ALL_SPACING_TOKENS) if (!tokens.spacing?.[n]) missing.push(`spacing.${n}`);
  for (const n of ALL_RADIUS_TOKENS) if (!tokens.rounded?.[n]) missing.push(`rounded.${n}`);
  for (const r of ALL_TYPOGRAPHY_ROLES) if (!tokens.typography?.[r]) missing.push(`typography.${r}`);
  if (missing.length) return `missing tokens: ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''}`;
  return null;
}

export async function transformDesign(sourceContent, sourceName = 'source') {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { ok: false, error: 'ANTHROPIC_API_KEY is not set in the dev server environment.' };
  }

  const client = new Anthropic();

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      messages: [
        {
          role: 'user',
          content: `Map this design spec ("${sourceName}") onto the Terra DS token structure:\n\n${sourceContent}`,
        },
      ],
    });

    const message = await stream.finalMessage();
    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock) return { ok: false, error: 'Model returned no text output.' };

    const tokens = extractJson(textBlock.text);
    const err = validate(tokens);
    if (err) return { ok: false, error: `Mapping incomplete — ${err}` };

    return {
      ok: true,
      tokens,
      usage: {
        input: message.usage?.input_tokens,
        output: message.usage?.output_tokens,
        cache_read: message.usage?.cache_read_input_tokens,
      },
    };
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
}
