import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { mdiArrowLeft, mdiClose, mdiMagnify, mdiMusicNote, mdiPlay, mdiStar } from '@mdi/js';
import Store from '../../../model/store';
import '../favorites/favorites-list';
import '../../../components/icon-button';
import { MEDIA_ITEM_SELECTED, mediaItemTitleStyle } from '../../../constants';
import { customEvent, getSpeakerList } from '../../../utils/utils';
import { MediaPlayerItem } from '../../../types';
import { mediaBrowserStyles } from '../styles';
import { renderLayoutMenu } from '../layout-menu';
import { mediaGridCardStyles, renderMediaGridCard } from '../utils';
import { LayoutType } from '../media-browser.types';

interface SourceNav {
  title: string;
  // For account/category folders: a music/browse path (per-account tree).
  path?: string;
  // For a container (playlist/album/artist): its media_content_id, drilled
  // via HA's browse_media (music/browse can't enter a playlist).
  collectionUri?: string;
  collectionType?: string;
}

// Module-level so the path survives view switches within a session, matching
// how browser.ts / media-browser-section.ts persist their state.
let currentNav: SourceNav[] | null = null;

/**
 * Source/account-separated browse view, powered by Music Assistant's native
 * `music/browse` command (via mass_queue). Unlike HA's merged
 * `media_player/browse_media`, this starts at one folder PER provider/account
 * — e.g. "Abe's Spotify", "Marlene's Spotify", "Eileen's Pandora" — and drills
 * down within a single account. Renders artwork when available and a provider/
 * category icon otherwise, so account + category folders never show blank tiles.
 */
export class MediaBrowserSources extends LitElement {
  @property({ attribute: false }) store!: Store;
  @property({ type: String }) layout: LayoutType = 'auto';
  @state() private nav: SourceNav[] = currentNav ?? [{ title: 'Sources' }];
  @state() private items: MediaPlayerItem[] = [];
  @state() private loading = false;
  @state() private error = '';
  // Client-side filter over the currently-loaded list (playlist tracks,
  // account folders, etc.). Resets on every navigation via load().
  @state() private filter = '';
  @state() private showSearch = false;

  private get filteredItems(): MediaPlayerItem[] {
    const q = this.filter.trim().toLowerCase();
    if (!q) {
      return this.items;
    }
    return this.items.filter((item) => item.title?.toLowerCase().includes(q));
  }

  connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  private async load() {
    const current = this.nav[this.nav.length - 1];
    this.loading = true;
    this.error = '';
    // A fresh list — drop any filter from the previous view.
    this.filter = '';
    this.showSearch = false;
    try {
      if (current?.collectionUri) {
        // Container (playlist/album/artist) → its tracks via browse_media.
        this.items = await this.store.mediaBrowseService.browseSourcesCollection(this.store.activePlayer.id, current.collectionUri, current.collectionType);
      } else {
        // Account/category folder → MA native per-account tree.
        this.items = await this.store.mediaBrowseService.browseSources(current?.path);
      }
      if (this.items.length === 0 && this.nav.length === 1) {
        this.error = 'No music sources found. (Requires Music Assistant + the Music Assistant Queue integration.)';
      }
    } catch (e) {
      console.error('Source browse failed:', e);
      this.error = 'Could not load this list from Music Assistant.';
      this.items = [];
    } finally {
      this.loading = false;
    }
  }

  private async selectItem(item: MediaPlayerItem) {
    // Account/category folder → drill via MA's native music/browse path.
    if (item.massBrowsePath) {
      this.nav = [...this.nav, { path: item.massBrowsePath, title: item.title }];
      currentNav = this.nav;
      await this.load();
      return;
    }
    // Container (playlist/album/artist) → drill into its tracks via
    // browse_media, so tapping it browses rather than playing + jumping.
    if (item.can_expand && item.media_content_id) {
      this.nav = [...this.nav, { collectionUri: item.media_content_id, collectionType: item.media_content_type, title: item.title }];
      currentNav = this.nav;
      await this.load();
      return;
    }
    // Leaf (track / radio) — play it on the active player. We deliberately
    // do NOT emit MEDIA_ITEM_SELECTED here: the card reacts to that by
    // auto-switching to the Player section (after a 1s delay), which is
    // jarring while you're browsing. Playback still happens; you stay put.
    await this.store.mediaControlService.playMedia(this.store.activePlayer, item);
  }

  // Event form for the list renderer (sonos-favorites-list emits item-selected).
  private onItemSelected = (event: CustomEvent) => {
    void this.selectItem(event.detail as MediaPlayerItem);
  };

  private goBack = () => {
    if (this.nav.length <= 1) {
      return;
    }
    this.nav = this.nav.slice(0, -1);
    currentNav = this.nav;
    void this.load();
  };

  private goToFavorites = () => {
    this.dispatchEvent(new CustomEvent('go-to-favorites'));
  };

  private toggleSearch = () => {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.filter = '';
    }
  };

  private onFilterInput = (e: Event) => {
    this.filter = (e.target as HTMLInputElement).value;
  };

  private clearFilter = () => {
    this.filter = '';
  };

  /** Play the whole container we're currently inside (playlist/album). */
  private playCurrentCollection = async () => {
    const current = this.nav[this.nav.length - 1];
    if (!current?.collectionUri) {
      return;
    }
    const collectionItem: MediaPlayerItem = {
      title: current.title,
      media_content_id: current.collectionUri,
      media_content_type: current.collectionType,
    };
    await this.store.mediaControlService.playMedia(this.store.activePlayer, collectionItem);
    this.dispatchEvent(customEvent(MEDIA_ITEM_SELECTED, collectionItem));
  };

  private handleLayoutChange = (ev: CustomEvent<{ item: { value: string } }>) => {
    this.dispatchEvent(new CustomEvent('layout-change', { detail: ev.detail.item.value }));
  };

  render() {
    const config = this.store.config.mediaBrowser ?? {};
    const playerName = getSpeakerList(this.store.activePlayer, this.store.predefinedGroups);
    const hideActivePlayerName = config.hideActivePlayerName ?? false;
    const title = this.nav[this.nav.length - 1]?.title || 'Sources';
    const useGrid = this.layout !== 'list';

    return html`
      ${config.hideHeader
        ? ''
        : html`<div class="header">
            ${this.nav.length > 1
              ? html`<sonos-icon-button .path=${mdiArrowLeft} @click=${this.goBack}></sonos-icon-button>`
              : html`<div class="spacer"></div>`}
            <div class="title-section">
              <span class="title">${title}</span>
              <span class="player-name" ?hidden=${hideActivePlayerName}>${playerName}</span>
            </div>
            ${this.nav[this.nav.length - 1]?.collectionUri
              ? html`<sonos-icon-button .path=${mdiPlay} @click=${this.playCurrentCollection} title="Play all"></sonos-icon-button>`
              : ''}
            <sonos-icon-button
              class=${this.showSearch ? 'search-active' : ''}
              .path=${mdiMagnify}
              @click=${this.toggleSearch}
              title="Search this list"
            ></sonos-icon-button>
            <sonos-icon-button .path=${mdiStar} @click=${this.goToFavorites} title="Favorites"></sonos-icon-button>
            ${renderLayoutMenu(this.layout, this.handleLayoutChange)}
          </div>`}
      ${this.showSearch
        ? html`<div class="search-bar">
            <sonos-icon-button .path=${mdiMagnify}></sonos-icon-button>
            <input type="text" placeholder="Filter ${title}…" .value=${this.filter} @input=${this.onFilterInput} autofocus />
            <sonos-icon-button .path=${mdiClose} @click=${this.clearFilter} title="Clear" ?hidden=${!this.filter}></sonos-icon-button>
          </div>`
        : ''}
      ${this.loading
        ? html`<div class="sources-message">Loading…</div>`
        : this.error
          ? html`<div class="sources-message">${this.error}</div>`
          : this.items.length === 0
            ? html`<div class="sources-message">Empty</div>`
            : this.filteredItems.length === 0
              ? html`<div class="sources-message">No matches for “${this.filter}”.</div>`
              : useGrid
                ? this.renderGrid()
                : html`<sonos-favorites-list .items=${this.filteredItems} .store=${this.store} @item-selected=${this.onItemSelected}></sonos-favorites-list>`}
    `;
  }

  private renderGrid() {
    const itemsPerRow = this.store.config.mediaBrowser?.itemsPerRow || 3;
    const margin = '1%';
    const cardStyle = styleMap({
      width: `calc(100% / ${itemsPerRow} - ${margin} * 2)`,
      margin,
    });
    return html`
      <div class="sources-grid">
        ${this.filteredItems.map((item) => {
          const thumbnailContent = item.thumbnail
            ? html`<div class="image" style="background-image:url('${item.thumbnail}')"></div>`
            : html`<div class="image icon-fallback">
                <ha-svg-icon .path=${item.massIconPath ?? mdiMusicNote}></ha-svg-icon>
              </div>`;
          return html`<div style=${cardStyle}>${renderMediaGridCard({ item, onClick: () => void this.selectItem(item), thumbnailContent })}</div>`;
        })}
      </div>
    `;
  }

  static get styles() {
    return [
      mediaItemTitleStyle,
      mediaGridCardStyles,
      mediaBrowserStyles,
      css`
        .sources-grid {
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          flex: 1;
          min-height: 0;
          overflow: auto;
        }
        sonos-favorites-list {
          --mdc-icon-size: 24px;
          --media-browse-item-size: 100px;
          flex: 1;
          min-height: 0;
          overflow: auto;
        }
        .icon-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--secondary-background-color);
          color: var(--secondary-text-color);
        }
        .icon-fallback ha-svg-icon {
          --mdc-icon-size: 45%;
          width: 45%;
          height: 45%;
        }
        .sources-message {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem;
          color: var(--secondary-text-color);
        }
        .search-active {
          color: var(--accent-color, var(--primary-color));
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--secondary-background-color);
          margin: 0 0.5rem 0.5rem;
          border-radius: 0.5rem;
          flex-shrink: 0;
        }
        .search-bar input {
          flex: 1;
          border: none;
          background: transparent;
          color: var(--primary-text-color);
          font-size: 1rem;
          outline: none;
          padding: 0.5rem;
        }
        .search-bar input::placeholder {
          color: var(--secondary-text-color);
        }
        .search-bar [hidden] {
          display: none !important;
        }
      `,
    ];
  }
}

customElements.define('sonos-media-browser-sources', MediaBrowserSources);
