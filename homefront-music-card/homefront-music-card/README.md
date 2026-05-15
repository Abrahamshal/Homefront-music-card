# Homefront Music Card

A custom Lovelace card for Home Assistant designed for whole-home audio control through Music Assistant + WiiM multi-room.

Built around three ideas:

1. **Music Assistant** owns browsing, search, queue, and playback (multi-account Spotify, Apple Music, Tidal, local files).
2. **WiiM-native (Linkplay) grouping** handles multi-room synchronization, via the `mjcumming/wiim` integration.
3. **One sync mechanism per playback session** — the card always targets the WiiM group leader's Music Assistant entity, never plays through MA Squeezelite to multiple devices that are already in a WiiM-native group.

This is **not** a generic media-player card. It is opinionated: it assumes you run Music Assistant + the WiiM integration + the `Music Assistant Queue Actions` HACS integration, and that your zones are WiiM Amps (or other Linkplay devices). It will be most useful for the homeowner who built it; others may want to fork.

## Installation (once published)

Via HACS as a custom repository. See [INSTALL.md](docs/INSTALL.md).

## For developers / Claude Code

If you are an AI coding agent looking at this repo for the first time, read in this order:

1. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — what we're building and why
2. [docs/SPEC.md](docs/SPEC.md) — feature spec, screen by screen
3. [docs/ROADMAP.md](docs/ROADMAP.md) — phased plan
4. [docs/HA_INTEGRATION.md](docs/HA_INTEGRATION.md) — how the card talks to Home Assistant, MA, and WiiM
5. [design-reference/](design-reference/) — original prototype from Claude Design (chats, HTML, JSX). The Refined card variation is the design we're implementing. **Read `design-reference/chats/chat1.md` for the original conversation that shaped the design.**

## License

MIT
