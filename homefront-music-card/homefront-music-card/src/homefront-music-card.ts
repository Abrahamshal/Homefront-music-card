import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { HomeAssistant, HomefrontCardConfig } from './types.js';

// Register the card with Home Assistant's custom card picker so it shows up
// in the dashboard's "Add card" flow.
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

@customElement('homefront-music-card')
export class HomefrontMusicCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HomefrontCardConfig;

  // Phase 0 placeholder: just confirm the toolchain works end-to-end.
  // Phase 1 starts replacing this with the real card.
  public setConfig(config: HomefrontCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 8;
  }

  static styles = css`
    :host {
      display: block;
      background: var(--card-background-color, #16181d);
      color: var(--primary-text-color, #ecedef);
      border-radius: 16px;
      padding: 24px;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .sub {
      font-size: 13px;
      color: var(--secondary-text-color, rgba(236, 237, 239, 0.55));
    }
    code {
      background: rgba(255, 255, 255, 0.06);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 12px;
    }
  `;

  protected willUpdate(_changed: PropertyValues): void {
    // Reserved for derived state in later phases.
  }

  protected render() {
    const zoneCount = this._config?.zones?.length ?? 0;
    return html`
      <div class="title">Homefront Music Card</div>
      <div class="sub">
        Phase 0 placeholder. If you can see this in your dashboard, the build
        pipeline is working. Next: Phase 1 — port the prototype UI.
      </div>
      <div class="sub" style="margin-top: 12px;">
        Card type: <code>custom:homefront-music-card</code>
      </div>
      <div class="sub" style="margin-top: 4px;">
        hass available: <code>${this.hass ? 'yes' : 'no'}</code>
      </div>
      <div class="sub" style="margin-top: 4px;">
        zones configured: <code>${zoneCount}</code>
      </div>
    `;
  }
}
