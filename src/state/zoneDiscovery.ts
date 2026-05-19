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
export function discoverZones(hass: HomeAssistant): ZoneConfig[] {
  const states = hass.states ?? {};
  const zones: ZoneConfig[] = [];

  for (const entity of Object.values(states)) {
    if (!entity.entity_id.startsWith('media_player.')) continue;
    const role = (entity.attributes as { group_role?: unknown }).group_role;
    if (role !== 'master' && role !== 'slave' && role !== 'solo') continue;

    const base = entity.entity_id.replace(/^media_player\./, '');
    const candidates = [`media_player.${base}_2`, `media_player.${base}_ma`];
    const maEntityId = candidates.find((id) => states[id] !== undefined);
    if (!maEntityId) continue;

    const friendly = (entity.attributes.friendly_name as string | undefined) ?? base;
    zones.push({
      name: friendly,
      wiim: entity.entity_id,
      ma: maEntityId,
    });
  }

  // Stable ordering by name so the chip rail and Output list don't reshuffle
  // every time hass ticks.
  zones.sort((a, b) => a.name.localeCompare(b.name));
  return zones;
}
