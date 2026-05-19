import type { HomeAssistant } from '../types.js';
import type { ZoneConfig } from '../types.js';

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
}

export function discoverZones(hass: HomeAssistant): ZoneConfig[] {
  return discoverZonesWithDiagnostics(hass).zones;
}

export function discoverZonesWithDiagnostics(hass: HomeAssistant): DiscoveryResult {
  const states = hass.states ?? {};
  const zones: ZoneConfig[] = [];
  const notes: string[] = [];

  // Pass 1: strict — entities that expose `group_role` (mjcumming/wiim).
  const wiimByRole = Object.values(states).filter((e) => {
    if (!e.entity_id.startsWith('media_player.')) return false;
    const role = (e.attributes as { group_role?: unknown }).group_role;
    return role === 'master' || role === 'slave' || role === 'solo';
  });
  notes.push(
    `pass 1 (group_role): ${wiimByRole.length} candidate WiiM device entities`,
  );

  for (const entity of wiimByRole) {
    const base = entity.entity_id.replace(/^media_player\./, '');
    const candidates = [
      `media_player.${base}_2`,
      `media_player.${base}_ma`,
    ];
    const maEntityId = candidates.find((id) => states[id] !== undefined);
    if (!maEntityId) {
      notes.push(
        `  ${entity.entity_id}: no MA pair at ${candidates.join(' / ')}`,
      );
      continue;
    }
    const friendly =
      (entity.attributes.friendly_name as string | undefined) ?? base;
    zones.push({ name: friendly, wiim: entity.entity_id, ma: maEntityId });
    notes.push(`  ${entity.entity_id} → ${maEntityId} as "${friendly}"`);
  }

  // Pass 2 (fallback): if pass 1 found nothing, try a permissive name-pair
  // scan. Look for `media_player.<name>` that has a `media_player.<name>_2`
  // sibling whose attributes look like MA's wrapper.
  if (zones.length === 0) {
    notes.push('pass 2 (fallback name-pair scan, since pass 1 was empty):');
    const allMps = Object.values(states).filter((e) =>
      e.entity_id.startsWith('media_player.'),
    );
    notes.push(`  ${allMps.length} total media_player entities in hass`);
    for (const candidate of allMps) {
      const id = candidate.entity_id;
      if (id.endsWith('_2') || id.endsWith('_ma') || id.endsWith('_group_master')) continue;
      const base = id.replace(/^media_player\./, '');
      const maEntityId = [`media_player.${base}_2`, `media_player.${base}_ma`].find(
        (eid) => states[eid] !== undefined,
      );
      if (!maEntityId) continue;
      const friendly =
        (candidate.attributes.friendly_name as string | undefined) ?? base;
      zones.push({ name: friendly, wiim: id, ma: maEntityId });
      notes.push(`  ${id} → ${maEntityId} as "${friendly}" (no group_role attr)`);
    }
  }

  zones.sort((a, b) => a.name.localeCompare(b.name));
  notes.push(`final: ${zones.length} zone(s) discovered`);
  return { zones, notes };
}
