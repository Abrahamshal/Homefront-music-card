import { LitElement, html, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  mockData,
  fmtTime,
  type Album,
  type Playlist,
  type Provider,
  type ProviderAccount,
  type Track,
} from '../state/mockData.js';
import { Store } from '../state/store.js';
import { StoreController } from '../state/storeController.js';
import { Icons } from './Icons.js';
import './primitives/AlbumArt.js';
import type { BrowseMediaNode } from '../types.js';

const SUBTABS = [
  { id: 'playlists', label: 'Playlists' },
  { id: 'albums', label: 'Albums' },
  { id: 'artists', label: 'Artists' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'radio', label: 'Radio' },
] as const;

type SortMode = 'default' | 'title_asc' | 'title_desc';

const SORT_OPTIONS: ReadonlyArray<{ id: SortMode; label: string }> = [
  { id: 'default', label: 'Default (MA order)' },
  { id: 'title_asc', label: 'Title A → Z' },
  { id: 'title_desc', label: 'Title Z → A' },
];

function labelFor(id: SortMode): string {
  return SORT_OPTIONS.find((o) => o.id === id)?.label.split(' ')[0] ?? 'Default';
}

/**
 * Coerce a browse-node field that might be a string, an object with
 * `.name`/`.title`, or null into a plain display string. MA's
 * browse_media nodes occasionally return structured objects where the
 * card expects a string, which otherwise renders as "[object Object]".
 */
function safeStr(v: unknown): string {
  if (typeof v === 'string') {
    return v === '[object Object]' ? '' : v;
  }
  if (typeof v === 'number') return String(v);
  if (Array.isArray(v) && v.length > 0) return safeStr(v[0]);
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    return (
      safeStr(o.name) ||
      safeStr(o.title) ||
      safeStr(o.path) ||
      safeStr(o.url) ||
      ''
    );
  }
  return '';
}

/**
 * Source → Account → Type → Detail browse flow. Bypasses the merged-Library
 * view (per ARCHITECTURE.md): always presents providers and accounts
 * separately so multi-account households (Spotify x2) stay disambiguated.
 */
@customElement('hf-browse-tab')
export class BrowseTab extends LitElement {
  @property({ attribute: false }) store!: Store;

  private _ctrl?: StoreController;
  private _kickedOffRoot = false;

  // Sort UI: persists across drill-down so the user's choice sticks.
  // Currently only title-based sorts are wired (duration / date_added /
  // last_played / play_count need richer MA metadata than HA's standard
  // browse_media response provides — future expansion).
  @state() private _sortMode: SortMode = 'default';
  @state() private _sortMenuOpen = false;

  // Client-side search within the current browse level. Reset whenever
  // we drill in or pop back so each level starts fresh.
  @state() private _filterQuery = '';
  private _lastStackDepth = 0;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('store') && this.store && !this._ctrl) {
      this._ctrl = new StoreController(this, this.store);
    }
  }

  protected updated(): void {
    // On first hass-mode render with an empty stack, fetch the root.
    if (
      this.store?.isHassMode &&
      !this._kickedOffRoot &&
      this.store.hassBrowseStack.length === 0 &&
      !this.store.hassBrowseLoading
    ) {
      this._kickedOffRoot = true;
      void this.store.browseRoot();
    }
    // Reset the search filter whenever the user drills in or pops out.
    const depth = this.store?.hassBrowseStack?.length ?? 0;
    if (depth !== this._lastStackDepth) {
      this._lastStackDepth = depth;
      if (this._filterQuery !== '') this._filterQuery = '';
    }
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 12px;
      color: var(--hf-text);
      font-family: var(--hf-font);
      box-sizing: border-box;
    }
    .crumbs {
      padding: 10px 14px 6px;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      color: var(--hf-text-dim);
      font-size: 12px;
    }
    .crumb-btn {
      background: transparent;
      border: 0;
      padding: 3px 6px;
      border-radius: 6px;
      color: var(--hf-text-dim);
      font-weight: 500;
      cursor: pointer;
      font-size: 12px;
      font: inherit;
    }
    .crumb-btn[data-current='true'] {
      color: var(--hf-text);
      font-weight: 600;
    }
    .section-label {
      padding: 4px 4px 6px;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
    }
    .body {
      padding: 0 14px 16px;
    }
    .stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .provider-tile {
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 14px;
      padding: 14px;
      display: flex;
      align-items: center;
      gap: 14px;
      color: var(--hf-text);
      cursor: pointer;
      text-align: left;
      font: inherit;
      width: 100%;
    }
    .provider-glyph {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      color: #fff;
      font-weight: 700;
      font-size: 26px;
      flex: none;
      box-shadow: inset 0 -8px 18px rgba(0, 0, 0, 0.18);
    }
    .provider-info {
      min-width: 0;
      flex: 1;
    }
    .provider-name {
      font-weight: 600;
      font-size: 15px;
    }
    .provider-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
    }
    .account-tile {
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--hf-text);
      cursor: pointer;
      text-align: left;
      font: inherit;
      width: 100%;
    }
    .account-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: #fff;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 13px;
    }
    .account-name {
      font-weight: 600;
      font-size: 14px;
    }
    .account-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
    }
    .subtabs {
      display: flex;
      gap: 4px;
      padding: 4px 14px 8px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .subtabs::-webkit-scrollbar {
      display: none;
    }
    .subtab {
      background: transparent;
      color: var(--hf-text-dim);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      padding: 5px 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      font: inherit;
      white-space: nowrap;
    }
    .subtab[data-active='true'] {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border-color: var(--hf-accent);
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .art-tile {
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      color: var(--hf-text);
      cursor: pointer;
      text-align: left;
      font: inherit;
    }
    .art-tile-name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .art-tile-sub {
      font-size: 11px;
      color: var(--hf-text-dim);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .artist-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      background: transparent;
      border: 0;
      border-bottom: 1px solid var(--hf-divider);
      width: 100%;
      cursor: pointer;
      font: inherit;
    }
    .artist-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .artist-name {
      font-size: 14px;
      color: var(--hf-text);
      font-weight: 500;
    }
    .artist-tag {
      margin-left: auto;
      color: var(--hf-text-dim);
      font-size: 11px;
    }
    .track-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 4px;
      background: transparent;
      border: 0;
      border-bottom: 1px solid var(--hf-divider);
      width: 100%;
      cursor: pointer;
      color: var(--hf-text);
      text-align: left;
      font: inherit;
    }
    .track-index {
      width: 18px;
      text-align: right;
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .track-meta {
      flex: 1;
      min-width: 0;
    }
    .track-name {
      font-size: 13.5px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .track-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .track-time {
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .radio-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
      width: 100%;
      cursor: pointer;
      font: inherit;
      color: var(--hf-text);
    }
    .detail-header {
      padding: 8px 14px 16px;
      display: flex;
      gap: 14px;
      align-items: flex-end;
    }
    .detail-meta {
      min-width: 0;
      flex: 1;
    }
    .detail-kind {
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
    }
    .detail-title {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.01em;
      margin-top: 4px;
      line-height: 1.1;
    }
    .detail-sub {
      font-size: 12px;
      color: var(--hf-text-dim);
      margin-top: 6px;
    }
    .detail-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: transparent;
      color: var(--hf-text);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      padding: 7px 14px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      font: inherit;
    }
    .pill-btn.primary {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
    }
    .hass-loading,
    .hass-error,
    .hass-empty {
      padding: 40px 14px;
      text-align: center;
      color: var(--hf-text-dim);
      font-size: 13px;
    }
    .hass-error {
      color: #e0413a;
    }
    .controls-bar {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 14px 4px;
    }
    .filter-input-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--hf-input);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      padding: 4px 10px;
      color: var(--hf-text-dim);
    }
    .filter-input {
      flex: 1;
      background: transparent;
      border: 0;
      outline: 0;
      color: var(--hf-text);
      font: inherit;
      font-size: 12.5px;
      min-width: 0;
    }
    .filter-clear {
      background: transparent;
      border: 0;
      padding: 2px;
      cursor: pointer;
      color: var(--hf-text-dim);
      display: inline-flex;
    }
    .sort-bar {
      position: relative;
      display: flex;
      justify-content: flex-end;
      padding: 4px 14px 4px;
    }
    .sort-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 999px;
      color: var(--hf-text-dim);
      cursor: pointer;
      font: inherit;
      font-size: 11.5px;
      font-weight: 600;
    }
    .sort-menu {
      position: absolute;
      right: 14px;
      top: 100%;
      margin-top: 4px;
      z-index: 10;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      min-width: 180px;
      padding: 4px;
      display: flex;
      flex-direction: column;
    }
    .sort-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 10px;
      background: transparent;
      border: 0;
      border-radius: 7px;
      color: var(--hf-text);
      cursor: pointer;
      font: inherit;
      font-size: 12.5px;
      text-align: left;
    }
    .sort-option:hover {
      background: var(--hf-input);
    }
    .sort-option[data-active='true'] {
      color: var(--hf-accent);
    }
    .sort-option-check {
      opacity: 0;
    }
    .sort-option[data-active='true'] .sort-option-check {
      opacity: 1;
    }
  `;

  protected render() {
    if (!this.store) return html``;
    if (this.store.isHassMode) return this._renderHass();
    return html`${this._renderCrumbs()} ${this._renderBody()}`;
  }

  // ── hass-mode rendering ──────────────────────────────────────────────────

  private _renderHass(): TemplateResult {
    const stack = this.store.hassBrowseStack;
    const current = stack[stack.length - 1];
    const showControls = !!current && (current.children?.length ?? 0) > 5;
    return html`
      ${this._renderHassCrumbs(stack)}
      ${showControls ? this._renderControlsBar() : ''}
      ${this.store.hassBrowseError
        ? html`<div class="hass-error">${this.store.hassBrowseError}</div>`
        : this.store.hassBrowseLoading && !current
          ? html`<div class="hass-loading">Loading library…</div>`
          : current
            ? this._renderHassNode(current)
            : html`<div class="hass-empty">No library available</div>`}
    `;
  }

  private _renderControlsBar(): TemplateResult {
    return html`
      <div class="controls-bar">
        <div class="filter-input-wrap">
          ${Icons.search({ size: 13, stroke: 'currentColor' })}
          <input
            class="filter-input"
            type="search"
            placeholder="Filter this list…"
            .value=${this._filterQuery}
            @input=${(e: Event) =>
              (this._filterQuery = (e.target as HTMLInputElement).value)}
          />
          ${this._filterQuery
            ? html`
                <button
                  class="filter-clear"
                  aria-label="Clear filter"
                  @click=${() => (this._filterQuery = '')}
                >
                  ${Icons.x({ size: 12 })}
                </button>
              `
            : ''}
        </div>
        <button
          class="sort-btn"
          @click=${(e: Event) => {
            e.stopPropagation();
            this._sortMenuOpen = !this._sortMenuOpen;
          }}
        >
          ${Icons.filter({ size: 12 })} ${labelFor(this._sortMode)}
        </button>
        ${this._sortMenuOpen
          ? html`
              <div class="sort-menu" @click=${(e: Event) => e.stopPropagation()}>
                ${SORT_OPTIONS.map(
                  (opt) => html`
                    <button
                      class="sort-option"
                      data-active=${opt.id === this._sortMode}
                      @click=${() => this._chooseSort(opt.id)}
                    >
                      <span>${opt.label}</span>
                      <span class="sort-option-check">
                        ${Icons.check({ size: 12, sw: 2.4 })}
                      </span>
                    </button>
                  `,
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _chooseSort(mode: SortMode): void {
    this._sortMode = mode;
    this._sortMenuOpen = false;
  }

  private _applySort(children: BrowseMediaNode[]): BrowseMediaNode[] {
    if (this._sortMode === 'default') return children;
    const out = [...children];
    if (this._sortMode === 'title_asc') {
      out.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this._sortMode === 'title_desc') {
      out.sort((a, b) => b.title.localeCompare(a.title));
    }
    return out;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._closeSortMenu);
  }
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._closeSortMenu);
  }
  private _closeSortMenu = (): void => {
    if (this._sortMenuOpen) this._sortMenuOpen = false;
  };

  private _renderHassCrumbs(stack: BrowseMediaNode[]): TemplateResult {
    if (stack.length === 0) return html``;
    return html`
      <div class="crumbs">
        ${stack.map((node, i) => {
          const current = i === stack.length - 1;
          const label = i === 0 ? 'Sources' : safeStr(node.title) || 'Item';
          return html`
            <button
              class="crumb-btn"
              data-current=${current}
              @click=${() => this.store.browsePop(i)}
            >
              ${label}
            </button>
            ${i < stack.length - 1
              ? html`<span aria-hidden="true">${Icons.chev({ size: 11 })}</span>`
              : ''}
          `;
        })}
      </div>
    `;
  }

  private _renderHassNode(node: BrowseMediaNode): TemplateResult {
    const children = node.children ?? [];
    if (children.length === 0) {
      return html`<div class="hass-empty">No items</div>`;
    }
    const filtered = this._applyFilter(children);
    const sorted = this._applySort(filtered);
    if (sorted.length === 0) {
      return html`
        <div class="hass-empty">
          No matches for "${this._filterQuery}"
        </div>
      `;
    }
    return html`<div class="body">${this._renderHassList(sorted)}</div>`;
  }

  private _applyFilter(children: BrowseMediaNode[]): BrowseMediaNode[] {
    const q = this._filterQuery.trim().toLowerCase();
    if (!q) return children;
    return children.filter((c) => safeStr(c.title).toLowerCase().includes(q));
  }

  private _renderHassList(children: BrowseMediaNode[]): TemplateResult {
    return html`
      <div>
        ${children.map((c) => {
          const title = safeStr(c.title) || '(untitled)';
          const cls = safeStr(c.media_class);
          const thumb = safeStr(c.thumbnail);
          return html`
            <button class="track-row" @click=${() => this._onHassChildClick(c)}>
              ${thumb
                ? html`<hf-album-art
                    .obj=${null}
                    .imageUrl=${thumb}
                    size="36"
                    radius="6"
                  ></hf-album-art>`
                : html`<div
                    style="width:36px;height:36px;border-radius:6px;background:var(--hf-input);display:grid;place-items:center;color:var(--hf-text-dim);flex:none"
                  >
                    ${this._iconForClass(cls)}
                  </div>`}
              <div class="track-meta">
                <div class="track-name">${title}</div>
                ${cls ? html`<div class="track-sub">${cls}</div>` : ''}
              </div>
              ${c.can_expand
                ? Icons.chev({ size: 14 })
                : c.can_play
                  ? Icons.play({ size: 14 })
                  : ''}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _onHassChildClick(node: BrowseMediaNode): void {
    if (node.can_expand) {
      void this.store.browseInto(node);
    } else if (node.can_play) {
      this.store.playBrowseNode(node, 'replace');
    }
  }

  private _iconForClass(cls: string): TemplateResult {
    if (cls === 'track' || cls === 'music') return Icons.note({ size: 16 });
    if (cls === 'album') return Icons.album({ size: 16 });
    if (cls === 'artist') return Icons.artist({ size: 16 });
    if (cls === 'playlist') return Icons.list({ size: 16 });
    if (cls === 'radio') return Icons.radio({ size: 16 });
    return Icons.home({ size: 16 });
  }

  private _renderCrumbs(): TemplateResult {
    const crumbs = this.store.browser.crumbs;
    return html`
      <div class="crumbs">
        ${crumbs.map((c, i) => {
          const current = i === crumbs.length - 1;
          return html`
            <button
              class="crumb-btn"
              data-current=${current}
              @click=${() => this.store.popToCrumb(i)}
            >
              ${c.label}
            </button>
            ${i < crumbs.length - 1
              ? html`<span aria-hidden="true">${Icons.chev({ size: 11 })}</span>`
              : ''}
          `;
        })}
      </div>
    `;
  }

  private _renderBody(): TemplateResult {
    const { providerId, accountId, sub, detailId } = this.store.browser;
    if (!providerId) return this._renderProviders();
    const provider = mockData.providerById(providerId);
    if (!provider) return html``;
    if (!accountId) return this._renderAccounts(provider);
    if (detailId) return this._renderDetail(detailId);
    return this._renderTypeView(sub);
  }

  private _renderProviders(): TemplateResult {
    return html`
      <div class="body">
        <div class="section-label">Connected sources</div>
        <div class="stack">
          ${mockData.providers.map((p) => this._renderProviderTile(p))}
        </div>
      </div>
    `;
  }

  private _renderProviderTile(p: Provider): TemplateResult {
    const bg = `linear-gradient(135deg, oklch(72% 0.18 ${p.brandHue}), oklch(48% 0.16 ${(p.brandHue + 30) % 360}))`;
    return html`
      <button
        class="provider-tile"
        @click=${() =>
          this.store.pushCrumb({ kind: 'provider', label: p.name }, { providerId: p.id })}
      >
        <div class="provider-glyph" style=${`background:${bg}`}>
          ${p.glyph || p.name[0]}
        </div>
        <div class="provider-info">
          <div class="provider-name">${p.name}</div>
          <div class="provider-sub">
            ${p.accounts.length} account${p.accounts.length > 1 ? 's' : ''} · connected
          </div>
        </div>
        ${Icons.chev({ size: 16 })}
      </button>
    `;
  }

  private _renderAccounts(provider: Provider): TemplateResult {
    return html`
      <div class="body">
        <div class="section-label">${provider.name} · choose an account</div>
        <div class="stack">
          ${provider.accounts.map((a) => this._renderAccountTile(a))}
        </div>
      </div>
    `;
  }

  private _renderAccountTile(a: ProviderAccount): TemplateResult {
    const initials = a.name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();
    const bg = 'conic-gradient(from 220deg, var(--hf-accent), oklch(70% 0.14 220))';
    return html`
      <button
        class="account-tile"
        @click=${() =>
          this.store.pushCrumb(
            { kind: 'account', label: a.name },
            { accountId: a.id, sub: 'playlists', detailId: null },
          )}
      >
        <div class="account-avatar" style=${`background:${bg}`}>${initials}</div>
        <div style="flex:1; min-width:0">
          <div class="account-name">${a.name}</div>
          <div class="account-sub">${a.tier}</div>
        </div>
        ${Icons.chev({ size: 16 })}
      </button>
    `;
  }

  private _renderTypeView(sub: (typeof SUBTABS)[number]['id']): TemplateResult {
    return html`
      <div class="subtabs">
        ${SUBTABS.map(
          (t) => html`
            <button
              class="subtab"
              data-active=${sub === t.id}
              @click=${() => this.store.browserGo({ sub: t.id })}
            >
              ${t.label}
            </button>
          `,
        )}
      </div>
      <div class="body">${this._renderTypeBody(sub)}</div>
    `;
  }

  private _renderTypeBody(sub: (typeof SUBTABS)[number]['id']): TemplateResult {
    if (sub === 'playlists') {
      return html`
        <div class="grid2">
          ${mockData.playlists.map(
            (p) => html`
              <button
                class="art-tile"
                @click=${() =>
                  this.store.pushCrumb({ kind: 'detail', label: p.name }, { detailId: p.id })}
              >
                <hf-album-art
                  .obj=${p}
                  size="100%"
                  radius="8"
                  style="aspect-ratio:1/1; width:100%"
                ></hf-album-art>
                <div>
                  <div class="art-tile-name">${p.name}</div>
                  <div class="art-tile-sub">${p.trackCount} tracks</div>
                </div>
              </button>
            `,
          )}
        </div>
      `;
    }
    if (sub === 'albums') {
      return html`
        <div class="grid2">
          ${mockData.albums.map(
            (a) => html`
              <button
                class="art-tile"
                @click=${() =>
                  this.store.pushCrumb({ kind: 'detail', label: a.name }, { detailId: a.id })}
              >
                <hf-album-art
                  .obj=${a}
                  size="100%"
                  radius="8"
                  style="aspect-ratio:1/1; width:100%"
                ></hf-album-art>
                <div>
                  <div class="art-tile-name">${a.name}</div>
                  <div class="art-tile-sub">${a.artist}</div>
                </div>
              </button>
            `,
          )}
        </div>
      `;
    }
    if (sub === 'artists') {
      return html`
        <div>
          ${mockData.artistList.slice(0, 12).map(
            (n, i) => html`
              <button class="artist-row">
                <div
                  class="artist-avatar"
                  style=${`background: conic-gradient(from ${i * 40}deg, oklch(70% 0.18 ${i * 30}), oklch(46% 0.16 ${(i * 30 + 60) % 360}))`}
                ></div>
                <div class="artist-name">${n}</div>
                <div class="artist-tag">Artist</div>
              </button>
            `,
          )}
        </div>
      `;
    }
    if (sub === 'tracks') {
      return html`
        <div>
          ${mockData.tracks.slice(0, 12).map((tr, i) => this._renderTrackRow(tr, i + 1))}
        </div>
      `;
    }
    return html`
      <div class="stack">
        ${mockData.radioStations.map(
          (r) => html`
            <button class="radio-row">
              <hf-album-art
                .obj=${r}
                size="44"
                radius="10"
                .glyph=${Icons.radio({ size: 18, stroke: '#fff' })}
              ></hf-album-art>
              <div style="flex:1; min-width:0">
                <div class="track-name">${r.name}</div>
                <div class="track-sub">${r.genre}</div>
              </div>
              ${Icons.play({ size: 16 })}
            </button>
          `,
        )}
      </div>
    `;
  }

  private _renderTrackRow(tr: Track, index?: number): TemplateResult {
    const album = mockData.albumById(tr.albumId);
    return html`
      <button class="track-row">
        ${index != null ? html`<div class="track-index">${index}</div>` : ''}
        <hf-album-art .obj=${album} size="36" radius="6"></hf-album-art>
        <div class="track-meta">
          <div class="track-name">${tr.name}</div>
          <div class="track-sub">${tr.artist} · ${tr.album}</div>
        </div>
        <div class="track-time">${fmtTime(tr.durationSec)}</div>
      </button>
    `;
  }

  private _renderDetail(detailId: string): TemplateResult {
    const playlist = mockData.playlists.find((p) => p.id === detailId);
    const album = mockData.albums.find((a) => a.id === detailId);
    const item = playlist ?? album;
    if (!item) return html``;
    const isPlaylist = !!playlist;
    return html`
      <div>
        <div class="detail-header">
          <hf-album-art
            .obj=${item}
            size="112"
            radius="14"
            boxShadow="0 12px 24px rgba(0,0,0,0.28)"
          ></hf-album-art>
          <div class="detail-meta">
            <div class="detail-kind">${isPlaylist ? 'Playlist' : 'Album'}</div>
            <div class="detail-title">${item.name}</div>
            <div class="detail-sub">
              ${isPlaylist
                ? `${(item as Playlist).owner} · ${(item as Playlist).trackCount} tracks`
                : `${(item as Album).artist} · ${(item as Album).year}`}
            </div>
            <div class="detail-actions">
              <button class="pill-btn primary">${Icons.play({ size: 13 })} Play</button>
              <button class="pill-btn">${Icons.plus({ size: 13 })} Queue</button>
            </div>
          </div>
        </div>
        <div class="body">
          ${mockData.tracks.slice(0, 10).map((tr, i) => this._renderTrackRow(tr, i + 1))}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-browse-tab': BrowseTab;
  }
}
