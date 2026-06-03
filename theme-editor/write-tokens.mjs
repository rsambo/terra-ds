/**
 * Atomic theme writer for the Terra DS Theme Editor.
 *
 * This module patches DESIGN.md / DESIGN.dark.md and regenerates tokens.
 * It is a localhost dev authoring tool ONLY — never use in production.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DESIGN_MD = path.join(ROOT, 'DESIGN.md');
const DESIGN_DARK_MD = path.join(ROOT, 'DESIGN.dark.md');

const ALL_COLOR_TOKENS = [
  'primary','primary-container','on-primary','secondary','secondary-container','on-secondary',
  'accent','accent-container','on-accent','surface','surface-raised','surface-overlay',
  'on-surface','on-surface-muted','surface-content','surface-content-raised','on-content',
  'on-content-muted','surface-chat-user','surface-chat-assistant','on-chat','border',
  'border-subtle','error','on-error','focus-ring','neutral',
];

const ALL_SPACING_TOKENS = ['2xs','xs','sm','md','lg','xl','2xl','3xl'];
const ALL_RADIUS_TOKENS = ['none','sm','md','lg','xl','full'];
const ALL_TYPOGRAPHY_ROLES = [
  'display-lg','display-sm','heading-xl','heading-lg','heading-md','heading-sm',
  'body-lg','body-md','body-sm','label-lg','label-sm','code-md',
  'content-display','content-heading-lg','content-heading-md','content-heading-sm',
  'content-body-lg','content-body-md','content-caption','content-blockquote',
];
const TYPOGRAPHY_PROPS = ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','fontStyle'];

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;
const DIM_RE = /^\d+(\.\d+)?(px|rem|em|%)$/;

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') return 'Payload must be an object';

  const { colors, spacing, rounded, typography } = payload;

  if (colors) {
    for (const theme of ['light','dark']) {
      const block = colors[theme];
      if (!block) continue;
      for (const [k,v] of Object.entries(block)) {
        if (!ALL_COLOR_TOKENS.includes(k)) return `Invalid color token: ${k}`;
        if (!HEX_RE.test(v)) return `Invalid color value for ${k}: ${v}`;
      }
    }
  }

  if (spacing) {
    for (const [k,v] of Object.entries(spacing)) {
      if (!ALL_SPACING_TOKENS.includes(k)) return `Invalid spacing token: ${k}`;
      if (!DIM_RE.test(v)) return `Invalid spacing value for ${k}: ${v}`;
    }
  }

  if (rounded) {
    for (const [k,v] of Object.entries(rounded)) {
      if (!ALL_RADIUS_TOKENS.includes(k)) return `Invalid radius token: ${k}`;
      if (!DIM_RE.test(v)) return `Invalid radius value for ${k}: ${v}`;
    }
  }

  if (typography) {
    for (const [role, props] of Object.entries(typography)) {
      if (!ALL_TYPOGRAPHY_ROLES.includes(role)) return `Invalid typography role: ${role}`;
      for (const [prop, val] of Object.entries(props)) {
        if (!TYPOGRAPHY_PROPS.includes(prop)) return `Invalid typography prop: ${prop}`;
        if (typeof val !== 'string' || val.length === 0) return `Invalid typography value for ${role}.${prop}`;
      }
    }
  }

  return null;
}

function patchFile(content, payload, isDark) {
  const lines = content.split('\n');
  const out = [];
  let inBlock = null; // 'colors', 'spacing', 'rounded', 'typography'
  let inRole = null;

  for (let line of lines) {
    const trimmed = line.trimEnd();

    // Detect top-level block starts
    if (/^colors:\s*$/.test(trimmed)) inBlock = 'colors';
    else if (/^spacing:\s*$/.test(trimmed)) inBlock = 'spacing';
    else if (/^rounded:\s*$/.test(trimmed)) inBlock = 'rounded';
    else if (/^typography:\s*$/.test(trimmed)) inBlock = 'typography';
    else if (/^components:\s*$/.test(trimmed)) { inBlock = null; inRole = null; }
    else if (/^[a-zA-Z]/.test(trimmed) && !trimmed.startsWith(' ')) { inBlock = null; inRole = null; }
    else if (/^  [\w-]+:\s*$/.test(trimmed) && inBlock === 'typography') {
      const m = trimmed.match(/^  ([\w-]+):\s*$/);
      inRole = m ? m[1] : null;
    } else if (inBlock === 'typography' && !trimmed.startsWith('    ') && trimmed.startsWith('  ')) {
      // Another 2-space line inside typography that's not a 4-space property
      inRole = null;
    }

    // Apply patches
    if (inBlock === 'colors' && payload.colors) {
      const block = isDark ? payload.colors.dark : payload.colors.light;
      if (block) {
        for (const [name, hex] of Object.entries(block)) {
          const re = new RegExp(`^(\\s*${name}:\\s*')#[0-9A-Fa-f]{6}(')$`);
          if (re.test(trimmed)) {
            line = line.replace(re, `$1${hex.toUpperCase()}$2`);
            break;
          }
        }
      }
    } else if (inBlock === 'spacing' && payload.spacing) {
      for (const [name, val] of Object.entries(payload.spacing)) {
        const re = new RegExp(`^(\\s*${name}:\\s*)(.+)$`);
        if (re.test(trimmed)) {
          line = line.replace(re, `$1${val}`);
          break;
        }
      }
    } else if (inBlock === 'rounded' && payload.rounded) {
      for (const [name, val] of Object.entries(payload.rounded)) {
        const re = new RegExp(`^(\\s*${name}:\\s*)(.+)$`);
        if (re.test(trimmed)) {
          line = line.replace(re, `$1${val}`);
          break;
        }
      }
    } else if (inBlock === 'typography' && inRole && payload.typography && payload.typography[inRole]) {
      const roleProps = payload.typography[inRole];
      for (const [prop, val] of Object.entries(roleProps)) {
        const re = new RegExp(`^(\\s*${prop}:\\s*)(.+)$`);
        if (re.test(trimmed)) {
          line = line.replace(re, `$1${val}`);
          break;
        }
      }
    }

    out.push(line);
  }

  return out.join('\n');
}

export async function writeTokens(payload) {
  const validationError = validatePayload(payload);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  // Snapshot both files
  const originalLight = fs.readFileSync(DESIGN_MD, 'utf-8');
  const originalDark = fs.readFileSync(DESIGN_DARK_MD, 'utf-8');

  try {
    // Patch files
    const patchedLight = patchFile(originalLight, payload, false);
    const patchedDark = patchFile(originalDark, payload, true);

    fs.writeFileSync(DESIGN_MD, patchedLight);
    fs.writeFileSync(DESIGN_DARK_MD, patchedDark);

    // Regenerate
    const stdout = execSync('./build-tokens.sh', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: ['pipe','pipe','pipe'],
    });

    return { ok: true, stdout };
  } catch (err) {
    // Rollback on any failure
    fs.writeFileSync(DESIGN_MD, originalLight);
    fs.writeFileSync(DESIGN_DARK_MD, originalDark);

    const msg = err.stderr || err.stdout || err.message || String(err);
    return { ok: false, error: msg };
  }
}
