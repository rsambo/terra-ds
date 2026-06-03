# Terra DS — Phase 6 PRD
## Identity, feedback, and data components

---

## Overview

Phase 5 built the structural shell — the layouts that app screens are assembled from. Phase 6 fills in the remaining interior patterns: user identity, system feedback, loading states, empty states, and tabular data.

These five components are what you reach for constantly once you have a working shell. Every AI chat app needs Avatar and Toast. Every productivity tool needs DataTable and EmptyState. Every async interface needs Skeleton. Together they cover the experience gap between a shell that exists and an app that feels complete.

**Target app types (same as prior phases):** AI chat/assistant UI, reading/writing tools, general productivity.

**Phase 7 scope (not here):** Animation and motion polish, dark mode / alternate theme, npm packaging and consuming-project integration guide. Phase 6 closes the component gap; Phase 7 hardens and ships.

---

## The non-negotiable rule (unchanged)

**Components reference Terra token names, never raw values.**

```bash
grep -rE "#[0-9a-fA-F]{3,6}|bg-white|bg-black|bg-\[" src/components/ && echo "VIOLATION" || echo "clean"
```

Add any missing token to `DESIGN.md` first, run `./build-tokens.sh`, then implement. Never hardcode downstream.

---

## DESIGN.md updates required before building

Add these entries to the `components:` section of `DESIGN.md`, then run `./build-tokens.sh` and confirm lint is clean before touching any component.

```yaml
  avatar:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
  avatar-muted:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
  toast:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.sm} {spacing.md}'
  toast-success:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.lg}'
    padding: '{spacing.sm} {spacing.md}'
  toast-error:
    backgroundColor: '{colors.error}'
    textColor: '{colors.on-error}'
    rounded: '{rounded.lg}'
    padding: '{spacing.sm} {spacing.md}'
  skeleton:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.xs}'
  empty-state:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.lg}'
    padding: '{spacing.2xl}'
  table-header:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
  table-row:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
  table-row-hover:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
  table-row-selected:
    backgroundColor: '{colors.accent-container}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
```

After adding, run `./build-tokens.sh` and confirm `errors: 0, warnings: 0`.

---

## Component scope

Five components. Build in this order — Avatar is used by DataTable and optionally by Toast, so it comes first.

---

### 1. Avatar

A circular identity marker for a user or agent. Displays either an image or initials as a fallback. Used in chat headers, nav bars, table rows, and anywhere a person or agent needs a visual anchor.

**Sizes:** `sm` (24px), `md` (32px), `lg` (40px), `xl` (56px). Size is the only dimension that varies; token and shape are constant.

**Props:**
```ts
interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  muted?: boolean;
  className?: string;
}
```

**Implementation notes:**
- Shape: always `rounded-full`. Size maps to fixed dimensions: `sm` → `w-6 h-6`, `md` → `w-8 h-8`, `lg` → `w-10 h-10`, `xl` → `w-14 h-14`.
- Image state (`src` provided): render an `<img>` with `object-cover w-full h-full rounded-full`. If the image fails to load (`onError`), fall through to initials.
- Initials state: `bg-secondary text-on-secondary` (or `bg-neutral text-on-surface-muted` when `muted={true}`). Font size scales with the avatar size: `sm` → `font-label-sm`, `md`/`lg` → `font-label-lg`, `xl` → `font-heading-sm`. Never use raw font-size values — use the token-named font utilities.
- Initials extraction: if `initials` is not provided but `alt` is, derive initials from `alt` by taking the first character of each word, up to two characters (e.g. "Robin Sambo" → "RS").
- `aria-label`: set to `alt` when image is shown; set to the initials string when in fallback mode.
- No border by default. The shape and color distinction are sufficient.

**AvatarGroup (bonus sub-component):** A horizontal stack of overlapping Avatars for showing multiple users. Render up to `max` avatars (default 3), then show a `+N` overflow avatar using the `muted` style. Overlap using negative margin: `-ml-2` on each avatar after the first. Stack order: first avatar on top (highest z-index).

```ts
interface AvatarGroupProps {
  avatars: Pick<AvatarProps, 'src' | 'alt' | 'initials'>[];
  max?: number;
  size?: AvatarProps['size'];
}
```

---

### 2. Toast

A short-lived feedback notification that appears after a user action. Floats at the bottom of the viewport, stacks if multiple are queued, and auto-dismisses after a timeout. Use **Radix Toast** for behavior — it handles the portal, ARIA live region (`role="status"`), swipe-to-dismiss, and the animation lifecycle.

**Variants:** `default` (neutral, uses `surface-overlay`), `success` (uses `primary` — the warm dark brown reads as confident/positive in this palette), `error` (uses `error`).

**Props:**
```ts
interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: 'default' | 'success' | 'error';
  title: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}
```

**Implementation notes:**
- Use Radix Toast `Provider`, `Root`, `Title`, `Description`, `Action`, and `Close` sub-components. Wrap them into a single `Toast` component.
- The `Provider` must wrap the entire app (or at minimum the Storybook decorator). In Storybook, add it to the story's decorator, not inside the component itself.
- Viewport: render `Radix Toast.Viewport` as a fixed element at `bottom-md right-md` with `flex flex-col gap-sm`. This is the anchor point for all toasts.
- Toast panel: `bg-surface-overlay text-on-surface rounded-lg px-md py-sm shadow-overlay flex items-start gap-md` for `default`. `bg-primary text-on-primary` for `success`. `bg-error text-on-error` for `error`.
- Title: `font-label-lg`. Description (if provided): `font-body-sm opacity-80` below the title.
- Action button (if provided): a ghost-style button on the right. On `default` variant use standard ghost classes. On `success`/`error` variants, the action label should be `text-on-primary` or `text-on-error` with an underline rather than a full button — it reads better against the strong background.
- Close button: an `×` icon, always present, in the top-right corner of the panel. `text-on-surface-muted` on `default`, inherits panel text color on `success`/`error`.
- `duration` defaults to 4000ms. Pass 0 for a persistent toast (requires manual dismissal).
- Export a `useToast` hook that manages an array of toast state objects, exposing `toast(options)` to add one and auto-removing after duration. This lets consuming code call `toast({ title: 'Saved' })` without managing open/close state manually.

```ts
// useToast hook signature
function useToast(): {
  toasts: ToastProps[];
  toast: (options: Omit<ToastProps, 'open' | 'onOpenChange'>) => void;
}
```

**Package addition:**
```bash
npm install @radix-ui/react-toast
```

---

### 3. Skeleton

A placeholder shape shown while content is loading. Pure visual — no behavior, no Radix dependency. Renders a warm neutral block with a CSS shimmer animation to indicate activity.

**Props:**
```ts
interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}
```

**Implementation notes:**
- Base: `bg-neutral animate-pulse` — Tailwind's built-in `animate-pulse` (opacity fade) is sufficient. Do not implement a custom shimmer gradient; `animate-pulse` is warm-neutral and reads correctly against Terra surfaces.
- `rounded` defaults to `md` (`rounded-md`). Pass `full` for circular skeletons (avatar placeholders), `none` for full-width text-line placeholders.
- `width` and `height` are passed as inline styles when provided, since arbitrary dimensions can't be covered by token-named utilities. This is the one acceptable use of inline styles in Terra DS — Skeleton dimensions are intentionally arbitrary because they mirror the content they replace.
- No aria role needed — screen readers should skip skeletons. Add `aria-hidden="true"`.

**SkeletonText (sub-component):** A convenience wrapper that renders a stack of Skeleton lines mimicking a paragraph. Useful for content loading states.

```ts
interface SkeletonTextProps {
  lines?: number;        // default 3
  lastLineWidth?: string; // default '60%' — shorter last line looks natural
}
```

Render `lines` Skeleton components stacked with `gap-sm`, each `h-4` (one line of body text height). Last line uses `lastLineWidth`.

---

### 4. EmptyState

A structured zero-state pattern for when a list, table, or content area has no items. Provides a consistent, warm treatment for the "nothing here yet" moment — which in productivity and AI apps happens constantly (empty inbox, no documents, no search results).

**Props:**
```ts
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}
```

**Implementation notes:**
- Container: `bg-surface rounded-lg p-2xl flex flex-col items-center text-center` — centered, generous padding, sits on the standard UI surface.
- Icon slot: render in a `w-12 h-12` container with `text-on-surface-muted mb-md`. The icon itself is passed by the consumer — EmptyState has no opinion about what icon is used.
- Title: `font-heading-sm text-on-surface mb-xs`. Keep it short — one sentence.
- Description: `font-body-md text-on-surface-muted max-w-xs mb-lg`. The `max-w-xs` constraint keeps the description from sprawling across wide containers.
- Action slot: render below description, unstyled. Pass a Button (typically `variant="primary"` or `variant="ghost"`). EmptyState has no opinion about what action is offered.
- All four slots are optional. A title-only EmptyState is valid. An icon + title + action (no description) is the most common real-world pattern.

---

### 5. DataTable

A tabular data component with column headers, body rows, optional row selection, and optional sort indicators. The most structurally complex component in Phase 6 — implement it last.

**Sub-components:** `DataTable`, `DataTableHeader`, `DataTableRow`, `DataTableCell`.

**Props:**
```ts
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  rows: T[];
  selectable?: boolean;
  selectedIds?: (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;
  sortKey?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: keyof T) => void;
  emptyState?: React.ReactNode;
  className?: string;
}
```

**Implementation notes:**

**Structure:** Render as a `<table>` with `w-full border-collapse`. Wrap in a `<div className="overflow-x-auto rounded-lg border border-border-subtle">` so wide tables scroll horizontally without breaking the page layout.

**Header row:** `bg-surface` (the table-header token). Each `<th>`: `font-label-lg text-on-surface-muted px-md py-sm text-left`. When `sortable`, the header cell is a button — add `cursor-pointer hover:text-on-surface transition-colors`. Show a sort indicator (↑ or ↓ in `text-accent`) next to the active sort column; show a neutral `↕` indicator on hoverable unsorted columns.

**Body rows:** Alternate between no background and no background — do not zebra-stripe with a different color. Terra's surfaces are close enough in value that zebra striping would be visually heavy. Instead, separate rows with a subtle `border-b border-border-subtle`. Default row: `bg-surface-raised text-on-surface`. Hover: `bg-surface-overlay`. Selected: `bg-accent-container text-on-surface`.

**Selection:** When `selectable={true}`, render a Checkbox (from Phase 4) in the first column of each row and in the header (select-all). The header checkbox is indeterminate when some rows are selected, checked when all are selected. Wire through `selectedIds` and `onSelectionChange` — DataTable is fully controlled for selection state.

**Cell rendering:** By default, render cell values as `font-body-md text-on-surface`. The `render` function on a Column allows custom cell content — the consumer can pass an Avatar, Badge, Button, or any other component. DataTable has no opinion about cell content beyond the base text style.

**Empty state:** When `rows` is empty, render the `emptyState` prop centered in a `<tr>` spanning all columns. If no `emptyState` is provided, use a minimal default: `font-body-md text-on-surface-muted py-2xl text-center`. For real apps, pass an `<EmptyState>` component.

**Accessibility:** Use `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th scope="col">`, `<td>` — proper semantic HTML throughout. Sort buttons inside `<th>` need `aria-sort="ascending"` / `aria-sort="descending"` on the active column.

**No package addition needed** — DataTable is pure React + Tailwind + Phase 4's Checkbox.

---

## Package additions

Only one new Radix package is needed:

```bash
npm install @radix-ui/react-toast
```

All other components are pure React + Tailwind + existing Phase 3/4 components.

---

## Storybook

**Avatar:** All four sizes × image state + initials state + muted state. A second story showing AvatarGroup with 5 avatars and `max={3}` (should show 3 + "+2" overflow).

**Toast:** Three stories — one per variant (default, success, error). Each story has a Button that triggers the toast. Include the `useToast` hook wiring. A fourth story showing multiple toasts stacked. Add a `ToastProvider` decorator to the story file.

**Skeleton:** A story showing individual Skeleton blocks (text-line, circle, card-shaped), and a composite story showing a "loading card" — a Card with a SkeletonText + two Skeleton blocks mimicking an image and a button.

**EmptyState:** Three stories — icon + title + action (most common), title + description only, and one showing EmptyState inside a DataTable (via the `emptyState` prop).

**DataTable:** Three stories:
1. Basic — 4–5 columns, 6–8 rows, no selection, one sortable column.
2. Selectable — same data with selection enabled. Show some rows pre-selected.
3. Empty — zero rows, with an EmptyState passed as the `emptyState` prop.

Use realistic data in all DataTable stories (not "foo", "bar", "baz") — this is a visual verification surface and placeholder data makes it hard to assess register and contrast.

---

## Verification

Phase 6 is correct when:

1. **DESIGN.md updated and lint-clean.** `npx @google/design.md lint DESIGN.md` → `errors: 0, warnings: 0`.
2. **Tokens regenerated.** `./build-tokens.sh` runs clean.
3. **Token discipline holds.** Grep returns "clean" across all `src/components/`.
4. **All 5 components** exist with typed props and are exported from `index.ts`. AvatarGroup, SkeletonText, and useToast are also exported.
5. **Radix Toast** used for Toast; all other components are pure React.
6. **DataTable** uses semantic table HTML with correct ARIA on sort headers.
7. **useToast hook** works — calling `toast({ title: 'x' })` renders a Toast that auto-dismisses.
8. **TypeScript compiles clean.** `npx tsc --noEmit` → no errors.
9. **Re-theme test still passes.** Change a token, rebuild, restart Storybook — all components reflect the change.

---

## What Phase 6 deliberately does NOT do

- **No animation polish** — `animate-pulse` on Skeleton is sufficient. Custom enter/exit transitions for Toast (beyond Radix defaults) and other motion work are Phase 7.
- **No DataTable pagination or virtual scrolling** — for large datasets, the consuming app handles pagination. DataTable renders all rows it receives.
- **No DataTable column resizing or reordering** — out of scope. Fixed-width columns only.
- **No dark mode** — single theme, same as all prior phases.
- **No npm packaging** — Phase 7.

---

## Acceptance criteria

| # | Criterion | How to verify |
|---|---|---|
| 1 | DESIGN.md updated with new tokens and lint-clean | `npx @google/design.md lint DESIGN.md` → `errors: 0` |
| 2 | Tokens regenerated | `./build-tokens.sh` runs clean |
| 3 | Zero raw values | Grep check returns "clean" |
| 4 | All 5 components + sub-components built and exported | Check `src/components/index.ts` |
| 5 | Avatar image fallback to initials works | Check `onError` handler + Storybook |
| 6 | AvatarGroup shows overflow correctly | Storybook with `max={3}` and 5 avatars |
| 7 | useToast hook auto-dismisses after duration | Trigger toast in Storybook, watch it disappear |
| 8 | DataTable selection wires correctly | Select rows in Storybook, observe selectedIds |
| 9 | DataTable sort indicators render on active column | Click sortable header in Storybook |
| 10 | DataTable empty state renders EmptyState component | Check empty story |
| 11 | TypeScript compiles clean | `npx tsc --noEmit` → no errors |
| 12 | Re-theme test still passes | Change token → rebuild → confirm propagation |

---

## The one-line summary

Phase 6 adds Avatar, Toast, Skeleton, EmptyState, and DataTable — the identity, feedback, loading, and data patterns that turn a functional shell into an app that feels finished.
