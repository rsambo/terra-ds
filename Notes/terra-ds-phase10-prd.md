# Terra DS — Phase 10 PRD
## Theme Editor (portable, self-contained, full-token)

> **Target implementer:** Kimi K2.6, working autonomously with file access and a terminal.
> **Mode:** Work autonomously. Do not ask for confirmation between steps. Implement phase by
> phase (P1 → P5), verifying each phase's acceptance criteria before moving on. Keep prose
> commentary minimal — the deliverables are working files plus passing verification.

---

## Overview

Phase 10 builds a **Theme Editor**: a local, browser-based tool that lets a user customize the
entire design system — **colors, corner radius, spacing, and typography** — with a live preview,
then **save the result back into the source of truth** (`DESIGN.md` / `DESIGN.dark.md`) and export
a **portable `theme.json` preset**.

The editor is **part of the design system bundle**, not a one-off tool for this repo. The intended
workflow:

1. Copy the Terra DS bundle into a new project (`npm run export-bundle ../my-app`).
2. Run the editor in that project, customize all four token categories against a live preview.
3. **Save** — the editor patches that project's `DESIGN.md`/`DESIGN.dark.md` and regenerates tokens.
4. Tweak again anytime — the editor travels with the system.

`DESIGN.md` remains the per-project source of truth (and the spec the project's AI agent reads).
`theme.json` is the transferable interchange format between projects.

### Settled product decisions (do not re-litigate)

| Decision | Choice |
|---|---|
| Hosting | **Separate Vite app** in `theme-editor/`, runs alongside Storybook (port 5174). |
| Round-trip | **Full write-back** to `DESIGN.md`/`DESIGN.dark.md` + regenerate. Not localStorage-only. |
| Save granularity | **Save all themes together** (light + dark, all categories) in one atomic action. |
| Theme view | **Toggle one theme at a time** (no side-by-side). |
| Contrast | **Live WCAG AA badges** on meaningful color pairs. |
| Distribution | **Copyable source bundle** carrying the editor + the `@google/design.md` toolchain as a devDependency (no global install). |
| Live preview scope | **All four categories** are CSS-var-driven and update with no rebuild. |
| Editor chrome | **Built from Terra DS components** (dogfood). **Full-dogfood**: live edits restyle the editor itself, with one theme-independent safety lifeline. |
| Typography depth | Family stacks (sans/serif/mono) **+** per-role table (size/weight/line-height/letter-spacing). |
| Spacing/radius model | **Per-step** independent editing (+ optional base+ratio generator helper). |
| export-bundle | **Node CLI** (`scripts/export-bundle.mjs`), cross-platform. |

---

## The non-negotiable rule (inherited)

Every layer points at the layer above **by token name, never by value**. Components use
token-named utilities (`bg-surface-raised`, `p-md`, `rounded-lg`, `font-heading-lg`), never raw
hex / px / arbitrary values. Verify component discipline anytime:

```
grep -rE "#[0-9a-fA-F]{3,6}|bg-white|bg-black|bg-\[" src/components/ && echo "VIOLATION" || echo "clean"
```

**This grep scans `src/components/` only.** The editor lives in `theme-editor/` — outside that
path — so the one theme-independent **safety lifeline** in the editor is allowed to use fixed
values there. The shipped design system stays pure.

`DESIGN.md` is the source of truth. Layers 2 and 3 derive from it, never the reverse. The editor's
write-back edits `DESIGN.md` and **regenerates** downstream artifacts — it never hand-edits
`dist/tokens/*` or `src/tokens.css`.

---

## Current architecture (what exists today)

- **Layer 1:** `DESIGN.md` (light) + `DESIGN.dark.md` (dark) — YAML front matter, flat `colors:`,
  `typography:`, `spacing:`, `rounded:`, `components:`. Colors as `name: '#HEX'` (uppercase).
- **Layer 2:** `build-tokens.sh` lints both, exports DTCG + Tailwind JSON to `dist/tokens/`, then
  runs `scripts/generate-css-vars.js` → `src/tokens.css`.
- **`src/tokens.css`** currently emits **only `--color-*`** vars, in `:root` (light) and `.dark`.
- **`tailwind.config.js`** sets `darkMode: 'class'`, overrides `colors` to `var(--color-*)`, and
  spreads the rest of `terraTheme.theme.extend` (fontFamily, fontSize, borderRadius, spacing) **as
  static values**.
- **Tailwind extend shape** (from the export):
  - `spacing: { '2xs':'2px', … '3xl':'64px' }` → `p-md` etc.
  - `borderRadius: { none, sm, md, lg, xl, full }` → `rounded-lg` etc.
  - `fontFamily: { 'heading-lg': ['Inter'], 'content-body-lg': ["'Noto Serif', serif"], … }` → `font-{role}` (family only).
  - `fontSize: { 'heading-lg': ['24px', { fontWeight:'600' }], 'label-sm': ['12px', { letterSpacing:'0.02em', fontWeight:'500' }], … }` → `text-{role}` (size + weight [+ tracking]).

### ⚠️ Known typography wiring gap (read carefully)

Components use **`font-{role}`** only (e.g. `font-heading-lg`, `font-body-md`). That utility comes
from Tailwind's `fontFamily` extend and sets **font-family only** — it does **not** apply the
size/weight/tracking, which live under the unused `text-{role}` (`fontSize`) utilities. Also, the
`@google/design.md` exporter **drops `lineHeight` and `letterSpacing`** from typography (they exist
in `DESIGN.md` but not in the Tailwind JSON).

**Implication for P1:** making typography live-editable requires *unifying* the role utilities so a
single class applies family + size + weight + line-height + letter-spacing, all var-driven — with
`lineHeight`/`letterSpacing` supplemented from `DESIGN.md` for the fields the export drops (P1 Step
1). This is the riskiest part of P1; see P1 Step 4.

---

# Phase P1 — Runtime foundation: make all four categories CSS-var-driven

**Goal:** extend the var runtime beyond colors so spacing, radius, and typography also re-theme at
runtime with **no rebuild**. This is the prerequisite for live editing and must land first.

**Theme scoping rule:** only **colors** differ between light and dark. Spacing, radius, and
typography are **theme-agnostic** — emit them once in `:root`, never in `.dark`.

## P1 Step 1 — Extend the generator to emit all categories (keep the `@google/design.md` export)

**Keep leaning on the DESIGN.md standard.** `build-tokens.sh` continues to lint and export via
`npx @google/design.md` exactly as today; the CLI is the export engine. Extend
`scripts/generate-css-vars.js` so that — in addition to the colors it already reads from
`dist/tokens/tailwind.theme.json` + `tailwind.dark.theme.json` — it also reads **spacing,
borderRadius, fontFamily, and fontSize** from those exports and emits the corresponding CSS vars.

**Handling the fields the export drops:** the exporter omits `lineHeight` (always) and may omit
`letterSpacing` for some roles. For *only* those missing fields, the generator reads the values
**directly from `DESIGN.md`** — per the standing rule in CLAUDE.md that "DESIGN.md is the source of
truth for any token the export omits." Everything else comes from the export. Default any value
still missing to `normal` (line-height) / `0em` (letter-spacing).

The generator must emit `src/tokens.css` with these blocks:

```css
/* Generated — do not edit */
:root {
  /* colors (light) */
  --color-primary: #3D322B;
  /* … all 26 colors … */

  /* spacing (theme-agnostic) */
  --spacing-2xs: 2px; --spacing-xs: 4px; /* … --spacing-3xl: 64px */

  /* radius (theme-agnostic) */
  --rounded-none: 0px; --rounded-sm: 4px; /* … --rounded-full: 9999px */

  /* typography (theme-agnostic) — per role */
  --font-family-heading-lg: Inter;
  --font-size-heading-lg: 24px;
  --font-weight-heading-lg: 600;
  --line-height-heading-lg: 1.3;        /* recovered from DESIGN.md */
  --letter-spacing-heading-lg: 0em;     /* recovered from DESIGN.md */
  /* … one set per typography role … */
}
.dark {
  /* colors only (dark) */
  --color-primary: #E8DDD5;
  /* … all 26 colors … */
}
```

For the targeted `DESIGN.md` read of the two dropped fields, a tiny YAML read suffices (the
`typography:` block is the only nested part needed). Prefer a dependency-free read; if a YAML lib is
warranted, add `yaml` as a devDependency.

## P1 Step 2 — `build-tokens.sh` stays as-is (lint + export + generate)

No structural change: `build-tokens.sh` still runs `npx @google/design.md lint` on both specs,
exports DTCG + Tailwind JSON, then runs the extended `generate-css-vars.js` as its final step. The
only difference is the generator now emits more vars. The `@google/design.md` CLI is required (now a
**devDependency** of the bundle, resolved via `npx` — never a global install).

## P1 Step 3 — Update `tailwind.config.js`: spacing & radius → vars

Convert `spacing` and `borderRadius` to var references, the same pattern already used for colors:

```js
const spacingVars  = Object.fromEntries(Object.keys(terraTheme.theme.extend.spacing).map(k => [k, `var(--spacing-${k})`]));
const radiusVars   = Object.fromEntries(Object.keys(terraTheme.theme.extend.borderRadius).map(k => [k, `var(--rounded-${k})`]));

theme: { extend: {
  ...terraTheme.theme.extend,
  colors: colorVars,
  spacing: spacingVars,
  borderRadius: radiusVars,
  // typography handled in Step 4
}}
```

After this, `p-md` → `padding: var(--spacing-md)` and `rounded-lg` → `border-radius:
var(--rounded-lg)`, both runtime-switchable.

## P1 Step 4 — Typography: unify role utilities, var-driven (the risk)

Make a **single role class** (the `font-{role}` classes components already use) apply the full
composite from vars. Recommended approach: a small Tailwind plugin via `addComponents` that
registers each role:

```js
// tailwind.config.js (plugin)
const roles = require('./dist/tokens/tailwind.theme.json').theme.extend.fontFamily; // role names
const typographyPlugin = ({ addComponents }) => {
  const comps = {};
  for (const role of Object.keys(roles)) {
    comps[`.font-${role}`] = {
      fontFamily: `var(--font-family-${role})`,
      fontSize: `var(--font-size-${role})`,
      fontWeight: `var(--font-weight-${role})`,
      lineHeight: `var(--line-height-${role})`,
      letterSpacing: `var(--letter-spacing-${role})`,
    };
  }
  addComponents(comps);
};
```

Then **remove** the `fontFamily`/`fontSize` entries from the spread extend for these roles (or let
the plugin's `.font-{role}` win) so there's no conflicting family-only `font-{role}` utility.

**Acceptance for this step (the re-theme test, extended):** changing a typography value in
`DESIGN.md` (e.g. `heading-lg` fontSize) and running the generator must visibly change rendered
text in Storybook **with no component edits**. Likewise for a spacing token (padding changes) and a
radius token (corner changes). If components currently render the wrong sizes because of the
old `font-{role}`=family-only wiring, this step is also the fix — note that in your report.

## P1 acceptance criteria

| # | Criterion | Verify |
|---|---|---|
| 1 | `src/tokens.css` has color (both themes) + spacing + radius + typography vars | Read file |
| 2 | Generator consumes the `@google/design.md` export; supplements only dropped lineHeight/letterSpacing from DESIGN.md | Read generator + tokens.css |
| 3 | Tailwind spacing/radius/typography resolve from vars | Read config; inspect compiled CSS |
| 4 | Re-theme test passes for **all four** categories (no component edits) | Edit DESIGN.md token → regen → Storybook |
| 5 | Token discipline grep clean | grep command above |
| 6 | `npx tsc --noEmit` clean; existing Storybook stories unchanged visually except intended type fixes | Build |
| 7 | Light + dark contrast still pass | existing `check_contrast.py` / dark variant |

---

# Phase P2 — Editor app shell + color editing + live sampler

**Goal:** a running Vite app with the split-pane editor, color editing (reuse existing work), a
live component sampler, localStorage persistence, and live contrast badges.

## P2 Step 1 — Shared metadata module

Create **`tokens-meta.ts` at the repo root** (outside `src/components/` so it isn't bundled into
the published package). Move the grouped color token metadata (titles, descriptions, grouping) out
of `src/components/ColorTokens.stories.tsx` into this module, and have the story import from it
(DRY — one source of truth for "what tokens mean"). It must export:

- `COLOR_GROUPS` — array of `{ title, description, tokens: { name, title, description }[] }`.
- `SPACING_META`, `RADIUS_META`, `TYPOGRAPHY_META` — analogous metadata for the other categories.
- `ALL_COLOR_TOKENS`, etc. — flat allowlists (these double as the **write-back validation gate**).
- `CONTRAST_PAIRS` — the meaningful fg/bg pairs to check (e.g. `on-surface`/`surface`,
  `on-surface-muted`/`surface`, `on-primary`/`primary`, `on-accent`/`accent`,
  `on-content(-muted)`/`surface-content`, `on-chat`/chat surfaces, `on-error`/`error`).
- `contrastRatio(fgHex, bgHex)` — sRGB → linear → relative luminance → ratio. `wcagLevel(ratio)`
  returning `'AA' | 'AA-large' | 'fail'`.

## P2 Step 2 — Vite app scaffold

```
theme-editor/
  index.html
  main.tsx          ← imports ../src/index.css (+ tokens.css), mounts <ThemeEditor/>
  vite.config.ts    ← @vitejs/plugin-react + (P4) themeWriterPlugin()
  ThemeEditor.tsx   ← split-pane shell, toolbar, state, theme toggle
  Sampler.tsx       ← curated kitchen-sink of real Terra DS components
  editors/
    ColorEditors.tsx
    (P3) SpacingEditors.tsx, RadiusEditors.tsx, TypographyEditors.tsx
```

Add devDeps if missing: `@vitejs/plugin-react`. Add npm script:
`"theme-editor": "vite --config theme-editor/vite.config.ts --port 5174"`.

## P2 Step 3 — Editor chrome from Terra DS components (dogfood)

Build the editor UI from existing components: **Button** (toolbar actions), **Card** (rows/panels),
**Tabs** (category switch), **Input** (hex/number fields), **Select** (font/unit pickers),
**Toggle** (light/dark), **Badge** (AA + "edited" indicators), **Tooltip** (token descriptions),
**DropdownMenu** (export/import menu). Only the **native color picker** (`<input type="color">`)
and a **range slider** use native elements (styled with tokens) — do **not** scaffold new DS
primitives.

## P2 Step 4 — Full-dogfood edit application + safety lifeline

- Live edits set inline `--color-*` (etc.) on **`document.documentElement`** (root). The editor's
  own components re-theme along with the preview — intentional.
- **Safety lifeline:** a small, fixed-position control (and keyboard shortcut, e.g. `Esc` for
  "revert last", `⌘0` / `Ctrl+0` for "reset all") styled with **fixed, non-token values** so it
  stays readable/clickable no matter how broken the live theme gets. This is the *only* place fixed
  values are allowed, and it's in `theme-editor/` (outside the discipline grep's scope).
- **localStorage** auto-persist of overrides (per theme), reusing the pattern already built in
  `ColorTokens.stories.tsx`. Key: `terra-ds:theme-editor`.

## P2 Step 5 — Live sampler (right pane)

A curated layout exercising every token at least once: Buttons (all variants + hover/disabled/
focus), Input/Select/Textarea (+ error), Card, Badge (default/accent/error), NavItem (active),
Tabs, Breadcrumb, Avatar, Chat bubbles (user + assistant), Callout, a short serif content/paper
block on `surface-content`, DataTable, and a static Dialog/DropdownMenu snapshot. Reuse existing
components only.

## P2 Step 6 — Live contrast badges

Each color editor row shows a live **AA badge** (✓ ≥4.5:1, ⚠ AA-large 3–4.5, ✗ <4.5) computed from
the current live values for its `CONTRAST_PAIRS` membership, recomputed on every edit, for the
active theme. A toolbar summary shows total failing pairs.

## P2 acceptance criteria

| # | Criterion | Verify |
|---|---|---|
| 1 | `npm run theme-editor` serves on :5174 | Run |
| 2 | Editor chrome built from Terra DS components | Read source |
| 3 | Editing a color updates preview **and** chrome live | Manual |
| 4 | Safety lifeline reverts/reset even when theme is unreadable | Manual (set on-surface=surface) |
| 5 | Edits persist across reload (localStorage) | Manual |
| 6 | Contrast badges live + accurate | Spot-check a known-failing pair |
| 7 | `tokens-meta.ts` shared by story + app; story still works | Read + run Storybook |

---

# Phase P3 — Full-scope editors: radius, spacing, typography

**Goal:** extend editing to the other three categories, all live (depends on P1).

- **Radius / Spacing:** **per-step** numeric inputs + unit, each with a live visual ramp preview.
  Optional helper button "Generate from base + ratio" that fills a modular scale the user can then
  hand-tweak (non-core; per-step values remain the source of truth).
- **Typography:** edit the three **family stacks** (UI sans, content serif, mono) via Select/Input,
  **plus** a compact **per-role table** with columns: size, weight, line-height, letter-spacing.
  Render each role as a live type specimen. Custom web-font *loading* is **out of scope** for v1 —
  families are stacks; preview uses whatever fonts are available locally.
- These categories are **theme-agnostic** — the light/dark toggle does not change them; show them
  once regardless of active theme.

## P3 acceptance criteria

| # | Criterion |
|---|---|
| 1 | Editing any spacing/radius step updates the preview live |
| 2 | Editing a font family/size/weight/line-height/letter-spacing updates specimens + sampler live |
| 3 | Non-color categories shown once (not duplicated per theme) |
| 4 | All edits persist (localStorage) |

---

# Phase P4 — Write-back round-trip (Save all together)

**Goal:** one **Save** action patches the source specs for both themes and regenerates, atomically.

## P4 Step 1 — Vite dev middleware: `POST /__write-tokens`

Add `themeWriterPlugin()` to `theme-editor/vite.config.ts` via `configureServer`. Contract:

**Request body:**
```json
{
  "colors":     { "light": { "accent": "#C27A1B", … }, "dark": { "accent": "#845510", … } },
  "spacing":    { "md": "16px", … },
  "rounded":    { "lg": "10px", … },
  "typography": { "heading-lg": { "fontFamily": "Inter", "fontSize": "24px", "fontWeight": "600", "lineHeight": "1.3", "letterSpacing": "0em" }, … }
}
```

**Behavior (atomic, all-or-nothing):**
1. **Validate hard.** Reject if: any color key ∉ `ALL_COLOR_TOKENS`; any color value fails
   `/^#[0-9A-Fa-f]{6}$/`; any spacing/radius value isn't a valid dimension; any typography role ∉
   the role allowlist. This endpoint writes files and runs a script — be strict.
2. **Snapshot** `DESIGN.md` and `DESIGN.dark.md` (in-memory copies).
3. **Patch per token, line-targeted** (preserves comments/order/formatting):
   - Colors → both files (`light` block → `DESIGN.md`, `dark` block → `DESIGN.dark.md`). Replace
     `^(\s*<name>:\s*')#[0-9A-Fa-f]{6}(')$` with the **uppercased** new hex.
   - Spacing / radius / typography → `DESIGN.md` only (theme-agnostic). Patch the matching YAML
     lines under `spacing:` / `rounded:` / `typography:`.
4. **Regenerate** by running `./build-tokens.sh` (lint → export → generate-css-vars). Running lint
   here is deliberate — a lint failure should trigger the rollback in step 5. Capture stdout/stderr.
5. On **any failure** (validation, patch, lint, or generate) → **roll back both files** from the
   snapshot and return `{ ok: false, error }`. Never leave a half-saved pair.
6. On **success** → return `{ ok: true }`. Because the app imports `tokens.css`, Vite HMR reloads
   it; the client then **clears all overrides** (they now equal the regenerated defaults) and resets
   the "edited" badges to zero.

**Security:** this endpoint writes source files and runs a script. It is a **localhost dev
authoring tool only** — never wire it into any build/preview/production path. Document this in the
plugin file header.

## P4 Step 2 — Save UX

Single **Save** button (disabled when nothing edited in any category/theme). Shows a "Saving…"
state during regenerate (it can take 1–3s with lint). On failure, surface the error verbatim
(especially lint failures) in a Callout/Toast. Toolbar badge shows the edit split, e.g.
`● 3 light · 1 dark · 2 spacing`.

## P4 acceptance criteria

| # | Criterion | Verify |
|---|---|---|
| 1 | Save patches DESIGN.md + DESIGN.dark.md correctly | git diff after save |
| 2 | Save regenerates tokens.css; HMR reflects new defaults; overrides clear | Manual |
| 3 | Atomic rollback on a forced failure (e.g. inject a lint error) | Manual; both files restored |
| 4 | Validation rejects bad keys/values | curl with bad payload |
| 5 | Files retain comments/order/formatting | git diff is minimal/clean |

---

# Phase P5 — Portability: theme.json presets + export-bundle

**Goal:** make the customization transferable and the system droppable into new projects.

## P5 Step 1 — `theme.json` export/import

- **Export** writes a single `theme.json` capturing every token value: `colors.{light,dark}`,
  `spacing`, `rounded`, `typography` (full per-role props). Include a `name`/`version` header.
- **Import** loads a `theme.json` and either (a) applies it as live overrides, or (b) writes it
  through the same `/__write-tokens` path to seed the project's `DESIGN.md`. Offer both; default to
  preview-only, with a "Save to system" confirm.

## P5 Step 2 — `scripts/export-bundle.mjs` (node CLI)

`node scripts/export-bundle.mjs <targetDir>` copies a curated, self-contained bundle into a new
project:

- `DESIGN.md`, `DESIGN.dark.md`
- `src/components/`, `src/tokens.css`, `src/index.css`
- `tailwind.config.js`, `postcss.config.js`
- `scripts/generate-css-vars.js` (the extended generator) + `build-tokens.sh`
- `theme-editor/` (the editor itself)
- `tokens-meta.ts`
- a minimal `package.json` fragment to merge into the target — scripts (`build-tokens`,
  `theme-editor`, `generate-css-vars`) **plus** the needed devDependencies, including
  `@google/design.md`, `tailwindcss`, `vite`, `@vitejs/plugin-react`. (Or print the list to add.)

Cross-platform (no shell-isms). Add npm script: `"export-bundle": "node scripts/export-bundle.mjs"`.

## P5 acceptance criteria

| # | Criterion |
|---|---|
| 1 | Export produces a valid `theme.json` with all categories + both color themes |
| 2 | Import round-trips: export → edit a value → import → values match |
| 3 | `export-bundle <dir>` produces a folder where `npm run theme-editor` works after install |
| 4 | Bundle regenerates via `npm run build-tokens` using the **locally-installed** `@google/design.md` (no **global** install needed) |

---

## What Phase 10 deliberately does NOT do

- **No new shipped DS primitives** (e.g. Slider) unless explicitly requested — native elements
  styled with tokens cover the editor's needs.
- **No custom web-font loading** in v1 — typography families are stacks; preview uses local fonts.
- **No side-by-side light/dark** preview — toggle one theme at a time (full-dogfood on root makes
  side-by-side infeasible anyway).
- **No prod/remote write endpoint** — the write-back middleware is localhost dev-only.
- **No editing of `dist/tokens/*` or `src/tokens.css` by hand** — always regenerate from DESIGN.md.
- **No Tailwind v4 migration** — stays v3; the var approach is forward-compatible.
- **No theme-varying spacing/radius/typography** — those remain theme-agnostic (`:root` only).

---

## Global verification (run before declaring Phase 10 done)

1. **Re-theme test, all categories:** change one token of each category in `DESIGN.md` → regenerate
   → Storybook reflects it with **no component edits**. Dark color change via `DESIGN.dark.md` too.
2. **Editor live:** `npm run theme-editor` → edit each category → preview + chrome update live.
3. **Safety lifeline:** drive the theme into an unreadable state → lifeline still recovers it.
4. **Save round-trip:** Save → `DESIGN.md`/`DESIGN.dark.md` patched, tokens regenerated, overrides
   cleared, HMR shows new defaults.
5. **Atomic rollback:** force a failure → both spec files restored from snapshot.
6. **Preset round-trip:** export `theme.json` → import → identical values.
7. **Bundle:** `export-bundle` into a temp dir → `npm install` → editor runs and regenerates via
   `npm run build-tokens` (local `@google/design.md`, no global install).
8. **Discipline grep clean** (`src/components/`).
9. **`npx tsc --noEmit`** clean.
10. **Contrast:** light + dark contrast checks pass for the shipped defaults.

---

## One-line summary

Phase 10 turns Terra DS into a self-contained, copyable bundle with its own dogfooded Theme Editor:
P1 makes all four token categories CSS-var-driven so they re-theme live; P2–P3 build the split-pane
editor (chrome from DS components, live sampler, contrast badges) covering colors, radius, spacing,
and typography; P4 adds atomic write-back to `DESIGN.md`/`DESIGN.dark.md` with snapshot/rollback and
regeneration; P5 adds `theme.json` presets and a node `export-bundle` CLI so a customized system
drops into any new project.
