# Home Assistant Integration Reference

Quick-reference for the HA, Music Assistant, and mjcumming/wiim service calls and entity shapes the card needs. **Verify each shape against the live HA instance before relying on it** — service signatures evolve, and the mjcumming integration in particular has been moving fast.

## Lovelace card contract

A custom Lovelace card is a Web Component (Lit class) that:

1. Registers itself: `customElements.define('homefront-music-card', HomefrontMusicCard)`.
2. Exposes `setConfig(config)` — called when the card config is set or changes. Throw on invalid config.
3. Exposes `set hass(value)` — called on every HA state change. Card re-renders from `value.states`.
4. Optionally exposes `getCardSize()` — number of rows the card occupies in masonry view.
5. Optionally exposes static `getConfigElement()` and `getStubConfig()` for the visual editor.
6. Registers itself with `window.customCards` so HA's card picker shows it.

```ts
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'homefront-music-card',
  name: 'Homefront Music Card',
  description: 'Music Assistant + WiiM multi-room controller',
  preview: false,
});
```

## hass object essentials

```ts
interface HomeAssistant {
  states: Record<string, HassEntity>;
  services: Record<string, Record<string, ServiceMeta>>;
  config: HassConfig;
  themes: ThemeData;
  user: { name: string; id: string; is_admin: boolean };
  callService(domain: string, service: string, serviceData?: object, target?: object): Promise<void>;
  callWS<T>(msg: { type: string; [k: string]: any }): Promise<T>;
  callApi<T>(method: string, path: string, parameters?: object): Promise<T>;
  connection: { subscribeEvents, subscribeMessage, ... };
  localize(key: string, ...args: any[]): string;
}
```

We use `hass.callService` for all actions, `hass.callWS` for browse_media and queue inspection, and `hass.states[entityId]` to read state.

## WiiM (mjcumming/wiim) entities

Each WiiM Amp shows up as `media_player.<configured_name>`. State + relevant attributes:

```yaml
state: playing  # or paused, idle, off
attributes:
  friendly_name: "Pool"
  source: "Spotify"
  volume_level: 0.45        # 0..1
  media_title: "..."
  media_artist: "..."
  media_album_name: "..."
  entity_picture: "/api/..." # current album art URL
  # Multi-room grouping (these are the critical fields — VERIFY names):
  group_members:            # array of entity IDs of all group members (including self)
    - media_player.pool
    - media_player.bbq
  group_leader: media_player.pool   # which member is the lead
  # Linkplay-specific:
  linkplay_mode: "leader"   # leader | follower | solo (verify)
```

**Important**: the integration uses HA's standard `media_player.join` and `media_player.unjoin` services. Pass the leader as `entity_id` and the others in `group_members`:

```ts
// Group BBQ and Back Porch under Pool
await hass.callService('media_player', 'join', {
  group_members: ['media_player.bbq', 'media_player.back_porch'],
}, {
  entity_id: 'media_player.pool',
});

// Remove BBQ from the group
await hass.callService('media_player', 'unjoin', {}, {
  entity_id: 'media_player.bbq',
});
```

**Volume**:
```ts
await hass.callService('media_player', 'volume_set', {
  volume_level: 0.45,   // 0..1
}, {
  entity_id: 'media_player.pool',
});
```

## Music Assistant entities

Each MA player shows up as `media_player.<name>_2` (or with a `_ma` suffix, or some other disambiguator — depends on MA's naming when both integrations are configured for the same device). State + attributes:

```yaml
state: playing
attributes:
  friendly_name: "Pool (MA)"
  source: "Spotify"
  volume_level: 0.45
  media_title: "..."
  media_artist: "..."
  media_album_name: "..."
  entity_picture: "..."
  media_content_id: "spotify://track/..."
  media_content_type: "music"
  # MA-specific
  active_queue: "abc123"   # the queue ID for this player
  shuffle: false
  repeat: "off"            # off | one | all
  group_members: [ ... ]   # MA-level grouping — DO NOT USE for our card (use WiiM grouping)
```

### Play media via MA

```ts
// Play a specific Spotify playlist URI
await hass.callService('music_assistant', 'play_media', {
  media_id: 'spotify://playlist/37i9dQZF1DXcBWIGoYBM5M',
  media_type: 'playlist',
  enqueue: 'replace',   // replace | add | next | replace_next
  radio_mode: false,
}, {
  entity_id: 'media_player.pool_ma',   // the GROUP LEADER's MA entity
});
```

### Browse the library

Use HA's standard `media_player/browse_media` WebSocket command, targeted at an MA entity:

```ts
const root = await hass.callWS({
  type: 'media_player/browse_media',
  entity_id: 'media_player.pool_ma',
});
// root.children is an array of nodes, including providers (Spotify, Apple Music, ...)
// and a "Library" merged view at the top level.
// We SKIP "Library" and only render the per-provider children.

// Drill into a specific provider:
const spotifyNode = await hass.callWS({
  type: 'media_player/browse_media',
  entity_id: 'media_player.pool_ma',
  media_content_type: root.children[0].media_content_type,
  media_content_id: root.children[0].media_content_id,
});
```

Each browse node has the shape:

```ts
interface BrowseMediaSource {
  title: string;
  media_class: string;          // 'directory' | 'playlist' | 'album' | 'artist' | 'track' | ...
  media_content_id: string;     // unique ID, opaque to the card
  media_content_type: string;
  can_play: boolean;
  can_expand: boolean;          // true if you can browse into it
  thumbnail: string | null;     // image URL
  children: BrowseMediaSource[] | null;   // only populated if you've already fetched
}
```

### Queue operations (Music Assistant Queue Actions HACS integration)

This integration exposes services under the `music_assistant` domain (not a separate domain). **Verify exact service names against the installed integration** — they have evolved.

Likely services to use:

```ts
// Move a queue item
await hass.callService('music_assistant', 'queue_command_move', {
  queue_item_id: '...',
  position: 5,
}, {
  entity_id: 'media_player.pool_ma',
});

// Remove a queue item
await hass.callService('music_assistant', 'queue_command_delete', {
  queue_item_id: '...',
}, {
  entity_id: 'media_player.pool_ma',
});

// Clear the queue
await hass.callService('music_assistant', 'queue_command_clear', {}, {
  entity_id: 'media_player.pool_ma',
});

// Play a specific queue item
await hass.callService('music_assistant', 'queue_command_play_index', {
  index: 3,
}, {
  entity_id: 'media_player.pool_ma',
});
```

To **read** the current queue, MA may expose it via a sensor entity (`sensor.pool_ma_queue`), or via a service that returns it. Worst case, subscribe to WebSocket events for queue updates. **Confirm this against the live install**.

## Detecting integrations

For setup-help mode, the card needs to know whether MA + WiiM + Queue Actions are installed.

```ts
function checkIntegrations(hass: HomeAssistant) {
  const services = hass.services;
  return {
    hasMA: !!services.music_assistant?.play_media,
    hasQueueActions: !!services.music_assistant?.queue_command_move,
    hasWiim: Object.values(hass.states).some(s =>
      s.entity_id.startsWith('media_player.') &&
      s.attributes.linkplay_mode !== undefined
      // OR check for the integration in config entries via WebSocket API
    ),
  };
}
```

A more reliable detection is to call the WebSocket API to list config entries:

```ts
const entries = await hass.callWS<ConfigEntry[]>({ type: 'config_entries/get' });
const hasMA = entries.some(e => e.domain === 'music_assistant');
const hasWiim = entries.some(e => e.domain === 'wiim' || e.domain === 'linkplay');
```

## Theming

Use HA's CSS variables for theme-aware colors:

```css
:host {
  --hf-bg: var(--card-background-color, #16181d);
  --hf-text: var(--primary-text-color, #ecedef);
  --hf-text-dim: var(--secondary-text-color, rgba(236,237,239,0.55));
  --hf-accent: var(--accent-color, #e08a4a);
  --hf-border: var(--divider-color, rgba(255,255,255,0.07));
}
```

The prototype uses a custom accent (`#e08a4a` warm orange) that doesn't match most HA themes. We ship our own default but make it overridable via card config:

```yaml
type: custom:homefront-music-card
accent_color: '#e08a4a'   # optional override
```

## Performance notes

- HA fires a state change for every entity update, ~10-100 events per second in a busy installation. The card's `set hass(value)` runs on every one. **Memoize derived data**, don't recompute the speaker list / group tree on every hass tick.
- Album art via `entity_picture` is served by HA — but during browse we sometimes get URLs from MA that point at the music provider's CDN. Both work, but provider-CDN URLs may have CORS issues in some browsers; route them through HA's `/api/image_proxy` if needed.
- Browse responses cache well — keep a Map keyed by `media_content_id` and invalidate after N minutes or never.

## Known gotchas

- **Linkplay leader selection is alphabetical** in some firmware versions when groups persist. The card lets the user pick the leader via the Group Sheet's anchor mechanism, but if WiiM firmware overrides it, the card needs to refresh its view to match reality.
- **AirPlay playback regressions** were reported in MA 2.8.0 for WiiM Pro Plus — if the card's play action results in a 1-second playback then stops, fall back to Squeezelite output for that specific player (configured per-zone in MA's settings, not in the card).
- **MA volume normalization** defaults to -17 LUFS. Some users perceive this as "thin" sound vs. native WiiM playback. Note this in the README so users know where to look if they complain about audio quality.
- **Two MA entities for one device**: when both MA and WiiM integrations are configured for the same hardware, you get two media_player entities. The card's zone map config disambiguates them.
