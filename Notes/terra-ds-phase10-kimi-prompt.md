# Kickoff prompt — Terra DS Phase 10 (Theme Editor)

You are an autonomous coding agent with file access and a terminal, working in the **Terra DS**
repository. Your job is to implement **Phase 10 — the Theme Editor** exactly as specified in the
PRD at `Notes/terra-ds-phase10-prd.md`.

## Read first (in this order)
1. `CLAUDE.md` — project rules, layer architecture, key commands, the non-negotiable token rule.
2. `Notes/terra-ds-phase10-prd.md` — the full spec. Its "Settled product decisions" table is final;
   do not re-litigate those choices.
3. `DESIGN.md` and `DESIGN.dark.md` — Layer 1 source of truth.
4. `tailwind.config.js`, `build-tokens.sh`, `scripts/generate-css-vars.js`, `src/tokens.css`,
   `src/components/ColorTokens.stories.tsx` — the code you'll extend.

## How to work
- Work **autonomously**. Do not ask for confirmation between steps. Keep prose commentary minimal —
  the deliverables are working files plus passing verification.
- Implement **phase by phase: P1 → P2 → P3 → P4 → P5**. Do not start a phase until the previous
  phase's **acceptance criteria** all pass. **P1 is a hard prerequisite** for everything — land it
  first and verify the extended re-theme test for all four token categories.
- After each phase: run the verification for that phase, then **commit** with a clear message
  (e.g. `Phase 10 P1: extend CSS-var runtime to spacing/radius/typography`). Match the repo's
  existing commit style.
- The riskiest task is **P1 Step 4 (typography utility unification)** — components use `font-{role}`
  which today sets font-family only. Read the "Known typography wiring gap" section in the PRD
  carefully and verify with the re-theme test before moving on.

## Prime directives (violating any of these is a failure)
- **Token-name discipline:** never write raw hex / px / arbitrary Tailwind values in
  `src/components/`. Verify anytime with the grep in CLAUDE.md — it must print `clean`. The single
  allowed exception is the editor's theme-independent **safety lifeline**, which lives in
  `theme-editor/` (outside the grep's scope).
- **DESIGN.md is the source of truth.** Never hand-edit `dist/tokens/*` or `src/tokens.css` —
  always regenerate via `./build-tokens.sh`. If a value is missing, add it to DESIGN.md first.
- **Keep the `@google/design.md` standard.** `build-tokens.sh` continues to lint + export via the
  CLI; the generator only *supplements* the fields the exporter drops (`lineHeight`, and
  `letterSpacing` where absent) by reading them from DESIGN.md. Do not replace the CLI with a custom
  parser.
- **No `dark:` variants** in component code, and **no new shipped DS primitives** (use native
  elements styled with tokens where a component doesn't exist). No Tailwind v4 migration.
- Only **colors** vary by theme. Spacing, radius, and typography are theme-agnostic — emit once in
  `:root`, never in `.dark`.

## Definition of done
All items in the PRD's **"Global verification"** section pass, plus:
- `npx @google/design.md lint DESIGN.md` and `... DESIGN.dark.md` → zero errors/warnings.
- The discipline grep over `src/components/` prints `clean`.
- `npx tsc --noEmit` is clean.
- The extended **re-theme test** passes for all four categories (change a token in DESIGN.md →
  `./build-tokens.sh` → Storybook reflects it with no component edits; dark via DESIGN.dark.md).
- `npm run theme-editor` runs on :5174 with live editing, full-dogfood chrome + working safety
  lifeline, contrast badges, atomic Save write-back with rollback, and `theme.json` + `export-bundle`.

## When to stop and report (instead of guessing)
- A phase's acceptance criteria cannot be met after a genuine attempt — report what blocks it.
- You hit a decision the PRD and CLAUDE.md don't cover and that would change the architecture.
Otherwise, proceed to completion and finish with a short report: what landed per phase, the
verification results, and anything you deviated from and why.
