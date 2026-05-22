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
