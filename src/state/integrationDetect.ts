import type { HomeAssistant } from '../types.js';

export interface IntegrationStatus {
  hasMA: boolean;
  hasQueueActions: boolean;
  hasWiim: boolean;
  allPresent: boolean;
}

/**
 * Detects whether the three required integrations are installed in this
 * Home Assistant instance, using synchronous reads off `hass.services` and
 * `hass.states`.
 *
 * Signals (verified against the live integrations on 2026-05-15):
 *
 * - **MA**: presence of `music_assistant.play_media`.
 * - **Queue Actions** (droans/mass_queue HACS integration): registers
 *   services under the `mass_queue` domain (NOT `music_assistant`).
 *   `mass_queue.get_queue_items` is the canonical signal.
 * - **WiiM** (mjcumming/wiim HACS integration): two parallel signals,
 *   either is sufficient — services under the `wiim` domain (e.g.
 *   `wiim.play_preset`, registered at integration load), or any
 *   `media_player.*` whose attributes carry `group_role` ∈
 *   {`master`, `slave`, `solo`}. The service signal fires the moment the
 *   integration loads (before any device is added). The entity signal
 *   guards against the integration being installed but failing to load.
 */
export function checkIntegrations(hass: HomeAssistant): IntegrationStatus {
  const services = hass.services ?? {};
  const ma = (services.music_assistant ?? {}) as Record<string, unknown>;
  const massQueue = (services.mass_queue ?? {}) as Record<string, unknown>;
  const wiimServices = (services.wiim ?? {}) as Record<string, unknown>;
  const states = hass.states ?? {};

  const hasMA = !!ma.play_media;

  const hasQueueActions = !!(
    massQueue.get_queue_items ||
    massQueue.remove_queue_item ||
    massQueue.move_queue_item_up ||
    massQueue.play_queue_item ||
    massQueue.clear_queue_from_here
  );

  const hasWiimServices = !!(
    wiimServices.play_preset ||
    wiimServices.play_url ||
    wiimServices.set_eq ||
    wiimServices.get_queue
  );

  const hasWiimDeviceEntity = Object.values(states).some((s) => {
    if (!s.entity_id.startsWith('media_player.')) return false;
    const role = (s.attributes as { group_role?: unknown }).group_role;
    return role === 'master' || role === 'slave' || role === 'solo';
  });

  const hasWiim = hasWiimServices || hasWiimDeviceEntity;

  return {
    hasMA,
    hasQueueActions,
    hasWiim,
    allPresent: hasMA && hasQueueActions && hasWiim,
  };
}
