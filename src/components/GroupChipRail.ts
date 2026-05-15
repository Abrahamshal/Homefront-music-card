import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Store } from '../state/store.js';
import { StoreController } from '../state/storeController.js';
import { theme } from '../styles/theme.js';
import { Icons } from './Icons.js';
import { playingPip, playingPipStyles } from './primitives/PlayingPip.js';

/**
 * Horizontal pill rail under the card title. One pill per group; active is
 * accent-filled, idle solos are ghosted, multi-member groups show a count
 * badge. Trailing dashed `…` button jumps to the Output tab for full
 * group-management UI.
 */
@customElement('hf-group-chip-rail')
export class GroupChipRail extends LitElement {
  @property({ attribute: false }) store!: Store;

  private _ctrl?: StoreController;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('store') && this.store && !this._ctrl) {
      this._ctrl = new StoreController(this, this.store);
    }
  }

  static styles = [
    playingPipStyles,
    css`
      :host {
        display: block;
        border-bottom: 1px solid var(--hf-divider);
      }
      .rail {
        display: flex;
        gap: 6px;
        padding: 2px 14px 10px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .rail::-webkit-scrollbar {
        display: none;
      }
      .chip {
        flex: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px 5px 8px;
        border-radius: 999px;
        cursor: pointer;
        font: inherit;
        background: transparent;
        color: var(--hf-text);
        border: 1px solid var(--hf-border);
        white-space: nowrap;
        max-width: 220px;
        overflow: hidden;
      }
      .chip[data-active='true'] {
        background: var(--hf-accent);
        color: var(--hf-accent-text);
        border-color: var(--hf-accent);
      }
      .chip[data-idle='true'] {
        color: var(--hf-text-dim);
        opacity: 0.7;
      }
      .chip-name {
        font-size: 11.5px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
      }
      .badge {
        font-size: 9.5px;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: 999px;
        background: var(--hf-input);
        color: var(--hf-text-dim);
      }
      .chip[data-active='true'] .badge {
        background: rgba(0, 0, 0, 0.18);
        color: var(--hf-accent-text);
      }
      .manage-btn {
        flex: none;
        width: 28px;
        height: 28px;
        border-radius: 999px;
        background: transparent;
        border: 1px dashed var(--hf-border);
        display: grid;
        place-items: center;
        color: var(--hf-text-dim);
        cursor: pointer;
        padding: 0;
      }
    `,
  ];

  protected render() {
    if (!this.store) return html``;
    const groups = this.store.groups;
    return html`
      <div class="rail">
        ${groups.map((g) => {
          const pipColor = g.isActive ? theme.accentText : theme.accent;
          return html`
            <button
              class="chip"
              data-active=${g.isActive}
              data-idle=${g.isIdle}
              @click=${() => this.store.setActiveLead(g.leadId)}
            >
              ${g.playing
                ? playingPip(pipColor)
                : Icons.speaker({ size: 11, stroke: 'currentColor' })}
              <span class="chip-name">${g.name}</span>
              ${g.members.length > 1
                ? html`<span class="badge">${g.members.length}</span>`
                : ''}
            </button>
          `;
        })}
        <button
          class="manage-btn"
          aria-label="Manage groups"
          title="Manage groups"
          @click=${() => this.store.setTab('group')}
        >
          ${Icons.group({ size: 13 })}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-group-chip-rail': GroupChipRail;
  }
}
