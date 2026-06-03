# Terra DS — Phase 7 PRD
## Animation polish, packaging, and integration

---

## Overview

Phases 3–6 built the complete component library. Phase 7 hardens and ships it.

Three workstreams run in sequence. First, animation polish: the overlay components already use Radix's animate-in/out class names, but the `tailwindcss-animate` plugin that powers those classes has never been installed — meaning enter/exit animations are currently silently broken. This gets fixed, and a consistent motion vocabulary is applied across every animated surface. Second, packaging: Terra DS gets a proper build pipeline so it can be consumed by other projects via local linking or eventual npm publish. Third, an integration guide: a short, practical document showing exactly how to wire Terra DS into a new Vite+React project so there's no guesswork when you go to use it.

Dark mode is deliberately not in this phase. It requires an architectural decision about how to implement theme switching (CSS custom properties, class-based switching, or a parallel config) that deserves its own focused phase once the library is in real use and you have a concrete project to design the switching model around.

**Phase 8 scope (not here):** Dark mode / alternate theme.

---

## No DESIGN.md changes in this phase

Animation is not token-based in the current system — the DESIGN.md spec format and v0.1.0 CLI have no motion/animation section. Animations are expressed as Tailwind utility classes only. No `./build-tokens.sh` run is needed for this phase.

The token discipline rule still applies in full to any component edits: no raw hex, no `bg-white`/`bg-black`, no `bg-[#...]`.

---

## Workstream A — Animation polish

### A1. Install tailwindcss-animate

Several components already use animate-in/out class names from `tailwindcss-animate` (Dialog, CommandMenu, Select, DropdownMenu, Toast). Without the plugin installed, those class names are no-ops — the components open and close with no transition. This is the highest-priority fix in the phase.

```bash
npm install -D tailwindcss-animate
```

Register it in `tailwind.config.js`:

```js
const terraTheme = require('./dist/tokens/tailwind.theme.json');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      ...terraTheme.theme.extend,
      boxShadow: {
        raised: '0 1px 4px rgba(26,22,20,0.08), 0 0 1px rgba(26,22,20,0.06)',
        overlay: '0 8px 32px rgba(26,22,20,0.12), 0 2px 8px rgba(26,22,20,0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

After adding the plugin, restart Storybook and verify that Dialog, CommandMenu, Select, and DropdownMenu all animate in and out visibly.

---

### A2. Motion vocabulary

Use a minimal, consistent set of animation utilities across all animated surfaces. The goal is motion that is present but not theatrical — transitions should confirm state changes without drawing attention to themselves.

**Overlay enter/exit** (Dialog, CommandMenu, DropdownMenu, Select content, Tooltip):
- Enter: `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`
- Exit: `data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`
- Duration: `duration-150` — fast. Overlays should feel snappy, not floaty.

**Toast enter/exit** (slides up from bottom-right):
- Enter: `data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2 data-[state=open]:fade-in-0`
- Exit: `data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-0`
- Duration: `duration-200`

**Sidebar collapse** (width transition):
Add `transition-[width] duration-200 ease-in-out` to the Sidebar `<aside>` element. The width switches between `w-60` and `w-14` on the `collapsed` prop. With the transition, the collapse animates smoothly instead of snapping.

**Interactive state transitions** (buttons, nav items, cards, inputs):
All interactive components already have `transition-colors` in their base classes. Verify this is present on:
- Button (all variants) ✓ already present
- NavItem ✓ already present
- SidebarItem — add `transition-colors` if missing
- Card (interactive variant) ✓ already present
- Input — add `transition-colors` if missing
- Tab ✓ already present
- Toggle/Checkbox — Radix handles these via CSS

**What NOT to animate:**
- Background color changes on non-interactive surfaces (cards, content pages)
- Font or layout properties
- Anything that plays on initial page load

---

### A3. Component-by-component audit

Review each animated component and apply the motion vocabulary above consistently. Changes needed:

**Dialog** — already has animate-in/out class names. After installing the plugin, verify they work. No class changes needed.

**CommandMenu** — already has animate-in/out class names. Verify. No class changes needed.

**Select (content panel)** — add `duration-150` and the zoom-in/out classes to `SelectPrimitive.Content` if not already present.

**DropdownMenu (content panel)** — same as Select.

**Tooltip (content)** — add `data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-100` to `TooltipPrimitive.Content`. Tooltip uses `delayed-open` not `open` as its state value.

**Toast** — update Toast enter/exit to use slide-in-from-bottom-2 as described above.

**Sidebar** — add `transition-[width] duration-200 ease-in-out` to the `<aside>` element.

**SidebarItem** — add `transition-colors` to the `<a>` element if missing.

**Input** — add `transition-colors` to the input element if missing.

---

## Workstream B — Packaging

### B1. Build tool setup

Use **tsup** — the standard zero-config TypeScript bundler for component libraries. It produces ESM and CJS outputs, generates `.d.ts` type declarations, and handles React/JSX automatically.

```bash
npm install -D tsup
```

Create `tsup.config.ts` at the repo root:

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/components/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/react-dialog',
    '@radix-ui/react-tabs',
    '@radix-ui/react-switch',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-select',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-tooltip',
    '@radix-ui/react-toast',
  ],
  jsx: 'react-jsx',
});
```

All Radix packages and React are externalized — they must be provided by the consuming project. Terra DS does not bundle them.

---

### B2. Update package.json

Add build script, `main`/`module`/`types` fields, `exports` map, `files` list, and `peerDependencies`:

```json
{
  "name": "terra-ds",
  "version": "0.1.0",
  "private": true,
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist",
    "dist/tokens"
  ],
  "scripts": {
    "build": "tsup",
    "build:tokens": "./build-tokens.sh",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "@radix-ui/react-dialog": ">=1.0.0",
    "@radix-ui/react-tabs": ">=1.0.0",
    "@radix-ui/react-switch": ">=1.0.0",
    "@radix-ui/react-checkbox": ">=1.0.0",
    "@radix-ui/react-select": ">=1.0.0",
    "@radix-ui/react-dropdown-menu": ">=2.0.0",
    "@radix-ui/react-tooltip": ">=1.0.0",
    "@radix-ui/react-toast": ">=1.0.0"
  }
}
```

Note: `"private": true` stays — this signals the package isn't on npm. Remove it when/if you publish.

---

### B3. Verify the build

```bash
npm run build
```

Expected output in `dist/`:
```
dist/
├── index.js          ← CJS
├── index.mjs         ← ESM
├── index.d.ts        ← type declarations
└── index.d.mts       ← ESM types
```

Spot-check the output:
- `dist/index.mjs` should contain `export { Button }` and other named exports.
- `dist/index.d.ts` should contain all TypeScript interface declarations.
- No Radix package code should appear in the bundle — only Terra's own component code.

The `dist/tokens/` directory is already committed and is included in `files`, so consuming projects can import token JSON directly without running the build tool.

---

### B4. Test local linking

Before writing the integration guide, verify the package actually works when consumed. Create a minimal test project adjacent to the repo:

```bash
cd ..
npm create vite@latest terra-test -- --template react-ts
cd terra-test
npm install
npm link ../terra-ds
npm run dev
```

In the test project, import and render a Button:

```tsx
import { Button } from 'terra-ds';

export default function App() {
  return <Button variant="primary">Terra DS works</Button>;
}
```

If it renders correctly with Terra styling, the package is working. If Tailwind utilities don't resolve, the consuming project needs to configure Tailwind to include Terra's token theme — which is exactly what the integration guide covers.

---

## Workstream C — Integration guide

Write `INTEGRATION.md` at the repo root. This is a practical step-by-step document for setting up Terra DS in a new consuming project. It is not a PRD or design document — write it as a developer would actually use it, with runnable commands and minimal prose.

### Contents of INTEGRATION.md

```md
# Using Terra DS in your project

## Prerequisites

Your project needs:
- React 18+
- Tailwind CSS v3
- TypeScript (recommended)

## 1. Link or install

For now, Terra DS is consumed via local linking:

\`\`\`bash
# In your project
npm link ../path/to/terra-ds
\`\`\`

Or copy the `dist/` folder and reference it directly.

## 2. Configure Tailwind

Terra DS tokens must be loaded into your project's Tailwind config so 
token-named utilities (`bg-surface-raised`, `text-on-content`, etc.) resolve.

\`\`\`js
// tailwind.config.js
const terraTheme = require('./node_modules/terra-ds/dist/tokens/tailwind.theme.json');

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/terra-ds/dist/**/*.{js,mjs}', // scan Terra components
  ],
  theme: {
    extend: {
      ...terraTheme.theme.extend,
      boxShadow: {
        raised: '0 1px 4px rgba(26,22,20,0.08), 0 0 1px rgba(26,22,20,0.06)',
        overlay: '0 8px 32px rgba(26,22,20,0.12), 0 2px 8px rgba(26,22,20,0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
\`\`\`

**Important:** The `content` array must include the Terra dist path so Tailwind 
scans Terra component files and keeps the token-named utilities in your output.

## 3. Load fonts

Terra DS uses Inter (UI register) and Noto Serif (content register). 
Add these to your HTML `<head>`:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
\`\`\`

Then add font-family declarations to your global CSS:

\`\`\`css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
  background-color: theme('colors.surface');
  color: theme('colors.on-surface');
}
\`\`\`

## 4. Wrap your app with Toast provider

If you use the Toast component, wrap your app root with Radix's ToastProvider:

\`\`\`tsx
import * as ToastPrimitive from '@radix-ui/react-toast';
import { ToastViewport } from 'terra-ds';

function App() {
  return (
    <ToastPrimitive.Provider>
      {/* your app */}
      <ToastViewport />
    </ToastPrimitive.Provider>
  );
}
\`\`\`

## 5. Use components

\`\`\`tsx
import { Button, Input, Card, AppShell, Sidebar, Header } from 'terra-ds';
\`\`\`

All components, sub-components, and the `useToast` hook are available 
as named exports from the top-level `terra-ds` import.

## Re-theming

To change a token (e.g. the accent color), edit `DESIGN.md` in the Terra DS 
repo, run `./build-tokens.sh`, rebuild (`npm run build`), and re-link. 
Every component that uses the token will reflect the new value with no 
component edits.
```

---

## Verification

Phase 7 is correct when:

1. **Animation works.** Dialog, CommandMenu, Select, and DropdownMenu all animate in and out visibly in Storybook. Sidebar collapses with a smooth width transition. Toast slides in from the bottom.
2. **`tailwindcss-animate` is in `package.json` devDependencies and `tailwind.config.js` plugins.**
3. **`tsup.config.ts` exists** and `npm run build` produces `dist/index.js`, `dist/index.mjs`, and `dist/index.d.ts` with no errors.
4. **No Radix code in the bundle.** The built files contain only Terra component code.
5. **Local link test passes.** A minimal consuming project renders a Button with Terra styling.
6. **`INTEGRATION.md` exists** at the repo root with all five setup steps.
7. **TypeScript still compiles clean.** `npx tsc --noEmit` → no errors.
8. **Token discipline still holds.** Grep check returns "clean".
9. **Re-theme test still passes.** Change a token in DESIGN.md, rebuild tokens, rebuild package, restart Storybook — all components reflect the change.

---

## What Phase 7 deliberately does NOT do

- **No dark mode.** Deferred to Phase 8 — requires architectural decisions about theme switching that are best made with a concrete project context.
- **No npm publish.** `"private": true` stays until there's a reason to publish publicly.
- **No storybook-as-docs site.** Storybook remains a local dev tool, not a hosted design reference.
- **No CSS custom properties / design token runtime.** The current system uses Tailwind utilities at build time. A runtime token system (for user-facing theming) is a Phase 8+ concern.

---

## Acceptance criteria

| # | Criterion | How to verify |
|---|---|---|
| 1 | `tailwindcss-animate` installed and registered in tailwind.config.js | Check package.json + tailwind.config.js |
| 2 | Dialog animates in and out | Storybook — open and close Dialog |
| 3 | CommandMenu animates in and out | Storybook — open and close CommandMenu |
| 4 | Sidebar collapse animates | Storybook — toggle collapsed prop |
| 5 | Toast slides in from bottom | Storybook — trigger Toast |
| 6 | tsup.config.ts exists and build runs clean | `npm run build` → no errors |
| 7 | dist/ contains .js, .mjs, and .d.ts | `ls dist/` |
| 8 | No Radix code in the bundle | Check dist/index.mjs for absence of Radix source |
| 9 | Local link test renders Button with Terra styling | Manual test in terra-test project |
| 10 | INTEGRATION.md exists with all five sections | Read the file |
| 11 | TypeScript compiles clean | `npx tsc --noEmit` → no errors |
| 12 | Token discipline holds | Grep check returns "clean" |

---

## The one-line summary

Phase 7 installs the missing animation plugin and applies a consistent motion vocabulary, adds a tsup build pipeline that produces a consumable package, and writes an integration guide — completing the work needed to actually use Terra DS in a real project.
