# Terra DS — Phase 4 PRD
## Expanded component library

---

## Overview

Phase 3 delivered the 10-component core set and proved the re-theme test end-to-end. Phase 4 expands the library to cover the full breadth needed to build real app projects: AI chat/assistant UIs, reading and writing tools, and general productivity tools.

This phase adds **8 new components** across two waves. Wave A fills the form-control gaps that block nearly any interactive app. Wave B adds the surface-level rendering components that distinguish Terra DS's content and code registers from a generic UI kit. Together they make the library sufficient for building real product screens without reaching outside the design system.

Phase 5 (not in scope here) will add the structural/compositional layer: full navigation systems with sub-items, app headers, and page layout containers. Wave A+B components are the primitives that Phase 5 compositions will be assembled from — the sequencing is load-bearing.

---

## The non-negotiable rule (same as all prior phases)

**Components reference Terra token names, never raw values.**

No raw hex, no `bg-white`/`bg-black`, no `bg-[#...]`. Every color, spacing, radius, and font traces back to a Terra token. Verify anytime:

```bash
grep -rE "#[0-9a-fA-F]{3,6}|bg-white|bg-black|bg-\[" src/components/ && echo "VIOLATION" || echo "clean"
```

If a component needs a value with no existing token, add the token to `DESIGN.md` first, run `./build-tokens.sh`, then implement. Never hardcode downstream.

---

## DESIGN.md updates required before building

Three new component types — Textarea, Select, and Code block — do not yet have component token entries in `DESIGN.md`. Per the working agreement, tokens come first. Add these entries to the `components:` section of `DESIGN.md` before implementing the components, then run `./build-tokens.sh`.

### Tokens to add

```yaml
  textarea:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  textarea-focus:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  textarea-error:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.error}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  textarea-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  select:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  select-open:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  select-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  code-block:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
```

After adding these, run `./build-tokens.sh` and confirm lint passes before building any component.

Note: Toggle, Checkbox, Tooltip, and Dropdown menu already have full token coverage in `DESIGN.md` — no DESIGN.md changes needed for those.

---

## Wave A — form controls

These five components are the most broadly blocking. Any settings panel, preference form, model picker, or filter UI needs at least three of them.

---

### 1. Textarea

The multiline equivalent of `Input`. Critical for chat input boxes, note editors, and any writing surface. Shares Input's token set and state model — the implementation is a `<textarea>` element, not a `<div>`.

**States:** default, focus, error, disabled.

**Props:**
```ts
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
```

**Implementation notes:**
- Use `resize-y` (vertical resize only) by default via Tailwind's resize utility. Do not lock resize entirely — it frustrates users in writing contexts.
- `min-h` should default to approximately 3 lines (use `min-h-[80px]` or equivalent token-based approach).
- State classes mirror `Input` exactly: default → `bg-surface-raised`, focus → `bg-surface-overlay`, error → `text-error`, disabled → `bg-neutral text-on-surface-muted`.
- Apply `focus:ring-2 focus:ring-focus-ring` on focus, identical to Input.

---

### 2. Toggle

A pill-shaped on/off switch. Already fully token-defined in `DESIGN.md` (`toggle`, `toggle-on`, `toggle-focus`). Use **Radix Switch** for accessible behavior — it handles `role="switch"`, `aria-checked`, space-to-toggle, and focus management automatically.

**States:** off (default), on, focus, disabled.

**Props:**
```ts
interface ToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}
```

**Implementation notes:**
- Track root: `bg-surface rounded-full` when off; `bg-primary` when on. Use Radix's `data-[state=checked]` attribute for the state switch.
- Thumb: `bg-on-primary rounded-full` — a white-ish circle that slides. Use `translate-x` to animate position. The thumb color should be `on-primary` not literal white, so it re-themes correctly.
- The `label` prop renders adjacent text using `font-label-lg text-on-surface`, connected to the switch via `htmlFor`/`id` for accessibility.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-focus-ring`.

---

### 3. Checkbox

A square checkbox control. Already token-defined (`checkbox`, `checkbox-checked`, `checkbox-focus`). Use **Radix Checkbox** for accessible behavior — `role="checkbox"`, `aria-checked`, space-to-toggle.

**States:** unchecked (default), checked, indeterminate, focus, disabled.

**Props:**
```ts
interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  label?: string;
}
```

**Implementation notes:**
- Box: `w-4 h-4 rounded-sm border border-border` when unchecked; `bg-primary border-primary` when checked.
- Checkmark: render a simple SVG check icon in `text-on-primary` when checked. Use Radix's `Indicator` for conditional rendering.
- Indeterminate: render a horizontal dash in `text-on-primary` instead of a checkmark.
- The `label` prop follows the same pattern as Toggle — `font-label-lg text-on-surface`, connected via `htmlFor`.
- Disabled: `bg-neutral border-border-subtle text-on-surface-muted opacity-60`.

---

### 4. Select / Combobox

A styled select control for choosing from a list. Use **Radix Select** for behavior — it handles keyboard navigation, scroll into view, screen reader announcement, and portal rendering. This is the right choice for a fixed list; a searchable combobox (Radix Combobox or a custom implementation) is a fast-follow if needed but is out of scope here.

**States:** default, open (trigger), disabled.

**Props:**
```ts
interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children: React.ReactNode; // SelectItem children
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}
```

**Implementation notes:**
- Trigger: `bg-surface-raised text-on-surface rounded-md px-md py-sm` with a chevron-down icon aligned right. Icon color: `text-on-surface-muted`. Open state: `bg-surface-overlay`.
- Content (dropdown panel): `bg-surface-overlay rounded-md shadow-overlay p-xs` — same surface and shadow as Dialog. Rendered in a Radix portal so it escapes scroll containers.
- Item: `font-body-md text-on-surface rounded-sm px-md py-sm` at rest; `bg-surface-raised` on highlight (Radix `data-[highlighted]`).
- Selected item shows a checkmark in `text-accent` — the one place where accent is appropriate here (it marks the active selection, the "one interactive state per view" rule applies at the component level, not across the whole app).
- Disabled trigger: `bg-neutral text-on-surface-muted`.

---

### 5. Dropdown menu

A contextual action menu that opens on trigger click. Already token-defined (`dropdown-menu`, `dropdown-menu-item-hover`). Use **Radix DropdownMenu** — focus trap, keyboard navigation, escape-to-close, and portal rendering are all provided.

**States:** closed (default), open, item hover, item disabled.

**Props:**
```ts
interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode; // DropdownMenuItem and DropdownMenuSeparator children
}

interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  destructive?: boolean;
}
```

**Implementation notes:**
- Content panel: `bg-surface-overlay rounded-md shadow-overlay p-xs min-w-[160px]` — same overlay surface as Dialog and Select.
- Item: `font-body-md text-on-surface rounded-sm px-md py-sm cursor-pointer` at rest; `bg-surface-raised` on hover/highlight (Radix `data-[highlighted]`).
- Destructive item: `text-error` on highlight (background stays `bg-surface-raised`).
- Separator: a 1px `border-t border-border-subtle my-xs` — not a full divider component, just a structural rule.
- Disabled item: `text-on-surface-muted opacity-50 pointer-events-none`.
- The trigger is fully composable — pass any element (Button, icon button, avatar) as `trigger`.

---

## Wave B — surface rendering

These three components handle the display side: rich text content, code output, and contextual help. They complete the rendering vocabulary needed for AI response surfaces and document-style views.

---

### 6. Content typography components

Typed wrapper components for the Noto Serif content register. These replace bare HTML tags (`<h1>`, `<p>`, `<blockquote>`) with token-aware components that enforce the content register correctly. Every one of these must use a `content-` prefixed typography token — never Inter, never a UI token.

Build these as a set of lightweight semantic wrappers:

| Component | HTML element | Typography token | Notes |
|---|---|---|---|
| `ContentHeading` | `h1`–`h4` via `level` prop | `content-heading-lg/md/sm` | `level` prop maps 1→lg, 2→md, 3→sm, 4→sm |
| `ContentBody` | `p` | `content-body-md` | Default reading body; `size="lg"` uses `content-body-lg` |
| `ContentBlockquote` | `blockquote` | `content-blockquote` | Left border in `border-border`, italic |
| `ContentCaption` | `figcaption` or `p` | `content-caption` | Italic, muted (`text-on-content-muted`) |

**Props:**
```ts
interface ContentHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
}

interface ContentBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'md' | 'lg';
}
```

**Implementation notes:**
- All components: `text-on-content` (or `text-on-content-muted` for Caption). Never `text-on-surface`.
- `ContentBlockquote`: `border-l-2 border-border pl-md` — the left border uses the `border` token, not a hardcoded color.
- `ContentBody` line height comes from `content-body-md` in DESIGN.md (1.6) and `content-body-lg` (1.75). Since the exporter drops `lineHeight`, apply these as inline style or a Tailwind `leading-` utility derived from the DESIGN.md value directly.
- Max-width constraint (`max-w-prose` / ~65ch) belongs on `ContentPage`, not on individual typography components. These components are measure-agnostic.
- Export all four from `src/components/index.ts`.

---

### 7. Code block

A styled block for displaying code — monospace type, a visually distinct surface, and optional language label. This is the standard output surface for AI-generated code snippets and technical content. It must feel intentional, not like a default `<pre>` tag.

**No new DESIGN.md token is strictly required** — the `code-block` token added in the DESIGN.md section above handles it. The `code-md` typography token already exists.

**Props:**
```ts
interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string;
  children: React.ReactNode;
}
```

**Implementation notes:**
- Outer wrapper: `bg-surface rounded-md p-md overflow-x-auto` — the cooler UI surface, not the warm content surface. Code is a UI-register element, not a content-register element.
- Typography: `font-code-md text-on-surface`. Since `font-code-md` maps to `'SF Mono', Monaco, monospace` via the Tailwind token, this just works.
- Language label (if `language` prop provided): a small `font-label-sm text-on-surface-muted` label in the top-right corner, absolutely positioned within a `relative` container.
- Line height from DESIGN.md `code-md`: 1.5. Apply as `leading-[1.5]` or inline style — the exporter drops it.
- No syntax highlighting in Phase 4. The surface distinction and monospace type are sufficient for now; syntax coloring is a Phase 5+ concern.
- `overflow-x-auto` is critical — code lines should not wrap.

---

### 8. Tooltip

A small floating label that appears on hover or focus. Already token-defined (`tooltip`: `bg-primary text-on-primary`). Use **Radix Tooltip** for behavior — delay, portal rendering, keyboard accessibility, and collision detection are all provided.

**Props:**
```ts
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
}
```

**Implementation notes:**
- Content: `bg-primary text-on-primary rounded-md px-md py-sm font-label-sm shadow-raised` — the tooltip token is already `primary`/`on-primary` for maximum contrast against any surface.
- Arrow: use Radix's `Arrow` sub-component, colored `fill-primary` to match the panel.
- Default `delayDuration`: 400ms — short enough to feel responsive, long enough to avoid accidental triggers.
- `side` defaults to `top`. Radix handles collision detection and flips automatically.
- Wrap Radix's `Provider`, `Root`, `Trigger`, and `Content` into a single `Tooltip` component so consumers don't need to manage the Radix API surface directly.

---

## Package additions

Wave A requires two new Radix primitives not yet installed:

```bash
npm install @radix-ui/react-switch @radix-ui/react-checkbox @radix-ui/react-select @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
```

Add these to `devDependencies` in `package.json` (consistent with the existing Radix installs).

---

## Storybook

Each new component gets a `.stories.tsx` file showing every variant and state. Specific requirements:

- **Textarea**: default, focused, error (with helper text below), disabled — in a single story.
- **Toggle**: off + on × enabled + disabled, with and without label.
- **Checkbox**: unchecked, checked, indeterminate, disabled — with and without label.
- **Select**: default, open (screenshot-friendly — consider a long-enough list to show scroll), disabled. Include a multi-item list so the dropdown has real content.
- **Dropdown menu**: closed trigger, open panel with regular items, a destructive item, a separator, and a disabled item.
- **Content typography**: all four components on a `ContentPage` background — a short article-style composition showing the type hierarchy.
- **Code block**: two stories — a short snippet (5–6 lines) with language label, and a wide snippet to verify `overflow-x-auto`.
- **Tooltip**: all four `side` positions, triggered from a Button.

Additionally, extend the existing **Surfaces** story to include a Wave A/B composition — e.g., a settings panel section using Toggle + Checkbox + Select on a UI surface, alongside a content block using ContentBody + CodeBlock.

---

## Verification

Phase 4 is correct when:

1. **DESIGN.md updated and lint-clean.** New textarea, select, and code-block component tokens added. `npx @google/design.md lint DESIGN.md` returns `errors: 0, warnings: 0`.
2. **Tokens regenerated.** `./build-tokens.sh` runs clean after DESIGN.md changes.
3. **Token discipline holds.** The grep check returns "clean" across all of `src/components/`.
4. **All 8 components exist** with typed props in `src/components/` and are exported from `index.ts`.
5. **Radix is used** for Toggle (Switch), Checkbox, Select, Dropdown menu, and Tooltip.
6. **Content typography components** use only `content-` prefixed typography tokens and `on-content`/`on-content-muted` text colors — never UI-register tokens.
7. **Code block** uses `bg-surface` (UI register), not `bg-surface-content` (content register).
8. **Storybook** builds; every new component has a story covering all states.
9. **Re-theme test still passes.** Change a token in DESIGN.md, rebuild, restart Storybook — all components (old and new) reflect the change.

---

## What Phase 4 deliberately does NOT do

- **No syntax highlighting** in Code block — a Phase 5+ concern once the surface is proven.
- **No searchable Combobox** — the Radix Select covers fixed lists; a searchable variant is a fast-follow if a specific project requires it.
- **No structural/layout components** — navigation systems, headers, and page layout containers are Phase 5. They are assembled from Phase 3 + Phase 4 primitives.
- **No dark mode or theming variants** — single theme, same as prior phases.
- **No npm packaging** — still consumed by local reference.

---

## Acceptance criteria

| # | Criterion | How to verify |
|---|---|---|
| 1 | DESIGN.md updated with new component tokens and lint-clean | `npx @google/design.md lint DESIGN.md` → `errors: 0` |
| 2 | Tokens regenerated after DESIGN.md change | `./build-tokens.sh` runs clean |
| 3 | Zero raw values in components | Grep check returns "clean" |
| 4 | All 8 new components built with typed props | Files in `src/components/`, TypeScript compiles |
| 5 | All 8 exported from `src/components/index.ts` | Check index.ts |
| 6 | Radix used for Toggle, Checkbox, Select, Dropdown, Tooltip | Check imports |
| 7 | Content typography uses only content-register tokens | Review token classes in each component |
| 8 | Code block uses UI-register surface, not content surface | Confirm `bg-surface`, not `bg-surface-content` |
| 9 | Every new component has a Storybook story with all states | `npm run storybook` |
| 10 | Surfaces story updated with Wave A/B composition | Check Surfaces.stories.tsx |
| 11 | Re-theme test still passes end-to-end | Change token → rebuild → confirm propagation |

---

## The one-line summary

Phase 4 adds 8 components across two waves — Wave A fills the form-control gaps (Textarea, Toggle, Checkbox, Select, Dropdown) and Wave B adds the rendering vocabulary (Content typography, Code block, Tooltip) — completing the primitive layer that Phase 5's structural compositions will be built from.
