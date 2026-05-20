import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Store } from '../state/store.js';
import { StoreController } from '../state/storeController.js';
import { Icons } from './Icons.js';

/**
 * Renders the active toast queue (notifications). Toasts auto-dismiss
 * after the store's TTL; user can dismiss manually with the × button.
 *
 * Mounted at the host card root so it overlays everything; doesn't
 * intercept pointer events when empty.
 */
@customElement('hf-toast-bar')
export class ToastBar extends LitElement {
  @property({ attribute: false }) store!: Store;

  private _ctrl?: StoreController;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('store') && this.store && !this._ctrl) {
      this._ctrl = new StoreController(this, this.store);
    }
  }

  static styles = css`
    :host {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 60px;
      z-index: 70;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 0 14px;
      pointer-events: none;
    }
    .toast {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.32);
      font-size: 12.5px;
      color: var(--hf-text);
      animation: hf-toast-in 0.18s ease-out;
    }
    .toast[data-level='error'] {
      border-color: #c44a40;
    }
    .toast[data-level='warning'] {
      border-color: #d4a04a;
    }
    .toast-icon {
      flex: none;
      display: inline-flex;
      color: var(--hf-text-dim);
      margin-top: 1px;
    }
    .toast[data-level='error'] .toast-icon {
      color: #e0413a;
    }
    .toast[data-level='warning'] .toast-icon {
      color: #d4a04a;
    }
    .toast-message {
      flex: 1;
      min-width: 0;
      word-break: break-word;
      line-height: 1.4;
    }
    .toast-close {
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      color: var(--hf-text-dim);
      flex: none;
      display: inline-flex;
    }
    @keyframes hf-toast-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  protected render() {
    if (!this.store || this.store.toasts.length === 0) return html``;
    return html`
      ${this.store.toasts.map(
        (t) => html`
          <div class="toast" data-level=${t.level}>
            <span class="toast-icon">${this._iconFor(t.level)}</span>
            <div class="toast-message">${t.message}</div>
            <button
              class="toast-close"
              aria-label="Dismiss"
              @click=${() => this.store.dismissToast(t.id)}
            >
              ${Icons.x({ size: 13 })}
            </button>
          </div>
        `,
      )}
    `;
  }

  private _iconFor(level: 'info' | 'warning' | 'error') {
    if (level === 'error') return Icons.x({ size: 14, sw: 2.4 });
    if (level === 'warning') return Icons.filter({ size: 14 });
    return Icons.note({ size: 14 });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-toast-bar': ToastBar;
  }
}
