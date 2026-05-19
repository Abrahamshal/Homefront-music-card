import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeVars } from '../styles/theme.js';
import { Icons } from './Icons.js';
import type { IntegrationStatus } from '../state/integrationDetect.js';

interface Requirement {
  key: 'hasMA' | 'hasQueueActions' | 'hasWiim';
  name: string;
  why: string;
  /** Where the user installs / configures this. */
  hint: string;
  link?: string;
}

const REQUIREMENTS: Requirement[] = [
  {
    key: 'hasMA',
    name: 'Music Assistant',
    why: 'Browses libraries (Spotify, Apple Music, Tidal, …), drives playback, and surfaces now-playing metadata.',
    hint: 'Install the Music Assistant add-on, then add the integration under Settings → Devices & Services.',
    link: 'https://music-assistant.io',
  },
  {
    key: 'hasQueueActions',
    name: 'Music Assistant Queue Actions (mass_queue)',
    why: 'Adds queue manipulation services (reorder, remove, clear) the card uses on the Queue tab. Registers services under the mass_queue domain.',
    hint: 'Install via HACS — "Music Assistant Queue Actions" by droans — then add it under Settings → Devices & Services.',
    link: 'https://github.com/droans/mass_queue',
  },
  {
    key: 'hasWiim',
    name: 'WiiM Audio (LinkPlay)',
    why: 'Provides WiiM-native Linkplay grouping. The card uses this for all multi-room sync, never MA grouping.',
    hint: 'Install via HACS — "WiiM Audio Integration for Home Assistant" by mjcumming — then add each device under Settings → Devices & Services.',
    link: 'https://github.com/mjcumming/wiim',
  },
];

/**
 * Setup-help panel shown when one or more required integrations are
 * missing. Per the spec: "If the card detects missing requirements, it
 * renders a setup-help panel instead of the main UI. Each missing piece
 * gets a row with: what's missing, why it's needed, a link to install
 * instructions."
 */
@customElement('hf-setup-help')
export class SetupHelp extends LitElement {
  @property({ attribute: false }) status!: IntegrationStatus;

  static styles = [
    themeVars,
    css`
      :host {
        display: block;
        background: var(--hf-bg);
        color: var(--hf-text);
        font-family: var(--hf-font);
        border-radius: 16px;
        border: 1px solid var(--hf-border);
        padding: 22px 20px 24px;
        overflow: hidden;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .head-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: rgba(224, 138, 74, 0.14);
        color: var(--hf-accent);
        display: grid;
        place-items: center;
      }
      .head-text {
        min-width: 0;
      }
      .head-title {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      .head-sub {
        font-size: 12px;
        color: var(--hf-text-dim);
        margin-top: 2px;
      }
      .summary {
        margin: 14px 0 6px;
        font-size: 12px;
        color: var(--hf-text-dim);
        line-height: 1.55;
      }
      .summary strong {
        color: var(--hf-text);
        font-weight: 600;
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
      }
      .row {
        display: flex;
        gap: 12px;
        padding: 12px;
        background: var(--hf-surface);
        border: 1px solid var(--hf-border);
        border-radius: 12px;
      }
      .row[data-state='ok'] {
        opacity: 0.7;
      }
      .row-status {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex: none;
      }
      .row[data-state='missing'] .row-status {
        background: rgba(224, 138, 74, 0.16);
        color: var(--hf-accent);
      }
      .row[data-state='ok'] .row-status {
        background: rgba(120, 200, 120, 0.16);
        color: rgb(120, 200, 120);
      }
      .row-body {
        flex: 1;
        min-width: 0;
      }
      .row-name {
        font-size: 13.5px;
        font-weight: 700;
      }
      .row-why {
        font-size: 12px;
        color: var(--hf-text-dim);
        margin-top: 3px;
        line-height: 1.45;
      }
      .row-hint {
        margin-top: 8px;
        font-size: 11.5px;
        color: var(--hf-text);
        line-height: 1.45;
      }
      .row-hint a {
        color: var(--hf-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .row-hint a:hover {
        text-decoration: underline;
      }
      .footer {
        margin-top: 14px;
        font-size: 11px;
        color: var(--hf-text-dim);
        line-height: 1.5;
      }
    `,
  ];

  protected render() {
    if (!this.status) return html``;
    const missing = REQUIREMENTS.filter((r) => !this.status[r.key]);
    const missingCount = missing.length;
    return html`
      <div class="head">
        <div class="head-icon">${Icons.note({ size: 16 })}</div>
        <div class="head-text">
          <div class="head-title">Setup incomplete</div>
          <div class="head-sub">
            ${missingCount} of ${REQUIREMENTS.length} required
            integration${missingCount === 1 ? '' : 's'} missing
          </div>
        </div>
      </div>

      <div class="summary">
        The Homefront Music Card needs <strong>three integrations</strong>
        installed in Home Assistant. Each handles a separate part of the
        card: content + playback (MA), queue manipulation (Queue Actions),
        and multi-room grouping (WiiM/Linkplay).
      </div>

      <div class="list">
        ${REQUIREMENTS.map((req) => this._renderRow(req))}
      </div>

      <div class="footer">
        After installing the missing piece${missingCount === 1 ? '' : 's'},
        reload Home Assistant (or restart). This card will pick up the
        changes automatically.
      </div>
    `;
  }

  private _renderRow(req: Requirement) {
    const present = this.status[req.key];
    const state = present ? 'ok' : 'missing';
    return html`
      <div class="row" data-state=${state}>
        <div class="row-status">
          ${present ? Icons.check({ size: 14, sw: 2.4 }) : Icons.plus({ size: 14, sw: 2.4 })}
        </div>
        <div class="row-body">
          <div class="row-name">${req.name}</div>
          <div class="row-why">${req.why}</div>
          ${present
            ? html`<div class="row-hint">Detected ✓</div>`
            : html`
                <div class="row-hint">
                  ${req.hint}
                  ${req.link
                    ? html` <a href=${req.link} target="_blank" rel="noopener">
                        Open repo →
                      </a>`
                    : ''}
                </div>
              `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-setup-help': SetupHelp;
  }
}
