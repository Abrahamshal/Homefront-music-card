# Roadmap

Phased plan. **Build in order. Verify each phase in HA before moving to the next.**

## Phase 0: Repo + Build Setup (start here)

Set up the project skeleton so the build pipeline works end-to-end with a placeholder component.

- [ ] `npm init` and install Lit, TypeScript, Rollup, plugins (see `package.json` placeholder)
- [ ] `tsconfig.json` configured for ES2020 + Lit decorators
- [ ] `rollup.config.js` bundles `src/homefront-music-card.ts` → `dist/homefront-music-card.js`
- [ ] `hacs.json` for HACS discovery
- [ ] `info.md` for HACS UI
- [ ] CI: GitHub Action that builds on push, attaches `dist/homefront-music-card.js` to releases
- [ ] Placeholder card: a Lit element that renders "Hello, Music Assistant" and registers as `homefront-music-card`
- [ ] Test install via HACS custom repo → verify it appears in Lovelace card picker → drop on a dashboard → see "Hello" render

**Done when**: a stranger could clone the repo, run `npm run build`, drop the dist file in `/config/www/`, register it as a resource, and see "Hello" on a Lovelace card.

## Phase 1: Scaffold the UI with mock data

Port the Refined prototype to Lit/TS one screen at a time, **still using the mock data from the prototype**. Goal: see the full UI rendering in HA with all interactions working against in-memory state. No real HA calls yet.

- [ ] Port `data.js` → `src/state/mockData.ts` (TypeScript types for albums, tracks, playlists, providers, speakers, queue)
- [ ] Port the state hook (`useMusicCard` in `card-core.jsx`) → `src/state/store.ts` as a Lit reactive controller or a class with observable properties
- [ ] Port icons → `src/components/Icons.ts` (Lit SVG templates, one per icon)
- [ ] Port `AlbumArt`, `Slider`, `SwipeRow`, `DraggableQueue` → `src/components/primitives/`
- [ ] Port `CardTitle`, `GroupChipRail`, `RefinedTabBar` → `src/components/chrome/`
- [ ] Port `RefinedPlayer` → `src/components/PlayerTab.ts`
- [ ] Port `BrowserScreen` (provider tile / account tile / sub tabs / detail header) → `src/components/BrowseTab.ts`
- [ ] Port `SearchScreen` → `src/components/SearchTab.ts`
- [ ] Port `QueueScreen` → `src/components/QueueTab.ts`
- [ ] Port `GroupingScreen` + `GroupCard` + `MemberRow` + `IdleSpeakerRow` → `src/components/OutputTab.ts`
- [ ] Port `GroupSheet` → `src/components/GroupSheet.ts`
- [ ] Compose all into the main `homefront-music-card.ts` element with tab routing

**Done when**: the entire prototype's interactions work in the actual HA dashboard, against mock data. Drag-reorder, swipe-delete, group-sheet checkbox flow, breadcrumb navigation — everything from the prototype works in HA.

## Phase 2: Wire to real Home Assistant state (read-only)

Replace mock data with live HA state. Read-only — actions still no-op or log to console.

- [ ] Implement `hass` property handling (Lovelace card receives `hass` object every state change)
- [ ] Implement card config schema: `zones[]`, `default_lead`, `density`
- [ ] Implement setup-help mode: detect missing integrations (MA, mjcumming/wiim, Queue Actions); render help panel if anything's missing
- [ ] Build the zone map: pair each configured zone's WiiM entity with its MA entity
- [ ] Derive the speakers list from zone map + WiiM entity state (name, model, volume from `volume_level * 100`)
- [ ] Derive `leadId` per speaker from WiiM entity attributes (`group_members`, `group_leader` — confirm exact names from mjcumming/wiim docs)
- [ ] Derive each group's player state from the MA entity of its leader (now playing, position, shuffle, repeat, playing/paused)
- [ ] Derive the queue by calling `music_assistant.get_queue` service when the Queue tab is opened (or subscribe to queue state if MA exposes it as an entity)
- [ ] Implement browse-tree fetching: `media_player.browse_media` against the leader's MA entity; cache responses keyed by node
- [ ] Implement search: `music_assistant.search` service; debounce keystrokes; render results grouped by provider

**Done when**: open the card on a real summer-home dashboard, see all real zones, see actual MA library when you tap into Browse, see the actual queue when you tap Queue, search returns real results from Spotify/Apple Music/etc.

## Phase 3: Wire actions

Make every interaction in the card call the right HA service. **This is the critical phase for "does it actually work"** — go carefully and test each control before moving on.

Order to wire:

1. **Player tab transport** — play/pause/next/previous/seek/shuffle/repeat. All target the active group leader's MA entity. Validate position scrubbing actually seeks; some MA providers (Apple Music) have seek quirks.
2. **Group volume slider on Output tab** — when slider moves, set every member's WiiM volume proportionally to the new group volume. Per the architecture: never use MA group volume on Linkplay groups.
3. **Per-member volume sliders** — direct `media_player.volume_set` on the WiiM entity. No MA involvement.
4. **Group Sheet commit** — compute diff between current group membership and the draft, call `media_player.join` / `media_player.unjoin` on WiiM entities to converge. Verify the prototype's edge cases work: anchor unchecked (lead transfer), all unchecked (dissolve), room from another group (transfer).
5. **Browse → Play** — call `music_assistant.play_media` with the chosen URI. The target entity_id is the **group leader's MA entity** — the play-routing rule from ARCHITECTURE.md.
6. **Queue manipulation** — drag reorder, swipe delete, multi-select bulk delete, clear queue, play-next. All via `music_assistant.queue_*` services from the Queue Actions HACS integration.
7. **Search → Play / Enqueue** — same as Browse-Play, with optional "play next" / "add to queue" modes.

### Validation checklist for Phase 3

Run these manually against the real WiiMs before declaring Phase 3 done:

- [ ] Play a Spotify playlist to one solo zone. Verify audio comes out, now-playing is correct.
- [ ] Group two zones via the Group Sheet. Verify audio is in sync. (If 2-second delay → AirPlay path; if tighter → Linkplay path.)
- [ ] Group three zones, play a playlist. Walk between rooms — should sound like one continuous performance.
- [ ] Adjust group volume — every member moves together.
- [ ] Adjust individual member volume — only that member moves.
- [ ] Remove a member from the group — they go idle without disrupting playback elsewhere.
- [ ] Transfer the lead by unchecking the anchor — playback continues from the new lead.
- [ ] Dissolve a group — all members stop, except the previous lead which keeps playing solo (TBD product decision — confirm desired behavior).
- [ ] Play Marlene's Spotify in one group while Abe's Spotify plays in another simultaneously. Verify accounts don't cross-contaminate.
- [ ] Queue reorder by drag. Verify the queue stays in sync between MA and the card.
- [ ] Swipe-delete a track from the queue. Verify it's gone.

## Phase 4: Polish

- [ ] Loading states (skeletons for browse fetches, search debounce)
- [ ] Error handling (toast on failed service calls; HA's notify API or in-card banner)
- [ ] Card config editor (visual Lovelace editor instead of YAML-only)
- [ ] Theme variable support (let users override the accent color etc. via HA themes)
- [ ] Density modes (compact / regular / comfy)
- [ ] Persist active lead per-dashboard to `localStorage`
- [ ] Visual feedback for Linkplay group changes happening from *outside* the card (e.g., someone groups via WiiM Home app — card should reflect within ~1s of state change)
- [ ] HACS validation: README badges, sample images, version tagging
- [ ] First public release

## Phase 5 (future, not in initial scope)

- Per-zone EQ control (RoomFit) via WiiM app deep-link or a custom integration extension
- Apple Music lossless detection + warning (since AirPlay caps at 16/44.1)
- Apartment compatibility tuning (Sonos entities replacing WiiM entities, same UI)
- Multi-account default routing per HA user (Marlene's user → her Spotify default)
- Voice command surfaces (visual feedback when voice triggers playback through the card)
