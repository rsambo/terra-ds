# Terra DS — Phase 8 PRD
## Accessibility

---

## Overview

Phases 3–7 built and packaged a complete component library. Radix UI handles the most complex accessibility behaviors — focus trapping, keyboard navigation, ARIA roles — for all the interactive primitives it backs. But several gaps remain: missing semantic landmarks, no CommandMenu keyboard navigation, no DataTable keyboard selection, animations that ignore OS motion preferences, and a focus-visible pass that has never been done.

Phase 8 closes those gaps systematically. This is not a polish pass — it is correctness work. An app built with Terra DS should be navigable by keyboard alone, usable with a screen reader, and respectful of user OS settings.

**Phase 9 scope (not here):** Dark mode / alternate theme.

---

## The non-negotiable rule (unchanged)

**Components reference Terra token names, never raw values.**

```bash
grep -rE "#[0-9a-fA-F]{3,6}|bg-white|bg-black|bg-\[" src/components/ && echo "VIOLATION" || echo "clean"
```

No DESIGN.md changes are needed for this phase. All accessibility fixes are structural HTML, ARIA attributes, and CSS utilities.

---

## What Radix already handles (do not re-implement)

These behaviors are provided by Radix and must not be re-implemented or overridden:
- Dialog: focus trap, escape-to-close, `role="dialog"`, `aria-modal`
- Tabs: `role="tablist"` / `role="tab"` / `role="tabpanel"`, arrow key navigation
- Select: `role="listbox"` / `role="option"`, keyboard navigation, `aria-expanded`
- DropdownMenu: `role="menu"` / `role="menuitem"`, keyboard navigation, `aria-expanded`
- Toggle (Switch): `role="switch"`, `aria-checked`, space-to-toggle
- Checkbox: `role="checkbox"`, `aria-checked` including indeterminate, space-to-toggle
- Tooltip: `role="tooltip"`, delayed show/hide, escape-to-dismiss
- Toast: `role="status"` live region

If a consuming project overrides any of these via `asChild` or by replacing the Radix root, the ARIA contract breaks. Note this in INTEGRATION.md.

---

## Fix 1 — Semantic landmarks

Landmark elements (`<header>`, `<nav>`, `<main>`) are the primary navigation mechanism for screen reader users. Terra DS's structural components currently use `<div>` for everything.

### Header

Change the outer element from `<div>` to `<header>`:

```tsx
// before
<div className="...">...</div>

// after
<header className="...">...</header>
```

No other changes needed — `<header>` is implicitly `role="banner"` when it's a top-level landmark.

### Sidebar

Two changes:
1. Change the outer element from `<aside>` to `<nav>` with `aria-label="Main navigation"`. (`<aside>` is appropriate for supplementary content; a primary navigation sidebar is `<nav>`.)
2. Add `aria-label` as a prop so consuming apps can override the label for multi-nav layouts:

```tsx
interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  collapsed?: boolean;
  navLabel?: string; // default: "Main navigation"
}
```

```tsx
<nav aria-label={navLabel ?? 'Main navigation'} className="...">
```

### AppShell

Change the main content `<div>` to `<main>`:

```tsx
// before
<div className="flex-1 overflow-y-auto">{children}</div>

// after
<main className="flex-1 overflow-y-auto">{children}</main>
```

`<main>` is implicitly `role="main"` and must appear only once per page. AppShell enforces this by design — only one main content area.

### SidebarSection collapsible buttons

Add `aria-expanded` to the collapsible toggle button:

```tsx
<button
  onClick={() => collapsible && setOpen(!open)}
  aria-expanded={collapsible ? open : undefined}
  className="..."
>
```

Only set `aria-expanded` when `collapsible` is true — a non-collapsible section label is not interactive and should not carry the attribute.

---

## Fix 2 — CommandMenu keyboard navigation

The CommandMenu results list currently has no keyboard navigation — items respond to mouse click and Enter when focused, but there is no arrow-key mechanism to move focus between items. This is the largest accessibility gap in the library.

### Implementation

Add a `focusedIndex` state to `CommandMenu`. Intercept `ArrowDown`, `ArrowUp`, and `Enter` on the panel's `onKeyDown`:

```tsx
const [focusedIndex, setFocusedIndex] = useState(-1);
const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
```

- `ArrowDown`: increment `focusedIndex` (wrap to 0 at end), call `itemRefs.current[index]?.focus()`.
- `ArrowUp`: decrement `focusedIndex` (wrap to last at start), call focus.
- `Enter`: if `focusedIndex >= 0`, call the focused item's `onSelect` and close the menu.
- Reset `focusedIndex` to `-1` whenever the menu opens or closes.

Each `CommandMenuItem` needs a `ref` prop and a visual focused state. The focused item renders `bg-surface-raised` — the same class already used for hover. Apply it when the item has DOM focus via the `:focus` pseudo-class and `focus:bg-surface-raised`, so the visual state works whether focus arrives by keyboard or mouse.

Update `CommandMenuItem` to accept and forward a `ref`:

```tsx
export const CommandMenuItem = React.forwardRef<HTMLDivElement, CommandMenuItemProps>(
  ({ onSelect, icon, shortcut, children }, ref) => (
    <div
      ref={ref}
      role="option"
      tabIndex={-1}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(); }}
      className="... hover:bg-surface-raised focus:bg-surface-raised focus:outline-none"
    >
      ...
    </div>
  )
);
```

Add `role="listbox"` to the results container and `aria-label="Commands"` so screen readers announce the list correctly.

Add an `aria-live="polite"` region outside the list that announces the result count when items change:

```tsx
<div aria-live="polite" className="sr-only">
  {React.Children.count(children) === 0
    ? 'No results'
    : `${itemCount} commands available`}
</div>
```

Computing `itemCount` requires counting `CommandMenuItem` descendants across nested `CommandMenuSection` components. Use `React.Children` recursion or a context-based count approach — whichever is cleaner.

---

## Fix 3 — DataTable keyboard row selection

The DataTable's Checkbox column handles mouse-based row selection, but there's no way to select rows using the keyboard alone when navigating the table with Tab and arrow keys.

### Implementation

Make `DataTableRow` focusable when `selectable` is true by adding `tabIndex={0}` to the `<tr>` element. Add `onKeyDown` that calls `handleSelectRow` when Space is pressed:

```tsx
<DataTableRow
  key={row.id}
  tabIndex={selectable ? 0 : undefined}
  onKeyDown={selectable ? (e) => {
    if (e.key === ' ') {
      e.preventDefault(); // prevent page scroll
      handleSelectRow(row.id);
    }
  } : undefined}
  aria-selected={selectable ? isSelected : undefined}
  className="..."
>
```

Add `role="row"` to `DataTableRow` and `role="rowgroup"` to `<tbody>` and `<thead>` — these are required by the ARIA grid/table pattern when rows carry `aria-selected`.

Add `role="grid"` to the `<table>` element when `selectable` is true (plain `role="table"` otherwise — `role="grid"` signals interactive row selection to screen readers).

The select-all Checkbox in the header already handles `indeterminate` — no changes needed there.

---

## Fix 4 — Skip-to-content link

A skip link lets keyboard users jump past the Sidebar to the main content without tabbing through every nav item on every page. It must be the first focusable element on the page.

Add `SkipLink` as a new exported component:

```tsx
interface SkipLinkProps {
  href?: string; // default: "#main-content"
  children?: React.ReactNode; // default: "Skip to main content"
}
```

**Implementation:**

```tsx
export const SkipLink: React.FC<SkipLinkProps> = ({
  href = '#main-content',
  children = 'Skip to main content',
}) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:fixed focus:top-sm focus:left-sm focus:z-50 focus:bg-primary focus:text-on-primary focus:rounded-md focus:px-md focus:py-sm focus:font-label-lg focus:shadow-overlay"
  >
    {children}
  </a>
);
```

The `sr-only` class hides the link visually until it receives focus, at which point `focus:not-sr-only` makes it visible. It then appears as a warm dark pill in the top-left corner.

Update `AppShell` to add `id="main-content"` to the `<main>` element so the skip link has a target:

```tsx
<main id="main-content" className="flex-1 overflow-y-auto">
  {children}
</main>
```

Document in INTEGRATION.md that `SkipLink` should be placed as the first child of the app root, before `AppShell`.

---

## Fix 5 — prefers-reduced-motion

Users who have enabled "Reduce Motion" in their OS settings should not experience the Phase 7 animations. Tailwind provides the `motion-reduce:` variant for this.

### tailwind.config.js

No changes needed — `motion-reduce:` is a built-in Tailwind variant.

### Component updates

For each animated component, wrap the animation classes in `motion-reduce:` negation. The pattern is: keep `transition-colors` (subtle, non-motion) but suppress `animate-in`/`animate-out` and `transition-[width]`.

**Dialog, CommandMenu, Select, DropdownMenu** — add `motion-reduce:animate-none` to the content panel alongside the existing animate-in/out classes. Radix's data-state classes still apply; the animation just doesn't play:

```
data-[state=open]:animate-in data-[state=open]:fade-in-0 
motion-reduce:data-[state=open]:animate-none
data-[state=closed]:animate-out data-[state=closed]:fade-out-0
motion-reduce:data-[state=closed]:animate-none
```

**Toast** — same pattern, add `motion-reduce:animate-none` to suppress slide-in/slide-out.

**Tooltip** — same.

**Sidebar** — replace `transition-[width] duration-200 ease-in-out` with `motion-reduce:transition-none transition-[width] duration-200 ease-in-out`. In reduced-motion mode, the sidebar snaps instead of animating.

**All `transition-colors`** — these are fine to keep even in reduced-motion mode. A color change is not motion in the vestibular sense. Only translate/scale/slide/fade animations need suppression.

---

## Fix 6 — focus-visible audit

`focus-visible` (keyboard-only focus rings, suppressed for mouse clicks) is already used on most components. This fix audits every interactive component and ensures consistency.

### Standard focus pattern

Every focusable Terra component should use:
```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring
```

Not `focus:outline-none focus:ring-2` (which shows rings on mouse click too).

### Audit checklist

Review each component and update any `focus:ring-*` to `focus-visible:ring-*`:

- **Button** — update `focus:ring-2 focus:ring-focus-ring` → `focus-visible:ring-2 focus-visible:ring-focus-ring`
- **Input** — same
- **Textarea** — same
- **NavItem** — same
- **SidebarItem** — same
- **Card (interactive)** — same
- **DataTableRow (when selectable)** — add `focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none`
- **SkipLink** — already uses `focus:` (intentional — the skip link should show on any focus, including mouse, since it's a utility element)
- **Toggle, Checkbox** — these use Radix which handles `focus-visible` internally via `focus-visible:ring-*` — verify they're using `focus-visible:` not `focus:`
- **Tab** — verify
- **CommandMenuItem** — use `focus:bg-surface-raised focus:outline-none` (not `focus-visible:` — keyboard and mouse focus should both highlight the active item in a command menu)

---

## Contrast re-verification

Run `check_contrast.py` against the current DESIGN.md color values to confirm all component pairs still pass WCAG AA (4.5:1). This script already exists at the repo root.

```bash
python3 check_contrast.py
```

If any pair fails, the fix is to the DESIGN.md token value — not to the component. Follow the established process: edit DESIGN.md, run `./build-tokens.sh`, verify lint passes.

Do not run this as part of the automated check — run it manually and include the output in your response.

---

## New component: SkipLink

Export `SkipLink` from `src/components/index.ts`. It needs a story:

**SkipLink story:** The link is invisible by default, so demonstrate it by rendering it unfocused (showing the `sr-only` state as a visual note) and focused (showing the pill). Use a `<div tabIndex={0}>` before it so testers can tab through the story and see the link appear.

---

## INTEGRATION.md additions

Add a new section "Accessibility setup" after the existing five sections:

```md
## 6. Accessibility setup

### Skip link
Place SkipLink as the first element in your app root, before AppShell:

\`\`\`tsx
import { SkipLink, AppShell } from 'terra-ds';

function App() {
  return (
    <>
      <SkipLink />
      <AppShell ...>...</AppShell>
    </>
  );
}
\`\`\`

### Sidebar nav label
If your app has multiple navigation regions, give each Sidebar a distinct label:

\`\`\`tsx
<Sidebar navLabel="Primary navigation">...</Sidebar>
<Sidebar navLabel="Document outline">...</Sidebar>
\`\`\`

### Radix ARIA contract
Do not replace Radix root components with custom elements via asChild in a 
way that removes the Radix ARIA role. The accessibility contract for Dialog, 
Select, DropdownMenu, Toggle, Checkbox, Tooltip, and Toast depends on Radix's 
root element remaining in the DOM.
```

---

## Verification

Phase 8 is correct when:

1. **Landmarks are correct.** AppShell renders `<header>`, `<nav>`, `<main>`. Inspect DOM in browser dev tools.
2. **SidebarSection `aria-expanded`** is present and toggles on collapse.
3. **CommandMenu arrow keys** move focus between items. Tab in Storybook, open menu, press ArrowDown repeatedly — each item highlights in turn.
4. **CommandMenu `aria-live`** region exists in DOM. Open menu in Storybook, inspect for `aria-live="polite"`.
5. **DataTable Space key** selects the focused row. Tab to a row in the selectable story, press Space.
6. **SkipLink** appears on focus. Tab to the Storybook story, confirm the pill is visible.
7. **prefers-reduced-motion.** In macOS System Settings → Accessibility → Reduce Motion, enable it. Open Storybook. Dialog, CommandMenu, and Toast should open/close without animation. Sidebar collapse should snap.
8. **focus-visible.** Click a Button with a mouse — no ring. Tab to a Button — ring appears.
9. **Contrast check passes.** `python3 check_contrast.py` → zero FAILs.
10. **TypeScript compiles clean.** `npx tsc --noEmit` → no errors.
11. **Token discipline holds.** Grep check returns "clean".
12. **Re-theme test still passes.**

---

## What Phase 8 deliberately does NOT do

- **No automated accessibility testing** (axe-core, jest-axe) — worth adding, but a tooling decision that belongs with the consuming project's test suite, not the design system itself.
- **No screen reader testing script** — screen reader behavior requires manual testing with VoiceOver/NVDA. Document in INTEGRATION.md that consuming teams should do this.
- **No WCAG AAA** — the system targets AA. AAA contrast (7:1) would require darkening text tokens significantly, which conflicts with the warm/readable visual identity.
- **No dark mode** — Phase 9.

---

## Acceptance criteria

| # | Criterion | How to verify |
|---|---|---|
| 1 | Header renders `<header>` landmark | Inspect DOM |
| 2 | Sidebar renders `<nav>` with `aria-label` | Inspect DOM |
| 3 | AppShell renders `<main id="main-content">` | Inspect DOM |
| 4 | SidebarSection collapsible has `aria-expanded` | Inspect DOM, toggle |
| 5 | CommandMenu arrow key navigation works | Tab through in Storybook |
| 6 | CommandMenu `aria-live` region present | Inspect DOM |
| 7 | DataTable Space key selects row | Tab to row, press Space |
| 8 | DataTable `role="grid"` when selectable | Inspect DOM |
| 9 | SkipLink visible on focus, hidden otherwise | Tab in Storybook |
| 10 | SkipLink exported from index.ts | Check index.ts |
| 11 | `motion-reduce:animate-none` on all animated components | Inspect classes |
| 12 | All interactive components use `focus-visible:ring-*` | Audit component files |
| 13 | Contrast check passes | `python3 check_contrast.py` → zero FAILs |
| 14 | TypeScript compiles clean | `npx tsc --noEmit` → no errors |
| 15 | Token discipline holds | Grep check returns "clean" |

---

## The one-line summary

Phase 8 adds semantic landmarks, CommandMenu keyboard navigation, DataTable keyboard selection, a skip link, prefers-reduced-motion support, and a focus-visible audit — making Terra DS navigable by keyboard alone and usable with assistive technology.
