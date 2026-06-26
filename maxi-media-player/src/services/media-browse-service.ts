import { HomeAssistant } from 'custom-card-helpers';
import { CardConfig, MediaPlayerItem } from '../types';
import { MediaPlayer } from '../model/media-player';
import { stringContainsAnyItemInArray } from '../utils/media-browse-utils';
import { customEvent } from '../utils/utils';
import { HASS_MORE_INFO } from '../constants';
import { browseMediaPlayer } from '../upstream/data/media-player';
import { MusicAssistantService } from './music-assistant-service';
import { SearchMediaType } from '../sections/search/search.types';

export default class MediaBrowseService {
  private hass: HomeAssistant;
  private config: CardConfig;
  private musicAssistantService: MusicAssistantService;
  private massConfigEntryId: string | null = null;
  private massConfigDiscoveryDone = false;
  private massQueueConfigEntryId: string | null = null;
  private massQueueDiscoveryDone = false;

  constructor(hass: HomeAssistant, config: CardConfig) {
    this.hass = hass;
    this.config = config;
    this.musicAssistantService = new MusicAssistantService(hass);
  }

  private async getMassQueueConfigEntryId(): Promise<string | null> {
    if (!this.massQueueDiscoveryDone) {
      this.massQueueConfigEntryId = await this.musicAssistantService.discoverMassQueueConfigEntryId();
      this.massQueueDiscoveryDone = true;
    }
    return this.massQueueConfigEntryId;
  }

  /**
   * Browse Music Assistant's native source/account tree (the "Sources"
   * view). Returns provider/account folders at the root and that node's
   * children when a `path` is given. Requires the mass_queue integration
   * (it forwards MA's `music/browse` command).
   */
  async browseSources(path?: string): Promise<MediaPlayerItem[]> {
    const massQueueId = await this.getMassQueueConfigEntryId();
    if (!massQueueId) {
      console.warn('Music Assistant Queue (mass_queue) integration not found — required for source/account browsing');
      return [];
    }
    return this.musicAssistantService.browse(massQueueId, path);
  }

  /**
   * Drill into a container item's tracks (playlist / album / artist). MA's
   * `music/browse` tree only exposes folders → containers as leaves, so to
   * show a playlist's tracks we use mass_queue's `get_<type>_tracks`.
   */
  async browseSourcesCollection(uri: string, mediaType: string): Promise<MediaPlayerItem[]> {
    const massQueueId = await this.getMassQueueConfigEntryId();
    if (!massQueueId) {
      return [];
    }
    const items = await this.musicAssistantService.getCollectionItems(uri, mediaType as SearchMediaType, massQueueId);
    return items.map((it) => ({
      title: it.title,
      media_content_id: it.uri,
      media_content_type: it.mediaType,
      thumbnail: it.imageUrl,
      can_play: true,
    }));
  }

  private isMusicAssistant(player: MediaPlayer): boolean {
    return player.attributes.platform === 'music_assistant';
  }

  private async getMassConfigEntryId(): Promise<string | null> {
    if (!this.massConfigDiscoveryDone) {
      this.massConfigEntryId = await this.musicAssistantService.discoverConfigEntryId();
      this.massConfigDiscoveryDone = true;
    }
    return this.massConfigEntryId;
  }

  async getFavorites(player: MediaPlayer): Promise<MediaPlayerItem[]> {
    if (!player) {
      return [];
    }

    let favorites: MediaPlayerItem[];

    // For Music Assistant players, use the Music Assistant library
    if (this.isMusicAssistant(player)) {
      favorites = await this.getMusicAssistantFavorites();
    } else {
      favorites = await this.getFavoritesForPlayer(player);
      favorites = favorites.flatMap((f) => f);
      favorites = this.removeDuplicates(favorites);
      favorites = favorites.length ? favorites : this.getFavoritesFromStates(player);
    }

    const exclude = this.config.mediaBrowser?.favorites?.exclude ?? [];
    return favorites.filter((item) => {
      const titleNotIgnored = !stringContainsAnyItemInArray(exclude, item.title);
      const contentIdNotIgnored = !stringContainsAnyItemInArray(exclude, item.media_content_id ?? '');
      return titleNotIgnored && contentIdNotIgnored;
    });
  }

  private async getMusicAssistantFavorites(): Promise<MediaPlayerItem[]> {
    const configEntryId = await this.getMassConfigEntryId();
    if (!configEntryId) {
      console.warn('Music Assistant config entry not found');
      return [];
    }
    return this.musicAssistantService.getFavorites(configEntryId);
  }

  private removeDuplicates(items: MediaPlayerItem[]) {
    const seen = new Set<string>();
    return items.filter((item) => {
      const key = item.media_content_id || item.title;
      if (!key || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private async getFavoritesForPlayer(player: MediaPlayer) {
    const mediaRoot = await browseMediaPlayer(this.hass, player.id);
    const favoritesStr = 'favorites';
    const favoritesDir = mediaRoot.children?.find(
      (child) =>
        child.media_content_type?.toLowerCase() === favoritesStr ||
        child.media_content_id?.toLowerCase() === favoritesStr ||
        child.title.toLowerCase() === favoritesStr,
    );
    if (!favoritesDir) {
      return [];
    }
    const favorites: MediaPlayerItem[] = [];
    await this.browseDir(player, favoritesDir, favorites);
    return favorites;
  }

  private async browseDir(player: MediaPlayer, favoritesDir: MediaPlayerItem, favorites: MediaPlayerItem[]) {
    const dir = await browseMediaPlayer(this.hass, player.id, favoritesDir.media_content_id, favoritesDir.media_content_type);
    for (const child of dir.children ?? []) {
      if (child.can_play) {
        favorites.push({ ...child, favoriteType: dir.title });
      } else if (child.can_expand) {
        await this.browseDir(player, child, favorites);
      }
    }
  }

  private getFavoritesFromStates(mediaPlayer: MediaPlayer) {
    const titles = mediaPlayer.attributes.source_list ?? [];
    return titles.map((title: string) => ({ title }));
  }

  public showBrowseMedia(activePlayer: MediaPlayer, element: HTMLElement) {
    const detail = {
      entityId: activePlayer.id,
      view: 'info',
    };
    element.dispatchEvent(customEvent(HASS_MORE_INFO, detail));
  }
}
