import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { HomeAssistant, HomefrontCardConfig } from './types.js';
import { themeVars } from './styles/theme.js';
import { Icons } from './components/Icons.js';
import './components/PlayerTab.js';

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

type Tab = 'player' | 'browser' | 'search' | 'queue' | 'group';

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
  @state() private _tab: Tab = 'player';

  public setConfig(config: HomefrontCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 12;
  }

  static styles = [
    themeVars,
    css`
      :host {
        display: block;
        background: var(--hf-bg);
        color: var(--hf-text);
        border-radius: 16px;
        overflow: hidden;
        font-family: var(--hf-font);
        border: 1px solid var(--hf-border);
        min-height: 620px;
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
        border-bottom: 1px solid var(--hf-divider);
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
      .stub {
        height: 100%;
        display: grid;
        place-items: center;
        padding: 24px;
        color: var(--hf-text-dim);
        font-size: 13px;
        text-align: center;
        line-height: 1.5;
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
        <div class="body">${this._renderActiveTab()}</div>
        ${this._renderTabBar()}
      </div>
    `;
  }

  private _renderTitle() {
    const zoneCount = this._config?.zones?.length ?? 0;
    const sub = zoneCount > 0
      ? `· ${zoneCount} zone${zoneCount === 1 ? '' : 's'} configured`
      : '· Phase 1 preview · mock data';
    return html`
      <div class="title-row">
        <span class="title-icon">${Icons.note({ size: 14 })}</span>
        <span class="title-label">Music Assistant</span>
        <span class="title-sub">${sub}</span>
      </div>
    `;
  }

  private _renderActiveTab() {
    if (this._tab === 'player') {
      return html`<hf-player-tab></hf-player-tab>`;
    }
    return html`
      <div class="stub">
        ${TABS.find((t) => t.id === this._tab)?.label} tab<br />
        coming next in Phase 1.
      </div>
    `;
  }

  private _renderTabBar() {
    return html`
      <div class="tab-bar" role="tablist">
        ${TABS.map((t) => {
          const selected = this._tab === t.id;
          return html`
            <button
              class="tab"
              role="tab"
              aria-selected=${selected}
              @click=${() => (this._tab = t.id)}
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
