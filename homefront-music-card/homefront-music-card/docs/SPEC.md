# Spec

Screen-by-screen feature spec. Source of truth is the design prototype at `design-reference/project/Music Assistant Card.html` (the Refined variation). This doc captures the **intent** and translates the prototype's mock-data interactions into real HA service calls.

## Card frame

- **Container**: 16px border-radius rounded card, fills the dashboard cell. Should respect Lovelace card sizing — no fixed pixel dimensions in the final build; the prototype's 420×820 is a phone-shaped artboard, not a hard requirement.
- **Theme**: respects HA's light/dark theme variables (`--primary-text-color`, `--card-background-color`, etc.), but ships a default dark palette that matches the Refined prototype (`#16181d` bg, `#e08a4a` accent).
- **Title row** (`CardTitle` in prototype): label "Music Assistant" + "N groups playing" count, density toggle, theme toggle. In the real build, density is a card config option, not an in-card button.

## Tabs

Bottom tab bar with 5 tabs. Active tab gets accent-colored top stripe and accent-colored icon+label.

1. **Player** — Now playing for the active group
2. **Browse** — Source → Account → Type → Detail
3. **Search** — Cross-provider search results grouped by source
4. **Queue** — The active group's queue with drag/swipe/multi-select
5. **Output** — All groups, room-by-room volume, grouping management

## Group chip rail

Horizontal pill rail directly under the title row, above the tab content. Shows every group as a pill. Active group's pill is filled with the accent color; inactive groups are outlined; idle solo speakers are ghosted (lower opacity).

- Tap a pill → set that group as the active group (changes which group the Player/Queue/etc. tabs control).
- Each pill shows: a playing-eq-bar mini-icon if the group is playing, the group's display name (member names joined with ` + `, or just the lead's name if solo), a member count badge if >1 member.
- A dashed-outline `…` button at the end of the rail jumps to the Output tab.

## Player tab

- **Album art** — large centered square, ~280px max width, 18px radius, big drop shadow. Renders the current track's album art if available, else a gradient placeholder.
- **Metadata** — centered above album-art: label "Now Playing · {album name}" (or "Shuffle · …" when shuffle is on), then track name (20px bold), artist name (13px dim).
- **Scrubber** — slider showing position/duration with current time and remaining time.
- **Transport row** — Shuffle, Previous, Play/Pause (large accent-colored circle), Next, Repeat. Repeat cycles through off/all/one.
- **Output indicator** — at the bottom: a card showing the active group name, member count if >1, current volume, and a separate "Group" button on the right. Tap the body → switch to Output tab; tap the Group button → open the Group Sheet directly.

### Actions

| UI control | HA service call |
|---|---|
| Play/Pause | `media_player.media_play` / `media_player.media_pause` on `<leader's MA entity>` |
| Previous | `media_player.media_previous_track` on `<leader's MA entity>` |
| Next | `media_player.media_next_track` on `<leader's MA entity>` |
| Scrubber drag | `media_player.media_seek` on `<leader's MA entity>` with `seek_position` |
| Shuffle toggle | `media_player.shuffle_set` on `<leader's MA entity>` |
| Repeat toggle | `media_player.repeat_set` on `<leader's MA entity>` (`off` / `all` / `one`) |

## Browse tab

The flow the user explicitly asked for: **Source → Account → (Playlists / Albums / Artists / Tracks / Radio) → Detail**. Crucially, the merged "Library" view at MA's browse root is **bypassed** — the card always shows providers separated.

### Levels

1. **Sources** (default landing). One large ProviderTile per configured music provider in MA. Shows provider name + glyph + account count + "connected" status.
2. **Accounts** (after picking a provider). One AccountTile per account configured for that provider. For two-Spotify households this is where they separate; for single-account providers it's an auto-skip (drill straight to types).
3. **Types**. SubTabs strip: Playlists / Albums / Artists / Tracks / Radio. Below the strip, the grid/list for the chosen type.
   - Playlists, Albums → 2-column grid of `ArtTile`s with album art, name, sub (track count for playlists, artist for albums).
   - Artists → vertical list with circular gradient avatar, name, "Artist" label.
   - Tracks → numbered track rows.
   - Radio → list with station art, name, genre, inline play button.
4. **Detail** (after picking a playlist or album). Header with large 112px art tile, name, owner / artist, track count. Below: track list (up to 10 shown initially in prototype; real build paginates with "show more").

### Breadcrumb

`BackBar` at the top of the Browse tab. Crumbs render the path the user took (Sources → Spotify → Family · shared → Playlists → Sunday Cooking). Tap any crumb to pop back to that level.

### Actions

| UI control | HA service call |
|---|---|
| Tap a track | `music_assistant.play_media` on `<leader's MA entity>` with the track URI |
| Tap a playlist/album detail's "Play" | `music_assistant.play_media` with `radio_mode=false`, enqueues all tracks |
| Tap "Play next" on a track | `music_assistant.play_media` with `enqueue=next` |
| Tap "Add to queue" | `music_assistant.play_media` with `enqueue=add` |
| Browse navigation | `media_player.browse_media` service (returns child nodes) — but **scoped to the provider node, not the merged library root** |

### MA browse subtleties

- MA's browse tree exposes providers at the top level. Don't drill into "Library" (the merged view) — start at the specific provider node.
- For two Spotify accounts, MA exposes them as `Spotify (account name)` siblings. The card surfaces these as two separate provider tiles OR as one Spotify tile with two accounts (the prototype does the latter; either is acceptable).
- Browse responses can be large. Use lazy loading — fetch the next level only when the user navigates into it.

## Search tab

- Sticky search input at the top.
- Below, **type filter chips**: All / Playlists / Albums / Artists / Tracks.
- Results grouped by provider with a `SectionLabel` for each. Each group shows up to N results of each type.
- Empty state: a "SearchSuggestions" component with a few canned suggestions (recently played, trending, etc.) until the user types.

### Actions

| UI control | HA service call |
|---|---|
| Type in search | `music_assistant.search` service (per-provider parallel calls, or one MA-level call if it supports multi-provider — prefer this) |
| Tap a result | Same play actions as Browse |

## Queue tab

The Music Assistant queue for the active group, with full-featured manipulation:

- **Now-playing strip** at the top — small album art, track title, artist, jump-to-now button.
- **Header row**: "Up Next" + count, Clear Queue, Multi-select toggle.
- **Queue list**:
  - Grip handle on the left for drag-reorder.
  - Track art, name, artist, duration on the right.
  - Swipe left → reveals a red delete button (`SwipeRow` component in prototype).
  - In multi-select mode, checkboxes appear and the row becomes a toggle target.
- **Bulk action bar** (visible only when multi-select has ≥1 selection): "N selected", Remove, Move to Top, Cancel.

### Actions

| UI control | HA service call |
|---|---|
| Drag-reorder | `music_assistant.queue_move` (from Queue Actions HACS) |
| Swipe-delete | `music_assistant.queue_remove` |
| Multi-select bulk remove | `music_assistant.queue_remove` (loop) |
| Move to top / play next | `music_assistant.queue_move` (move to `currentIdx + 1`) |
| Clear queue | `music_assistant.queue_clear` |
| Tap a track | `music_assistant.queue_play_index` |

## Output tab (multi-group)

This is the **canonical room/group management view**. The Group chip rail and the Player tab's output indicator both link here.

- One **group card** per active group.
- Each group card contains:
  - A peek of current now-playing (small art, track, artist).
  - Group play/pause button.
  - Group name + member count + "Active" badge if this is the active group.
  - A "Group" button (opens the Group Sheet for this group).
  - **Group volume slider** (full-width).
  - Member list: one `MemberRow` per speaker in the group, with the speaker name, model, individual volume slider, and an `x` button to remove from group (one-tap leave).
- Below the active groups, an **Idle Speakers** rail: speakers not currently in any group. Each has a "Group" button (to start a new group from that speaker) and a "▶" button (to start playback as a new solo group).

### Actions

| UI control | HA service call |
|---|---|
| Group play/pause | Same as Player tab, scoped to that group's leader |
| Group volume slider | Per-member `media_player.volume_set` on WiiM entities, scaled proportionally |
| Member volume slider | `media_player.volume_set` on that WiiM entity |
| Remove member (×) | `media_player.unjoin` on WiiM entity (or mjcumming's equivalent service) |
| Start solo (▶) | `music_assistant.play_media` on the speaker's MA entity with whatever default content (resume queue, recently played, or radio) — TBD product decision |

## Group Sheet (Sonos-style)

A bottom-sheet modal that slides up over the card content. Single most important interaction in the whole card.

- **Header**: "Group rooms" title + "Choose rooms to play in sync with **{anchor room}**".
- **Body**: scrollable list, one row per speaker:
  - Square checkbox on the left.
  - Speaker name + model.
  - **Anchor badge** if this is the speaker being grouped from (locked checked, can't uncheck unless the user is the only one — see below).
  - Context line under the name showing where the speaker currently is: "In Patio", "Playing solo", "Idle".
  - Current volume on the right.
- **Footer**:
  - Status text: "N rooms grouped" / "Will play solo" / "Group will be dissolved".
  - Cancel button → discards changes, closes sheet.
  - Done button → commits, closes sheet.

### Commit logic

The prototype handles all the edge cases. Port faithfully:

- If the anchor is kept checked, it stays the leader. New checked rooms join.
- If the anchor is unchecked but other rooms are still checked, leadership transfers to the first remaining checked room. Playback follows.
- If everything is unchecked, the group dissolves.
- A room moved from another group is transferred (its old group loses it).
- A room that was solo-playing loses its solo player state when joining a group.

### Real HA service mapping

The mjcumming/wiim integration exposes group-management via standard HA `media_player.join` / `media_player.unjoin`:

```yaml
service: media_player.join
target:
  entity_id: media_player.pool  # the leader
data:
  group_members:
    - media_player.bbq
    - media_player.back_porch
```

The card builds the desired group from the sheet's draft state, compares to the current group state, computes a diff, and calls `join` / `unjoin` to converge. **Always uses WiiM entities, never MA entities**, for grouping.

## Misc

### Setup-help mode

If the card detects missing requirements (no MA integration, no WiiM integration, no Queue Actions), it renders a help panel instead of the main UI. Each missing piece gets a row with: what's missing, why it's needed, a link to install instructions.

### Card config

Lovelace YAML config the user provides:

```yaml
type: custom:homefront-music-card
zones:
  - name: Pool
    wiim: media_player.pool
    ma: media_player.pool_2
  - name: BBQ
    wiim: media_player.bbq
    ma: media_player.bbq_2
  # ... etc
density: regular   # compact | regular | comfy
default_lead: media_player.pool   # which group to focus on first load
```

The `zones` array is the source of truth for which entities the card cares about. Without it, the card auto-discovers (best-effort) by looking for matching WiiM + MA entity pairs.

### Persistence

The card persists the active lead ID to `localStorage` per dashboard, so refreshing returns to the same group.
