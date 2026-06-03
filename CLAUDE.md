# Terra DS

A design system built ground-up to be a first-class input for AI coding agents, following the Google Labs DESIGN.md standard (https://github.com/google-labs-code/design.md). It targets reading, writing, AI chat, and productivity tools — text-forward environments where the interface recedes and content breathes. Visual identity: warm, modern, creamy, intellectual.

## Status: all three layers built and validated, dark mode complete

```
Layer 1: DESIGN.md / DESIGN.dark.md  ← source of truth (both lint-clean)
Layer 2: dist/tokens/                ← generated token files
         ├─ tokens.json              ← DTCG light
         ├─ tailwind.theme.json      ← Tailwind v3 light config
         ├─ tokens.dark.json         ← DTCG dark
         ├─ tailwind.dark.theme.json ← Tailwind v3 dark config
         └─ (src/tokens.css)         ← generated CSS custom properties (not in dist/)
Layer 3: src/components/             ← React components (core set + ThemeProvider)
         + Storybook                 ← visual showcase / verification
```

`DESIGN.md` is the source of truth for light; `DESIGN.dark.md` is the source of truth for dark. Layers 2 and 3 derive from them, never the reverse. If a component needs a value with no token, add the token to `DESIGN.md` first, regenerate, then implement — never hardcode downstream.

## Key commands

- **Lint the spec:** `npx @google/design.md lint DESIGN.md` and `npx @google/design.md lint DESIGN.dark.md` — both must pass with zero errors/warnings (info-level OK).
- **Regenerate tokens:** `./build-tokens.sh` — lints both specs, exports all four token files to `dist/tokens/`, then runs `scripts/generate-css-vars.js` to write `src/tokens.css`. Run after any change to either DESIGN file.
- **Visual check:** `npm run storybook` — renders every component/state. Restart fully (Ctrl+C, re-run) after a token change. Use the **Theme toolbar toggle** (top of Storybook) to switch between light and dark. Check the **Themes → LightAndDark** story for a side-by-side view.

## The re-theme test = the definition of "working"

The system is correct when a token change propagates end to end with no component edits:
1. Change a token in `DESIGN.md` (e.g. `accent`).
2. Run `./build-tokens.sh`.
3. Restart Storybook — accent-using components show the new value.

This is verified working. It only holds because of the token-name discipline below; protect that and it keeps working.

The same guarantee covers dark mode: toggling `.dark` on `<html>` is the only change needed to fully re-theme — no component edits, no `dark:` variants anywhere in component code.

## The non-negotiable rule: reference token names, never values

Every layer points at the layer above by name instead of restating a value:
- DESIGN.md components reference color tokens (`{colors.surface-raised}`), not hex.
- React components use token-named utilities (`bg-surface-raised`, `bg-accent`), never raw hex, `bg-white`/`bg-black`, or arbitrary `bg-[#...]`.

Verify component discipline anytime with:
```
grep -rE "#[0-9a-fA-F]{3,6}|bg-white|bg-black|bg-\[" src/components/ && echo "VIOLATION" || echo "clean"
```
A single hardcoded value silently breaks re-theming at that point. This is the spine of the whole system.

## Dark mode architecture

Dark mode is implemented via CSS custom properties, not Tailwind `dark:` variants. The flow:

1. `build-tokens.sh` exports `tailwind.dark.theme.json`, then `scripts/generate-css-vars.js` writes `src/tokens.css` with a `:root {}` block (light values) and a `.dark {}` block (dark values).
2. `tailwind.config.js` sets `darkMode: 'class'` and overrides all color utilities to `var(--color-X)` — so every `bg-surface`, `text-on-surface`, etc. resolves at runtime from the current CSS custom property value.
3. `ThemeProvider` (in `src/components/ThemeProvider.tsx`) adds/removes the `.dark` class on `document.documentElement`, which flips all vars at once.

**Critical implication:** Never add `dark:` variants to component code — they are unnecessary and would break the zero-component-changes guarantee. If a new token is needed in dark, add it to `DESIGN.dark.md` and regenerate.

**ThemeProvider usage:** Wrap the app root. It accepts `defaultTheme: 'light' | 'dark' | 'system'` (default: `'system'`). Access `{ theme, setTheme }` anywhere via `useTheme()`.

## Known toolchain gotchas (v0.1.0 of the CLI)

- **Only `tailwind` and `dtcg` export formats exist.** The README lists `css-tailwind` (Tailwind v4) and `json-tailwind`, but they are NOT in v0.1.0 — they return "Invalid format." Components are built for Tailwind v3; a v4 migration is deferred and kept cheap by the token-name discipline.
- **The exporter drops `lineHeight` and `letterSpacing`** from typography tokens. These live correctly in DESIGN.md but don't reach the export. Pull them from DESIGN.md directly when a component needs them — DESIGN.md is the source of truth for any token the export omits.

## Design principles

- No pure white (`#ffffff`) surfaces, no pure black (`#000000`) text. All neutrals carry a warm hue bias — never substitute a cool grey, including when fixing contrast.
- Three surface registers, materially distinct: UI chrome (cooler cream), content canvas (warmest cream — "paper"), conversational (between). They must not collapse into the same values.
- Two type registers: Inter for UI, Noto Serif for content (prefixed `content-`). Never cross them.
- One accent, used sparingly — a single earthy amber, max one interactive element per view.
- Warm-tinted shadows, never grey. If a shadow draws attention to itself, it is too strong.
- Every backgroundColor/textColor pair meets WCAG AA (4.5:1). Disabled states (muted text on neutral) are the most common contrast failure.

## Working agreement

- Don't hand-edit generated files (`dist/tokens/*`) — regenerate from DESIGN.md.
- Don't scaffold ahead of scope; deliver and validate before expanding. (Fast-follow components not yet built: toggle, checkbox, tooltip, dropdown-menu, content typography variants.)
- Keep changes scoped — when fixing one thing, don't restructure unrelated parts.
- Detailed phase PRDs and project history live in `Notes/`, not here.
