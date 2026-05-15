import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { HomeAssistant, HomefrontCardConfig } from './types.js';
import { themeVars } from './styles/theme.js';
import { Icons } from './components/Icons.js';
import { Store, type Tab } from './state/store.js';
import { StoreController } from './state/storeController.js';
import './components/PlayerTab.js';
import './components/BrowseTab.js';
import './components/SearchTab.js';
import './components/QueueTab.js';
import './components/OutputTab.js';
import './components/GroupChipRail.js';
import './components/GroupSheet.js';

declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'homefront-music-card',
  name: 'Homefront Music Card',
  description: 'Music Assistant + WiiM multi-room controller',
  preview: false,
});

const TABS: Array<{ id: Tab; label: string; icon: keyof typeof Icons }> = [
  { id: 'player', label: 'Player', icon: 'play' },
  { id: 'browser', label: 'Browse', icon: 'home' },
  { id: 'search', label: 'Search', icon: 'search' },
  { id: 'queue', label: 'Queue', icon: 'queue' },
  { id: 'group', label: 'Output', icon: 'speaker' },
];

@customElement('homefront-music-card')
export class HomefrontMusicCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HomefrontCardConfig;

  // The store is created once per card instance and lives until the card is
  // disconnected from the DOM. The 1-second tick is owned by the store and
  // must be disposed below to avoid leaking timers across re-renders.
  private _store = new Store();

  constructor() {
    super();
    // Side-effect-only: the controller registers itself with this host on
    // construction, so we don't keep a reference to it.
    new StoreController(this, this._store);
  }

  public setConfig(config: HomefrontCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 12;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._store.dispose();
  }

  static styles = [
    themeVars,
    css`
      :host {
        display: block;
        position: relative;
        background: var(--hf-bg);
        color: var(--hf-text);
        border-radius: 16px;
        overflow: hidden;
        font-family: var(--hf-font);
        border: 1px solid var(--hf-border);
        /* Keep the card a fixed height so the body scrolls internally,
           never the dashboard. Capped at 90vh so it always fits the
           viewport (mobile included). */
        height: min(820px, 90vh);
      }
      .frame {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: inherit;
      }
      .title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px 8px;
      }
      .title-icon {
        color: var(--hf-text);
        display: inline-flex;
      }
      .title-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.02em;
      }
      .title-sub {
        font-size: 11px;
        color: var(--hf-text-dim);
        margin-left: 6px;
      }
      .body {
        flex: 1;
        min-height: 0;
        position: relative;
      }
      .tab-bar {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        border-top: 1px solid var(--hf-border);
        background: var(--hf-surface);
        padding-bottom: 4px;
      }
      .tab {
        background: transparent;
        border: 0;
        padding: 8px 0 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        color: var(--hf-text-dim);
        cursor: pointer;
        font: inherit;
        position: relative;
      }
      .tab[aria-selected='true'] {
        color: var(--hf-accent);
      }
      .tab[aria-selected='true']::before {
        content: '';
        position: absolute;
        top: 0;
        left: 30%;
        right: 30%;
        height: 2px;
        background: var(--hf-accent);
        border-radius: 2px;
      }
      .tab-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.01em;
      }
    `,
  ];

  protected render() {
    return html`
      <div class="frame">
        ${this._renderTitle()}
        <hf-group-chip-rail .store=${this._store}></hf-group-chip-rail>
        <div class="body">${this._renderActiveTab()}</div>
        ${this._renderTabBar()}
      </div>
      <hf-group-sheet .store=${this._store}></hf-group-sheet>
    `;
  }

  private _renderTitle() {
    const zoneCount = this._config?.zones?.length ?? 0;
    const playingGroups = this._store.groups.filter((g) => g.playing).length;
    const zoneNote = zoneCount > 0 ? ` · ${zoneCount} zone${zoneCount === 1 ? '' : 's'}` : ' · mock';
    return html`
      <div class="title-row">
        <span class="title-icon">${Icons.note({ size: 14 })}</span>
        <span class="title-label">Music Assistant</span>
        <span class="title-sub">
          ${playingGroups} group${playingGroups === 1 ? '' : 's'} playing${zoneNote}
        </span>
      </div>
    `;
  }

  private _renderActiveTab() {
    const tab = this._store.tab;
    switch (tab) {
      case 'player':
        return html`<hf-player-tab .store=${this._store}></hf-player-tab>`;
      case 'browser':
        return html`<hf-browse-tab .store=${this._store}></hf-browse-tab>`;
      case 'search':
        return html`<hf-search-tab .store=${this._store}></hf-search-tab>`;
      case 'queue':
        return html`<hf-queue-tab .store=${this._store}></hf-queue-tab>`;
      case 'group':
        return html`<hf-output-tab .store=${this._store}></hf-output-tab>`;
    }
  }

  private _renderTabBar() {
    return html`
      <div class="tab-bar" role="tablist">
        ${TABS.map((t) => {
          const selected = this._store.tab === t.id;
          return html`
            <button
              class="tab"
              role="tab"
              aria-selected=${selected}
              @click=${() => this._store.setTab(t.id)}
            >
              ${Icons[t.icon]({ size: 18 })}
              <span class="tab-label">${t.label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }
}
