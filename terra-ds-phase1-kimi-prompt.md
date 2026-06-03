# Task: Build the Terra DS Phase 1 DESIGN.md

You are an autonomous coding agent with file access and a terminal. Your job is to produce a single file — `DESIGN.md` — that conforms to the Google Labs DESIGN.md specification and passes its linter with zero errors and zero warnings.

Work autonomously. Do not ask for confirmation between steps. Do not stop until the acceptance criteria are met.

---

## Operating instructions

1. Write the complete `DESIGN.md` per the spec below.
2. Run `npx @google/design.md lint DESIGN.md`.
3. Read the JSON output. If `summary.errors` or `summary.warnings` is greater than zero, fix every finding and re-run.
4. Repeat step 2–3 until the linter reports `errors: 0, warnings: 0`.
5. Report the final lint summary and stop.

Keep your prose commentary minimal. The deliverable is the file, not an explanation. Do not wrap the file content in lengthy narration.

---

## What you are building

`DESIGN.md` for **Terra DS** — a design system optimized as a first-class input for AI coding agents, targeting reading, writing, AI chat, and productivity tools. Text-forward environments where the interface recedes and content breathes.

This is Phase 1 of 3. The ONLY deliverable is `DESIGN.md`. Do not scaffold a component library, install packages, or create any other files. Phases 2 (Tailwind/DTCG export) and 3 (React components) come later.

---

## File structure

The file is YAML front matter between `---` markers, followed by markdown prose.

```
---
[yaml token definitions]
---

[markdown prose sections]
```

### YAML structural rules — these are where naive attempts fail

1. **Flat top-level keys, each appearing exactly once.** The keys are: `name`, `description`, `colors`, `typography`, `spacing`, `rounded`, `components`. Do NOT nest tokens under a parent like `components: tokens: colors:`. Do NOT define `components:` twice — YAML silently drops duplicate keys and the linter flags it.

2. **Component values use `{token.references}`, never bare strings.**
   - Correct: `backgroundColor: '{colors.primary}'`
   - Wrong: `backgroundColor: 'primary'` or `backgroundColor: '#1a1614'`

3. **Every reference must resolve.** If a component references `{colors.accent}`, the `accent` token must be defined under `colors:`.

4. **Every color token must be referenced by at least one component.** Unreferenced color tokens trigger `orphaned-tokens` warnings. This includes utility tokens like `border` and `focus-ring` — define small components (e.g. `divider`, `focus-indicator`) to consume them if needed.

5. **All component `backgroundColor`/`textColor` pairs must meet WCAG AA (4.5:1 contrast).** This is the most common failure. The disabled-state pattern (muted text on a neutral background) is especially prone to failing — verify every pair. When a pair fails, darken the text token or lighten the background until it passes, but preserve the warm hue — never substitute a cool grey.

---

## Visual identity

Warm, modern, creamy, intellectual. References: Notion, iA Writer, Readwise Reader.

- Cream and warm off-white surfaces — never pure white `#ffffff`
- Warm ink darks — never pure black `#000000`
- A single earthy amber accent, used sparingly
- Warm-tinted shadows, never grey
- Moderate rounding
- Three distinct surface registers: **UI chrome** (slightly cooler cream), **content canvas** (warmest cream), **conversational** (between the two)

---

## Color tokens (define all 27 under `colors:`)

Base: `primary`, `primary-container`, `on-primary`, `secondary`, `secondary-container`, `on-secondary`, `accent`, `accent-container`, `on-accent`

UI surfaces: `surface`, `surface-raised`, `surface-overlay`, `on-surface`, `on-surface-muted`

Content surfaces: `surface-content`, `surface-content-raised`, `on-content`, `on-content-muted`

Conversational: `surface-chat-user`, `surface-chat-assistant`, `on-chat`

Utility: `border`, `border-subtle`, `error`, `on-error`, `focus-ring`, `neutral`

Choose sRGB hex values matching the warm/creamy direction. Verify all contrast pairs before finishing — pay special attention to: disabled states (muted text on neutral), accent backgrounds (text on amber), nav/tab text (muted text on surface), and callout text (muted text on raised content).

---

## Typography tokens (define all 20 under `typography:`)

Each token needs `fontFamily`, `fontSize`, `fontWeight`, `lineHeight` (add `letterSpacing`/`fontStyle` where appropriate).

UI register — all use **Inter** (12 tokens): `display-lg`, `display-sm`, `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`, `body-lg`, `body-md`, `body-sm`, `label-lg`, `label-sm`, `code-md` (code uses a monospace stack).

Content register — all use **Noto Serif** (8 tokens): `content-display`, `content-heading-lg`, `content-heading-md`, `content-heading-sm`, `content-body-lg` (lineHeight ~1.75 for reading), `content-body-md`, `content-caption`, `content-blockquote` (italic).

The `content-` prefix marks the Noto Serif register unambiguously.

---

## Spacing and rounded (fixed values)

```yaml
spacing:
  2xs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px

rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 10px
  xl: 16px
  full: 9999px
```

---

## Component tokens (under `components:`)

Every entry needs `backgroundColor`, `textColor`, `rounded`, `padding` — all as `{token.references}`. Interactive components need all state variants using the pattern `{component}-hover`, `{component}-focus`, `{component}-active`, `{component}-disabled`.

**Buttons:** `button-primary`, `button-secondary`, `button-ghost`, `button-destructive` — each with `-hover`, `-focus`, `-disabled` variants (16 entries)

**Form controls:** `input` + `-focus` + `-error` + `-disabled`; `checkbox` + `-checked` + `-focus`; `toggle` + `-on` + `-focus` (10 entries)

**Surfaces & containers:** `card`, `card-interactive`, `card-interactive-hover`, `chat-bubble-user`, `chat-bubble-assistant`, `content-page`, `callout`, `badge`, `badge-accent`, `badge-error` (10 entries)

**Overlays:** `dialog`, `tooltip`, `dropdown-menu`, `dropdown-menu-item-hover` (4 entries)

**Navigation:** `nav-item`, `nav-item-active`, `nav-item-hover`, `tab`, `tab-active`, `tab-hover` (6 entries)

**Utility consumers** (to prevent orphaned tokens): `divider` (uses `border`), `divider-subtle` (uses `border-subtle`), `focus-indicator` (uses `focus-ring` as textColor on a light surface) (3 entries)

Constraints to apply: chat user/assistant surfaces must differ; disabled states use `neutral` background with a sufficiently dark muted text; `content-page` uses `rounded.none`; pill elements (`toggle`, `badge`) use `rounded.full`.

---

## Prose sections (8 sections, `##` headings, in this order)

1. `## Overview`
2. `## Colors`
3. `## Typography`
4. `## Layout`
5. `## Elevation & Depth`
6. `## Shapes`
7. `## Components`
8. `## Do's and Don'ts`

Write rules, not descriptions. Every statement should be something an agent can follow or violate. Required content:

- **Overview:** philosophy, three registers, product category. Close with: "When in doubt, ask: does this element serve the content, or compete with it?"
- **Colors:** role + prohibitions + pairing rules per group. Include: "Use `accent` for a maximum of one interactive element per view. Never use it for decoration."
- **Typography:** Inter = UI (never long-form reading); Noto Serif = content (never UI controls). Include: "If text will be read continuously for more than a few seconds, use the content register."
- **Layout:** spacing scale with use cases; ~65ch content measure. Include: "Never use raw pixel values. Always reference a spacing token."
- **Elevation & Depth:** warm-tinted shadows not grey; flat → raised → overlay. Include: "If a shadow draws attention to itself, it is too strong."
- **Shapes:** radius rules per context. Include: "Never use more than two distinct border-radius values within a single view."
- **Components:** 2–4 sentences per group. Include the single-primary-action rule and the chat-distinction-without-color rule.
- **Do's and Don'ts:** at least 10 paired do/don't rules covering font mixing, accent overuse, raw pixels, contrast, surface misuse, rounding, chat distinction, shadow warmth, reference syntax, primary button frequency.

---

## Acceptance criteria

Done only when ALL are true:

- `DESIGN.md` exists at the repo root
- `npx @google/design.md lint DESIGN.md` reports `errors: 0, warnings: 0`
- Exactly one each of `colors:`, `typography:`, `spacing:`, `rounded:`, `components:` in the YAML
- All component values use `{token.reference}` syntax — no bare strings, no raw hex
- All 8 prose sections present in correct order with `##` headings
- Both Inter and Noto Serif defined; all three surface registers have distinct tokens
- Every interactive component has hover, focus, and disabled variants
- `rounded.full: 9999px` defined

Run the linter. Fix everything. Re-run. Repeat until clean. Then report the final summary.
