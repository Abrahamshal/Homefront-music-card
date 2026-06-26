import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { mdiArrowLeft, mdiStar } from '@mdi/js';
import Store from '../../../model/store';
import '../favorites/favorites-list';
import '../favorites/favorites-icons';
import '../../../components/icon-button';
import { MEDIA_ITEM_SELECTED } from '../../../constants';
import { customEvent, getSpeakerList } from '../../../utils/utils';
import { MediaPlayerItem } from '../../../types';
import { mediaBrowserStyles } from '../styles';
import { renderLayoutMenu } from '../layout-menu';
import { LayoutType } from '../media-browser.types';

interface SourceNav {
  path?: string;
  title: string;
}

// Module-level so the path survives view switches within a session, matching
// how browser.ts / media-browser-section.ts persist their state.
let currentNav: SourceNav[] | null = null;

/**
 * Source/account-separated browse view, powered by Music Assistant's native
 * `music/browse` command (via mass_queue). Unlike HA's merged
 * `media_player/browse_media`, this starts at one folder PER provider/account
 * — e.g. "Abe's Spotify", "Marlene's Spotify", "Eileen's Pandora" — and drills
 * down within a single account. Reuses the favorites grid/list renderers so it
 * looks identical to the rest of the card.
 */
export class MediaBrowserSources extends LitElement {
  @property({ attribute: false }) store!: Store;
  @property({ type: String }) layout: LayoutType = 'auto';
  @state() private nav: SourceNav[] = currentNav ?? [{ title: 'Sources' }];
  @state() private items: MediaPlayerItem[] = [];
  @state() private loading = false;
  @state() private error = '';

  connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  private get currentPath(): string | undefined {
    return this.nav[this.nav.length - 1]?.path;
  }

  private async load() {
    this.loading = true;
    this.error = '';
    try {
      this.items = await this.store.mediaBrowseService.browseSources(this.currentPath);
      if (this.items.length === 0 && this.nav.length === 1) {
        this.error = 'No music sources found. (Requires Music Assistant + the Music Assistant Queue integration.)';
      }
    } catch (e) {
      console.error('Source browse failed:', e);
      this.error = 'Could not load sources from Music Assistant.';
      this.items = [];
    } finally {
      this.loading = false;
    }
  }

  private onItemSelected = async (event: CustomEvent) => {
    const item = event.detail as MediaPlayerItem;
    if (item.can_expand && item.massBrowsePath) {
      this.nav = [...this.nav, { path: item.massBrowsePath, title: item.title }];
      currentNav = this.nav;
      await this.load();
      return;
    }
    // Leaf — play it on the active player.
    await this.store.mediaControlService.playMedia(this.store.activePlayer, item);
    this.dispatchEvent(customEvent(MEDIA_ITEM_SELECTED, item));
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
            <sonos-icon-button .path=${mdiStar} @click=${this.goToFavorites} title="Favorites"></sonos-icon-button>
            ${renderLayoutMenu(this.layout, this.handleLayoutChange)}
          </div>`}
      ${this.loading
        ? html`<div class="sources-message">Loading…</div>`
        : this.error
          ? html`<div class="sources-message">${this.error}</div>`
          : this.items.length === 0
            ? html`<div class="sources-message">Empty</div>`
            : useGrid
              ? html`<sonos-favorites-icons .items=${this.items} .store=${this.store} @item-selected=${this.onItemSelected}></sonos-favorites-icons>`
              : html`<sonos-favorites-list .items=${this.items} .store=${this.store} @item-selected=${this.onItemSelected}></sonos-favorites-list>`}
      ${this.loading ? nothing : nothing}
    `;
  }

  static get styles() {
    return [
      mediaBrowserStyles,
      css`
        sonos-favorites-icons,
        sonos-favorites-list {
          --mdc-icon-size: 24px;
          --media-browse-item-size: 100px;
          flex: 1;
          min-height: 0;
          overflow: auto;
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
      `,
    ];
  }
}

customElements.define('sonos-media-browser-sources', MediaBrowserSources);
