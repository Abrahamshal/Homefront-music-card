import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { HomeAssistant, HomefrontCardConfig } from './types.js';
import { themeVars } from './styles/theme.js';
import { Icons } from './components/Icons.js';
import { Store, type Tab } from './state/store.js';
import { StoreController } from './state/storeController.js';
import { checkIntegrations, type IntegrationStatus } from './state/integrationDetect.js';
import './components/PlayerTab.js';
import './components/BrowseTab.js';
import './components/SearchTab.js';
import './components/QueueTab.js';
import './components/OutputTab.js';
import './components/GroupChipRail.js';
import './components/GroupSheet.js';
import './components/SetupHelp.js';
import './components/CardEditor.js';
import './components/ToastBar.js';

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
  /**
   * HA sets this to `true` when the dashboard is in edit mode. We use it
   * to show an inline edit button that works consistently across view
   * types — Panel mode's normal hover overlay is unreliable, especially
   * on desktop.
   */
  @property({ attribute: false }) public editMode = false;

  @state() private _config?: HomefrontCardConfig;
  @state() private _integrationStatus?: IntegrationStatus;

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
    this._store.setConfig(config);

    // Reflect the chosen layout onto the host so :host([data-layout=…])
    // styles apply.
    if (config.layout === 'panel') {
      this.setAttribute('data-layout', 'panel');
    } else {
      this.removeAttribute('data-layout');
    }

    // Wire accent_color → overrides --hf-accent. Inline style on the
    // host beats the CSS rule from themeVars (same specificity, but
    // inline wins). Also computes a contrasting --hf-accent-text by
    // luminance so accent buttons remain readable.
    if (config.accent_color) {
      this.style.setProperty('--hf-accent', config.accent_color);
      this.style.setProperty(
        '--hf-accent-text',
        pickAccentText(config.accent_color),
      );
    } else {
      this.style.removeProperty('--hf-accent');
      this.style.removeProperty('--hf-accent-text');
    }

    // Wire density → controls padding and row heights via CSS vars
    // that key selectors in this component consume. Components
    // downstream can opt in to these for finer-grained spacing.
    const density = config.density ?? 'regular';
    this.setAttribute('data-density', density);

    // Wire theme → CSS vars swap via themeVars's :host([data-theme=…])
    // rules. 'auto' follows prefers-color-scheme.
    const themeMode = config.theme ?? 'dark';
    this.setAttribute('data-theme', themeMode);
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('hass') && this.hass) {
      this._integrationStatus = checkIntegrations(this.hass);
      // Only flow hass into the store once all required integrations are
      // present. Otherwise the store would derive an empty zone map and
      // the user would see "no zones" UI on top of the setup-help panel.
      if (this._integrationStatus.allPresent) {
        this._store.setHass(this.hass);
      }
    }
  }

  public getCardSize(): number {
    return 12;
  }

  /**
   * Returns the editor element HA uses when the user clicks "Edit card"
   * in the dashboard. Without this, HA shows the YAML-only fallback +
   * the "Visual editor not supported" message.
   */
  public static getConfigElement(): HTMLElement {
    return document.createElement('hf-card-editor');
  }

  /** Default config used when adding the card from HA's card picker. */
  public static getStubConfig(): HomefrontCardConfig {
    return { type: 'custom:homefront-music-card' };
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
        /* Default (card) layout — phone-shaped artboard, body scrolls
           internally. Capped at 90vh so it always fits the viewport. */
        height: min(820px, 90vh);
      }
      /* Density variants — drive shared spacing tokens that selectors
         in this file (and others, if they consume the vars) read from.
         Defaults to 'regular' via the :host fallbacks below. */
      :host {
        --hf-density-title-pad-y: 10px;
        --hf-density-tab-pad-y: 8px;
        --hf-density-tab-label-fs: 10px;
      }
      :host([data-density='compact']) {
        --hf-density-title-pad-y: 6px;
        --hf-density-tab-pad-y: 5px;
        --hf-density-tab-label-fs: 9.5px;
      }
      :host([data-density='comfy']) {
        --hf-density-title-pad-y: 14px;
        --hf-density-tab-pad-y: 11px;
        --hf-density-tab-label-fs: 11px;
      }

      :host([data-layout='panel']) {
        /* Panel layout — pair with a Lovelace view in "Panel (1 card)".
           Size against the viewport directly rather than relying on
           height:100% propagating through HA's container chain, which
           breaks in some HA versions / themes. dvh adjusts for mobile
           browser chrome; --header-height is the HA app bar (fallback
           56px if the theme doesn't set it). overscroll-behavior:contain
           prevents touch-scroll chaining from leaking into the page
           on mobile. */
        width: 100%;
        max-width: 100%;
        height: calc(100vh - var(--header-height, 56px));
        height: calc(100dvh - var(--header-height, 56px));
        max-height: calc(100dvh - var(--header-height, 56px));
        overscroll-behavior: contain;
        border-radius: 0;
        border: 0;
      }
      .frame {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
      }
      .title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: var(--hf-density-title-pad-y) 14px var(--hf-density-tab-pad-y);
      }
      .edit-btn {
        margin-left: auto;
        background: var(--hf-input);
        border: 1px solid var(--hf-border);
        color: var(--hf-text);
        width: 26px;
        height: 26px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font: inherit;
        padding: 0;
        flex: none;
      }
      .edit-btn:hover {
        background: var(--hf-surface);
        color: var(--hf-accent);
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
        overscroll-behavior: contain;
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
        padding: var(--hf-density-tab-pad-y) 0 calc(var(--hf-density-tab-pad-y) - 2px);
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
        font-size: var(--hf-density-tab-label-fs);
        font-weight: 600;
        letter-spacing: 0.01em;
      }
      .debug-overlay {
        position: absolute;
        bottom: 4px;
        left: 4px;
        right: 4px;
        background: rgba(0, 0, 0, 0.85);
        color: #ecedef;
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 10.5px;
        line-height: 1.5;
        border-radius: 6px;
        padding: 8px 10px;
        z-index: 60;
        max-height: 40%;
        overflow-y: auto;
        pointer-events: auto;
      }
      .debug-overlay-title {
        font-family: var(--hf-font);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--hf-accent);
        margin-bottom: 4px;
      }
      .debug-overlay-line {
        white-space: pre-wrap;
        word-break: break-word;
      }
    `,
  ];

  protected render() {
    // Show the setup-help panel when we have a real hass and any of the
    // three required integrations is missing. Without hass (development
    // or a fresh Lovelace edit), fall through to the main UI with mock
    // data — that's also how the visual editor previews the card.
    if (this._integrationStatus && !this._integrationStatus.allPresent) {
      return html`<hf-setup-help .status=${this._integrationStatus}></hf-setup-help>`;
    }
    return html`
      <div class="frame">
        ${this._renderTitle()}
        <hf-group-chip-rail .store=${this._store}></hf-group-chip-rail>
        <div class="body">${this._renderActiveTab()}</div>
        ${this._renderTabBar()}
      </div>
      <hf-group-sheet .store=${this._store}></hf-group-sheet>
      <hf-toast-bar .store=${this._store}></hf-toast-bar>
      ${this._config?.debug ? this._renderDebugOverlay() : ''}
    `;
  }

  private _renderDebugOverlay() {
    const notes = this._store.diagnosticNotes;
    return html`
      <div class="debug-overlay">
        <div class="debug-overlay-title">
          ${this._store.isHassMode ? 'HASS MODE' : 'MOCK MODE'} · zone discovery
        </div>
        ${notes.length > 0
          ? notes.map((n) => html`<div class="debug-overlay-line">${n}</div>`)
          : html`<div class="debug-overlay-line">(no diagnostics yet)</div>`}
      </div>
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
        ${this.editMode
          ? html`
              <button
                class="edit-btn"
                title="Edit card"
                aria-label="Edit card"
                @click=${this._openCardEditor}
              >
                ${Icons.filter({ size: 12 })}
              </button>
            `
          : ''}
      </div>
    `;
  }

  /**
   * Fire HA's `show-edit-card` event so the parent dashboard opens its
   * card-editor dialog with our config loaded. Works in any view type —
   * the affordance HA usually provides (hover overlay, tab pencil) is
   * inconsistent across Panel mode and across desktop/mobile, so we
   * provide our own.
   */
  private _openCardEditor = (e: Event): void => {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('show-edit-card', {
        bubbles: true,
        composed: true,
      }),
    );
  };

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

/**
 * Pick a contrasting text color (#fff or #111) for a given background hex
 * using the standard relative-luminance formula. Used when the user sets
 * a custom accent color so the accent-button text stays readable.
 */
function pickAccentText(hex: string): string {
  const norm = hex.trim().replace(/^#/, '');
  if (norm.length !== 3 && norm.length !== 6) return '#fff';
  const full =
    norm.length === 3
      ? norm
          .split('')
          .map((c) => c + c)
          .join('')
      : norm;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some((v) => Number.isNaN(v))) return '#fff';
  // Standard luminance approximation; >0.55 → use dark text.
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.55 ? '#111' : '#fff';
}
