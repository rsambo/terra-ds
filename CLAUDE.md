# Terra DS

A design system built ground-up to be a first-class input for AI coding agents, following the Google Labs DESIGN.md standard (https://github.com/google-labs-code/design.md). It targets reading, writing, AI chat, and productivity tools — text-forward environments where the interface recedes and content breathes. Visual identity: warm, modern, creamy, intellectual.

## Status: three layers built and validated; dark mode + full-token Theme Editor complete

```
Layer 1: DESIGN.md / DESIGN.dark.md  ← source of truth (both lint-clean)
Layer 2: dist/tokens/                ← generated token files
         ├─ tokens.json              ← DTCG light
         ├─ tailwind.theme.json      ← Tailwind v3 light config
         ├─ tokens.dark.json         ← DTCG dark
         ├─ tailwind.dark.theme.json ← Tailwind v3 dark config
         └─ (src/tokens.css)         ← generated CSS vars for ALL categories (not in dist/)
Layer 3: src/components/             ← React components (core set + ThemeProvider)
         + Storybook                 ← visual showcase / verification
Tooling: theme-editor/               ← live Theme Editor app (Vite, port 5174)
         tokens-meta.ts              ← shared token metadata (groups, descriptions, contrast util)
         scripts/export-bundle.mjs   ← copy the system + editor into a new project
```

`DESIGN.md` is the source of truth for light; `DESIGN.dark.md` is the source of truth for dark. Layers 2 and 3 derive from them, never the reverse. If a component needs a value with no token, add the token to `DESIGN.md` first, regenerate, then implement — never hardcode downstream.

## Key commands

- **Lint the spec:** `npx @google/design.md lint DESIGN.md` and `npx @google/design.md lint DESIGN.dark.md` — both must pass with zero errors/warnings (info-level OK).
- **Regenerate tokens:** `./build-tokens.sh` — lints both specs, exports all four token files to `dist/tokens/`, then runs `scripts/generate-css-vars.js` to write `src/tokens.css`. The generator now emits CSS vars for **all** categories (colors, spacing, radius, typography) and supplements the `lineHeight`/`letterSpacing` the exporter drops by reading them from DESIGN.md. Run after any change to either DESIGN file.
- **Visual check:** `npm run storybook` — renders every component/state. Restart fully (Ctrl+C, re-run) after a token change. Use the **Theme toolbar toggle** (top of Storybook) to switch between light and dark. Check the **Themes → LightAndDark** story for a side-by-side view.
- **Edit the theme visually:** `npm run theme-editor` — live editor on port 5174 for colors, radius, spacing, and typography against a component preview; **Save** writes back to DESIGN.md/DESIGN.dark.md and regenerates. See "Theme Editor" below.
- **Export to a new project:** `node scripts/export-bundle.mjs <targetDir>` — copies the design system + editor into a new project. The bundle carries `@google/design.md` as a devDependency (no global install needed).

## The re-theme test = the definition of "working"

The system is correct when a token change propagates end to end with no component edits:
1. Change a token in `DESIGN.md` (e.g. `accent`).
2. Run `./build-tokens.sh`.
3. Restart Storybook — accent-using components show the new value.

This is verified working. It only holds because of the token-name discipline below; protect that and it keeps working.

The same guarantee covers **all four token categories** — spacing, radius, and typography are CSS-var-driven too (not just colors), so changing any of them propagates the same way with no component edits.

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

## Runtime token architecture (CSS custom properties)

Every token category resolves at runtime from CSS variables, not static values. The flow:

1. `build-tokens.sh` exports the Tailwind JSON, then `scripts/generate-css-vars.js` writes `src/tokens.css`: a `:root {}` block holding **colors (light) + spacing + radius + typography**, and a `.dark {}` block holding **colors (dark) only**. Only colors vary by theme — spacing, radius, and typography are theme-agnostic and emitted once in `:root`.
2. `tailwind.config.js` (`darkMode: 'class'`) overrides color, spacing, and borderRadius utilities to `var(--…)`, so `bg-surface`, `p-md`, `rounded-lg`, etc. resolve at runtime. **Typography is special:** a Tailwind plugin makes each `font-{role}` utility apply the full composite (family + size + weight + line-height + letter-spacing) from vars — there are no `text-{role}` size utilities. Use `font-{role}` for type; it now carries size/weight, not just family.
3. `ThemeProvider` (in `src/components/ThemeProvider.tsx`) adds/removes the `.dark` class on `document.documentElement`, which flips all color vars at once.

**Critical implication:** Never add `dark:` variants to component code — they are unnecessary and would break the zero-component-changes guarantee. If a new token is needed in dark, add it to `DESIGN.dark.md` and regenerate.

**ThemeProvider usage:** Wrap the app root. It accepts `defaultTheme: 'light' | 'dark' | 'system'` (default: `'system'`). Access `{ theme, setTheme }` anywhere via `useTheme()`.

## Theme Editor (`theme-editor/`, `npm run theme-editor`, port 5174)

A live, dogfooded editor for customizing the whole system per project: colors, radius, spacing, typography, against a component preview. Architecture:

- **Live edits** set inline CSS vars on `document.documentElement` ("full-dogfood": the editor's own UI re-themes as you edit). Color edits respect the current theme; spacing/radius/typography are theme-agnostic. localStorage persists edits across reloads.
- **Save** (`POST /__write-tokens`, handled by `theme-editor/write-tokens.mjs`) validates against the token allowlists, **snapshots** DESIGN.md + DESIGN.dark.md, patches them line-by-line, runs `./build-tokens.sh`, and **rolls back both files on any failure** (incl. lint) — atomic, all-or-nothing.
- **`theme.json`** is the portable preset format (export/import). `scripts/export-bundle.mjs` copies the system + editor into a new project.
- Shared metadata (token groups, descriptions, contrast pairs, `contrastRatio`/`wcagLevel`) lives in `tokens-meta.ts` at the repo root — imported by both the editor and the Storybook `ColorTokens` story. It is **not** in `src/` so it isn't bundled into the published package.
- The discipline grep scans `src/components/` only; the editor's one theme-independent **safety lifeline** (fixed Reset-all / Revert control, `⌘/Ctrl+0` and `Esc`) uses fixed values and lives in `theme-editor/`, outside that scope — keeping the shipped system pure.

## Known toolchain gotchas (v0.1.0 of the CLI)

- **Only `tailwind` and `dtcg` export formats exist.** The README lists `css-tailwind` (Tailwind v4) and `json-tailwind`, but they are NOT in v0.1.0 — they return "Invalid format." Components are built for Tailwind v3; a v4 migration is deferred and kept cheap by the token-name discipline.
- **The exporter drops `lineHeight` and `letterSpacing`** from typography tokens. These live correctly in DESIGN.md but don't reach the Tailwind export. `scripts/generate-css-vars.js` already handles this — it reads those two fields straight from DESIGN.md so the `--line-height-*` / `--letter-spacing-*` vars are correct. DESIGN.md remains the source of truth for any token the export omits.

## Design principles

- No pure white (`#ffffff`) surfaces, no pure black (`#000000`) text. All neutrals carry a warm hue bias — never substitute a cool grey, including when fixing contrast.
- Three surface registers, materially distinct: UI chrome (cooler cream), content canvas (warmest cream — "paper"), conversational (between). They must not collapse into the same values.
- Two type registers: Inter for UI, Noto Serif for content (prefixed `content-`). Never cross them.
- One accent, used sparingly — a single earthy amber, max one interactive element per view.
- Warm-tinted shadows, never grey. If a shadow draws attention to itself, it is too strong.
- Every backgroundColor/textColor pair meets WCAG AA (4.5:1). Disabled states (muted text on neutral) are the most common contrast failure.

## Working agreement

- Don't hand-edit generated files (`dist/tokens/*`, `src/tokens.css`) — regenerate from DESIGN.md, or edit through the Theme Editor (which regenerates for you).
- Don't scaffold ahead of scope; deliver and validate before expanding.
- Keep changes scoped — when fixing one thing, don't restructure unrelated parts.
- Detailed phase PRDs and project history live in `Notes/`, not here. (Phase 10 = the Theme Editor: `Notes/terra-ds-phase10-prd.md`.)
