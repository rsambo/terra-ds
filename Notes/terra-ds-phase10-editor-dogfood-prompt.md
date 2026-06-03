# Follow-up task — Use Terra DS components throughout the Theme Editor chrome

You are working in the **Terra DS** repository. Phase 10 (the Theme Editor) is built and working,
but one requirement was only partially met: the editor's **right-pane Sampler** uses real Terra DS
components, while the **editor chrome** (`theme-editor/ThemeEditor.tsx` and
`theme-editor/editors/*.tsx`) is built from raw `<button>` / `<div>` elements styled with token
utility classes. Refactor the chrome so it is **built from Terra DS components throughout** — true
dogfooding — without changing any behavior.

Read `CLAUDE.md` first (especially "Runtime token architecture" and "Theme Editor"). Work
autonomously; keep prose minimal.

## Scope

- **In scope:** `theme-editor/ThemeEditor.tsx`, `theme-editor/editors/ColorEditors.tsx`,
  `SpacingEditors.tsx`, `RadiusEditors.tsx`, `TypographyEditors.tsx`.
- **Leave alone:** `theme-editor/Sampler.tsx` (already correct), `write-tokens.mjs`,
  `vite.config.ts`, `tokens-meta.ts`, anything in `src/`, DESIGN files, and the build pipeline.
  This is purely a UI-substrate refactor — **no behavior, state, or write-back changes**.

## Import components from the barrel

`import { Button, Card, Input, Select, SelectItem, Toggle, Badge, Tooltip, DropdownMenu,
DropdownMenuItem, DropdownMenuSeparator, Callout, TabsRoot, TabList, Tab, TabContent } from
'../src/components';` (the Sampler already imports this way).

## Mapping — replace raw elements with these components (verified APIs)

| Editor UI today | Use this Terra DS component |
|---|---|
| Toolbar actions (Save / Reset all / Copy CSS) | `Button` — `variant="primary"` (Save), `"secondary"` (Reset all), `"ghost"` (Copy). `Button` has no `size` prop; size via `className`. |
| Export / Import menu | `DropdownMenu` (`trigger` prop) + `DropdownMenuItem` / `DropdownMenuSeparator` |
| Category switcher (Colors / Spacing / Radius / Typography) | `TabsRoot` + `TabList` + `Tab` + `TabContent` |
| Editor rows, group containers, the toolbar/panel frames | `Card` |
| Hex fields, numeric spacing/radius/size fields | `Input` (standard input props) |
| Font-family pickers, unit pickers | `Select` (`value`, `onValueChange`, `placeholder`, `disabled`) + `SelectItem` (`value`) |
| Light/dark switch | `Toggle` (`checked`, `onCheckedChange`, `disabled`, `label`) |
| "edited" indicators and WCAG AA pass/warn/fail badges | `Badge` — `variant="default" \| "accent" \| "error"` |
| Per-token descriptions on hover | `Tooltip` (`content`, `children`, `side`) |
| Save status / error messages | `Callout` |

## Two deliberate exceptions — keep these as native elements

1. **Native `<input type="color">`** and the **range slider** — no Terra DS equivalent. Keep them
   native, styled with token classes. (Do **not** scaffold new DS primitives.)
2. **The safety lifeline** (the fixed-position Reset-all / Revert control wired to `⌘/Ctrl+0` and
   `Esc`) **must stay a raw element with fixed, non-token inline styles.** Its whole purpose is to
   remain readable/clickable when a live edit makes the theme unusable — so it must **not** be a
   Terra DS component and must **not** use token classes. Leave it exactly as it is.

## Preserve all behavior (regressions = failure)

- Live editing of all four categories still updates the preview and (full-dogfood) the editor's own
  DS chrome, which now re-themes as you edit — that is the desired outcome.
- localStorage persistence, per-token Reset, Reset all, Copy CSS, Save (`/__write-tokens`) with
  atomic rollback, `theme.json` export/import, and the contrast badges all behave identically.
- Layout spacing/gaps may continue to use token utility classes (`p-md`, `gap-sm`, etc.) — only the
  interactive primitives and containers must become DS components.

## Verification (all must pass)

1. `grep -rnE "<button" theme-editor/ThemeEditor.tsx theme-editor/editors/` returns **only** the
   safety-lifeline button (no other raw buttons).
2. `grep -rnE "<(Button|Card|Tabs?|TabsRoot|Input|Select|Toggle|Badge|Tooltip|DropdownMenu|Callout)" theme-editor/ThemeEditor.tsx theme-editor/editors/`
   shows DS components used across the chrome.
3. `npx tsc --noEmit` is clean.
4. `npm run theme-editor` boots on :5174; manually confirm: all four category tabs work; editing a
   color/spacing/radius/typography value updates the preview live; Save works; the safety lifeline
   still recovers an unreadable theme.
5. The `src/components/` discipline grep still prints `clean` (you didn't touch `src/`).
6. Commit with a clear message, e.g. `Phase 10: dogfood — rebuild editor chrome on Terra DS components`.

Finish with a short report: which raw elements were replaced by which components, anything you kept
native and why, and the verification results.
