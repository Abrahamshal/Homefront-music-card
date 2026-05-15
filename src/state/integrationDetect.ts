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
 * Caveats:
 *
 * - **MA**: presence of the `music_assistant.play_media` service is the
 *   strongest single signal; the integration registers it on startup.
 * - **Queue Actions** is a HACS integration that exposes additional
 *   `music_assistant.queue_*` services. Service names have evolved across
 *   versions (`queue_command_move` vs `queue_move`, etc.); we accept any of
 *   the known variants.
 * - **WiiM/Linkplay**: detected by scanning for a `media_player.*` entity
 *   that exposes Linkplay-style attributes. `linkplay_mode` is the most
 *   specific signal. `group_leader` is a weaker fallback — HA's stock
 *   media_player doesn't expose it, but a few non-WiiM integrations do, so
 *   the false-positive rate is low but nonzero.
 *
 * A more reliable detection path is the `config_entries/get` WebSocket
 * call (see HA_INTEGRATION.md). We'll add that as a verification step in
 * Chunk B once we know which call shape mjcumming/wiim uses in
 * production.
 */
export function checkIntegrations(hass: HomeAssistant): IntegrationStatus {
  const services = hass.services ?? {};
  const ma = (services.music_assistant ?? {}) as Record<string, unknown>;
  const states = hass.states ?? {};

  const hasMA = !!ma.play_media;

  const hasQueueActions = !!(
    ma.queue_command_move ||
    ma.queue_move ||
    ma.queue_command_delete ||
    ma.queue_remove ||
    ma.queue_command_clear ||
    ma.queue_clear
  );

  const hasWiim = Object.values(states).some((s) => {
    if (!s.entity_id.startsWith('media_player.')) return false;
    const attrs = s.attributes;
    return (
      attrs.linkplay_mode !== undefined ||
      // Some WiiM integration versions surface this attribute on the
      // device entity. Standard HA media_player does not.
      (attrs as { wiim_mode?: unknown }).wiim_mode !== undefined
    );
  });

  return {
    hasMA,
    hasQueueActions,
    hasWiim,
    allPresent: hasMA && hasQueueActions && hasWiim,
  };
}
