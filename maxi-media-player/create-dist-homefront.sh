#!/usr/bin/env bash
# Build the Homefront fork of custom-sonos-card / maxi-media-player.
# Renames the registered element to `homefront-music-card` (and all internal
# `sonos-*` elements to `hmc-*`) so it never collides with the upstream
# `sonos-card` or `maxi-media-player` cards, then writes the result to the
# repo-root dist/ where HACS serves it.
#
# Run AFTER `vite build` has produced dist/custom-sonos-card.js.
set -e

SRC="dist/custom-sonos-card.js"
OUT_DIR="../dist"
OUT="$OUT_DIR/homefront-music-card.js"

if [ ! -f "$SRC" ]; then
  echo "Error: $SRC not found. Run the build first." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"
cp "$SRC" "$OUT"

# Order matters: rename the full "sonos-card" identifiers before the generic
# "sonos-" prefix, so the card element + sub-elements all stay consistent.
sed -i 's/"sonos-card"/"homefront-music-card"/g' "$OUT"
sed -i 's/sonos-card-/hmc-/g' "$OUT"
sed -i 's/sonos-/hmc-/g' "$OUT"
sed -i 's/"Sonos"/"Homefront Music Card"/g' "$OUT"
sed -i 's/Sonos Card/Homefront Music Card/g' "$OUT"

echo "Wrote $OUT"
