// Minimal HomeAssistant type — extend as we wire up more features.
// The full type lives in `home-assistant-js-websocket` and `custom-card-helpers`,
// but pulling those in for a card adds weight; we declare just what we use.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    icon?: string;
    entity_picture?: string;
    // media_player attributes we'll touch:
    volume_level?: number;
    media_title?: string;
    media_artist?: string;
    media_album_name?: string;
    media_content_id?: string;
    media_content_type?: string;
    media_duration?: number;
    media_position?: number;
    media_position_updated_at?: string;
    shuffle?: boolean;
    repeat?: 'off' | 'one' | 'all';
    source?: string;
    source_list?: string[];
    group_members?: string[];
    // WiiM/Linkplay specific (verify names against integration):
    group_leader?: string;
    linkplay_mode?: 'leader' | 'follower' | 'solo';
  };
  last_changed: string;
  last_updated: string;
  context: { id: string; user_id: string | null };
}

export interface HassConfig {
  version: string;
  unit_system: { length: string; mass: string; temperature: string; volume: string };
  time_zone: string;
}

export interface HassUser {
  name: string;
  id: string;
  is_admin: boolean;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  services: Record<string, Record<string, unknown>>;
  config: HassConfig;
  themes: Record<string, unknown>;
  user?: HassUser;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[]; area_id?: string; device_id?: string }
  ): Promise<unknown>;
  callWS<T = unknown>(msg: { type: string; [k: string]: unknown }): Promise<T>;
  callApi<T = unknown>(method: string, path: string, parameters?: object): Promise<T>;
  localize(key: string, ...args: unknown[]): string;
}

// Card config schema (what users put in their Lovelace YAML).
export interface ZoneConfig {
  /** Display name for the zone (e.g. "Pool"). */
  name: string;
  /** WiiM media_player entity for this zone — used for grouping, volume, native source. */
  wiim: string;
  /** Music Assistant media_player entity for this zone — used for browse / queue / play. */
  ma: string;
}

export interface HomefrontCardConfig {
  type: 'custom:homefront-music-card';
  /** List of zones the card should control. Source of truth for entity discovery. */
  zones?: ZoneConfig[];
  /** Visual density preference. */
  density?: 'compact' | 'regular' | 'comfy';
  /** WiiM entity ID to focus first when the card loads. */
  default_lead?: string;
  /** Override the default accent color. */
  accent_color?: string;
  /** Render a diagnostic overlay showing zone discovery output. */
  debug?: boolean;
  /**
   * Card sizing mode:
   *   - `card` (default): phone-shaped artboard, max 820px / 90vh.
   *   - `panel`: fills the dashboard area, no max height. Pair with a
   *     Lovelace view in **Panel (1 card)** mode for a true full-page UI.
   */
  layout?: 'card' | 'panel';
}

// Browse media node shape (returned by media_player/browse_media WS command).
export interface BrowseMediaNode {
  title: string;
  media_class: string;
  media_content_id: string;
  media_content_type: string;
  can_play: boolean;
  can_expand: boolean;
  thumbnail: string | null;
  children?: BrowseMediaNode[];
  children_media_class?: string;
}

/**
 * A queue item returned by `mass_queue.get_queue_items`. Field names
 * follow the droans/mass_queue integration — verify against the live
 * response shape; some fields may be optional or named differently
 * across versions.
 */
export interface QueueItem {
  queue_item_id: string;
  name?: string;
  /** Some versions return `title` instead of `name`. */
  title?: string;
  artist?: string;
  album?: string;
  /** Seconds. Some versions use `duration_seconds`. */
  duration?: number;
  duration_seconds?: number;
  /** URL of the cover art, when available. */
  image_url?: string;
  thumbnail?: string;
  /** Whether this item is the currently-playing one. */
  is_current?: boolean;
}
