# Homefront Music Card

A Sonos‑style Lovelace card for **multi‑account households** running Music Assistant. A fork of [maxi‑media‑player](https://github.com/punxaphil/maxi-media-player) that keeps its smooth UI and adds **browsing your music by source account**.

## Why

When several people connect their own Spotify/Pandora/etc. to Music Assistant, the library merges everyone into one flat list. This card adds a **Sources** tab that browses **per account** — "Alex's Spotify", "Jordan's Spotify", "Sam's Pandora" — then drills Account → Playlists/Artists/Albums/Tracks → tracks, with cover art and a Play‑all button.

## Adds over maxi

- **Sources tab** — per‑account browsing via Music Assistant's `music/browse`
- **Filter‑in‑list search** — instantly filter the open list (playlist, tracks…)
- **Faster tab loads** — memoized integration discovery
- **Centered bottom tabs** with few sections; **no jump‑to‑player** while browsing

## Requirements

- [Music Assistant](https://www.music-assistant.io/) with your accounts connected
- [Music Assistant Queue Actions](https://github.com/droans/ha-mass-queue) (`mass_queue`) — required for the Sources tab

WiiM/Linkplay is **not** required — grouping uses standard HA `media_player` join/unjoin, so any group‑capable players work (Sonos, WiiM, HEOS, MA/Squeezelite…).

Configuration mirrors maxi; use type `custom:homefront-music-card` with `entityPlatform: music_assistant`.

Built on the excellent work of [punxaphil](https://github.com/punxaphil). Apache‑2.0.
