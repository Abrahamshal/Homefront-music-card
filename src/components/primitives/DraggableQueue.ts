import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface DraggableItem {
  /** Stable key used for Lit's repeat/keyed rendering. */
  key: string;
}

export interface RowRenderHelpers {
  /** Attach to the grip handle's mouse/touch start handler. */
  onGripDown: (e: MouseEvent | TouchEvent) => void;
  isDragging: boolean;
}

/**
 * List with grip-handle drag-to-reorder. The caller passes:
 *   - `items`: stable list of objects with `key`
 *   - `rowHeight`: fixed row height (px)
 *   - `renderRow`: function returning the row template; it should attach the
 *     given `onGripDown` handler to whatever element the user grabs to drag
 *   - `reorder` event listener: fires with `{ from, to }` when the user
 *     drops the row in a new position
 *
 * Window mouse/touch listeners are added on grip-down and removed on drop,
 * so the gesture survives if the pointer leaves the row.
 */
@customElement('hf-draggable-queue')
export class DraggableQueue<T extends DraggableItem = DraggableItem> extends LitElement {
  @property({ attribute: false }) items: T[] = [];
  @property({ type: Number }) rowHeight = 56;
  @property({ attribute: false })
  renderRow: (item: T, index: number, helpers: RowRenderHelpers) => TemplateResult =
    () => html``;

  @state() private _dragIdx: number | null = null;
  @state() private _hoverIdx: number | null = null;
  private _startY = 0;

  static styles = css`
    :host {
      display: block;
    }
    .stack {
      position: relative;
    }
    .item {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transition: transform 0.18s cubic-bezier(0.2, 0.7, 0.3, 1);
    }
    .item.dragging {
      transition: none;
      z-index: 10;
      opacity: 0.92;
      filter: drop-shadow(0 8px 22px rgba(0, 0, 0, 0.4));
    }
  `;

  protected render() {
    const positions = this._positions();
    return html`
      <div class="stack" style=${`height:${this.items.length * this.rowHeight}px`}>
        ${this.items.map((item, i) => {
          const dragging = i === this._dragIdx;
          const y = positions[i] ?? 0;
          return html`
            <div
              class=${`item ${dragging ? 'dragging' : ''}`}
              style=${`transform:translateY(${y}px)`}
              .key=${item.key}
            >
              ${this.renderRow(item, i, {
                onGripDown: this._gripDownFor(i),
                isDragging: dragging,
              })}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _positions(): number[] {
    const order = this.items.map((_, i) => i);
    if (this._dragIdx !== null && this._hoverIdx !== null) {
      const [m] = order.splice(this._dragIdx, 1);
      if (m !== undefined) order.splice(this._hoverIdx, 0, m);
    }
    const out: number[] = new Array(this.items.length).fill(0);
    order.forEach((origIdx, newIdx) => {
      out[origIdx] = newIdx * this.rowHeight;
    });
    return out;
  }

  private _gripDownFor(idx: number) {
    return (e: MouseEvent | TouchEvent): void => {
      e.preventDefault();
      this._dragIdx = idx;
      this._hoverIdx = idx;
      this._startY = 'touches' in e ? e.touches[0]!.clientY : e.clientY;
      window.addEventListener('mousemove', this._onMove);
      window.addEventListener('mouseup', this._onUp);
      window.addEventListener('touchmove', this._onMove, { passive: false });
      window.addEventListener('touchend', this._onUp);
    };
  }

  private _onMove = (e: MouseEvent | TouchEvent): void => {
    if (this._dragIdx === null) return;
    const y = 'touches' in e ? e.touches[0]!.clientY : e.clientY;
    const dy = y - this._startY;
    const newPos = Math.round(this._dragIdx + dy / this.rowHeight);
    this._hoverIdx = Math.max(0, Math.min(this.items.length - 1, newPos));
  };

  private _onUp = (): void => {
    if (
      this._dragIdx !== null &&
      this._hoverIdx !== null &&
      this._hoverIdx !== this._dragIdx
    ) {
      this.dispatchEvent(
        new CustomEvent<{ from: number; to: number }>('hf-reorder', {
          detail: { from: this._dragIdx, to: this._hoverIdx },
          bubbles: true,
          composed: true,
        }),
      );
    }
    this._dragIdx = null;
    this._hoverIdx = null;
    window.removeEventListener('mousemove', this._onMove);
    window.removeEventListener('mouseup', this._onUp);
    window.removeEventListener('touchmove', this._onMove);
    window.removeEventListener('touchend', this._onUp);
  };

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    // Defensive: if the element disappears mid-drag, drop window listeners.
    window.removeEventListener('mousemove', this._onMove);
    window.removeEventListener('mouseup', this._onUp);
    window.removeEventListener('touchmove', this._onMove);
    window.removeEventListener('touchend', this._onUp);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-draggable-queue': DraggableQueue;
  }
}
