# Terra DS — Phase 2 PRD
## Export the token layer from DESIGN.md

---

## Overview

Phase 1 produced a validated, lint-clean `DESIGN.md` — the source of truth. Phase 2 turns that single source into consumable token files that real projects (and Phase 3's React components) can import.

The key fact that shapes this phase: **the DESIGN.md CLI already has a deterministic `export` command.** Phase 2 is not about building a generator. It is about running the built-in exporter, deciding where the output lives, and verifying the output matches the source. This keeps the token layer fully deterministic — the same `DESIGN.md` always produces the same tokens, with no agent interpretation in the value chain.

---

## Important: verify available export formats first

The published CLI (`@google/design.md@0.1.0`) supports fewer export formats than the README documents. Before anything else, confirm what your installed version actually supports:

```bash
npx @google/design.md export --format INVALID DESIGN.md 2>&1
```

The error message lists the valid formats. As of v0.1.0, the working formats are:

- `tailwind` — Tailwind v3 `theme.extend` config object (JSON)
- `dtcg` — W3C Design Tokens Format Module (JSON)

The README also lists `css-tailwind` (Tailwind v4 CSS `@theme` block) and `json-tailwind`, but these are **not available in v0.1.0** — attempting them returns an "Invalid format" error. If a newer CLI version adds them, prefer `css-tailwind` for Tailwind v4 projects. Until then, this phase targets the two formats that exist.

---

## Deliverables

Three artifacts, all generated — none hand-authored:

1. **`tokens.json`** — DTCG format. The portable, tool-agnostic token export. This is the primary deliverable; it follows a W3C standard and can feed any design-token tooling.
2. **`tailwind.theme.json`** — Tailwind v3 `theme.extend` config. For direct consumption by Phase 3 if it uses Tailwind v3, or any Tailwind project.
3. **`build-tokens.sh`** (or equivalent) — a tiny, committed script that regenerates both files from `DESIGN.md`. This is the repeatable export step that preserves the re-theming property: edit DESIGN.md, run this, tokens update.

Do not hand-edit `tokens.json` or `tailwind.theme.json`. They are build artifacts. All changes flow from `DESIGN.md`.

---

## The export commands

These are the exact commands the build script wraps:

```bash
# DTCG (portable W3C standard)
npx @google/design.md export --format dtcg DESIGN.md > tokens.json

# Tailwind v3 config
npx @google/design.md export --format tailwind DESIGN.md > tailwind.theme.json
```

Both are deterministic: same input, identical output every run. The exported hex values match DESIGN.md verbatim (lowercased) — there is no interpretation, rounding, or adjustment.

---

## The build script

Create `build-tokens.sh` at the repo root:

```bash
#!/usr/bin/env bash
set -euo pipefail

SOURCE="DESIGN.md"
OUT_DIR="dist/tokens"

mkdir -p "$OUT_DIR"

# Lint first — never export from an invalid source
npx @google/design.md lint "$SOURCE"

# Export both formats
npx @google/design.md export --format dtcg "$SOURCE" > "$OUT_DIR/tokens.json"
npx @google/design.md export --format tailwind "$SOURCE" > "$OUT_DIR/tailwind.theme.json"

echo "Tokens exported to $OUT_DIR/"
```

Design notes:
- It lints before exporting, so a broken DESIGN.md can never silently produce broken tokens.
- It writes to a `dist/tokens/` directory, keeping generated artifacts separate from the source.
- It is the single command you run after any DESIGN.md change.

---

## Decision: commit the generated files, or generate on demand?

For your single-user, multi-project situation, **commit the generated files** to the repo (in `dist/tokens/`). Reasoning:

- A consuming project can pull `tokens.json` directly without needing the DESIGN.md toolchain installed.
- The git history of `dist/tokens/tokens.json` becomes a visible record of when the design system actually changed — pairs naturally with the `diff` command below.
- The cost (regenerating and committing on each change) is trivial at your scale.

If this were a large team with CI, you might generate on demand instead. It is not, so commit them.

---

## Verification

Phase 2 is correct when the exported tokens faithfully represent the source. Two checks:

### 1. Spot-check that values match the source

The export is deterministic, but verify the round-trip once to build trust:

```bash
# Pull a few hex values from DESIGN.md and confirm they appear in the output
grep "accent:" DESIGN.md          # e.g. accent: '#C27A1B'
grep -i "c27a1b" dist/tokens/tokens.json   # must appear (lowercased)
```

The exporter lowercases hex values — that is the only transformation. No value should differ otherwise.

### 2. Use `diff` to detect drift over time

When DESIGN.md changes in future, the CLI's `diff` command reports exactly what moved at the token level:

```bash
npx @google/design.md diff DESIGN-old.md DESIGN.md
```

This is the governance tool from earlier discussions — it tells you precisely which tokens were added, removed, or modified, and flags regressions. Worth knowing it exists; not required to run every time.

---

## What Phase 2 deliberately does NOT do

- **No custom token transformation.** The built-in exporter is the generator. Writing your own would reintroduce drift risk for zero benefit.
- **No agent involvement in the value chain.** Token export is mechanical. The agent's role begins in Phase 3, consuming these tokens to build components.
- **No theming/dark-mode variants yet.** Phase 2 exports the one theme that exists. Multiple themes are a later concern if a project needs them.
- **No CSS framework assumptions beyond what's exported.** Phase 3 decides how to consume the tokens.

---

## Acceptance criteria

| # | Criterion | How to verify |
|---|---|---|
| 1 | Available export formats confirmed for installed CLI version | Run an invalid `--format` and read the valid list |
| 2 | `dist/tokens/tokens.json` exists and is valid JSON | `cat dist/tokens/tokens.json \| python3 -m json.tool > /dev/null` |
| 3 | `dist/tokens/tailwind.theme.json` exists and is valid JSON | Same JSON validity check |
| 4 | `build-tokens.sh` exists, is executable, and regenerates both files | `chmod +x build-tokens.sh && ./build-tokens.sh` |
| 5 | Build script lints before exporting | Inspect script; it calls `lint` before `export` |
| 6 | Exported hex values match DESIGN.md (lowercased) | Spot-check 3–4 tokens with grep |
| 7 | Generated files are committed (or .gitignored by deliberate choice) | `git status` |
| 8 | Re-running the build produces identical output | Run twice, `git diff` shows no change |

---

## The one-line summary

Phase 2 wires up a repeatable, deterministic, lint-gated export from `DESIGN.md` to `tokens.json` + `tailwind.theme.json`, commits the result, and verifies the values match the source. It is small on purpose — the standard already does the hard part.
