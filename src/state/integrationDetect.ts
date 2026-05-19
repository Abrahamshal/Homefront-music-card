import type { HomeAssistant } from '../types.js';

export interface IntegrationStatus {
  hasMA: boolean;
  hasQueueActions: boolean;
  hasWiim: boolean;
  allPresent: boolean;
  /** Diagnostic: every signal we evaluated, with what we found. */
  diagnostics: IntegrationDiagnostic[];
}

export interface IntegrationDiagnostic {
  /** Which integration this signal belongs to. */
  target: 'MA' | 'QueueActions' | 'WiiM';
  /** Human-readable description (e.g. "service mass_queue.get_queue_items"). */
  label: string;
  /** Whether the signal matched. */
  matched: boolean;
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
  const states = hass.states ?? {};
  const diagnostics: IntegrationDiagnostic[] = [];

  const ma = (services.music_assistant ?? {}) as Record<string, unknown>;
  const massQueue = (services.mass_queue ?? {}) as Record<string, unknown>;
  const wiimServices = (services.wiim ?? {}) as Record<string, unknown>;

  // MA
  const hasMA = !!ma.play_media;
  diagnostics.push({
    target: 'MA',
    label: 'service music_assistant.play_media',
    matched: hasMA,
  });

  // Queue Actions (droans/mass_queue)
  const queueServiceCandidates = [
    'get_queue_items',
    'remove_queue_item',
    'move_queue_item_up',
    'play_queue_item',
    'clear_queue_from_here',
  ];
  const matchedQueueSvc = queueServiceCandidates.find((s) => !!massQueue[s]);
  const hasQueueActions = !!matchedQueueSvc;
  diagnostics.push({
    target: 'QueueActions',
    label: `mass_queue domain has any of ${queueServiceCandidates.join(', ')}`,
    matched: hasQueueActions,
  });
  // Also surface what mass_queue.* keys we DID see, if any.
  const massQueueKeys = Object.keys(massQueue);
  if (massQueueKeys.length > 0) {
    diagnostics.push({
      target: 'QueueActions',
      label: `mass_queue domain services found: ${massQueueKeys.slice(0, 6).join(', ')}${massQueueKeys.length > 6 ? '…' : ''}`,
      matched: true,
    });
  }

  // WiiM (two parallel signals)
  const wiimServiceCandidates = ['play_preset', 'play_url', 'set_eq', 'get_queue'];
  const matchedWiimSvc = wiimServiceCandidates.find((s) => !!wiimServices[s]);
  const hasWiimServices = !!matchedWiimSvc;
  diagnostics.push({
    target: 'WiiM',
    label: `wiim domain has any of ${wiimServiceCandidates.join(', ')}`,
    matched: hasWiimServices,
  });
  const wiimServiceKeys = Object.keys(wiimServices);
  if (wiimServiceKeys.length > 0) {
    diagnostics.push({
      target: 'WiiM',
      label: `wiim domain services found: ${wiimServiceKeys.slice(0, 6).join(', ')}${wiimServiceKeys.length > 6 ? '…' : ''}`,
      matched: true,
    });
  }

  const hasWiimDeviceEntity = Object.values(states).some((s) => {
    if (!s.entity_id.startsWith('media_player.')) return false;
    const role = (s.attributes as { group_role?: unknown }).group_role;
    return role === 'master' || role === 'slave' || role === 'solo';
  });
  diagnostics.push({
    target: 'WiiM',
    label: 'any media_player.* attribute group_role is master/slave/solo',
    matched: hasWiimDeviceEntity,
  });

  const hasWiim = hasWiimServices || hasWiimDeviceEntity;

  return {
    hasMA,
    hasQueueActions,
    hasWiim,
    allPresent: hasMA && hasQueueActions && hasWiim,
    diagnostics,
  };
}
