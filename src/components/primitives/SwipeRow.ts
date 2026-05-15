import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Horizontal swipe-left row that reveals a delete action.
 *
 * Caller provides the row content via the default `<slot>` and a `delete`
 * event listener; the SwipeRow handles the gesture state internally.
 *
 * Mouse + touch events are supported via the same pointer-style handlers.
 * Movement is clamped to [-110, 0]; row snaps open at -64.
 */
@customElement('hf-swipe-row')
export class SwipeRow extends LitElement {
  @property({ type: Number }) rowHeight = 56;
  @property() actionBg = '#e0413a';
  @property({ attribute: false }) icon?: TemplateResult;

  @state() private _dx = 0;
  @state() private _dragging = false;

  private _startX: number | null = null;
  private _startDx = 0;

  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }
    .action {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 92px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }
    .row {
      height: 100%;
      cursor: grab;
      background: var(--hf-bg);
    }
    .row.dragging {
      cursor: grabbing;
    }
  `;

  protected render() {
    return html`
      <div
        class="action"
        style=${`background:${this.actionBg}`}
        @click=${this._fireDelete}
      >
        ${this.icon ?? html`<span>×</span>`}
      </div>
      <div
        class=${`row ${this._dragging ? 'dragging' : ''}`}
        style=${`height:${this.rowHeight}px;transform:translateX(${this._dx}px);transition:${this._dragging ? 'none' : 'transform 0.18s'}`}
        @mousedown=${this._onDown}
        @mousemove=${this._onMove}
        @mouseup=${this._onUp}
        @mouseleave=${this._onUp}
        @touchstart=${this._onDown}
        @touchmove=${this._onMove}
        @touchend=${this._onUp}
      >
        <slot></slot>
      </div>
    `;
  }

  private _onDown = (e: MouseEvent | TouchEvent): void => {
    const x = 'touches' in e ? e.touches[0]!.clientX : e.clientX;
    this._startX = x;
    this._startDx = this._dx;
    this._dragging = true;
  };

  private _onMove = (e: MouseEvent | TouchEvent): void => {
    if (this._startX === null) return;
    const x = 'touches' in e ? e.touches[0]!.clientX : e.clientX;
    let d = this._startDx + (x - this._startX);
    if (d > 0) d = 0;
    if (d < -110) d = -110;
    this._dx = d;
  };

  private _onUp = (): void => {
    this._startX = null;
    this._dragging = false;
    this._dx = this._dx < -64 ? -92 : 0;
  };

  private _fireDelete = (): void => {
    this.dispatchEvent(new CustomEvent('hf-delete', { bubbles: true, composed: true }));
    this._dx = 0;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-swipe-row': SwipeRow;
  }
}
