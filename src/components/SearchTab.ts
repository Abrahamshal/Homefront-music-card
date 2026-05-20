import { LitElement, html, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { mockData, fmtTime, type Provider } from '../state/mockData.js';
import {
  Store,
  type HassSearchResults,
  type SearchFilter,
  type SearchResultItem,
} from '../state/store.js';
import { StoreController } from '../state/storeController.js';
import { Icons } from './Icons.js';
import './primitives/AlbumArt.js';

const FILTERS: Array<{ id: SearchFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'albums', label: 'Albums' },
  { id: 'artists', label: 'Artists' },
  { id: 'playlists', label: 'Playlists' },
];

const SUGGESTIONS = ['khruangbin', 'jazz', 'deep focus', 'ambient', 'tycho', 'discover weekly'];

/**
 * Cross-provider search. Sticky input + filter chips at top; results grouped
 * by provider. Empty state shows canned suggestions.
 *
 * Phase 1: matches against the in-memory mock; each provider gets a
 * different slice of the matches so the per-provider grouping looks
 * realistic. Phase 2 calls `music_assistant.search` against MA.
 */
@customElement('hf-search-tab')
export class SearchTab extends LitElement {
  @property({ attribute: false }) store!: Store;

  private _ctrl?: StoreController;
  /** Debounce timer for hass-mode search. */
  private _searchTimer: number | null = null;
  /** Last query we fired in hass-mode, to avoid duplicate requests. */
  private _lastFiredQuery = '';

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('store') && this.store && !this._ctrl) {
      this._ctrl = new StoreController(this, this.store);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._searchTimer !== null) {
      window.clearTimeout(this._searchTimer);
      this._searchTimer = null;
    }
  }

  private _scheduleHassSearch(query: string, filter: SearchFilter): void {
    if (this._searchTimer !== null) window.clearTimeout(this._searchTimer);
    // 350ms after the user stops typing — feels responsive but doesn't
    // hammer the MA server with one search per keystroke.
    this._searchTimer = window.setTimeout(() => {
      if (query === this._lastFiredQuery) return;
      this._lastFiredQuery = query;
      const mediaTypes = filterToMediaTypes(filter);
      void this.store.searchMa(query, mediaTypes, 25);
    }, 350);
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      color: var(--hf-text);
      font-family: var(--hf-font);
      box-sizing: border-box;
    }
    .top {
      padding: 14px 14px 8px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .input-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--hf-input);
      border-radius: 999px;
      padding: 8px 12px;
      border: 1px solid var(--hf-border);
    }
    input {
      flex: 1;
      background: transparent;
      border: 0;
      outline: 0;
      color: var(--hf-text);
      font-size: 13.5px;
      font: inherit;
    }
    .clear-btn {
      background: transparent;
      border: 0;
      padding: 2px;
      cursor: pointer;
      color: var(--hf-text-dim);
    }
    .filters {
      display: flex;
      gap: 6px;
      margin-top: 10px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .filters::-webkit-scrollbar {
      display: none;
    }
    .filter {
      background: transparent;
      color: var(--hf-text-dim);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      font: inherit;
      white-space: nowrap;
    }
    .filter[data-active='true'] {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border-color: var(--hf-accent);
    }
    .scroll {
      flex: 1;
      overflow-y: auto;
    }
    .body {
      padding: 10px 14px 16px;
    }
    .small-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
      margin-bottom: 4px;
    }
    .section {
      margin-bottom: 16px;
    }
    .section-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 0 8px;
    }
    .provider-glyph-sm {
      width: 18px;
      height: 18px;
      border-radius: 5px;
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 10px;
    }
    .provider-name {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .result-count {
      font-size: 11px;
      color: var(--hf-text-dim);
      margin-left: auto;
    }
    .album-row {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 4px 0;
      scrollbar-width: none;
    }
    .album-row::-webkit-scrollbar {
      display: none;
    }
    .album-card {
      width: 96px;
      flex: none;
    }
    .album-name {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .album-artist {
      font-size: 10.5px;
      color: var(--hf-text-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .artist-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .artist-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .playlist-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .track-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .row-name {
      font-size: 13.5px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-time {
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .row-meta {
      flex: 1;
      min-width: 0;
    }
    .suggestions {
      padding: 14px 14px;
    }
    .suggest-pill {
      padding: 5px 10px;
      border-radius: 999px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      color: var(--hf-text);
      font-size: 12px;
      font-weight: 500;
    }
    .suggest-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;
    }
    .hass-loading,
    .hass-error,
    .hass-empty {
      padding: 30px 14px;
      text-align: center;
      color: var(--hf-text-dim);
      font-size: 13px;
    }
    .hass-error {
      color: #e0413a;
    }
    .library-note {
      padding: 8px 14px 0;
      font-size: 10.5px;
      color: var(--hf-text-dim);
      font-style: italic;
    }
  `;

  protected render() {
    if (!this.store) return html``;
    if (this.store.isHassMode) return this._renderHass();
    const s = this.store;
    const q = s.search.query.trim().toLowerCase();
    const filter = s.search.filter;
    const matches = q ? this._matchesFor(q) : null;

    return html`
      <div class="top">
        <div class="input-wrap">
          ${Icons.search({ size: 16 })}
          <input
            .value=${s.search.query}
            placeholder="Search Spotify, Apple Music, SoundCloud…"
            @input=${(e: Event) =>
              s.setSearch({ query: (e.target as HTMLInputElement).value })}
          />
          ${s.search.query
            ? html`
                <button
                  class="clear-btn"
                  aria-label="Clear search"
                  @click=${() => s.setSearch({ query: '' })}
                >
                  ${Icons.x({ size: 14 })}
                </button>
              `
            : ''}
        </div>
        <div class="filters">
          ${FILTERS.map(
            (f) => html`
              <button
                class="filter"
                data-active=${filter === f.id}
                @click=${() => s.setSearch({ filter: f.id })}
              >
                ${f.label}
              </button>
            `,
          )}
        </div>
      </div>

      <div class="scroll">
        ${matches ? this._renderResults(matches, filter) : this._renderSuggestions()}
      </div>
    `;
  }

  private _matchesFor(q: string) {
    const ix = (s: string): boolean => s.toLowerCase().includes(q);
    return {
      tracks: mockData.tracks.filter((t) => ix(t.name) || ix(t.artist)),
      albums: mockData.albums.filter((a) => ix(a.name) || ix(a.artist)),
      artists: mockData.artistList.filter(ix),
      playlists: mockData.playlists.filter((p) => ix(p.name)),
    };
  }

  private _renderResults(
    matches: ReturnType<typeof this._matchesFor>,
    filter: SearchFilter,
  ): TemplateResult {
    return html`
      <div class="body">
        ${mockData.providers.map((p) => this._renderProviderSection(p, matches, filter))}
      </div>
    `;
  }

  private _renderProviderSection(
    p: Provider,
    matches: ReturnType<typeof this._matchesFor>,
    filter: SearchFilter,
  ): TemplateResult {
    let trackHits = matches.tracks.slice(0, 4);
    let albumHits = matches.albums.slice(0, 2);
    let artistHits = matches.artists.slice(0, 2);
    let playlistHits = matches.playlists.slice(0, 2);

    if (p.id === 'apple') {
      trackHits = matches.tracks.slice(1, 4);
      albumHits = matches.albums.slice(2, 4);
    } else if (p.id === 'soundcloud') {
      trackHits = matches.tracks.slice(2, 5);
      albumHits = [];
    }

    if (filter === 'tracks') {
      albumHits = []; artistHits = []; playlistHits = [];
    } else if (filter === 'albums') {
      trackHits = []; artistHits = []; playlistHits = [];
    } else if (filter === 'artists') {
      trackHits = []; albumHits = []; playlistHits = [];
    } else if (filter === 'playlists') {
      trackHits = []; albumHits = []; artistHits = [];
    }

    const total =
      trackHits.length + albumHits.length + artistHits.length + playlistHits.length;
    if (total === 0) return html``;
    const glyphBg = `linear-gradient(135deg, oklch(70% 0.18 ${p.brandHue}), oklch(46% 0.16 ${(p.brandHue + 30) % 360}))`;
    return html`
      <div class="section">
        <div class="section-head">
          <div class="provider-glyph-sm" style=${`background:${glyphBg}`}>
            ${p.glyph || p.name[0]}
          </div>
          <div class="provider-name">${p.name}</div>
          <div class="result-count">
            ${total} result${total > 1 ? 's' : ''}
          </div>
        </div>

        ${trackHits.length > 0
          ? html`
              <div style="margin-bottom:6px">
                <div class="small-label">Tracks</div>
                ${trackHits.map((tr) => {
                  const album = mockData.albumById(tr.albumId);
                  return html`
                    <div class="track-row">
                      <hf-album-art .obj=${album} size="36" radius="6"></hf-album-art>
                      <div class="row-meta">
                        <div class="row-name">${tr.name}</div>
                        <div class="row-sub">${tr.artist} · ${tr.album}</div>
                      </div>
                      <div class="row-time">${fmtTime(tr.durationSec)}</div>
                    </div>
                  `;
                })}
              </div>
            `
          : ''}

        ${albumHits.length > 0
          ? html`
              <div style="margin-bottom:6px">
                <div class="small-label">Albums</div>
                <div class="album-row">
                  ${albumHits.map(
                    (a) => html`
                      <div class="album-card">
                        <hf-album-art .obj=${a} size="96" radius="8"></hf-album-art>
                        <div class="album-name">${a.name}</div>
                        <div class="album-artist">${a.artist}</div>
                      </div>
                    `,
                  )}
                </div>
              </div>
            `
          : ''}

        ${artistHits.length > 0
          ? html`
              <div style="margin-bottom:6px">
                <div class="small-label">Artists</div>
                ${artistHits.map(
                  (n, i) => html`
                    <div class="artist-row">
                      <div
                        class="artist-avatar"
                        style=${`background: conic-gradient(from ${i * 60}deg, oklch(70% 0.18 ${i * 40}), oklch(46% 0.16 ${(i * 40 + 60) % 360}))`}
                      ></div>
                      <div class="row-name">${n}</div>
                      <div class="row-time">Artist</div>
                    </div>
                  `,
                )}
              </div>
            `
          : ''}

        ${playlistHits.length > 0
          ? html`
              <div>
                <div class="small-label">Playlists</div>
                ${playlistHits.map(
                  (pl) => html`
                    <div class="playlist-row">
                      <hf-album-art .obj=${pl} size="36" radius="6"></hf-album-art>
                      <div class="row-meta">
                        <div class="row-name">${pl.name}</div>
                        <div class="row-sub">${pl.trackCount} tracks</div>
                      </div>
                    </div>
                  `,
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _renderSuggestions(): TemplateResult {
    return html`
      <div class="suggestions">
        <div class="small-label">Try searching</div>
        <div class="suggest-row">
          ${SUGGESTIONS.map(
            (t) => html`
              <button
                class="suggest-pill"
                @click=${() => this.store.setSearch({ query: t })}
              >
                ${t}
              </button>
            `,
          )}
        </div>
        <div class="small-label">Recent</div>
        ${mockData.tracks.slice(0, 4).map((tr) => {
          const album = mockData.albumById(tr.albumId);
          return html`
            <div class="track-row">
              <hf-album-art .obj=${album} size="36" radius="6"></hf-album-art>
              <div class="row-meta">
                <div class="row-name">${tr.name}</div>
                <div class="row-sub">${tr.artist} · ${tr.album}</div>
              </div>
              <div class="row-time">${fmtTime(tr.durationSec)}</div>
            </div>
          `;
        })}
      </div>
    `;
  }

  // ── hass-mode rendering ──────────────────────────────────────────────────

  private _renderHass(): TemplateResult {
    const s = this.store;
    const query = s.search.query;
    const filter = s.search.filter;
    const results = s.hassSearchResults;

    return html`
      <div class="top">
        <div class="input-wrap">
          ${Icons.search({ size: 16 })}
          <input
            .value=${query}
            placeholder="Search MA library + connected providers…"
            @input=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              s.setSearch({ query: v });
              this._scheduleHassSearch(v, filter);
            }}
          />
          ${query
            ? html`
                <button
                  class="clear-btn"
                  aria-label="Clear search"
                  @click=${() => {
                    s.setSearch({ query: '' });
                    this._lastFiredQuery = '';
                    void s.searchMa('', []);
                  }}
                >
                  ${Icons.x({ size: 14 })}
                </button>
              `
            : ''}
        </div>
        <div class="filters">
          ${FILTERS.map(
            (f) => html`
              <button
                class="filter"
                data-active=${filter === f.id}
                @click=${() => {
                  s.setSearch({ filter: f.id });
                  if (query) {
                    this._lastFiredQuery = '';
                    this._scheduleHassSearch(query, f.id);
                  }
                }}
              >
                ${f.label}
              </button>
            `,
          )}
        </div>
        <div class="library-note">
          Search is library-wide — results are merged across all providers
          and accounts (MA API limitation).
        </div>
      </div>

      <div class="scroll">
        ${!query
          ? this._renderHassSuggestions()
          : s.hassSearchLoading && !results
            ? html`<div class="hass-loading">Searching…</div>`
            : s.hassSearchError
              ? html`<div class="hass-error">${s.hassSearchError}</div>`
              : results
                ? this._renderHassResults(results, filter)
                : html`<div class="hass-empty">Type to search</div>`}
      </div>
    `;
  }

  private _renderHassResults(
    results: HassSearchResults,
    filter: SearchFilter,
  ): TemplateResult {
    const sections: Array<{ key: string; label: string; items: SearchResultItem[] }> = [
      { key: 'tracks', label: 'Tracks', items: results.tracks },
      { key: 'albums', label: 'Albums', items: results.albums },
      { key: 'artists', label: 'Artists', items: results.artists },
      { key: 'playlists', label: 'Playlists', items: results.playlists },
      { key: 'radio', label: 'Radio', items: results.radio },
    ];
    const visible = sections.filter((sec) => {
      if (sec.items.length === 0) return false;
      if (filter === 'all') return true;
      return filter === sec.key;
    });
    if (visible.length === 0) {
      return html`<div class="hass-empty">No matches for "${results.query}"</div>`;
    }
    return html`
      <div class="body" style="padding:10px 14px 16px">
        ${visible.map(
          (sec) => html`
            <div style="margin-bottom:16px">
              <div class="small-label">${sec.label} · ${sec.items.length}</div>
              ${sec.items.map((item) => this._renderHassResultRow(item))}
            </div>
          `,
        )}
      </div>
    `;
  }

  private _renderHassResultRow(item: SearchResultItem): TemplateResult {
    const title = item.title ?? item.name ?? '(untitled)';
    const subtitleParts: string[] = [];
    if (item.artist) subtitleParts.push(item.artist);
    if (item.album && item.album !== title) subtitleParts.push(item.album);
    if (item.provider) subtitleParts.push(item.provider);
    const subtitle = subtitleParts.join(' · ');
    const image = item.image_url ?? item.thumbnail;
    return html`
      <div class="track-row" @click=${() => this.store.playSearchResult(item)}>
        ${image
          ? html`<hf-album-art
              .obj=${null}
              .imageUrl=${image}
              size="36"
              radius="6"
            ></hf-album-art>`
          : html`<div
              style="width:36px;height:36px;border-radius:6px;background:var(--hf-input);flex:none"
            ></div>`}
        <div class="row-meta">
          <div class="row-name">${title}</div>
          ${subtitle ? html`<div class="row-sub">${subtitle}</div>` : ''}
        </div>
        ${item.duration ? html`<div class="row-time">${fmtTime(item.duration)}</div>` : ''}
      </div>
    `;
  }

  private _renderHassSuggestions(): TemplateResult {
    return html`
      <div class="suggestions">
        <div class="small-label">Try searching</div>
        <div class="suggest-row">
          ${SUGGESTIONS.map(
            (t) => html`
              <button
                class="suggest-pill"
                @click=${() => {
                  this.store.setSearch({ query: t });
                  this._scheduleHassSearch(t, this.store.search.filter);
                }}
              >
                ${t}
              </button>
            `,
          )}
        </div>
      </div>
    `;
  }
}

/** Convert the SearchTab's UI filter to MA's media_type values. */
function filterToMediaTypes(filter: SearchFilter): string[] {
  switch (filter) {
    case 'tracks':
      return ['track'];
    case 'albums':
      return ['album'];
    case 'artists':
      return ['artist'];
    case 'playlists':
      return ['playlist'];
    case 'all':
    default:
      return [];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-search-tab': SearchTab;
  }
}
