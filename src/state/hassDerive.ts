import type { HomeAssistant, ZoneConfig } from '../types.js';
import type { PlayerState, Repeat, SpeakerWithLead } from './store.js';
import type { Album, Track } from './mockData.js';

/** Sentinel queue ID for the synthetic single-item queue in hass-mode. */
export const HASS_QUEUE_SENTINEL = '__hass__';

/**
 * Build speakers from configured zones + live WiiM entity state.
 *
 * - `id` is the WiiM entity_id; lead/group_members references compare
 *   against this same key, so leadId values stay self-consistent.
 * - `leadId` resolves to the entity_id of the group's master, derived
 *   from `group_role` + `group_members` per [[reference-wiim-integration]]:
 *     * solo → leadId = self
 *     * master → leadId = self
 *     * slave  → leadId = the member of `group_members` whose group_role is master
 * - `volume` is `volume_level * 100`, rounded.
 */
export function deriveSpeakers(hass: HomeAssistant, zones: ZoneConfig[]): SpeakerWithLead[] {
  const states = hass.states ?? {};
  const out: SpeakerWithLead[] = [];

  for (const zone of zones) {
    const wiim = states[zone.wiim];
    if (!wiim) continue;

    const attrs = wiim.attributes as Record<string, unknown>;
    const role = attrs.group_role as 'master' | 'slave' | 'solo' | undefined;
    const groupMembers = (attrs.group_members as string[] | undefined) ?? [];

    let leadId = zone.wiim;
    if (role === 'slave') {
      const masterEntity = groupMembers.find((eid) => {
        const s = states[eid];
        return (s?.attributes as { group_role?: unknown } | undefined)?.group_role === 'master';
      });
      if (masterEntity) leadId = masterEntity;
    }

    const volumeLevel = typeof attrs.volume_level === 'number' ? attrs.volume_level : 0;
    out.push({
      id: zone.wiim,
      name: zone.name,
      room: zone.name,
      model: (attrs.device_model as string | undefined) ?? 'WiiM',
      volume: Math.round(volumeLevel * 100),
      leadId,
    });
  }

  return out;
}

/**
 * Build per-lead player state by reading each leader's MA entity. The
 * queue is a synthetic single-item placeholder (`[HASS_QUEUE_SENTINEL]`);
 * the real queue lands in Phase 3 once we call `mass_queue.get_queue_items`.
 */
export function derivePlayers(
  hass: HomeAssistant,
  zones: ZoneConfig[],
  speakers: SpeakerWithLead[],
): Record<string, PlayerState> {
  const states = hass.states ?? {};
  const out: Record<string, PlayerState> = {};
  const leadIds = new Set(speakers.map((s) => s.leadId));

  for (const leadId of leadIds) {
    const zone = zones.find((z) => z.wiim === leadId);
    if (!zone) continue;
    const ma = states[zone.ma];
    if (!ma) continue;

    const attrs = ma.attributes as Record<string, unknown>;
    const groupMembers = speakers.filter((s) => s.leadId === leadId);
    const groupVolume =
      groupMembers.length === 0
        ? 0
        : Math.round(
            groupMembers.reduce((sum, s) => sum + s.volume, 0) / groupMembers.length,
          );

    const repeat = ((attrs.repeat as string | undefined) ?? 'off') as Repeat;

    // Always emit a player entry in hass-mode, even when MA is idle. The
    // queue carries the sentinel so currentTrack/Album fall through to
    // `deriveCurrentTrack` (which returns null when there's no
    // media_title — the store then synthesizes a "Nothing playing"
    // placeholder instead of mock data).
    out[leadId] = {
      queue: [HASS_QUEUE_SENTINEL],
      currentIdx: 0,
      position: typeof attrs.media_position === 'number' ? attrs.media_position : 0,
      playing: ma.state === 'playing',
      shuffle: !!attrs.shuffle,
      repeat,
      groupVolume,
    };
  }

  return out;
}

/**
 * Build a placeholder track for "nothing playing" — used by the store
 * when we're in hass-mode but MA has no media_title yet (idle, off, just
 * connected, etc.). Keeps the UI consistent and avoids mock-data leak.
 */
export function idlePlaceholderTrack(): Track {
  return {
    id: HASS_QUEUE_SENTINEL,
    name: 'Nothing playing',
    artist: '',
    album: '',
    albumId: HASS_QUEUE_SENTINEL,
    durationSec: 0,
  };
}

export function idlePlaceholderAlbum(): Album {
  return {
    id: HASS_QUEUE_SENTINEL,
    name: '',
    artist: '',
    h1: 220,
    h2: 280,
    year: 0,
  };
}

/**
 * Build a synthetic Track from the leader's MA entity attributes. Used
 * by the store's `currentTrack` getter when in hass-mode (queue contains
 * the [[HASS_QUEUE_SENTINEL]]).
 */
export function deriveCurrentTrack(hass: HomeAssistant, maEntityId: string): Track | null {
  const ma = hass.states?.[maEntityId];
  if (!ma) return null;
  const attrs = ma.attributes as Record<string, unknown>;
  const title = (attrs.media_title as string | undefined) ?? '';
  if (!title) return null;
  return {
    id: HASS_QUEUE_SENTINEL,
    name: title,
    artist: (attrs.media_artist as string | undefined) ?? '',
    album: (attrs.media_album_name as string | undefined) ?? '',
    albumId: HASS_QUEUE_SENTINEL,
    durationSec: typeof attrs.media_duration === 'number' ? attrs.media_duration : 0,
  };
}

/**
 * Build a synthetic Album with the MA entity's `entity_picture` URL, so
 * the card can render real album art instead of a gradient.
 */
export function deriveCurrentAlbum(hass: HomeAssistant, maEntityId: string): (Album & { imageUrl?: string }) | null {
  const ma = hass.states?.[maEntityId];
  if (!ma) return null;
  const attrs = ma.attributes as Record<string, unknown>;
  const name = (attrs.media_album_name as string | undefined) ?? '';
  const imageUrl = (attrs.entity_picture as string | undefined) ?? undefined;
  return {
    id: HASS_QUEUE_SENTINEL,
    name,
    artist: (attrs.media_artist as string | undefined) ?? '',
    h1: 220,
    h2: 280,
    year: 0,
    imageUrl,
  };
}
