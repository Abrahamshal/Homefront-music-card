import { LitElement, html, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { mockData, fmtTime } from '../state/mockData.js';
import { Store } from '../state/store.js';
import { StoreController } from '../state/storeController.js';
import { Icons } from './Icons.js';
import './primitives/AlbumArt.js';
import './primitives/SwipeRow.js';
import './primitives/DraggableQueue.js';
import type { DraggableItem, RowRenderHelpers } from './primitives/DraggableQueue.js';
import type { QueueItem } from '../types.js';

interface QueueRowItem extends DraggableItem {
  /** Track ID. */
  id: string;
  /** Position in the full queue (not the upcoming slice). */
  idxInQueue: number;
}

/**
 * Active group's queue: now-playing strip + up-next list with grip-drag,
 * swipe-delete, multi-select bulk delete, and clear-queue.
 */
@customElement('hf-queue-tab')
export class QueueTab extends LitElement {
  @property({ attribute: false }) store!: Store;

  private _ctrl?: StoreController;
  private _queueLoadKickedOff = false;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('store') && this.store && !this._ctrl) {
      this._ctrl = new StoreController(this, this.store);
    }
  }

  protected updated(): void {
    // Lazy-load queue on first hass-mode render or after the active
    // lead changes (which invalidates the cached queue).
    if (
      this.store?.isHassMode &&
      !this.store.hassQueueLoading &&
      !this.store.hassQueueIsFresh &&
      !this._queueLoadKickedOff
    ) {
      this._queueLoadKickedOff = true;
      void this.store.loadQueue().finally(() => {
        this._queueLoadKickedOff = false;
      });
    }
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
    .toolbar {
      padding: 14px 14px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .toolbar.multi {
      justify-content: flex-start;
    }
    .title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1.05;
    }
    .sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 4px;
    }
    .icon-btn-sq {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      padding: 0;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      color: var(--hf-text);
      display: grid;
      place-items: center;
      cursor: pointer;
      font: inherit;
    }
    .multi-count {
      font-size: 15px;
      font-weight: 600;
    }
    .multi-actions {
      margin-left: auto;
      display: flex;
      gap: 6px;
    }
    .pill-primary {
      padding: 7px 14px;
      border-radius: 999px;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
      cursor: pointer;
      font: inherit;
      font-weight: 600;
      font-size: 12px;
    }
    .now-playing {
      padding: 0 14px 12px;
    }
    .now-playing-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 10px;
      background: var(--hf-surface-alt);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
    }
    .np-meta {
      flex: 1;
      min-width: 0;
    }
    .np-line {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .np-pulse {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--hf-accent);
      animation: hf-q-pulse 1.4s ease-in-out infinite;
    }
    @keyframes hf-q-pulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.3); }
    }
    .np-name {
      font-size: 13.5px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .np-artist {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .small-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
      margin-bottom: 4px;
    }
    .scroll {
      flex: 1;
      overflow-y: auto;
      padding: 0 14px 16px;
    }
    .empty {
      padding: 30px 0;
      text-align: center;
      color: var(--hf-text-dim);
      font-size: 12px;
    }
    .row-inner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 6px;
      height: 56px;
      box-sizing: border-box;
      border-radius: 8px;
    }
    .row-inner[data-selected='true'] {
      background: var(--hf-selected);
    }
    .grip {
      cursor: grab;
      padding: 4px;
      color: var(--hf-text-dim);
      flex: none;
      touch-action: none;
    }
    .row-track {
      flex: 1;
      min-width: 0;
    }
    .row-name {
      font-size: 13.5px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-artist {
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
    .row-next {
      background: transparent;
      border: 0;
      padding: 4px;
      color: var(--hf-text-dim);
      cursor: pointer;
    }
    .checkbox {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      background: transparent;
      border: 1.5px solid var(--hf-border);
      display: grid;
      place-items: center;
      padding: 0;
      cursor: pointer;
      flex: none;
    }
    .checkbox[data-checked='true'] {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border-color: var(--hf-accent);
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
  `;

  protected render() {
    if (!this.store) return html``;
    if (this.store.isHassMode) return this._renderHass();
    const s = this.store;
    const player = s.activePlayer;
    const upcoming = player.queue.slice(player.currentIdx + 1);
    const playing = mockData.trackById(player.queue[player.currentIdx] ?? '');

    const items: QueueRowItem[] = upcoming.map((id, i) => {
      const idxInQueue = player.currentIdx + 1 + i;
      return { key: `${id}@${idxInQueue}`, id, idxInQueue };
    });
    const selectedCount = s.selectedTracks.size;

    return html`
      ${s.multiMode
        ? html`
            <div class="toolbar multi">
              <button
                class="icon-btn-sq"
                @click=${() => s.setMultiMode(false)}
                aria-label="Cancel selection"
              >
                ${Icons.x({ size: 16 })}
              </button>
              <div class="multi-count">${selectedCount} selected</div>
              <div class="multi-actions">
                <button
                  class="pill-primary"
                  @click=${() => s.removeBulk(s.selectedTracks)}
                >
                  Remove
                </button>
              </div>
            </div>
          `
        : html`
            <div class="toolbar">
              <div>
                <div class="title">Queue</div>
                <div class="sub">${upcoming.length} upcoming · drag to reorder</div>
              </div>
              <div style="display:flex;gap:6px">
                <button
                  class="icon-btn-sq"
                  aria-label="Multi-select"
                  @click=${() => s.setMultiMode(true)}
                >
                  ${Icons.check({ size: 16 })}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Clear queue"
                  @click=${() => s.clearQueue()}
                >
                  ${Icons.trash({ size: 16 })}
                </button>
              </div>
            </div>
          `}

      ${playing
        ? html`
            <div class="now-playing">
              <div class="small-label">Now playing</div>
              <div class="now-playing-card">
                <hf-album-art
                  .obj=${mockData.albumById(playing.albumId)}
                  size="44"
                  radius="8"
                ></hf-album-art>
                <div class="np-meta">
                  <div class="np-line">
                    <div class="np-pulse"></div>
                    <div class="np-name">${playing.name}</div>
                  </div>
                  <div class="np-artist">${playing.artist}</div>
                </div>
              </div>
            </div>
          `
        : ''}

      <div class="scroll">
        <div class="small-label">Up next · ${upcoming.length}</div>
        ${items.length === 0
          ? html`<div class="empty">Queue is empty</div>`
          : html`
              <hf-draggable-queue
                .items=${items}
                .rowHeight=${56}
                .renderRow=${(item: QueueRowItem, _i: number, helpers: RowRenderHelpers) =>
                  this._renderRow(item, helpers)}
                @hf-reorder=${(e: CustomEvent<{ from: number; to: number }>) => {
                  const ci = s.activePlayer.currentIdx;
                  s.moveQueue(ci + 1 + e.detail.from, ci + 1 + e.detail.to);
                }}
              ></hf-draggable-queue>
            `}
      </div>
    `;
  }

  private _renderRow(item: QueueRowItem, helpers: RowRenderHelpers) {
    const s = this.store;
    const tr = mockData.trackById(item.id);
    if (!tr) return html``;
    const album = mockData.albumById(tr.albumId);
    const selected = s.selectedTracks.has(item.idxInQueue);

    return html`
      <hf-swipe-row
        .rowHeight=${56}
        @hf-delete=${() => s.removeFromQueue(item.idxInQueue)}
      >
        <div class="row-inner" data-selected=${selected}>
          ${s.multiMode
            ? html`
                <button
                  class="checkbox"
                  data-checked=${selected}
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    const ns = new Set(s.selectedTracks);
                    if (ns.has(item.idxInQueue)) ns.delete(item.idxInQueue);
                    else ns.add(item.idxInQueue);
                    s.setSelectedTracks(ns);
                  }}
                >
                  ${selected ? Icons.check({ size: 12, sw: 3 }) : ''}
                </button>
              `
            : html`
                <div
                  class="grip"
                  aria-label="Drag handle"
                  @mousedown=${helpers.onGripDown}
                  @touchstart=${helpers.onGripDown}
                >
                  ${Icons.drag({ size: 14 })}
                </div>
              `}
          <hf-album-art .obj=${album} size="40" radius="6"></hf-album-art>
          <div
            class="row-track"
            @click=${() => (s.multiMode ? null : s.playTrackAt(item.idxInQueue))}
          >
            <div class="row-name">${tr.name}</div>
            <div class="row-artist">${tr.artist}</div>
          </div>
          <div class="row-time">${fmtTime(tr.durationSec)}</div>
          ${!s.multiMode
            ? html`
                <button
                  class="row-next"
                  aria-label="Play next"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    s.moveToTop(item.idxInQueue);
                  }}
                >
                  ${Icons.playNext({ size: 14 })}
                </button>
              `
            : ''}
        </div>
      </hf-swipe-row>
    `;
  }

  // ── hass-mode rendering ──────────────────────────────────────────────────

  private _renderHass(): TemplateResult {
    const s = this.store;
    const items = s.hassQueue;
    // Now-playing comes from the leader's MA entity (already derived).
    const nowTitle = s.currentTrack.name;
    const nowArtist = s.currentTrack.artist;
    const nowAlbumImage =
      (s.currentAlbum as unknown as { imageUrl?: string }).imageUrl;
    const selectedCount = s.selectedTracks.size;

    return html`
      ${s.multiMode
        ? html`
            <div class="toolbar multi">
              <button
                class="icon-btn-sq"
                @click=${() => s.setMultiMode(false)}
                aria-label="Cancel selection"
              >
                ${Icons.x({ size: 16 })}
              </button>
              <div class="multi-count">${selectedCount} selected</div>
              <div class="multi-actions">
                <button
                  class="pill-primary"
                  @click=${() => this._bulkRemoveHass()}
                >
                  Remove
                </button>
              </div>
            </div>
          `
        : html`
            <div class="toolbar">
              <div>
                <div class="title">Queue</div>
                <div class="sub">
                  ${items.length} item${items.length === 1 ? '' : 's'} ·
                  drag-reorder coming soon
                </div>
              </div>
              <div style="display:flex;gap:6px">
                <button
                  class="icon-btn-sq"
                  aria-label="Reload queue"
                  @click=${() => void s.loadQueue()}
                >
                  ${Icons.search({ size: 16 })}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Multi-select"
                  @click=${() => s.setMultiMode(true)}
                >
                  ${Icons.check({ size: 16 })}
                </button>
                <button
                  class="icon-btn-sq"
                  aria-label="Clear queue from here"
                  @click=${() => s.clearQueueFromHere()}
                >
                  ${Icons.trash({ size: 16 })}
                </button>
              </div>
            </div>
          `}

      ${nowTitle && nowTitle !== 'Nothing playing'
        ? html`
            <div class="now-playing">
              <div class="small-label">Now playing</div>
              <div class="now-playing-card">
                <hf-album-art
                  .obj=${null}
                  .imageUrl=${nowAlbumImage}
                  size="44"
                  radius="8"
                ></hf-album-art>
                <div class="np-meta">
                  <div class="np-line">
                    <div class="np-pulse"></div>
                    <div class="np-name">${nowTitle}</div>
                  </div>
                  <div class="np-artist">${nowArtist}</div>
                </div>
              </div>
            </div>
          `
        : ''}

      <div class="scroll">
        <div class="small-label">Up next · ${items.length}</div>
        ${s.hassQueueLoading
          ? html`<div class="hass-loading">Loading queue…</div>`
          : s.hassQueueError
            ? html`<div class="hass-error">${s.hassQueueError}</div>`
            : items.length === 0
              ? html`<div class="empty">Queue is empty</div>`
              : html`<div>${items.map((it) => this._renderHassRow(it))}</div>`}
      </div>
    `;
  }

  private _renderHassRow(item: QueueItem): TemplateResult {
    const s = this.store;
    const title = item.title ?? item.name ?? '(untitled)';
    const artist = item.artist ?? '';
    const duration = item.duration ?? item.duration_seconds ?? 0;
    const image = item.image_url ?? item.thumbnail;
    const selected = s.selectedTracks.has(item.queue_item_id as unknown as number);

    return html`
      <hf-swipe-row
        .rowHeight=${56}
        @hf-delete=${() => s.removeQueueItem(item.queue_item_id)}
      >
        <div class="row-inner" data-selected=${selected}>
          ${s.multiMode
            ? html`
                <button
                  class="checkbox"
                  data-checked=${selected}
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this._toggleSelectHass(item.queue_item_id);
                  }}
                >
                  ${selected ? Icons.check({ size: 12, sw: 3 }) : ''}
                </button>
              `
            : ''}
          <hf-album-art
            .obj=${null}
            .imageUrl=${image}
            size="40"
            radius="6"
          ></hf-album-art>
          <div
            class="row-track"
            @click=${() =>
              s.multiMode ? null : s.playQueueItem(item.queue_item_id)}
          >
            <div class="row-name">${title}</div>
            <div class="row-artist">${artist}</div>
          </div>
          <div class="row-time">${duration ? fmtTime(duration) : ''}</div>
          ${!s.multiMode
            ? html`
                <button
                  class="row-next"
                  aria-label="Play next"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    s.moveQueueItemToTop(item.queue_item_id);
                  }}
                >
                  ${Icons.playNext({ size: 14 })}
                </button>
              `
            : ''}
        </div>
      </hf-swipe-row>
    `;
  }

  private _toggleSelectHass(queueItemId: string): void {
    // selectedTracks is a Set<number> in mock; for hass we abuse it as a
    // Set of queue_item_id values for now. Cast through unknown.
    const set = this.store.selectedTracks as unknown as Set<string>;
    const next = new Set(set);
    if (next.has(queueItemId)) next.delete(queueItemId);
    else next.add(queueItemId);
    this.store.setSelectedTracks(next as unknown as Set<number>);
  }

  private _bulkRemoveHass(): void {
    const set = this.store.selectedTracks as unknown as Set<string>;
    this.store.removeQueueItems(new Set(set));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-queue-tab': QueueTab;
  }
}
