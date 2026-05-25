#!/usr/bin/env bash
set -euo pipefail

SOURCE="DESIGN.md"
SOURCE_DARK="DESIGN.dark.md"
OUT_DIR="dist/tokens"

mkdir -p "$OUT_DIR"

# Lint both sources
npx @google/design.md lint "$SOURCE"
npx @google/design.md lint "$SOURCE_DARK"

# Export light theme
npx @google/design.md export --format dtcg "$SOURCE" > "$OUT_DIR/tokens.json"
npx @google/design.md export --format tailwind "$SOURCE" > "$OUT_DIR/tailwind.theme.json"

# Export dark theme
npx @google/design.md export --format dtcg "$SOURCE_DARK" > "$OUT_DIR/tokens.dark.json"
npx @google/design.md export --format tailwind "$SOURCE_DARK" > "$OUT_DIR/tailwind.dark.theme.json"

# Generate CSS variables
node scripts/generate-css-vars.js

echo "Tokens exported to $OUT_DIR/"
