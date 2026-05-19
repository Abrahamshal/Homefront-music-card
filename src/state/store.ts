import {
  mockData,
  type Album,
  type MockSpeaker,
  type Track,
} from './mockData.js';
import type { HomeAssistant, HomefrontCardConfig, ZoneConfig } from '../types.js';
import { discoverZonesWithDiagnostics } from './zoneDiscovery.js';
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

  /** Latest hass snapshot. Null until the card receives one (dev/no-HA). */
  private _hass: HomeAssistant | undefined;
  /** Effective zone map — either explicit config.zones or auto-discovered. */
  private _zones: ZoneConfig[] = [];
  /** True once we've ever seen a hass AND found at least one zone. */
  private _isHassMode = false;
  /** Last discovery diagnostic for the debug overlay. */
  diagnosticNotes: string[] = [];

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

    this._startTick();
  }

  // ── derived ──────────────────────────────────────────────────────────────

  get groups(): Group[] {
    const byLead: Record<string, SpeakerWithLead[]> = {};
    for (const s of this.speakers) {
      (byLead[s.leadId] ??= []).push(s);
    }
    return Object.keys(byLead)
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

  // ── tab ──────────────────────────────────────────────────────────────────

  setTab(t: Tab): void {
    if (this.tab === t) return;
    this.tab = t;
    this._emit();
  }

  // ── active lead ──────────────────────────────────────────────────────────

  setActiveLead(lid: string): void {
    if (!this.players[lid]) {
      this.players[lid] = defaultPlayer(mockData.initialQueue, 0, 30);
    }
    this.activeLeadId = lid;
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
  }
  togglePlaying(): void {
    this._patchActive({ playing: !this.activePlayer.playing });
  }
  setShuffle(v: boolean): void {
    this._patchActive({ shuffle: v });
  }
  toggleShuffle(): void {
    this._patchActive({ shuffle: !this.activePlayer.shuffle });
  }
  setRepeat(r: Repeat): void {
    this._patchActive({ repeat: r });
  }
  cycleRepeat(): void {
    const cur = this.activePlayer.repeat;
    const nextR: Repeat = cur === 'off' ? 'all' : cur === 'all' ? 'one' : 'off';
    this._patchActive({ repeat: nextR });
  }
  setPosition(v: number): void {
    this._patchActive({ position: v });
  }

  next(): void {
    const p = this.activePlayer;
    this._patchActive({
      currentIdx: Math.min(p.queue.length - 1, p.currentIdx + 1),
      position: 0,
    });
  }
  prev(): void {
    const p = this.activePlayer;
    if (p.position > 3) {
      this._patchActive({ position: 0 });
    } else {
      this._patchActive({
        currentIdx: Math.max(0, p.currentIdx - 1),
        position: 0,
      });
    }
  }

  // ── speakers / volume ────────────────────────────────────────────────────

  setSpeakerVol(id: string, v: number): void {
    const sp = this.speakers.find((s) => s.id === id);
    if (!sp) return;
    sp.volume = v;
    this._emit();
  }

  setGroupVolumeFor(leadId: string, v: number): void {
    const cur = this.players[leadId];
    if (cur) this.players[leadId] = { ...cur, groupVolume: v };
    for (const s of this.speakers) {
      if (s.leadId === leadId) s.volume = v;
    }
    this._emit();
  }

  setGroupVolume(v: number): void {
    this.setGroupVolumeFor(this.activeLeadId, v);
  }

  // ── grouping ─────────────────────────────────────────────────────────────

  ungroupSpeaker(id: string): void {
    const sp = this.speakers.find((s) => s.id === id);
    if (!sp) return;
    sp.leadId = id;
    this._emit();
  }

  toggleGroupPlay(leadId: string): void {
    const cur = this.players[leadId];
    if (!cur) return;
    this.players[leadId] = { ...cur, playing: !cur.playing };
    this._emit();
  }

  startSoloPlayback(speakerId: string): void {
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
