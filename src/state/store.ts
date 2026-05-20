import {
  mockData,
  type Album,
  type MockSpeaker,
  type Track,
} from './mockData.js';
import type {
  BrowseMediaNode,
  HomeAssistant,
  HomefrontCardConfig,
  QueueItem,
  ZoneConfig,
} from '../types.js';
import {
  discoverZonesFromRegistry,
  discoverZonesWithDiagnostics,
} from './zoneDiscovery.js';
import {
  deriveSpeakers,
  derivePlayers,
  deriveCurrentTrack,
  deriveCurrentAlbum,
  idlePlaceholderTrack,
  idlePlaceholderAlbum,
  HASS_QUEUE_SENTINEL,
} from './hassDerive.js';

export type Tab = 'player' | 'browser' | 'search' | 'queue' | 'group';
export type Repeat = 'off' | 'one' | 'all';
export type BrowserSubtab = 'playlists' | 'albums' | 'artists' | 'tracks' | 'radio';
export type SearchFilter = 'all' | 'playlists' | 'albums' | 'artists' | 'tracks';

/** A speaker plus its current group leader. `leadId === id` means solo. */
export interface SpeakerWithLead extends MockSpeaker {
  leadId: string;
}

export interface PlayerState {
  /** Track IDs in play order. */
  queue: string[];
  /** Index in `queue` of the currently-playing track. */
  currentIdx: number;
  /** Position within the current track in seconds. */
  position: number;
  playing: boolean;
  shuffle: boolean;
  repeat: Repeat;
  /** Group volume 0–100 (mirrors all members' volume). */
  groupVolume: number;
}

export interface Group {
  leadId: string;
  lead: SpeakerWithLead;
  members: SpeakerWithLead[];
  /** Display name: lead.name when solo, otherwise members joined by " + ". */
  name: string;
  /** Undefined when the group is idle (solo speaker with no player state). */
  player: PlayerState | undefined;
  playing: boolean;
  isActive: boolean;
  isIdle: boolean;
}

export interface BrowserCrumb {
  kind: 'root' | 'provider' | 'account' | 'detail';
  label: string;
}

export interface BrowserState {
  crumbs: BrowserCrumb[];
  providerId: string | null;
  accountId: string | null;
  sub: BrowserSubtab;
  detailId: string | null;
}

export interface SearchState {
  query: string;
  filter: SearchFilter;
}

export interface GroupingSheetState {
  open: boolean;
  leadId: string | null;
}

export interface Toast {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

/** Generic search result item. Shape may vary between MA versions. */
export interface SearchResultItem {
  name?: string;
  title?: string;
  artist?: string;
  album?: string;
  uri?: string;
  media_content_id?: string;
  media_content_type?: string;
  image_url?: string;
  thumbnail?: string;
  duration?: number;
  /** Where this item came from (e.g. "spotify", "apple_music"). */
  provider?: string;
}

/** Grouped search results by media_type. */
export interface HassSearchResults {
  tracks: SearchResultItem[];
  albums: SearchResultItem[];
  artists: SearchResultItem[];
  playlists: SearchResultItem[];
  radio: SearchResultItem[];
  /** The query that produced these results — for cache invalidation. */
  query: string;
}

function defaultPlayer(queue: readonly string[], position: number, gv: number): PlayerState {
  return {
    queue: queue.slice(),
    currentIdx: 0,
    position,
    playing: true,
    shuffle: false,
    repeat: 'off',
    groupVolume: gv,
  };
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/**
 * Card-wide state and mutators, ported from the prototype's `useMusicCard`
 * hook. Plain class extending EventTarget; consumers subscribe via the
 * `change` event (or use [[StoreController]] in Lit components).
 *
 * Phase 1 seeds itself entirely from mock data. Phase 2 will:
 *   - replace the constructor's mock seed with derivation off `hass.states`
 *   - replace mutators with actual `media_player.*` / `music_assistant.*`
 *     service calls, optimistically updating local state pending state echo
 */
export class Store extends EventTarget {
  tab: Tab = 'player';
  speakers: SpeakerWithLead[];
  players: Record<string, PlayerState>;
  activeLeadId: string;
  browser: BrowserState = {
    crumbs: [{ kind: 'root', label: 'Sources' }],
    providerId: null,
    accountId: null,
    sub: 'playlists',
    detailId: null,
  };
  search: SearchState = { query: '', filter: 'all' };
  selectedTracks: Set<number> = new Set();
  multiMode = false;
  groupingSheet: GroupingSheetState = { open: false, leadId: null };

  private _tickInterval: number | null = null;

  /** Active toast notifications. Auto-dismiss after _toastTtlMs. */
  toasts: Toast[] = [];
  private _toastTtlMs = 4500;

  /** Latest hass snapshot. Null until the card receives one (dev/no-HA). */
  private _hass: HomeAssistant | undefined;
  /** Effective zone map — either explicit config.zones or auto-discovered. */
  private _zones: ZoneConfig[] = [];
  /** True once we've ever seen a hass AND found at least one zone. */
  private _isHassMode = false;
  /** Last discovery diagnostic for the debug overlay. */
  diagnosticNotes: string[] = [];
  private _registryAttempted = false;

  // ── hass-mode browse state ───────────────────────────────────────────────

  /** Stack of fetched browse nodes; last entry is the current view. */
  hassBrowseStack: BrowseMediaNode[] = [];
  hassBrowseLoading = false;
  hassBrowseError: string | null = null;
  /** Cache of fetched nodes keyed by media_content_id. */
  private _browseCache = new Map<string, BrowseMediaNode>();

  // ── hass-mode queue state ────────────────────────────────────────────────

  /** Queue items per leader's MA entity. Lazy-loaded on Queue tab open. */
  hassQueue: QueueItem[] = [];
  hassQueueLoading = false;
  hassQueueError: string | null = null;
  /** Which leadId the current hassQueue belongs to (for invalidation). */
  private _hassQueueLeadId: string | null = null;

  // ── hass-mode search state ───────────────────────────────────────────────

  /** MA's config_entry_id, captured during registry discovery. Required
   *  for `music_assistant.search` and `get_library`. */
  private _maConfigEntryId: string | null = null;
  /** Raw search response (we keep the shape flexible until we see it live). */
  hassSearchResults: HassSearchResults | null = null;
  hassSearchLoading = false;
  hassSearchError: string | null = null;

  constructor() {
    super();
    // Every speaker starts solo, then Kitchen joins Living Room (seeded
    // 2-speaker group so the multi-group UI has something to show).
    this.speakers = mockData.speakers.map((s) => ({ ...s, leadId: s.id }));
    const kitchen = this.speakers.find((s) => s.id === 'sp2');
    if (kitchen) kitchen.leadId = 'sp1';

    this.players = {
      sp1: { ...defaultPlayer(mockData.initialQueue, 48, 38), playing: true },
      sp5: {
        ...defaultPlayer(['tr3', 'tr18', 'tr7', 'tr12', 'tr22'], 14, 60),
        playing: true,
        shuffle: true,
      },
    };
    this.activeLeadId = 'sp1';

    // Restore persisted UI state (active group, tab) BEFORE we start
    // deriving from hass. Validity is re-checked after each derive in
    // case the saved active group no longer exists.
    this._loadPersistedState();

    this._startTick();
  }

  // ── persistence ──────────────────────────────────────────────────────────

  private static _STORAGE_KEY = 'homefront-music-card.ui-state';

  private _loadPersistedState(): void {
    try {
      const raw = window.localStorage?.getItem(Store._STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { activeLeadId?: string; tab?: Tab };
      if (saved.tab) this.tab = saved.tab;
      if (saved.activeLeadId) this.activeLeadId = saved.activeLeadId;
    } catch {
      // Ignore parse / quota errors; localStorage is a best-effort cache.
    }
  }

  private _persistUiState(): void {
    try {
      window.localStorage?.setItem(
        Store._STORAGE_KEY,
        JSON.stringify({
          activeLeadId: this.activeLeadId,
          tab: this.tab,
        }),
      );
    } catch {
      // Quota / private-mode errors are non-fatal.
    }
  }

  // ── derived ──────────────────────────────────────────────────────────────

  /** Cache for the `groups` getter, keyed on input identity. */
  private _groupsCache?: {
    speakers: SpeakerWithLead[];
    players: Record<string, PlayerState>;
    activeLeadId: string;
    result: Group[];
  };

  get groups(): Group[] {
    // Cheap memoization: speakers / players are replaced (not mutated)
    // by `_deriveFromHass`, so reference equality detects "no change."
    // At 11 zones × N hass ticks per second this matters; at 1 zone it's
    // free.
    const c = this._groupsCache;
    if (
      c &&
      c.speakers === this.speakers &&
      c.players === this.players &&
      c.activeLeadId === this.activeLeadId
    ) {
      return c.result;
    }

    const byLead: Record<string, SpeakerWithLead[]> = {};
    for (const s of this.speakers) {
      (byLead[s.leadId] ??= []).push(s);
    }
    const result = Object.keys(byLead)
      .map((lid) => {
        const members = byLead[lid]!;
        const lead = members.find((m) => m.id === lid) ?? members[0]!;
        const ps = this.players[lid];
        const name =
          members.length === 1 ? lead.name : members.map((m) => m.name).join(' + ');
        return {
          leadId: lid,
          lead,
          members,
          name,
          player: ps,
          playing: !!ps?.playing,
          isActive: lid === this.activeLeadId,
          isIdle: !ps,
        };
      })
      .sort((a, b) => {
        if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
        if (a.isIdle !== b.isIdle) return a.isIdle ? 1 : -1;
        return a.lead.name.localeCompare(b.lead.name);
      });

    this._groupsCache = {
      speakers: this.speakers,
      players: this.players,
      activeLeadId: this.activeLeadId,
      result,
    };
    return result;
  }

  get activePlayer(): PlayerState {
    const existing = this.players[this.activeLeadId];
    if (existing) return existing;
    // In hass-mode we synthesize an idle player rather than leaking mock
    // data through the queue fallback.
    if (this._isHassMode) {
      return defaultPlayer([HASS_QUEUE_SENTINEL], 0, 0);
    }
    return defaultPlayer(mockData.initialQueue, 0, 30);
  }

  get activeGroup(): Group | undefined {
    return this.groups.find((g) => g.leadId === this.activeLeadId);
  }

  get currentTrack(): Track {
    if (this._isHassMode && this._hass) {
      const zone = this._zones.find((z) => z.wiim === this.activeLeadId);
      if (zone) {
        const derived = deriveCurrentTrack(this._hass, zone.ma);
        if (derived) return derived;
      }
      return idlePlaceholderTrack();
    }
    const p = this.activePlayer;
    const id = p.queue[p.currentIdx];
    return (id ? mockData.trackById(id) : undefined) ?? mockData.tracks[0]!;
  }

  get currentAlbum(): Album {
    if (this._isHassMode && this._hass) {
      const zone = this._zones.find((z) => z.wiim === this.activeLeadId);
      if (zone) {
        const derived = deriveCurrentAlbum(this._hass, zone.ma);
        if (derived) return derived;
      }
      return idlePlaceholderAlbum();
    }
    const album = mockData.albumById(this.currentTrack.albumId);
    if (!album) throw new Error(`Missing album for track ${this.currentTrack.id}`);
    return album;
  }

  // ── hass / config integration ────────────────────────────────────────────

  /**
   * Bind the card's `hass` to the store. Re-derives speakers + players on
   * every call. The first call switches the store into hass-mode (stops
   * the mock 1-second tick, since HA pushes state updates).
   */
  setHass(hass: HomeAssistant): void {
    this._hass = hass;
    this._deriveFromHass();
    this._emit();
    // Kick off the authoritative entity-registry-based discovery once per
    // session. If it returns zones, they replace whatever the sync
    // heuristic found. If it fails, the sync result stays in play.
    if (!this._registryAttempted) {
      this._registryAttempted = true;
      void this._reconcileFromRegistry();
    }
  }

  private async _reconcileFromRegistry(): Promise<void> {
    if (!this._hass) return;
    const result = await discoverZonesFromRegistry(this._hass);
    if (result.zones.length === 0) {
      // Registry returned nothing — leave the sync result in place but
      // surface the diagnostic so we know why.
      this.diagnosticNotes = [
        ...this.diagnosticNotes,
        '— registry attempt —',
        ...result.notes,
      ];
      this._emit();
      return;
    }

    // Registry won. Adopt its zones; re-derive everything.
    this._zones = result.zones;
    if (result.maConfigEntryId) this._maConfigEntryId = result.maConfigEntryId;
    this.diagnosticNotes = ['Discovery: entity registry', ...result.notes];
    if (!this._isHassMode) {
      this._isHassMode = true;
      this._stopTick();
    }
    if (!this._hass) return;
    const speakers = deriveSpeakers(this._hass, this._zones);
    this.speakers = speakers;
    this.players = derivePlayers(this._hass, this._zones, speakers);
    if (!speakers.find((s) => s.id === this.activeLeadId)) {
      const firstLead =
        speakers.find((s) => s.id === s.leadId) ?? speakers[0];
      if (firstLead) this.activeLeadId = firstLead.id;
    }
    this._emit();
  }

  /**
   * Bind the card config. If zones are explicit, use them; otherwise
   * discovery runs on each hass update.
   */
  setConfig(config: HomefrontCardConfig): void {
    if (config.zones && config.zones.length > 0) {
      this._zones = config.zones;
    } else {
      this._zones = [];
    }
    if (this._hass) {
      this._deriveFromHass();
      this._emit();
    }
  }

  private _deriveFromHass(): void {
    if (!this._hass) return;

    // Resolve zones: explicit config wins; otherwise discover.
    let zones: ZoneConfig[];
    if (this._zones.length > 0 && this._isHassMode) {
      zones = this._zones;
      this.diagnosticNotes = ['using explicit config.zones from card YAML'];
    } else {
      const result = discoverZonesWithDiagnostics(this._hass);
      zones = result.zones;
      this.diagnosticNotes = result.notes;
      // eslint-disable-next-line no-console
      console.debug(
        '[homefront-music-card] zone discovery:\n' + result.notes.join('\n'),
      );
    }

    // If discovery found nothing, stay in mock mode so the user sees the
    // prototype rather than an empty card. They'll switch automatically
    // once a WiiM-MA pair becomes available.
    if (zones.length === 0) {
      // eslint-disable-next-line no-console
      console.warn(
        '[homefront-music-card] No zones discovered — staying in mock mode. See store.diagnosticNotes for details.',
      );
      return;
    }

    // First successful derivation flips us into hass-mode.
    if (!this._isHassMode) {
      this._isHassMode = true;
      this._stopTick();
    }

    this._zones = zones;
    const speakers = deriveSpeakers(this._hass, zones);
    this.speakers = speakers;
    this.players = derivePlayers(this._hass, zones, speakers);

    // Reset activeLeadId if it no longer exists in the derived speakers
    // (first hass after mock seed, or zone added/removed).
    if (!speakers.find((s) => s.id === this.activeLeadId)) {
      const firstLead =
        speakers.find((s) => s.id === s.leadId) ?? speakers[0];
      if (firstLead) this.activeLeadId = firstLead.id;
    }

    // Per-zone diagnostics: surface the MA entity's reported state +
    // key attributes so we can see when MA reports `idle` / lacks
    // metadata even though it's playing in the MA web UI.
    const extra: string[] = [];
    for (const z of zones) {
      const ma = this._hass.states?.[z.ma];
      if (!ma) {
        extra.push(`${z.name}: MA entity ${z.ma} not found in hass.states`);
        continue;
      }
      const a = ma.attributes as Record<string, unknown>;
      extra.push(
        `${z.name}: MA=${z.ma} state=${ma.state} title=${JSON.stringify(a.media_title ?? null)} artist=${JSON.stringify(a.media_artist ?? null)} pos=${a.media_position ?? '-'} shuffle=${a.shuffle ?? '-'}`,
      );
    }
    this.diagnosticNotes = [...this.diagnosticNotes, '— per-zone MA state —', ...extra];
  }

  /** Is the store currently driven from hass (vs. mock data)? */
  get isHassMode(): boolean {
    return this._isHassMode;
  }

  private _stopTick(): void {
    if (this._tickInterval !== null) {
      window.clearInterval(this._tickInterval);
      this._tickInterval = null;
    }
  }

  // ── notification ─────────────────────────────────────────────────────────

  private _emit(): void {
    this.dispatchEvent(new Event('change'));
  }

  // ── toasts ───────────────────────────────────────────────────────────────

  showToast(message: string, level: Toast['level'] = 'info'): void {
    const id = `t${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    this.toasts = [...this.toasts, { id, level, message }];
    this._emit();
    window.setTimeout(() => this.dismissToast(id), this._toastTtlMs);
  }

  dismissToast(id: string): void {
    const before = this.toasts.length;
    this.toasts = this.toasts.filter((t) => t.id !== id);
    if (this.toasts.length !== before) this._emit();
  }

  // ── service dispatch ─────────────────────────────────────────────────────

  /**
   * Fire-and-forget service call. No-op when not in hass-mode (i.e.,
   * dev/mock). Failures show an error toast and log to console.
   */
  private _callService(
    domain: string,
    service: string,
    data: Record<string, unknown> = {},
    target: { entity_id?: string | string[]; area_id?: string; device_id?: string } = {},
  ): void {
    if (!this._isHassMode || !this._hass) return;
    this._hass
      .callService(domain, service, data, target)
      .catch((err: unknown) => {
        // eslint-disable-next-line no-console
        console.warn(
          `[homefront-music-card] ${domain}.${service} failed:`,
          err,
        );
        const msg = (err as { message?: string } | null)?.message ?? String(err);
        this.showToast(`${domain}.${service} failed: ${msg}`, 'error');
      });
  }

  /** Resolve the MA entity ID for a given group leader, or undefined. */
  private _maFor(leadId: string): string | undefined {
    return this._zones.find((z) => z.wiim === leadId)?.ma;
  }

  /**
   * Call a HA service that returns response data (e.g.
   * `mass_queue.get_queue_items`). Uses the raw `call_service` WS frame
   * with `return_response: true` since `hass.callService` doesn't
   * surface the response payload.
   */
  private async _callServiceWithResponse<T = unknown>(
    domain: string,
    service: string,
    data: Record<string, unknown> = {},
    target: { entity_id?: string | string[] } = {},
  ): Promise<T | undefined> {
    if (!this._isHassMode || !this._hass) return undefined;
    try {
      const result = await this._hass.callWS<{ response: T }>({
        type: 'call_service',
        domain,
        service,
        service_data: data,
        target,
        return_response: true,
      });
      return result?.response;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        `[homefront-music-card] ${domain}.${service} (with response) failed:`,
        err,
      );
      const msg = (err as { message?: string } | null)?.message ?? String(err);
      this.showToast(`${domain}.${service} failed: ${msg}`, 'error');
      return undefined;
    }
  }

  // ── browse (hass-mode) ───────────────────────────────────────────────────

  /** Fetch the MA browse root for the active leader and reset the stack. */
  async browseRoot(): Promise<void> {
    if (!this._isHassMode || !this._hass) return;
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    this.hassBrowseLoading = true;
    this.hassBrowseError = null;
    this._emit();
    try {
      const root = await this._hass.callWS<BrowseMediaNode>({
        type: 'media_player/browse_media',
        entity_id: ma,
      });
      // eslint-disable-next-line no-console
      console.debug(
        '[homefront-music-card] browse root response:',
        JSON.parse(JSON.stringify(root)),
      );
      // Filter out:
      //   - The merged "Library" view at MA's root (architecture rule).
      //   - HA's media-source framework entries (`media_class === 'app'`),
      //     which surface things like Camera, DLNA, Radio Browser, TTS —
      //     none of which are MA library content.
      const dropTitles = new Set(['library', 'music library', 'my music']);
      const filteredChildren = root.children?.filter((c) => {
        if (dropTitles.has(c.title.toLowerCase())) return false;
        if (c.media_class === 'app') return false;
        return true;
      });
      const rootWithFiltered = { ...root, children: filteredChildren };
      this._browseCache.clear();
      this._browseCache.set(root.media_content_id || '__root__', rootWithFiltered);
      this.hassBrowseStack = [rootWithFiltered];
    } catch (err) {
      this.hassBrowseError = String(err);
      // eslint-disable-next-line no-console
      console.warn('[homefront-music-card] browse_media root failed:', err);
    } finally {
      this.hassBrowseLoading = false;
      this._emit();
    }
  }

  /** Drill into a child node (push it onto the stack). */
  async browseInto(node: BrowseMediaNode): Promise<void> {
    if (!this._isHassMode || !this._hass) return;
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    const cached = this._browseCache.get(node.media_content_id);
    if (cached && cached.children) {
      this.hassBrowseStack = [...this.hassBrowseStack, cached];
      this._emit();
      return;
    }
    this.hassBrowseLoading = true;
    this.hassBrowseError = null;
    this._emit();
    try {
      const fetched = await this._hass.callWS<BrowseMediaNode>({
        type: 'media_player/browse_media',
        entity_id: ma,
        media_content_type: node.media_content_type,
        media_content_id: node.media_content_id,
      });
      this._browseCache.set(node.media_content_id, fetched);
      this.hassBrowseStack = [...this.hassBrowseStack, fetched];
    } catch (err) {
      this.hassBrowseError = String(err);
      // eslint-disable-next-line no-console
      console.warn('[homefront-music-card] browse_media drill failed:', err);
    } finally {
      this.hassBrowseLoading = false;
      this._emit();
    }
  }

  /** Pop the browse stack back to a specific depth. */
  browsePop(toDepth: number): void {
    this.hassBrowseStack = this.hassBrowseStack.slice(0, toDepth + 1);
    this._emit();
  }

  /**
   * Play a browse leaf via `music_assistant.play_media`. Targets the
   * active group leader's MA entity, per architecture.
   */
  playBrowseNode(
    node: BrowseMediaNode,
    enqueue: 'replace' | 'add' | 'next' | 'replace_next' = 'replace',
  ): void {
    if (!this._isHassMode) return;
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    this._callService(
      'music_assistant',
      'play_media',
      {
        media_id: node.media_content_id,
        media_type: node.media_content_type,
        enqueue,
        radio_mode: false,
      },
      { entity_id: ma },
    );
  }

  // ── queue (hass-mode) ────────────────────────────────────────────────────

  /**
   * Fetch the current MA queue for the active leader via
   * `mass_queue.get_queue_items` (with response). Called when the Queue
   * tab opens or after a mutating action.
   */
  async loadQueue(): Promise<void> {
    if (!this._isHassMode) return;
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    this.hassQueueLoading = true;
    this.hassQueueError = null;
    this._emit();
    const response = await this._callServiceWithResponse<{ queue_items?: QueueItem[] } | QueueItem[]>(
      'mass_queue',
      'get_queue_items',
      {},
      { entity_id: ma },
    );
    // Response shape varies between versions: sometimes the array is at
    // the top level, sometimes under `queue_items`.
    let items: QueueItem[] = [];
    if (Array.isArray(response)) {
      items = response;
    } else if (response && Array.isArray((response as { queue_items?: QueueItem[] }).queue_items)) {
      items = (response as { queue_items: QueueItem[] }).queue_items;
    } else if (response && typeof response === 'object') {
      // Try generic key search — first array value
      for (const v of Object.values(response)) {
        if (Array.isArray(v)) {
          items = v as QueueItem[];
          break;
        }
      }
    }
    this.hassQueue = items;
    this._hassQueueLeadId = this.activeLeadId;
    this.hassQueueLoading = false;
    this._emit();
  }

  /** Whether the loaded queue belongs to the current active lead. */
  get hassQueueIsFresh(): boolean {
    return this._hassQueueLeadId === this.activeLeadId;
  }

  /**
   * Fallback lookup for MA's config_entry_id when registry discovery
   * didn't capture it (some HA versions don't return that field on
   * `config/entity_registry/list`). Caches the result.
   */
  private async _fetchMaConfigEntryId(): Promise<string | null> {
    if (this._maConfigEntryId) return this._maConfigEntryId;
    if (!this._hass) return null;
    try {
      const entries = await this._hass.callWS<
        Array<{ domain: string; entry_id: string; title?: string }>
      >({ type: 'config_entries/get' });
      const ma = entries?.find((e) => e.domain === 'music_assistant');
      if (ma) {
        this._maConfigEntryId = ma.entry_id;
        // eslint-disable-next-line no-console
        console.debug(
          '[homefront-music-card] MA config_entry_id captured via config_entries/get:',
          ma.entry_id,
          ma.title,
        );
        return ma.entry_id;
      }
      // eslint-disable-next-line no-console
      console.warn(
        '[homefront-music-card] config_entries/get returned no music_assistant entry. Entries:',
        entries?.map((e) => e.domain),
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        '[homefront-music-card] config_entries/get failed:',
        err,
      );
    }
    return null;
  }

  /** Play a queue item by ID. */
  playQueueItem(queueItemId: string): void {
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    this._callService(
      'mass_queue',
      'play_queue_item',
      { queue_item_id: queueItemId },
      { entity_id: ma },
    );
    // Optimistic refresh after a beat so the now-playing reflects.
    window.setTimeout(() => void this.loadQueue(), 400);
  }

  /** Remove a queue item by ID. */
  removeQueueItem(queueItemId: string): void {
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    this._callService(
      'mass_queue',
      'remove_queue_item',
      { queue_item_id: queueItemId },
      { entity_id: ma },
    );
    // Optimistic local removal so UI updates instantly; reload to confirm.
    this.hassQueue = this.hassQueue.filter((q) => q.queue_item_id !== queueItemId);
    this._emit();
    window.setTimeout(() => void this.loadQueue(), 400);
  }

  /** Bulk remove. */
  removeQueueItems(queueItemIds: Set<string>): void {
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    for (const id of queueItemIds) {
      this._callService(
        'mass_queue',
        'remove_queue_item',
        { queue_item_id: id },
        { entity_id: ma },
      );
    }
    this.hassQueue = this.hassQueue.filter((q) => !queueItemIds.has(q.queue_item_id));
    this.selectedTracks = new Set();
    this.multiMode = false;
    this._emit();
    window.setTimeout(() => void this.loadQueue(), 600);
  }

  /** Clear all items after the current one. */
  clearQueueFromHere(): void {
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    this._callService('mass_queue', 'clear_queue_from_here', {}, { entity_id: ma });
    window.setTimeout(() => void this.loadQueue(), 400);
  }

  /** Move a single item to play next (top of upcoming). */
  moveQueueItemToTop(queueItemId: string): void {
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    this._callService(
      'mass_queue',
      'move_queue_item_next',
      { queue_item_id: queueItemId },
      { entity_id: ma },
    );
    window.setTimeout(() => void this.loadQueue(), 400);
  }

  // ── search (hass-mode) ───────────────────────────────────────────────────

  /**
   * Search MA's library + connected providers via the `music_assistant.search`
   * service. Stores grouped results on `hassSearchResults`. SearchTab
   * debounces input and calls this on user typing.
   *
   * Note: MA's search service is **library-wide** — results aren't
   * separated by account/provider. Same trade-off as `get_library`.
   *
   * @param query Free-text search query.
   * @param mediaTypes Restrict to these types; empty = all.
   * @param limit Max results per type (1–100, MA default is 5).
   */
  async searchMa(
    query: string,
    mediaTypes: string[] = [],
    limit = 25,
  ): Promise<void> {
    if (!this._isHassMode || !this._hass) return;
    const trimmed = query.trim();
    if (!trimmed) {
      this.hassSearchResults = null;
      this.hassSearchError = null;
      this._emit();
      return;
    }
    // Make sure we have MA's config_entry_id. Registry discovery
    // captures it if the WS response includes it; otherwise this
    // fallback looks it up via config_entries/get.
    if (!this._maConfigEntryId) {
      const found = await this._fetchMaConfigEntryId();
      if (!found) {
        this.hassSearchError =
          'Could not find Music Assistant config entry. Is the integration loaded?';
        this._emit();
        return;
      }
    }
    this.hassSearchLoading = true;
    this.hassSearchError = null;
    this._emit();

    const data: Record<string, unknown> = {
      config_entry_id: this._maConfigEntryId,
      name: trimmed,
      limit,
    };
    if (mediaTypes.length > 0) data.media_type = mediaTypes;

    const response = await this._callServiceWithResponse<unknown>(
      'music_assistant',
      'search',
      data,
      {},
    );
    // eslint-disable-next-line no-console
    console.debug('[homefront-music-card] search response:', response);
    this.hassSearchResults = this._normalizeSearchResponse(response, trimmed);
    this.hassSearchLoading = false;
    this._emit();
  }

  /**
   * Coerce MA's search response into a uniform shape. The actual
   * field names have varied across MA releases — we accept several
   * common variants and fall back gracefully.
   */
  private _normalizeSearchResponse(
    response: unknown,
    query: string,
  ): HassSearchResults {
    const empty: HassSearchResults = {
      tracks: [],
      albums: [],
      artists: [],
      playlists: [],
      radio: [],
      query,
    };
    if (!response || typeof response !== 'object') return empty;
    const r = response as Record<string, unknown>;
    const pluck = (...keys: string[]): SearchResultItem[] => {
      for (const k of keys) {
        const v = r[k];
        if (Array.isArray(v)) return v as SearchResultItem[];
      }
      return [];
    };
    return {
      tracks: pluck('tracks', 'track'),
      albums: pluck('albums', 'album'),
      artists: pluck('artists', 'artist'),
      playlists: pluck('playlists', 'playlist'),
      radio: pluck('radio', 'stations'),
      query,
    };
  }

  /** Play (or enqueue) a search result on the active group leader. */
  playSearchResult(
    item: SearchResultItem,
    enqueue: 'replace' | 'add' | 'next' = 'replace',
  ): void {
    const ma = this._maFor(this.activeLeadId);
    if (!ma) return;
    const media_id = item.uri ?? item.media_content_id;
    if (!media_id) {
      // eslint-disable-next-line no-console
      console.warn(
        '[homefront-music-card] search item has no uri/media_content_id:',
        item,
      );
      return;
    }
    this._callService(
      'music_assistant',
      'play_media',
      {
        media_id,
        media_type: item.media_content_type,
        enqueue,
        radio_mode: false,
      },
      { entity_id: ma },
    );
  }

  // ── tab ──────────────────────────────────────────────────────────────────

  setTab(t: Tab): void {
    if (this.tab === t) return;
    this.tab = t;
    this._persistUiState();
    this._emit();
  }

  // ── active lead ──────────────────────────────────────────────────────────

  setActiveLead(lid: string): void {
    if (!this.players[lid]) {
      this.players[lid] = defaultPlayer(mockData.initialQueue, 0, 30);
    }
    this.activeLeadId = lid;
    this._persistUiState();
    this._emit();
  }

  // ── per-active-player mutators ───────────────────────────────────────────

  private _patchActive(patch: Partial<PlayerState>): void {
    const cur =
      this.players[this.activeLeadId] ?? defaultPlayer(mockData.initialQueue, 0, 30);
    this.players[this.activeLeadId] = { ...cur, ...patch };
    this._emit();
  }

  setPlaying(v: boolean): void {
    this._patchActive({ playing: v });
    const ma = this._maFor(this.activeLeadId);
    if (ma) {
      this._callService(
        'media_player',
        v ? 'media_play' : 'media_pause',
        {},
        { entity_id: ma },
      );
    }
  }
  togglePlaying(): void {
    this.setPlaying(!this.activePlayer.playing);
  }
  setShuffle(v: boolean): void {
    this._patchActive({ shuffle: v });
    const ma = this._maFor(this.activeLeadId);
    if (ma) {
      this._callService('media_player', 'shuffle_set', { shuffle: v }, { entity_id: ma });
    }
  }
  toggleShuffle(): void {
    this.setShuffle(!this.activePlayer.shuffle);
  }
  setRepeat(r: Repeat): void {
    this._patchActive({ repeat: r });
    const ma = this._maFor(this.activeLeadId);
    if (ma) {
      this._callService('media_player', 'repeat_set', { repeat: r }, { entity_id: ma });
    }
  }
  cycleRepeat(): void {
    const cur = this.activePlayer.repeat;
    const nextR: Repeat = cur === 'off' ? 'all' : cur === 'all' ? 'one' : 'off';
    this.setRepeat(nextR);
  }
  setPosition(v: number): void {
    this._patchActive({ position: v });
    const ma = this._maFor(this.activeLeadId);
    if (ma) {
      this._callService('media_player', 'media_seek', { seek_position: v }, { entity_id: ma });
    }
  }

  next(): void {
    const p = this.activePlayer;
    this._patchActive({
      currentIdx: Math.min(p.queue.length - 1, p.currentIdx + 1),
      position: 0,
    });
    const ma = this._maFor(this.activeLeadId);
    if (ma) {
      this._callService('media_player', 'media_next_track', {}, { entity_id: ma });
    }
  }
  prev(): void {
    const p = this.activePlayer;
    if (p.position > 3) {
      this._patchActive({ position: 0 });
      const ma = this._maFor(this.activeLeadId);
      if (ma) {
        this._callService('media_player', 'media_seek', { seek_position: 0 }, { entity_id: ma });
      }
    } else {
      this._patchActive({
        currentIdx: Math.max(0, p.currentIdx - 1),
        position: 0,
      });
      const ma = this._maFor(this.activeLeadId);
      if (ma) {
        this._callService('media_player', 'media_previous_track', {}, { entity_id: ma });
      }
    }
  }

  // ── speakers / volume ────────────────────────────────────────────────────
  // Volume calls always target the WiiM entity, never the MA entity —
  // per the architecture, MA group volume on a Linkplay group would
  // collide with WiiM's native sync.

  setSpeakerVol(id: string, v: number): void {
    const sp = this.speakers.find((s) => s.id === id);
    if (!sp) return;
    sp.volume = v;
    this._emit();
    if (this._isHassMode) {
      this._callService(
        'media_player',
        'volume_set',
        { volume_level: clamp01(v / 100) },
        { entity_id: id },
      );
    }
  }

  setGroupVolumeFor(leadId: string, v: number): void {
    const cur = this.players[leadId];
    if (cur) this.players[leadId] = { ...cur, groupVolume: v };
    const memberIds: string[] = [];
    for (const s of this.speakers) {
      if (s.leadId === leadId) {
        s.volume = v;
        memberIds.push(s.id);
      }
    }
    this._emit();
    if (this._isHassMode && memberIds.length > 0) {
      // Per-member calls (parallel is fine; HA serializes WS frames anyway).
      const level = clamp01(v / 100);
      for (const id of memberIds) {
        this._callService(
          'media_player',
          'volume_set',
          { volume_level: level },
          { entity_id: id },
        );
      }
    }
  }

  setGroupVolume(v: number): void {
    this.setGroupVolumeFor(this.activeLeadId, v);
  }

  // ── grouping ─────────────────────────────────────────────────────────────
  // All grouping mutations target the WiiM entities. Per architecture,
  // never join/unjoin against MA entities for Linkplay-grouped speakers.

  ungroupSpeaker(id: string): void {
    const sp = this.speakers.find((s) => s.id === id);
    if (!sp) return;
    sp.leadId = id;
    this._emit();
    if (this._isHassMode) {
      this._callService('media_player', 'unjoin', {}, { entity_id: id });
    }
  }

  toggleGroupPlay(leadId: string): void {
    const cur = this.players[leadId];
    if (!cur) return;
    const wantPlay = !cur.playing;
    this.players[leadId] = { ...cur, playing: wantPlay };
    this._emit();
    const ma = this._maFor(leadId);
    if (ma) {
      this._callService(
        'media_player',
        wantPlay ? 'media_play' : 'media_pause',
        {},
        { entity_id: ma },
      );
    }
  }

  /**
   * Resume playback on an idle solo speaker. In hass-mode we just send
   * `media_play` to the speaker's MA entity — if MA has a queue it
   * resumes, otherwise it's a no-op until the user picks content from
   * the Browse tab (Phase 2 Chunk C wires that).
   *
   * In mock mode we seed a synthetic queue so the prototype keeps the
   * "tap ▶ to come alive" behavior.
   */
  startSoloPlayback(speakerId: string): void {
    if (this._isHassMode) {
      this.activeLeadId = speakerId;
      const ma = this._maFor(speakerId);
      if (ma) {
        this._callService('media_player', 'media_play', {}, { entity_id: ma });
      }
      this._emit();
      return;
    }
    this.players[speakerId] = defaultPlayer(mockData.initialQueue, 0, 30);
    this.activeLeadId = speakerId;
    this._emit();
  }

  // ── group sheet ──────────────────────────────────────────────────────────

  openGroupingSheet(leadId: string): void {
    this.groupingSheet = { open: true, leadId };
    this._emit();
  }

  closeGroupingSheet(): void {
    this.groupingSheet = { ...this.groupingSheet, open: false };
    this._emit();
  }

  /**
   * Reconcile a group's membership against the desired final set. Mirrors
   * the prototype's commit logic: leader stays if checked; otherwise
   * leadership transfers to the first remaining member; empty set
   * dissolves the group. Speakers joining from their own solo player lose
   * that player state.
   */
  commitGroupMembers(leadId: string, newMemberIds: string[]): void {
    const memberSet = new Set(newMemberIds);
    const newLead = memberSet.has(leadId) ? leadId : newMemberIds[0] ?? null;

    // Diff against current group membership BEFORE mutating speakers, so
    // we know who to send unjoin/join to.
    const currentMemberIds = this.speakers
      .filter((s) => s.leadId === leadId)
      .map((s) => s.id);
    const toUnjoin = currentMemberIds.filter((id) => !memberSet.has(id));
    const toJoin = newMemberIds.filter(
      (id) => !currentMemberIds.includes(id) && id !== newLead,
    );

    // Optimistic local update.
    this.speakers = this.speakers.map((sp) => {
      const wasMember = sp.leadId === leadId;
      const willBeMember = memberSet.has(sp.id);
      if (willBeMember) return { ...sp, leadId: newLead ?? sp.id };
      if (wasMember) return { ...sp, leadId: sp.id };
      return sp;
    });

    if (!newLead) {
      delete this.players[leadId];
    } else if (newLead !== leadId) {
      const carry =
        this.players[leadId] ?? defaultPlayer(mockData.initialQueue, 0, 30);
      this.players[newLead] = carry;
      delete this.players[leadId];
    }
    for (const id of newMemberIds) {
      if (id !== newLead) delete this.players[id];
    }

    if (this.activeLeadId === leadId) {
      if (newLead) {
        this.activeLeadId = newLead;
      } else {
        const fallback = this.speakers.find((s) => s.leadId === s.id);
        if (fallback) this.activeLeadId = fallback.id;
      }
    }

    this.groupingSheet = { ...this.groupingSheet, open: false };
    this._emit();

    // Service calls — all on WiiM entities, never on MA entities.
    if (this._isHassMode) {
      for (const id of toUnjoin) {
        this._callService('media_player', 'unjoin', {}, { entity_id: id });
      }
      if (newLead && toJoin.length > 0) {
        this._callService(
          'media_player',
          'join',
          { group_members: toJoin },
          { entity_id: newLead },
        );
      }
    }
  }

  // ── queue actions ────────────────────────────────────────────────────────

  setQueue(q: string[]): void {
    this._patchActive({ queue: q });
  }

  removeFromQueue(idx: number): void {
    const p = this.activePlayer;
    const nq = p.queue.slice();
    nq.splice(idx, 1);
    const ci = idx < p.currentIdx ? p.currentIdx - 1 : p.currentIdx;
    this._patchActive({ queue: nq, currentIdx: ci });
  }

  moveQueue(from: number, to: number): void {
    if (from === to) return;
    const p = this.activePlayer;
    const nq = p.queue.slice();
    const [m] = nq.splice(from, 1);
    if (m === undefined) return;
    nq.splice(to, 0, m);
    let ci = p.currentIdx;
    if (from === ci) ci = to;
    else if (from < ci && to >= ci) ci = ci - 1;
    else if (from > ci && to <= ci) ci = ci + 1;
    this._patchActive({ queue: nq, currentIdx: ci });
  }

  playTrackAt(idx: number): void {
    this._patchActive({ currentIdx: idx, position: 0, playing: true });
  }

  moveToTop(idx: number): void {
    this.moveQueue(idx, this.activePlayer.currentIdx + 1);
  }

  clearQueue(): void {
    const p = this.activePlayer;
    this._patchActive({ queue: p.queue.slice(0, p.currentIdx + 1) });
  }

  removeBulk(ids: Set<number>): void {
    const p = this.activePlayer;
    const nq = p.queue.filter((_, i) => !ids.has(i));
    this.players[this.activeLeadId] = { ...p, queue: nq };
    this.selectedTracks = new Set();
    this.multiMode = false;
    this._emit();
  }

  // ── browser nav ──────────────────────────────────────────────────────────

  browserGo(patch: Partial<BrowserState>): void {
    this.browser = { ...this.browser, ...patch };
    this._emit();
  }

  pushCrumb(crumb: BrowserCrumb, patch: Partial<BrowserState> = {}): void {
    this.browser = {
      ...this.browser,
      ...patch,
      crumbs: [...this.browser.crumbs, crumb],
    };
    this._emit();
  }

  popToCrumb(idx: number): void {
    const c = this.browser.crumbs.slice(0, idx + 1);
    const last = c[c.length - 1];
    let next: BrowserState = { ...this.browser, crumbs: c };
    if (last?.kind === 'root') {
      next = { ...next, providerId: null, accountId: null, detailId: null };
    } else if (last?.kind === 'provider') {
      next = { ...next, accountId: null, detailId: null };
    } else if (last?.kind === 'account') {
      next = { ...next, detailId: null };
    }
    this.browser = next;
    this._emit();
  }

  // ── search ───────────────────────────────────────────────────────────────

  setSearch(s: Partial<SearchState>): void {
    this.search = { ...this.search, ...s };
    this._emit();
  }

  setSelectedTracks(ts: Set<number>): void {
    this.selectedTracks = ts;
    this._emit();
  }

  setMultiMode(v: boolean): void {
    this.multiMode = v;
    if (!v) this.selectedTracks = new Set();
    this._emit();
  }

  // ── tick ─────────────────────────────────────────────────────────────────
  // Advances `position` for every playing player every second, rolling over
  // to the next queued track when the current one ends. Mirrors the
  // prototype's setInterval clock so groups feel live in the multi-group UI.

  private _startTick(): void {
    this._tickInterval = window.setInterval(() => this._tick(), 1000);
  }

  private _tick(): void {
    let changed = false;
    for (const lid of Object.keys(this.players)) {
      const p = this.players[lid]!;
      if (!p.playing) continue;
      const trId = p.queue[p.currentIdx];
      if (!trId) continue;
      const tr = mockData.trackById(trId);
      if (!tr) continue;
      if (p.position + 1 >= tr.durationSec) {
        this.players[lid] = {
          ...p,
          position: 0,
          currentIdx: Math.min(p.queue.length - 1, p.currentIdx + 1),
        };
      } else {
        this.players[lid] = { ...p, position: p.position + 1 };
      }
      changed = true;
    }
    if (changed) this._emit();
  }

  /** Stop the 1-second tick. Call when the host card disconnects. */
  dispose(): void {
    this._stopTick();
  }
}
