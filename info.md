# Homefront Music Card

A polished, opinionated Lovelace card for Music Assistant + WiiM multi-room audio control.

## Features

- **Sonos-style room grouping** via WiiM-native Linkplay sync
- **Multi-account browsing** for Spotify (and any other multi-account MA provider)
- **Source → Account → Type → Detail** browse flow (skips the merged-library noise)
- **Multi-group state** — different groups playing different things, all visible
- **Queue management** — drag-reorder, swipe-delete, multi-select bulk operations
- **Cross-provider search** grouped by source

## Requirements

You need all three of these installed and configured:

1. **Music Assistant** (HA add-on + integration)
2. **mjcumming/wiim** HA integration (HACS custom)
3. **Music Assistant Queue Actions** (HACS custom)

If any are missing, the card renders a help panel instead of failing silently.

## Status

Pre-1.0. Built for a specific multi-zone summer home deployment; works for other Music Assistant + WiiM setups but the opinions baked in (Linkplay-first sync, two-Spotify-account workflow) reflect that origin.
