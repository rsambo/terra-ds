# Terra DS — Phase 9 PRD
## Dark mode

---

## Overview

Phase 9 adds a dark theme to Terra DS. This is the payoff for eight phases of token-name discipline: components already use `bg-surface-raised`, `text-on-content`, `text-accent`, and so on — they have no hex values to change. The entire re-theme happens in the color definitions, not in the components.

The architectural challenge is bridging the static Tailwind export (hex values in `tailwind.theme.json`) to a runtime-switchable system. The solution is CSS custom properties: color tokens become CSS variables, and switching from light to dark is a matter of swapping which variable values are active. Components don't change. The token pipeline doesn't change. Only the config layer changes.

**Visual identity for the dark theme:** Warm dark, not cold dark. Terra's light theme is creamy and amber-biased — the dark theme must maintain that character. No cool greys. Dark surfaces carry a warm brown undertone. The amber accent brightens slightly to read against dark backgrounds. Three surface registers remain materially distinct. All WCAG AA contrast requirements still apply.

---

## Why CSS custom properties

The current setup: `DESIGN.md` → `tailwind.theme.json` → Tailwind extends with static hex values → components use token-named utilities.

Static hex values cannot change at runtime. To support a `.dark` class that switches the palette, colors must be defined as CSS variable references in Tailwind's config, and the variable values must be set in CSS:

```css
:root {
  --color-surface-raised: #FAF6F0;   /* light */
}
.dark {
  --color-surface-raised: #2A231C;   /* dark */
}
```

```js
// tailwind.config.js
colors: {
  'surface-raised': 'var(--color-surface-raised)',
}
```

With this setup, `bg-surface-raised` compiles to `background-color: var(--color-surface-raised)` — and the active value switches instantly when `.dark` is applied to the root element. No component changes. No rebuild. No flash.

---

## Architecture: what changes and what doesn't

**Does not change:**
- All component files — not a single class name needs updating
- `DESIGN.md` — the light theme source of truth is unchanged
- Token export format — `tokens.json` and `tailwind.theme.json` still get generated
- The lint and build-tokens pipeline

**Does change:**
- `tailwind.config.js` — colors switch from static hex to `var(--color-X)` references
- `src/index.css` — gains `:root` and `.dark` CSS variable blocks
- `build-tokens.sh` — also exports the dark theme
- `package.json` scripts — adds a generate step for the CSS vars file

**New files:**
- `DESIGN.dark.md` — dark theme source of truth (same structure as DESIGN.md)
- `src/components/ThemeProvider.tsx` — sets and toggles the `.dark` class
- `scripts/generate-css-vars.js` — reads both token files and writes `src/tokens.css`

---

## Step 1 — Define the dark palette in DESIGN.dark.md

Create `DESIGN.dark.md` at the repo root. It must be a valid DESIGN.md file that passes lint with zero errors and zero warnings. It has the same structure as `DESIGN.md` — same token names, same component definitions — but different color hex values.

The dark palette must:
- Use warm dark browns as surface colors, not cool greys
- Maintain three materially distinct surface registers (UI chrome, content canvas, conversational)
- Preserve WCAG AA (4.5:1) on all component pairs — run `check_contrast.py` adapted for dark values
- Keep the amber accent — brightened for readability on dark backgrounds
- Use no pure black (`#000000`) and no pure white (`#ffffff`)

### Reference dark palette

These values are starting points. The agent should verify all contrast pairs before finalizing.

```yaml
colors:
  primary: '#E8DDD5'          # light cream — inverted role from light theme
  primary-container: '#3D322B' # warm dark brown
  on-primary: '#2A1F1A'       # dark ink
  secondary: '#C4B5A5'        # warm mid
  secondary-container: '#2A231C' # dark raised surface
  on-secondary: '#2A1F1A'
  accent: '#D4892B'            # amber brightened for dark bg
  accent-container: '#3D2E14' # dark amber container
  on-accent: '#FAF0E0'        # warm light
  surface: '#1A1410'           # darkest — UI chrome base
  surface-raised: '#221C16'   # slightly lighter
  surface-overlay: '#2A231C'  # overlay level
  on-surface: '#F0EBE3'       # warm off-white
  on-surface-muted: '#9C8D80' # warm muted
  surface-content: '#1E1810'  # warmest dark — content canvas
  surface-content-raised: '#261F14' # raised content
  on-content: '#EDE8E0'       # warm reading text
  on-content-muted: '#A09080' # muted content text
  surface-chat-user: '#2A221A'    # user bubble
  surface-chat-assistant: '#221C14' # assistant bubble
  on-chat: '#EDE8E0'
  border: '#3D3228'           # warm dark border
  border-subtle: '#2E2620'    # subtle border
  error: '#E05555'             # brighter error for dark bg
  on-error: '#2A1A1A'
  focus-ring: '#D4892B'       # accent-colored focus on dark
  neutral: '#2A231C'          # neutral dark surface
```

**Contrast verification:** After defining the palette, write and run a `check_contrast_dark.py` script (copy of `check_contrast.py` with the dark hex values) to confirm all pairs pass WCAG AA. Adjust any failing values — prioritize warming the fix, never cool it.

**Typography, spacing, rounded, and components sections:** These are identical to `DESIGN.md`. The component token structure (backgroundColor references, textColor references, etc.) is the same — only the color hex values above differ. Copy the non-color sections from `DESIGN.md` verbatim.

**DESIGN.dark.md must pass lint:** Run `npx @google/design.md lint DESIGN.dark.md` and achieve `errors: 0, warnings: 0` before proceeding.

---

## Step 2 — Update build-tokens.sh

Add dark theme export to the build script:

```bash
#!/usr/bin/env bash
set -euo pipefail

SOURCE="DESIGN.md"
SOURCE_DARK="DESIGN.dark.md"
OUT_DIR="dist/tokens"

mkdir -p "$OUT_DIR"

# Lint both sources
npx @google/design.md lint "$SOURCE"
npx @google/design.md lint "$SOURCE_DARK"

# Export light theme
npx @google/design.md export --format dtcg "$SOURCE" > "$OUT_DIR/tokens.json"
npx @google/design.md export --format tailwind "$SOURCE" > "$OUT_DIR/tailwind.theme.json"

# Export dark theme
npx @google/design.md export --format dtcg "$SOURCE_DARK" > "$OUT_DIR/tokens.dark.json"
npx @google/design.md export --format tailwind "$SOURCE_DARK" > "$OUT_DIR/tailwind.dark.theme.json"

echo "Tokens exported to $OUT_DIR/"
```

Run this to generate all four token files before the next step.

---

## Step 3 — Write the CSS variable generator script

Create `scripts/generate-css-vars.js`. This script reads `dist/tokens/tailwind.theme.json` (light) and `dist/tokens/tailwind.dark.theme.json` (dark) and writes `src/tokens.css` with `:root` and `.dark` variable blocks.

```js
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const light = require('../dist/tokens/tailwind.theme.json');
const dark = require('../dist/tokens/tailwind.dark.theme.json');

const lightColors = light.theme.extend.colors;
const darkColors = dark.theme.extend.colors;

const toVar = (name) => `--color-${name}`;

let css = '/* Generated by scripts/generate-css-vars.js — do not edit */\n\n';

css += ':root {\n';
for (const [name, value] of Object.entries(lightColors)) {
  css += `  ${toVar(name)}: ${value};\n`;
}
css += '}\n\n';

css += '.dark {\n';
for (const [name, value] of Object.entries(darkColors)) {
  css += `  ${toVar(name)}: ${value};\n`;
}
css += '}\n';

const outPath = path.join(__dirname, '../src/tokens.css');
fs.writeFileSync(outPath, css);
console.log(`Written: src/tokens.css`);
```

Add a script entry to `package.json`:

```json
"generate-css-vars": "node scripts/generate-css-vars.js"
```

And add it to `build-tokens.sh` at the end:

```bash
node scripts/generate-css-vars.js
echo "CSS variables written to src/tokens.css"
```

Run `./build-tokens.sh` to generate `src/tokens.css`.

---

## Step 4 — Update tailwind.config.js

Replace the static hex values from `tailwind.theme.json` with CSS variable references. The color section of the Tailwind config must now read:

```js
const terraTheme = require('./dist/tokens/tailwind.theme.json');

// Build CSS var references for all color tokens
const colorVars = {};
for (const name of Object.keys(terraTheme.theme.extend.colors)) {
  colorVars[name] = `var(--color-${name})`;
}

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      ...terraTheme.theme.extend,
      colors: colorVars,   // override static hex with var() references
      boxShadow: {
        raised: '0 1px 4px rgba(26,22,20,0.08), 0 0 1px rgba(26,22,20,0.06)',
        overlay: '0 8px 32px rgba(26,22,20,0.12), 0 2px 8px rgba(26,22,20,0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

Key points:
- `darkMode: 'class'` — dark mode activates on the `.dark` class, not via `prefers-color-scheme`. This gives the ThemeProvider full control.
- `colors: colorVars` overrides only the colors from `terraTheme.theme.extend` with var() references. All other extend values (fontSize, fontFamily, spacing, borderRadius) remain as-is.
- The loop reads token names from the light theme export so it stays in sync with DESIGN.md automatically.

---

## Step 5 — Update src/index.css

Import `tokens.css` so the CSS variables are available globally:

```css
@import './tokens.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

The `@import` must come before the Tailwind directives.

---

## Step 6 — Build ThemeProvider component

`ThemeProvider` manages theme state and applies the `.dark` class to the document root. It also respects the user's OS preference on first load.

**Props:**
```ts
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
}

interface ThemeContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}
```

**Implementation:**

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
}) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (defaultTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (next: 'light' | 'dark' | 'system') => {
    if (next === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    } else {
      setThemeState(next);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
```

**Notes:**
- No `localStorage` persistence — the consuming app handles persistence if needed. ThemeProvider is stateless across reloads by design.
- `window.matchMedia` is called during initialization. For SSR contexts, guard with `typeof window !== 'undefined'` — but Terra DS is a client-side library, so this is fine for now.
- Export both `ThemeProvider` and `useTheme` from `src/components/index.ts`.

---

## Step 7 — Dark shadows

The current warm shadows use `rgba(26,22,20,0.08)` — a dark warm brown at low opacity. In dark mode, this doesn't work: dark shadows on dark backgrounds are invisible. Dark mode shadows should use a slightly deeper opacity of the same warm dark:

Add dark mode shadow overrides to `src/index.css`:

```css
.dark {
  --shadow-raised: 0 1px 4px rgba(0,0,0,0.3), 0 0 1px rgba(0,0,0,0.2);
  --shadow-overlay: 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25);
}
```

Update `tailwind.config.js` boxShadow to reference these vars:

```js
boxShadow: {
  raised: 'var(--shadow-raised, 0 1px 4px rgba(26,22,20,0.08), 0 0 1px rgba(26,22,20,0.06))',
  overlay: 'var(--shadow-overlay, 0 8px 32px rgba(26,22,20,0.12), 0 2px 8px rgba(26,22,20,0.08))',
},
```

The fallback values after the comma keep the light theme working even if the CSS var isn't defined (e.g. in consuming projects that haven't imported `tokens.css`).

---

## Storybook

### Dark mode toggle in Storybook

Add a Storybook toolbar toggle so each story can be previewed in light and dark. Update `.storybook/preview.ts`:

```ts
import '../src/index.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    return Story();
  },
];
```

This adds a theme picker to the Storybook toolbar. Every existing story instantly gains dark mode preview with no story changes — the `.dark` class on the root triggers the CSS vars.

### Themes story

Add `src/components/Themes.stories.tsx` showing light and dark side-by-side:

```tsx
// Render the AllRegisters composition twice — once in a light container, 
// once in a dark container — so both palettes are visible simultaneously.
// Use an inline div with the dark class applied locally rather than 
// document-level, so both can coexist in one story.
```

Note: local `.dark` class on a container div works because the CSS vars cascade — `var(--color-surface-raised)` resolves to whatever `.dark` or `:root` defines for that element's nearest ancestor.

---

## Contrast verification for dark theme

Write `check_contrast_dark.py` at the repo root — a copy of `check_contrast.py` with the dark hex values substituted. Run it and confirm zero FAILs before declaring Phase 9 done.

The pairs most likely to fail in dark mode:
- `nav-item-active`: accent on on-accent — amber on dark, verify carefully
- `button-primary`: primary (light cream in dark) on on-primary — verify
- `on-surface-muted` text pairs — muted text on dark surfaces must still hit 4.5:1
- `callout`: content-raised on content-muted — both dark warm, easy to collapse

If a pair fails, adjust the DESIGN.dark.md token value and re-run until clean.

---

## Verification

Phase 9 is correct when:

1. **DESIGN.dark.md lint-clean.** `npx @google/design.md lint DESIGN.dark.md` → `errors: 0, warnings: 0`.
2. **All four token files generated.** `dist/tokens/` contains `tokens.json`, `tailwind.theme.json`, `tokens.dark.json`, `tailwind.dark.theme.json`.
3. **`src/tokens.css` generated** with `:root` and `.dark` variable blocks.
4. **Tailwind config uses `var()` references** for all colors. Inspect `tailwind.config.js`.
5. **Dark mode activates visually.** Add `dark` class to `<html>` in browser dev tools — all surfaces switch to warm dark immediately with no page reload.
6. **No component files changed.** `git diff src/components/` shows no changes to any `.tsx` file except `ThemeProvider.tsx` (new) and stories.
7. **Storybook theme toggle works.** Switch between light and dark in the toolbar — all stories re-theme.
8. **Dark contrast passes.** `python3 check_contrast_dark.py` → zero FAILs.
9. **Light contrast still passes.** `python3 check_contrast.py` → zero FAILs.
10. **Token discipline holds.** Grep check returns "clean".
11. **TypeScript compiles clean.** `npx tsc --noEmit` → no errors.
12. **Re-theme test still passes.** Change a token in `DESIGN.md`, rebuild, restart Storybook — light theme components update. Change the same token in `DESIGN.dark.md`, rebuild — dark theme updates.

---

## What Phase 9 deliberately does NOT do

- **No localStorage persistence.** The consuming app decides how to persist theme preference. ThemeProvider is intentionally stateless across reloads.
- **No `prefers-color-scheme` auto-follow at runtime.** The `system` defaultTheme reads the preference once on mount. Live system-preference tracking (a `matchMedia` listener) is left to the consuming app.
- **No per-component dark overrides.** Every component re-themes via CSS vars alone. If any component looks wrong in dark mode, the fix is to the dark palette tokens — never a `dark:` class on a component.
- **No Tailwind v4 migration.** Still Tailwind v3. The CSS vars approach is forward-compatible — v4's `@theme` block uses the same CSS variable pattern.

---

## Acceptance criteria

| # | Criterion | How to verify |
|---|---|---|
| 1 | DESIGN.dark.md lint-clean | `npx @google/design.md lint DESIGN.dark.md` → `errors: 0` |
| 2 | All four token files in dist/tokens/ | `ls dist/tokens/` |
| 3 | src/tokens.css has :root and .dark blocks | Read the file |
| 4 | tailwind.config.js colors use var() | Read the file |
| 5 | No component .tsx files changed (except ThemeProvider) | `git diff src/components/*.tsx` |
| 6 | Dark mode activates on .dark class | Dev tools test |
| 7 | Storybook theme toolbar toggle works | Run Storybook |
| 8 | Dark contrast check passes | `python3 check_contrast_dark.py` → zero FAILs |
| 9 | Light contrast still passes | `python3 check_contrast.py` → zero FAILs |
| 10 | Token discipline holds | Grep check returns "clean" |
| 11 | TypeScript compiles clean | `npx tsc --noEmit` → no errors |
| 12 | ThemeProvider and useTheme exported from index.ts | Check index.ts |

---

## The one-line summary

Phase 9 adds a warm dark theme by switching Tailwind's color definitions from static hex to CSS custom properties, writing a dark palette in `DESIGN.dark.md`, and adding a `ThemeProvider` that applies the `.dark` class — every component re-themes automatically with no component edits, proving the token-name discipline at its fullest.
