#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
CACHE_LIB_DIR="$ROOT_DIR/cache/foomatic-db"
CACHE_DB_DIR="$CACHE_LIB_DIR/db"
SYSTEM_LIB_DIR="/usr/share/foomatic"
SYSTEM_DB_DIR="$SYSTEM_LIB_DIR/db"
OUTPUT_DIR="$ROOT_DIR/public/ppds"
REVISION_FILE="$OUTPUT_DIR/.foomatic-db-revision"

mkdir -p "$OUTPUT_DIR"

if [[ "${1:-}" == "--skip-ppd" || "${SKIP_PPD_GEN:-false}" == "true" ]]; then
  echo "Skipping PPD generation"
  exit 0
fi

if [[ "${1:-}" == "--force" || "${FORCE_PPD_GEN:-false}" == "true" ]]; then
  FORCE_PPD_GEN="true"
else
  FORCE_PPD_GEN="false"
fi

if ! command -v foomatic-compiledb >/dev/null 2>&1; then
  echo "foomatic-compiledb not found; skipping PPD generation"
  exit 0
fi

if [[ -d "$CACHE_DB_DIR" ]]; then
  export FOOMATICDB="$CACHE_LIB_DIR"
  echo "Using workspace Foomatic DB at $CACHE_DB_DIR"
elif [[ -d "$SYSTEM_DB_DIR" ]]; then
  export FOOMATICDB="$SYSTEM_LIB_DIR"
  echo "Using system Foomatic DB at $SYSTEM_DB_DIR"
else
  echo "Foomatic DB not found in $CACHE_DB_DIR or $SYSTEM_DB_DIR; skipping PPD generation"
  exit 0
fi

CURRENT_DB_REVISION=""
if [[ -d "$CACHE_LIB_DIR/.git" ]]; then
  CURRENT_DB_REVISION="$(git -C "$CACHE_LIB_DIR" rev-parse HEAD 2>/dev/null || true)"
fi

EXISTING_PPD_COUNT="$(find "$OUTPUT_DIR" -type f -name '*.ppd' | wc -l | tr -d ' ')"
if [[ "$FORCE_PPD_GEN" != "true" && -n "$CURRENT_DB_REVISION" && -f "$REVISION_FILE" && "$EXISTING_PPD_COUNT" -gt 0 ]]; then
  SAVED_DB_REVISION="$(tr -d '\n' < "$REVISION_FILE")"
  if [[ "$SAVED_DB_REVISION" == "$CURRENT_DB_REVISION" ]]; then
    echo "PPD files already match foomatic-db revision $CURRENT_DB_REVISION; skipping generation"
    exit 0
  fi
fi

echo "FOOMATICDB=$FOOMATICDB"
echo "Generating PPD files into $OUTPUT_DIR"
foomatic-compiledb -t ppd -j 4 -d "$OUTPUT_DIR" -f

if [[ -n "$CURRENT_DB_REVISION" ]]; then
  printf '%s\n' "$CURRENT_DB_REVISION" > "$REVISION_FILE"
fi

FILE_COUNT="$(find "$OUTPUT_DIR" -type f -name '*.ppd' | wc -l | tr -d ' ')"
echo "Generated $FILE_COUNT PPD files"
