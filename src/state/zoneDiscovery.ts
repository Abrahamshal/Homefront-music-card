import type { HomeAssistant } from '../types.js';
import type { ZoneConfig } from '../types.js';

interface EntityRegistryEntry {
  entity_id: string;
  platform: string;
  device_id: string | null;
  config_entry_id: string | null;
}

/**
 * Auto-discover zones by finding WiiM device entities in hass and pairing
 * each with its Music Assistant counterpart.
 *
 * Heuristic:
 *
 * 1. Scan `hass.states` for any `media_player.*` whose `group_role`
 *    attribute is `master`, `slave`, or `solo`. Those are WiiM device
 *    entities (the attribute is unique to the mjcumming/wiim integration).
 * 2. For each WiiM entity at `media_player.<base>`, look for the MA
 *    counterpart at `media_player.<base>_2` (HA's default uniquification
 *    suffix when two integrations create entities for the same physical
 *    device) or `media_player.<base>_ma` (some installs).
 * 3. Pair them, using the WiiM entity's `friendly_name` as the zone label.
 *
 * Skips WiiM entities without an MA pair — Phase 2 needs both halves.
 *
 * A more robust pairing would walk HA's device registry via WebSocket
 * (entities sharing a `device_id` are the pair regardless of naming).
 * If users hit naming-mismatch issues in the wild, that's the upgrade
 * path.
 */
export interface DiscoveryResult {
  zones: ZoneConfig[];
  /** Diagnostic trace for the discovery pass. Surfaced in console + UI. */
  notes: string[];
  /**
   * MA integration's config_entry_id. Required by service calls like
   * `music_assistant.search` and `music_assistant.get_library`. Only set
   * by registry-based discovery (the sync heuristic can't see it).
   */
  maConfigEntryId?: string;
}

export function discoverZones(hass: HomeAssistant): ZoneConfig[] {
  return discoverZonesWithDiagnostics(hass).zones;
}

export function discoverZonesWithDiagnostics(hass: HomeAssistant): DiscoveryResult {
  const states = hass.states ?? {};
  const zones: ZoneConfig[] = [];
  const notes: string[] = [];

  // Find every WiiM device entity by its `group_role` attribute (unique
  // to the mjcumming/wiim integration). This is direction-agnostic — we
  // don't care whether the WiiM got the unsuffixed entity_id or the `_2`
  // variant. The MA pair is identified by *not* having `group_role`.
  const wiimEntities = Object.values(states).filter((e) => {
    if (!e.entity_id.startsWith('media_player.')) return false;
    const role = (e.attributes as { group_role?: unknown }).group_role;
    return role === 'master' || role === 'slave' || role === 'solo';
  });
  notes.push(
    `WiiM device entities (group_role present): ${wiimEntities.length}`,
  );

  for (const wiim of wiimEntities) {
    const base = wiim.entity_id.replace(/^media_player\./, '');
    // Strip a trailing `_<N>` suffix (HA's auto-uniquification) so we can
    // also probe the base name as the MA partner — covers the case
    // where MA was installed first and got the unsuffixed entity_id.
    const stripped = base.replace(/_\d+$/, '');
    const candidates: string[] = [];
    if (stripped !== base) candidates.push(`media_player.${stripped}`);
    candidates.push(`media_player.${base}_2`);
    candidates.push(`media_player.${base}_ma`);
    candidates.push(`media_player.${base}_music_assistant`);

    let maEntityId: string | null = null;
    let triedDetail: string[] = [];
    for (const cand of candidates) {
      if (cand === wiim.entity_id) continue;
      const state = states[cand];
      if (!state) {
        triedDetail.push(`${cand} (missing)`);
        continue;
      }
      const role = (state.attributes as { group_role?: unknown }).group_role;
      if (role === undefined) {
        // No group_role → not a WiiM → this is the MA sibling.
        maEntityId = cand;
        triedDetail.push(`${cand} ✓`);
        break;
      }
      triedDetail.push(`${cand} (another WiiM)`);
    }

    if (!maEntityId) {
      notes.push(
        `  ${wiim.entity_id}: no MA partner. Tried: ${triedDetail.join(', ')}`,
      );
      continue;
    }
    const friendly =
      (wiim.attributes.friendly_name as string | undefined) ?? base;
    zones.push({ name: friendly, wiim: wiim.entity_id, ma: maEntityId });
    notes.push(
      `  ${friendly}: WiiM=${wiim.entity_id}, MA=${maEntityId}`,
    );
  }

  zones.sort((a, b) => a.name.localeCompare(b.name));
  notes.push(`final: ${zones.length} zone(s) discovered`);
  return { zones, notes };
}

/**
 * Discover zones via HA's entity registry — the authoritative source for
 * "which integration owns this entity" and "which physical device this
 * entity belongs to."
 *
 * Path:
 * 1. WS `config/entity_registry/list` returns every entity, with its
 *    `platform` (the integration domain) and `device_id` (the HA Device
 *    Registry ID for the physical hardware).
 * 2. Filter to `media_player.*` from platforms `wiim` or `music_assistant`.
 * 3. Group by `device_id`. Each device with both a WiiM and an MA entity
 *    becomes a zone.
 * 4. Skip the WiiM `*_group_master` virtual entity — it shares the
 *    device_id with the main WiiM entity but isn't the one we control.
 *
 * Naming-independent and order-independent. Falls back to
 * [[discoverZonesWithDiagnostics]] if the WS call errors (e.g. old HA).
 */
export async function discoverZonesFromRegistry(
  hass: HomeAssistant,
): Promise<DiscoveryResult> {
  const states = hass.states ?? {};
  const zones: ZoneConfig[] = [];
  const notes: string[] = [];

  let entries: EntityRegistryEntry[];
  try {
    entries = await hass.callWS<EntityRegistryEntry[]>({
      type: 'config/entity_registry/list',
    });
  } catch (err) {
    notes.push(`registry call failed: ${String(err)}`);
    return { zones, notes };
  }

  const mediaPlayers = entries.filter(
    (e) =>
      e.entity_id.startsWith('media_player.') &&
      (e.platform === 'wiim' || e.platform === 'music_assistant'),
  );
  notes.push(
    `registry: ${mediaPlayers.length} media_player entities from wiim/MA`,
  );

  // Group by device_id
  const byDevice = new Map<string, EntityRegistryEntry[]>();
  for (const e of mediaPlayers) {
    if (!e.device_id) {
      notes.push(`  ${e.entity_id} (${e.platform}): no device_id`);
      continue;
    }
    const list = byDevice.get(e.device_id) ?? [];
    list.push(e);
    byDevice.set(e.device_id, list);
  }

  let maConfigEntryId: string | undefined;
  for (const [deviceId, list] of byDevice) {
    // Pick the non-group-master WiiM entity (there may be both for an
    // active master).
    const wiim =
      list.find(
        (e) => e.platform === 'wiim' && !e.entity_id.endsWith('_group_master'),
      ) ?? list.find((e) => e.platform === 'wiim');
    const ma = list.find((e) => e.platform === 'music_assistant');
    if (!wiim || !ma) {
      const which = [
        wiim ? '' : 'WiiM',
        ma ? '' : 'MA',
      ]
        .filter(Boolean)
        .join(' + ');
      notes.push(
        `  device ${deviceId.slice(0, 8)}…: incomplete (missing ${which})`,
      );
      continue;
    }
    if (!maConfigEntryId && ma.config_entry_id) {
      maConfigEntryId = ma.config_entry_id;
    }
    const wiimState = states[wiim.entity_id];
    const friendly =
      (wiimState?.attributes.friendly_name as string | undefined) ??
      wiim.entity_id;
    zones.push({ name: friendly, wiim: wiim.entity_id, ma: ma.entity_id });
    notes.push(
      `  ${friendly}: WiiM=${wiim.entity_id} MA=${ma.entity_id} (device ${deviceId.slice(0, 8)}…)`,
    );
  }

  zones.sort((a, b) => a.name.localeCompare(b.name));
  notes.push(`final: ${zones.length} zone(s) via entity registry`);
  if (maConfigEntryId) notes.push(`MA config_entry_id captured`);
  return { zones, notes, maConfigEntryId };
}
