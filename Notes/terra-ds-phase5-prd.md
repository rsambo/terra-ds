# Terra DS — Phase 5 PRD
## Structural / compositional layer

---

## Overview

Phases 3 and 4 built the primitive layer: controls, form elements, overlays, and content rendering components. Phase 5 builds the structural layer — the shells, navigation systems, and layout containers that those primitives live inside.

This is the phase where Terra DS becomes capable of producing complete app screens, not just component galleries. Every component in this phase is a composition of Phase 3+4 primitives governed by the same token discipline. None of them introduce new visual concepts — they organize existing ones into the layouts that real apps are built from.

**Target app types (same as Phase 4):** AI chat/assistant UI, reading/writing tools, general productivity.

**Phase 6 scope (not here):** Avatar/presence indicators, skeleton loading states, empty state patterns, notification/toast system, data table. Those extend what lives inside the shell; Phase 5 is the shell itself.

---

## The non-negotiable rule (unchanged)

**Components reference Terra token names, never raw values.**

```bash
grep -rE "#[0-9a-fA-F]{3,6}|bg-white|bg-black|bg-\[" src/components/ && echo "VIOLATION" || echo "clean"
```

If a component needs a value with no existing token, add the token to `DESIGN.md` first, run `./build-tokens.sh`, then implement. Never hardcode downstream.

---

## DESIGN.md updates required before building

Phase 5 introduces five new structural component types. Add these to the `components:` section of `DESIGN.md` before implementing, then run `./build-tokens.sh` and confirm lint is clean.

```yaml
  sidebar:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  sidebar-section-label:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.none}'
    padding: '{spacing.xs} {spacing.md}'
  header:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.lg}'
  breadcrumb-item:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs} {spacing.sm}'
  breadcrumb-item-active:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs} {spacing.sm}'
  command-menu:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.sm}'
  command-menu-item:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  command-menu-item-active:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  command-menu-section-label:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.none}'
    padding: '{spacing.xs} {spacing.md}'
```

After adding these, run `./build-tokens.sh` and confirm `errors: 0, warnings: 0` before building any component.

---

## Component scope

Five components, building from smallest to largest. Implement in this order — later components compose earlier ones.

---

### 1. Breadcrumb

A horizontal path indicator for hierarchical navigation. The simplest structural component in this phase; build it first since Header uses it.

**Props:**
```ts
interface BreadcrumbProps {
  items: { label: string; href?: string; onClick?: () => void }[];
  className?: string;
}
```

**Implementation notes:**
- Render as a `<nav aria-label="breadcrumb">` containing an `<ol>` of items.
- Each non-final item: `font-label-sm text-on-surface-muted hover:text-on-surface transition-colors` — rendered as an `<a>` if `href` is provided, a `<button>` if `onClick` is provided, a `<span>` if neither.
- Final item (active): `font-label-sm text-on-surface` with `aria-current="page"`. Not a link.
- Separator between items: a `/` or `›` character in `text-on-surface-muted mx-xs`. Use a `<span aria-hidden="true">` so screen readers skip it.
- No background on items — breadcrumb sits directly on whatever surface it's placed on. The token defines the surface context, not a box.
- Keep the outer `<nav>` unstyled; the `className` prop lets the parent control placement.

---

### 2. Header

The top app bar. A horizontal strip that holds the app title, optional breadcrumb, and an actions slot on the right. Sits at the top of the viewport in most layouts.

**Props:**
```ts
interface HeaderProps {
  title?: React.ReactNode;
  breadcrumb?: React.ComponentProps<typeof Breadcrumb>['items'];
  actions?: React.ReactNode;
  className?: string;
}
```

**Implementation notes:**
- Outer: `bg-header text-on-surface` — but since `bg-header` maps to `surface-raised`, use `bg-surface-raised` directly (the token name for the header surface is `header`, which resolves to `surface-raised`). Apply `border-b border-border-subtle` to separate from content below.
- Inner layout: `flex items-center justify-between px-lg py-sm` — title/breadcrumb on the left, actions on the right.
- `title` renders as `font-heading-sm text-on-surface`. If `breadcrumb` is also provided, render Breadcrumb instead of the plain title — they are mutually positioned, not stacked.
- `actions` is an unstyled slot. Pass Button components, icon buttons, or any control. The Header does not prescribe what goes there.
- Height: constrained to a single line of content — do not let the header grow with content. Keep it `h-14` (56px, between `spacing.md` and `spacing.lg`) or equivalent.
- No shadow — the bottom border is the only elevation cue. A shadow here would compete with card and dialog shadows.

---

### 3. Sidebar

A vertical navigation panel. Composed of `NavItem` components from Phase 3, organized into labeled sections with optional collapse. This is the most complex component in Phase 5.

**Sub-components:** `Sidebar`, `SidebarSection`, `SidebarItem`.

**Props:**
```ts
interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  collapsed?: boolean;
}

interface SidebarSectionProps {
  label?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  icon?: React.ReactNode;
  indent?: boolean; // for sub-items
  onClick?: () => void;
}
```

**Implementation notes:**

**Sidebar root:** `bg-surface flex flex-col h-full` with a right border `border-r border-border-subtle`. Width: `w-60` (240px) is the standard; when `collapsed` is true, reduce to `w-14` (56px, icon-only mode). The collapsed state is controlled externally — Sidebar does not manage its own open/close; the parent AppShell does.

**SidebarSection:** A labeled group of nav items. The `label` renders as `font-label-sm text-on-surface-muted uppercase tracking-wide px-md py-xs` — this is the section heading. If `collapsible` is true, the label becomes a button with a chevron that toggles the section's content open/closed using local `useState`. Default open. When `collapsed` (Sidebar-level), hide the label entirely.

**SidebarItem:** A single navigation entry. This extends `NavItem` from Phase 3 with two additions:
- `icon` slot: a 16×16 icon rendered to the left of the label in `text-on-surface-muted` (inactive) or `text-on-accent` (active). When the Sidebar is `collapsed`, show only the icon, centered, with a Tooltip (from Phase 4) displaying the label on hover.
- `indent` prop: adds `pl-xl` left padding for sub-items nested under a parent item. Sub-items use the same `NavItem` active/hover states, just indented.

**Nesting:** Support one level of sub-items only. A SidebarItem with children renders a collapsible group — clicking the parent toggles a list of indented child SidebarItems. Parent item never navigates when it has children; it only toggles. Use `useState` for local collapse state.

**Collapsed mode:** When `collapsed={true}` on Sidebar, all SidebarItems show icon only (no label, no section label). The Sidebar root narrows to `w-14`. Each icon-only SidebarItem wraps itself in a Tooltip with the item label. The Sidebar does not animate the width transition in Phase 5 — that is a Phase 6 polish concern.

---

### 4. AppShell

The top-level layout container. Composes Header + Sidebar + main content area into a full-screen shell. This is the outermost wrapper component for any app page.

**Props:**
```ts
interface AppShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  className?: string;
}
```

**Implementation notes:**
- Root: `flex flex-col h-screen bg-surface` — full viewport height, column direction (header on top, body below).
- Header slot: rendered at the top, full width, fixed height.
- Body row: `flex flex-1 overflow-hidden` — sidebar and main content side by side, filling remaining height.
- Sidebar slot: rendered on the left, `flex-shrink-0`. When `sidebarCollapsed` is true, pass it down to the Sidebar child (the consuming app controls collapse state).
- Main content area: `flex-1 overflow-y-auto` — scrollable, fills remaining width. Background is `bg-surface` — the UI chrome register. Content placed inside it (ContentPage, chat surfaces) bring their own register.
- `children` renders inside the main content area.
- AppShell has no opinion about padding inside the main area — the consuming component or ContentPage handles that. AppShell only manages the structural grid.
- `sidebarCollapsed` is passed as a prop; AppShell does not own the toggle. The app-level page component owns that state and passes a toggle control into the `header` actions slot.

**Usage pattern (for Storybook and documentation):**
```tsx
<AppShell
  header={<Header title="My App" actions={<Button variant="ghost">New</Button>} />}
  sidebar={
    <Sidebar>
      <SidebarSection label="Main">
        <SidebarItem active href="#">Dashboard</SidebarItem>
        <SidebarItem href="#">Documents</SidebarItem>
      </SidebarSection>
    </Sidebar>
  }
>
  <ContentPage>Page content goes here.</ContentPage>
</AppShell>
```

---

### 5. CommandMenu

A keyboard-triggered command palette (Cmd+K pattern). An overlay that lets users search and invoke commands, navigate to pages, or perform actions — common in all three target app types. Use **Radix Dialog** for the overlay behavior (focus trap, escape-to-close, scroll lock) with a custom search input, not Radix's Dialog title.

**Props:**
```ts
interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  children: React.ReactNode; // CommandMenuSection and CommandMenuItem children
}

interface CommandMenuSectionProps {
  label?: string;
  children: React.ReactNode;
}

interface CommandMenuItemProps {
  onSelect: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  children: React.ReactNode;
}
```

**Implementation notes:**

**Overlay:** Use Radix Dialog overlay (`fixed inset-0 bg-on-surface/20 backdrop-blur-sm`) and position the panel at the top-center of the viewport (`fixed top-[20vh] left-1/2 -translate-x-1/2`) — not centered vertically like a dialog. Width: `w-full max-w-xl`.

**Panel:** `bg-surface-overlay rounded-lg shadow-overlay overflow-hidden` — the overlay surface with the strong shadow, same as Dialog but with `rounded-lg` instead of `rounded-xl` (command palette feels tighter).

**Search input:** A full-width `<input>` at the top of the panel. Style it directly (do not use the Input component — the CommandMenu input has no border, no background, just `font-body-lg text-on-surface placeholder-on-surface-muted px-lg py-md outline-none border-b border-border-subtle`). This is the one case where a plain styled input is more appropriate than the Input component, because it needs to feel integrated with the panel, not like a standalone control.

**Results list:** A scrollable list below the input, `max-h-80 overflow-y-auto`. Empty state: `font-body-md text-on-surface-muted px-lg py-md` with a "No results" message.

**CommandMenuSection:** An optional label (`font-label-sm text-on-surface-muted uppercase px-md py-xs`) followed by a group of items. No border between sections — vertical spacing (`mt-xs`) is sufficient.

**CommandMenuItem:** `flex items-center gap-sm font-body-md text-on-surface rounded-sm px-md py-sm cursor-pointer`. Active/highlighted: `bg-surface-raised`. Use keyboard navigation via the `onSelect` callback — when Enter is pressed on a highlighted item, call `onSelect` and close the menu. The `shortcut` prop renders a right-aligned label in `font-label-sm text-on-surface-muted`.

**Keyboard wiring:** Radix Dialog handles escape-to-close. Arrow key navigation between items is the one behavior to implement manually — use `onKeyDown` on the list container to intercept Up/Down and update a focused index in local state. This keeps the component self-contained without requiring a separate keyboard library.

**Global trigger:** CommandMenu does not wire the Cmd+K shortcut itself — that belongs in the app. Provide a usage example in the story showing a `useEffect` with a `keydown` listener that toggles `open`.

---

## Package additions

No new Radix packages needed. CommandMenu uses `@radix-ui/react-dialog` (already installed). All other components are pure React + Tailwind.

---

## Storybook

**Breadcrumb:** Three items (first two linked, last one active). A second story with a single item (edge case — just the active item, no separator).

**Header:** Four stories — title only, breadcrumb only, actions only, and all three together.

**Sidebar:** A full sidebar with two sections, one collapsible, one SidebarItem with nested sub-items, and one active item. A second story with `collapsed={true}` to show icon-only mode.

**AppShell:** The flagship story. A full-screen composition: Header (with title + action button), Sidebar (two sections, active item), and a main content area with a ContentPage inside. This is the closest thing Terra DS has to a "real app screenshot" — it is the primary visual proof that the system works at the layout level.

**CommandMenu:** Two stories — one showing results (three sections, several items, one with a keyboard shortcut), one showing the empty state. Include the Cmd+K trigger wiring in a wrapper so the story is interactive.

---

## Verification

Phase 5 is correct when:

1. **DESIGN.md updated and lint-clean.** New structural component tokens added. `npx @google/design.md lint DESIGN.md` → `errors: 0, warnings: 0`.
2. **Tokens regenerated.** `./build-tokens.sh` runs clean.
3. **Token discipline holds.** Grep returns "clean" across all `src/components/`.
4. **All 5 components** exist with typed props, exported from `index.ts`.
5. **AppShell story** renders a complete, plausible app layout — Header + Sidebar + ContentPage visible and correctly surfaced.
6. **Sidebar collapsed mode** shows icons only with Tooltip labels, no text visible.
7. **CommandMenu** opens, accepts keyboard input, supports arrow-key navigation, and closes on Escape.
8. **TypeScript compiles clean.** `npx tsc --noEmit` → no errors.
9. **Re-theme test still passes.** Change a token, rebuild, restart Storybook — all components (old and new) reflect the change.

---

## What Phase 5 deliberately does NOT do

- **No sidebar animation** — width transition on collapse is a polish concern deferred to Phase 6.
- **No Avatar component** — used in many nav headers, but belongs in Phase 6 with other presence/identity patterns.
- **No responsive breakpoints** — AppShell is a fixed-layout shell. Mobile/responsive behavior is deferred; the token-name discipline means it will be cheap to add.
- **No data table, skeleton, or toast** — Phase 6. Those live inside the shell, not as structural components.
- **No Cmd+K global wiring** — the shortcut belongs in the consuming app. CommandMenu only manages its own open/closed state via props.

---

## Acceptance criteria

| # | Criterion | How to verify |
|---|---|---|
| 1 | DESIGN.md updated with new structural tokens and lint-clean | `npx @google/design.md lint DESIGN.md` → `errors: 0` |
| 2 | Tokens regenerated after DESIGN.md change | `./build-tokens.sh` runs clean |
| 3 | Zero raw values in components | Grep check returns "clean" |
| 4 | All 5 components built with typed props | Files in `src/components/`, TypeScript compiles |
| 5 | All 5 exported from `src/components/index.ts` | Check index.ts |
| 6 | AppShell story shows complete app layout | Run Storybook, inspect AppShell story |
| 7 | Sidebar collapsed mode works with Tooltip labels | Run Storybook, inspect collapsed story |
| 8 | CommandMenu keyboard navigation works | Run Storybook, test arrow keys + Enter + Escape |
| 9 | TypeScript compiles clean | `npx tsc --noEmit` → no errors |
| 10 | Re-theme test still passes | Change token → rebuild → confirm propagation |

---

## The one-line summary

Phase 5 builds the structural shell — Breadcrumb, Header, Sidebar, AppShell, and CommandMenu — turning Terra DS from a component kit into a system capable of producing complete, real app layouts.
