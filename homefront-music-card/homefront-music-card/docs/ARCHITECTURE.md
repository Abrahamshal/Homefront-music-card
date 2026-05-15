# Architecture

## Why this card exists

Off-the-shelf Home Assistant media cards (mini-media-player, maxi-media-player, Music Assistant Player Card, YAMP, Sonos Card) each get part of the job right but none assemble the full target experience:

- A unified Sonos-style room-grouping interface
- Multi-account Spotify (two people in the household, separate libraries)
- A media browser that flows **Source → Account → Type → Detail** without dumping merged-library noise on the user
- Multi-group state (Pool group playing one thing, Master Bedroom playing another, both shown live)
- Native-feeling queue management (drag-reorder, swipe-delete, multi-select)
- Sample-accurate multi-room sync

This card pulls those features together into one polished surface, tailored to the specific homeowner deployment described in the rest of this doc.

## Deployment target

- **Summer home** Home Assistant instance (initial target; apartment uses same card later).
- **Server**: Beelink Mini S13A running HAOS, static IP planned.
- **Audio hardware**: 11× WiiM Amp units in a server rack, hardwired ethernet, driving passive speakers in zones: Pool, BBQ, Back Porch, Right Porch, Left Porch, Kitchen, Master Closet, Den (surround via Yamaha TSR-700), Den Music (Yamaha Zone 2), Abe's Room. (One zone — Pool — uses a Sonance DSP-2-150 amp fed by the corresponding WiiM Amp pre-out.)
- **HA integrations** required:
  - **Music Assistant** (add-on + integration)
  - **mjcumming/wiim** (HACS custom integration — WiiM-native Linkplay control with multi-room support)
  - **Music Assistant Queue Actions** (HACS) — required for queue manipulation
- **Music sources** in MA: two Spotify accounts (Abe's + Marlene's), Apple Music, Tidal (planned), SoundCloud, local FLAC (planned).

## The sync architecture decision

This was researched extensively and is the load-bearing decision of the entire project. Summary:

**WiiM's native Linkplay multi-room is the sync transport.** MA's Squeezelite path is the fallback for solo zones, never used for grouped playback.

The reasoning, briefly:
- WiiM advertises <150 μs inter-device sync via Linkplay's master-timestamp + buffer architecture.
- MA's Squeezelite path uses server-side correction — good but milliseconds, not microseconds.
- **Critically**: MA's own docs prefer "strategy 1" (timestamped frames + master clock — what Linkplay does) over "strategy 2" (server-side correction — what Squeezelite does).
- **More critically**: when a WiiM is the leader of a Linkplay group and *also* receiving a Squeezelite stream from MA, **the audio does not propagate to followers** (documented in WiiM and LMS community forums). Same for AirPlay. So you cannot use MA's group-sync features against WiiMs that are simultaneously Linkplay-grouped. You pick one.
- WiiM's "cross-source broadcasting" (any input gets rebroadcast to the group) works for: physical inputs (Line In, Optical, HDMI ARC), Spotify Connect targeted at the group, Tidal Connect targeted at the group, and content played through the WiiM Home App.
- The card's chosen play path — **MA pushes to the leader's MA entity, leader plays via its internal client** — is the path that WiiM's cross-source broadcasting handles correctly when initiated through the right protocol (specifically: MA → Spotify Connect / Tidal Connect to the group, OR MA → single-WiiM via Squeezelite when no group is active).

### The play-routing rule the card enforces

```
if group.members.length === 1:
  play to that one speaker's MA entity (Squeezelite or AirPlay, MA's choice)
else (Linkplay group active):
  play to the group leader's MA entity using a Connect-style protocol
    (Spotify Connect via MA, Tidal Connect via MA)
  WiiM leader rebroadcasts to followers via Linkplay
```

If a future MA release ships a native Linkplay player provider that targets the WiiM-native group directly (it's on their roadmap), the rule simplifies and we revisit this section.

### What the card MUST NOT do

- Never call `media_player.join` against MA entities to create an MA sync group when the same speakers are also Linkplay-grouped. The two sync mechanisms collide.
- Never use MA's group-volume on a Linkplay group. Use WiiM's group-volume instead (per-member volume calls scaled proportionally, or the integration's native group volume entity if exposed).
- Never assume "device X is playing" because the device-level WiiM entity reports playback. When grouped, only the leader's MA entity has authoritative now-playing state.

## Entity model

For each physical zone, two HA entities exist:

| Entity | Source | Role |
|---|---|---|
| `media_player.<zone>` | mjcumming/wiim | Device-level: power, volume, native source state, Linkplay grouping operations |
| `media_player.<zone>_2` (or `_ma` or however MA names it) | Music Assistant | Music: browse, play, queue, now-playing metadata, MA-aware control |

The card needs a **zone map** that pairs them per zone. This map is config — the user provides it once when they add the card. See `src/state/zoneMap.ts`.

The "active group" surfaced in the UI is derived from WiiM entity state (who's grouped with whom, who's the leader), but the now-playing data, queue, and play actions read/write the MA entity for the group leader.

## State model (ported from the prototype)

The Claude Design prototype encodes the model we want:

- Every speaker has a `leadId`. If `leadId === speaker.id`, it's solo. Otherwise it's a follower of the speaker with `id === leadId`.
- Distinct `leadId` values define groups. Solo idle speakers are groups of one with no active player state.
- Each lead has its own player state: queue, current track, position, shuffle, repeat, group volume.
- The card has one **active lead** — that's the group the Player tab is currently controlling. The chip rail under the title lets the user switch between leads.
- All groups with `player.playing === true` keep ticking in parallel (the Output tab shows each group's now-playing live).

The port to real HA state:
- `speakers` → derived from the configured zone map + HA state of WiiM entities.
- `leadId` → read from the WiiM entity's `group_leader` / `group_members` attributes (mjcumming exposes these).
- `players[leadId]` → derived from the MA entity state of the lead's MA-pair (now-playing, position, queue from `music_assistant.get_queue` service or attribute).
- Active lead → local UI state, persisted to `localStorage` per-dashboard.

## Three things this card depends on

1. **The mjcumming/wiim HA integration must be installed and configured.** Without it, we don't have WiiM-native grouping. The card detects its presence by looking for `media_player.*` entities with `device_class === 'speaker'` and a `linkplay` / `wiim` integration attribute.

2. **The Music Assistant integration must be configured with at least one music provider.** The card detects this by checking for the `music_assistant` integration in HA's config entries and at least one MA `media_player` entity.

3. **The HACS integration "Music Assistant Queue Actions" must be installed.** Without it, queue reorder/remove operations don't work. The card detects by checking for the `music_assistant.queue_*` services.

If any of these are missing, the card renders a setup-help panel instead of the main UI.

## Why Lit + TypeScript

- It's what HA's own frontend uses, so the surrounding ecosystem (HA dev tools, HACS card examples, dashboard inspector) speaks the same language.
- Strict types catch HA service-call shape mistakes at build time (`media_player.play_media` argument shapes vs. `music_assistant.play_media`).
- The original React prototype ports cleanly: functional components with hooks → Lit reactive controllers + decorated properties. State hooks become a single observable store class.
- HACS card maintainers read Lit/TS natively — easier to take PRs or get help in the community.

## Build pipeline

- **rollup** bundles to a single ESM `dist/homefront-music-card.js` (HACS card convention).
- **TypeScript** compiles + type-checks; `tsc` runs in `--noEmit` mode during build, rollup handles emit via `@rollup/plugin-typescript`.
- **No tests in v1**. Add them when the architecture stops shifting.

## Out of scope (intentional)

- Cross-vendor multi-room (Sonos + WiiM in one group). Not possible cleanly today.
- Voice control. Handled separately via OpenAI Conversation + HA Assist.
- Notification / TTS routing. Handled by HA automations, not this card.
- Apartment-specific tuning. The card is generic enough to also work at the apartment with Sonos, but optimized for the summer home WiiM build. Apartment compatibility is a "nice to have", not a constraint.
