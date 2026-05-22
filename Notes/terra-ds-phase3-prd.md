# Terra DS — Phase 3 PRD
## React component library

---

## Overview

Phase 1 produced the `DESIGN.md` source of truth. Phase 2 exported deterministic token files (`tokens.json`, `tailwind.theme.json`). Phase 3 builds the React component library that implements those tokens as real, usable UI — and in doing so, proves the whole system works.

This is the layer where Terra DS stops being a spec and becomes something you can build apps with. It is also the final validation of Phase 1: if an agent can read DESIGN.md and the components faithfully render its tokens, the design system is real.

Scope for this first pass is a **core set of ~10 components** chosen to exercise all three surface registers (UI, content, conversational) and every interaction-state pattern. The remaining components are a fast follow once the pattern is proven.

---

## The single most important rule

**Components reference Terra token names, never raw values.**

A button's background is `bg-surface-raised` or `bg-primary` — never `bg-white`, `bg-[#faf6f0]`, or a hardcoded hex. Every color, spacing, radius, and font in every component must trace back to a Terra token.

This is non-negotiable, and it is the spine of the entire system:

- It makes components re-theme automatically when DESIGN.md changes.
- It makes components portable — a consuming project gets Terra's design, not hardcoded styling.
- It keeps a future Tailwind v4 upgrade cheap, because token-named utilities are owned by Terra, not by Tailwind's versioned utility set.

If a component needs a value that has no token, the fix is to add the token to DESIGN.md and re-export — never to hardcode the value in the component.

---

## Tech stack

- **React** (function components, hooks)
- **TypeScript** — typed props for every component
- **Tailwind v3** — consuming the `tailwind.theme.json` from Phase 2 via `tailwind.config.js`
- **Radix UI primitives** — for accessible behavior on interactive components (dialog, tabs, etc.). Radix handles focus management, keyboard nav, and ARIA; Terra tokens handle all styling.
- **Storybook** — component showcase and visual verification surface

Why Tailwind v3: it's what the Phase 2 export currently produces. Components will be written against Terra's token-named utilities (e.g. `bg-surface-raised`), so a later migration to v4 is a config change, not a component rewrite.

---

## Token wiring (do this first)

Before building any component, wire the Phase 2 token export into Tailwind so the token-named utilities exist.

1. Ensure `dist/tokens/tailwind.theme.json` exists (from Phase 2). Regenerate if needed: `./build-tokens.sh`.
2. Import it into `tailwind.config.js`:

```js
const terraTheme = require('./dist/tokens/tailwind.theme.json');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: terraTheme.theme.extend,
  },
};
```

3. Verify the utilities resolve: a `<div className="bg-surface-content text-on-content p-md rounded-lg">` should render with the warm cream background, correct ink text, 16px padding, and 10px radius.

This wiring is what makes the token-name rule enforceable — `bg-surface-content` only works because the token flows from DESIGN.md → export → Tailwind config → utility class.

Note: the Tailwind v3 export covers colors, fontFamily, fontSize, borderRadius, and spacing. It does NOT carry `lineHeight` or `letterSpacing` (a limitation of the v0.1.0 exporter). For those, read the values from DESIGN.md directly and apply them in the component's typography styles. DESIGN.md remains the source of truth for any token the export drops.

---

## Component scope (first pass)

Build these ~10 components. Each must implement every state defined in DESIGN.md, using token-named utilities only.

### UI register
1. **Button** — 4 variants: `primary`, `secondary`, `ghost`, `destructive`. Each with default, hover, focus, disabled states. Props: `variant`, `disabled`, `children`, standard button attributes.
2. **Input** — text input with default, focus, error, disabled states. Props: `error`, `disabled`, standard input attributes.
3. **Badge** — 3 variants: default, `accent`, `error`. Props: `variant`, `children`.
4. **Nav-item** — default, active, hover states. Props: `active`, `href`/`onClick`, `children`.
5. **Tab** — default, active, hover states. Props: `active`, `onClick`, `children`. (Use Radix Tabs for behavior.)

### Composition / overlay
6. **Card** — static + interactive variants. Interactive adds hover. Props: `interactive`, `children`.
7. **Dialog** — modal overlay. Use Radix Dialog for focus trap, escape handling, overlay click. Token-style the panel (`surface-overlay`, `rounded-xl`, overlay-level shadow). Props: `open`, `onOpenChange`, `title`, `children`.

### Conversational register
8. **ChatBubble** — `user` and `assistant` variants. Must distinguish the two through both background token AND layout position (e.g. user right-aligned, assistant left-aligned), never color alone — per the DESIGN.md rule. Props: `role`, `children`.

### Content register
9. **ContentPage** — the document canvas wrapper. Uses `surface-content`, `rounded-none`, generous padding, and constrains body text to ~65ch measure. Renders content-register typography (Noto Serif). Props: `children`.
10. **Callout** — embedded content block. Uses `surface-content-raised`, `on-content-muted`. Props: `children`.

This set covers all three registers, every state pattern (hover/focus/active/disabled), an accessible overlay, and the two register-specific rules (chat distinction, content measure).

---

## Elevation (shadows)

DESIGN.md defines warm-tinted shadows, not grey. The Tailwind export does not carry shadow tokens, so define them once in the Tailwind config's `boxShadow` extend, using the warm rgba values from the DESIGN.md Elevation section:

- `raised`: `0 1px 4px rgba(26,22,20,0.08), 0 0 1px rgba(26,22,20,0.06)`
- `overlay`: `0 8px 32px rgba(26,22,20,0.12), 0 2px 8px rgba(26,22,20,0.08)`

Cards use `shadow-raised`; Dialog uses `shadow-overlay`. Never use Tailwind's default grey shadows.

---

## Storybook

Each component gets a story file showing every variant and state in one view. Stories are the visual verification surface — where you confirm the warm/creamy/intellectual identity actually rendered, which no linter can check.

Requirements:
- One `.stories.tsx` per component
- Every variant and state visible (e.g. Button story shows all 4 variants × all 4 states)
- A dedicated "Surfaces" story rendering the three registers side by side (UI card, content page, chat bubbles) so the register distinction is visually obvious
- Storybook configured to load the same `tailwind.config.js`, so stories render with real Terra tokens

---

## Verification

Phase 3 is correct when:

1. **Token discipline holds.** No component contains a raw hex value, a `bg-white`/`bg-black`-style built-in color utility, or an arbitrary value like `bg-[#...]`. Verify:
   ```bash
   grep -rE "#[0-9a-fA-F]{3,6}|bg-white|bg-black|bg-\[" src/components/ && echo "VIOLATION FOUND" || echo "clean"
   ```
2. **Components render with real tokens.** Storybook builds and every story displays with the warm Terra palette — not default Tailwind colors.
3. **The three registers are visually distinct** in the Surfaces story — content canvas visibly warmer than UI chrome, chat bubbles distinguishable by position and tone.
4. **Interactive components are accessible** — Dialog traps focus and closes on escape; Tab is keyboard-navigable (provided by Radix).
5. **The re-theme test passes.** Change one token in DESIGN.md (e.g. `accent`), re-run `./build-tokens.sh`, restart Storybook — every accent-using component reflects the new value with no component edits. This is the definitive proof the system works.

---

## What Phase 3 deliberately does NOT do

- **No remaining components yet** — toggle, checkbox, tooltip, dropdown-menu, content typography variants beyond what the core set needs. Fast follow after the pattern is proven.
- **No dark mode / theming variants** — single theme, as exported.
- **No publishing/packaging** — this is your toolkit, consumed by copying or local linking, not an npm release.
- **No Tailwind v4 migration** — deferred; the token-name discipline keeps it cheap when you choose to.

---

## Acceptance criteria

| # | Criterion | How to verify |
|---|---|---|
| 1 | Tailwind config consumes the Phase 2 token export | Inspect `tailwind.config.js`; token utilities resolve |
| 2 | All ~10 core components built with typed props | Files exist in `src/components/`, TypeScript compiles |
| 3 | Every component implements all its DESIGN.md states | Review against DESIGN.md component list |
| 4 | Zero raw values — token names only | The grep check above returns "clean" |
| 5 | Warm shadows defined and used; no grey shadows | Inspect config + Card/Dialog |
| 6 | Dialog and Tab use Radix for accessibility | Inspect imports |
| 7 | ChatBubble distinguishes roles by position + tone, not color alone | Review + Surfaces story |
| 8 | ContentPage constrains measure to ~65ch and uses Noto Serif | Review + story |
| 9 | Storybook builds; every component has a story with all states | `npm run storybook` |
| 10 | Re-theme test passes | Change `accent` in DESIGN.md, rebuild tokens, confirm components update with no component edits |

---

## The one-line summary

Phase 3 builds ~10 core React components that consume Terra tokens exclusively by name, uses Radix for accessible behavior and Storybook for visual proof, and validates the whole system with a re-theme test: change a token in DESIGN.md, and the components follow — no component edits required.
