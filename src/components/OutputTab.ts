import { LitElement, html, css, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { mockData } from '../state/mockData.js';
import { Store, type Group, type SpeakerWithLead } from '../state/store.js';
import { StoreController } from '../state/storeController.js';
import { theme } from '../styles/theme.js';
import { Icons } from './Icons.js';
import './primitives/AlbumArt.js';
import './primitives/Slider.js';

/**
 * Multi-group output management. One card per active group with its own
 * now-playing peek, group volume, member sliders, and per-member
 * remove-from-group action. Idle solos appear in a separate rail at the
 * bottom with Group + Play-solo actions.
 */
@customElement('hf-output-tab')
export class OutputTab extends LitElement {
  @property({ attribute: false }) store!: Store;

  private _ctrl?: StoreController;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('store') && this.store && !this._ctrl) {
      this._ctrl = new StoreController(this, this.store);
    }
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      padding: 8px 14px 16px;
      color: var(--hf-text);
      font-family: var(--hf-font);
      box-sizing: border-box;
    }
    .header {
      padding: 8px 4px 4px;
    }
    .header-title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1.05;
    }
    .header-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 4px;
    }
    .groups {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 4px;
    }
    .group-card {
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 14px;
      overflow: hidden;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .group-card[data-active='true'] {
      border-color: var(--hf-accent);
      box-shadow: 0 0 0 2px rgba(224, 138, 74, 0.15);
    }
    .group-head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 12px 10px;
    }
    .group-art {
      width: 46px;
      height: 46px;
      border-radius: 9px;
      background: var(--hf-input);
      display: grid;
      place-items: center;
      color: var(--hf-text-dim);
      flex: none;
    }
    .group-meta {
      flex: 1;
      min-width: 0;
    }
    .group-name-btn {
      background: transparent;
      border: 0;
      padding: 0;
      font: inherit;
      color: var(--hf-text);
      text-align: left;
      cursor: pointer;
      min-width: 0;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .group-name {
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .active-badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--hf-accent);
      padding: 1px 6px;
      border: 1px solid var(--hf-accent);
      border-radius: 4px;
      text-transform: uppercase;
      flex: none;
    }
    .group-track {
      font-size: 11px;
      color: var(--hf-text-dim);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .group-track strong {
      color: var(--hf-text);
      font-weight: 500;
    }
    .group-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pill-btn {
      height: 32px;
      padding: 0 10px;
      border-radius: 999px;
      background: transparent;
      border: 1px solid var(--hf-border);
      color: var(--hf-text);
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      font-weight: 600;
      flex: none;
    }
    .play-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: transparent;
      color: var(--hf-text);
      border: 1px solid var(--hf-border);
      cursor: pointer;
      display: grid;
      place-items: center;
      padding: 0;
      flex: none;
    }
    .play-btn[data-playing='true'] {
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border-color: var(--hf-accent);
    }
    .group-volume {
      padding: 0 12px 4px;
    }
    .group-volume-head {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: -2px;
      color: var(--hf-text-dim);
    }
    .group-volume-label {
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .group-volume-value {
      margin-left: auto;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .members {
      border-top: 1px solid var(--hf-divider);
      padding: 6px 12px 10px;
    }
    .member-row {
      padding: 6px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .member-info {
      flex: 1;
      min-width: 0;
    }
    .member-name-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .member-name {
      font-size: 12.5px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lead-tag {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--hf-text-dim);
      text-transform: uppercase;
    }
    .member-vol-value {
      font-size: 10.5px;
      color: var(--hf-text-dim);
      width: 22px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .member-leave {
      width: 24px;
      height: 24px;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--hf-text-dim);
      cursor: pointer;
    }
    .idle-section {
      margin: 20px 4px 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
    }
    .idle-section .rule {
      flex: 1;
      height: 1px;
      background: var(--hf-divider);
    }
    .idle-rows {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .idle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: var(--hf-surface);
      border: 1px solid var(--hf-border);
      border-radius: 10px;
    }
    .idle-icon {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: var(--hf-input);
      display: grid;
      place-items: center;
      color: var(--hf-text-dim);
      flex: none;
    }
    .idle-name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .idle-sub {
      font-size: 10.5px;
      color: var(--hf-text-dim);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .idle-info {
      flex: 1;
      min-width: 0;
    }
    .idle-group-btn {
      font-size: 11px;
      font-weight: 600;
      color: var(--hf-text);
      padding: 4px 9px;
      border-radius: 999px;
      background: transparent;
      border: 1px solid var(--hf-border);
      cursor: pointer;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .idle-play-btn {
      width: 26px;
      height: 26px;
      border-radius: 999px;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
      cursor: pointer;
      display: grid;
      place-items: center;
      padding: 0;
      flex: none;
    }
    .footer-help {
      margin-top: 16px;
      padding: 0 4px;
      font-size: 11px;
      color: var(--hf-text-dim);
      line-height: 1.5;
    }
  `;

  protected render() {
    if (!this.store) return html``;
    const all = this.store.groups;
    const active = all.filter((g) => !g.isIdle);
    const idle = all.filter((g) => g.isIdle);
    return html`
      <div class="header">
        <div class="header-title">Speakers & groups</div>
        <div class="header-sub">
          ${active.length} group${active.length === 1 ? '' : 's'} ·
          ${this.store.speakers.length} speakers total
        </div>
      </div>

      <div class="groups">
        ${active.map((g) => this._renderGroupCard(g))}
      </div>

      ${idle.length > 0
        ? html`
            <div class="idle-section">
              Idle
              <div class="rule"></div>
              ${idle.length}
            </div>
            <div class="idle-rows">
              ${idle.map((g) => this._renderIdleRow(g))}
            </div>
          `
        : ''}

      <div class="footer-help">
        Tap a group's name to control it from the Player tab. Use Group on
        any row to add/remove rooms; ▶ on an idle row starts solo playback.
      </div>
    `;
  }

  private _renderGroupCard(g: Group): TemplateResult {
    const track = g.player ? mockData.trackById(g.player.queue[g.player.currentIdx] ?? '') : undefined;
    const album = track ? mockData.albumById(track.albumId) : undefined;
    const groupVol = g.player?.groupVolume ?? g.lead.volume;
    return html`
      <div class="group-card" data-active=${g.isActive}>
        <div class="group-head">
          ${album
            ? html`<hf-album-art .obj=${album} size="46" radius="9"></hf-album-art>`
            : html`<div class="group-art">${Icons.speaker({ size: 18 })}</div>`}
          <div class="group-meta">
            <button class="group-name-btn" @click=${() => this.store.setActiveLead(g.leadId)}>
              <span class="group-name">${g.name}</span>
              ${g.isActive ? html`<span class="active-badge">Active</span>` : ''}
            </button>
            <div class="group-track">
              ${track
                ? html`<strong>${track.name}</strong> · ${track.artist}`
                : 'Idle'}
            </div>
          </div>
          <div class="group-actions">
            <button
              class="pill-btn"
              title="Group rooms"
              @click=${() => this.store.openGroupingSheet(g.leadId)}
            >
              ${Icons.group({ size: 13 })} Group
            </button>
            <button
              class="play-btn"
              data-playing=${g.playing}
              aria-label=${g.playing ? 'Pause group' : 'Play group'}
              @click=${() => this.store.toggleGroupPlay(g.leadId)}
            >
              ${g.playing ? Icons.pause({ size: 14 }) : Icons.play({ size: 14 })}
            </button>
          </div>
        </div>

        <div class="group-volume">
          <div class="group-volume-head">
            ${Icons.group({ size: 13, stroke: theme.textDim })}
            <div class="group-volume-label">
              Group · ${g.members.length} speaker${g.members.length === 1 ? '' : 's'}
            </div>
            <div class="group-volume-value">${groupVol}</div>
          </div>
          <hf-slider
            .value=${groupVol}
            .color=${theme.accent}
            .track=${theme.sliderTrack}
            @hf-input=${(e: CustomEvent<number>) =>
              this.store.setGroupVolumeFor(g.leadId, e.detail)}
          ></hf-slider>
        </div>

        <div class="members">
          ${g.members.map((m) => this._renderMemberRow(m, g))}
        </div>
      </div>
    `;
  }

  private _renderMemberRow(member: SpeakerWithLead, group: Group): TemplateResult {
    const isLead = member.id === group.leadId;
    const canLeave = group.members.length > 1;
    return html`
      <div class="member-row">
        <div class="member-info">
          <div class="member-name-row">
            <div class="member-name">${member.name}</div>
            ${isLead && group.members.length > 1
              ? html`<span class="lead-tag">Lead</span>`
              : ''}
          </div>
          <hf-slider
            .value=${member.volume}
            .color=${theme.textDim}
            .track=${theme.sliderTrack}
            .trackHeight=${3}
            .thumb=${10}
            @hf-input=${(e: CustomEvent<number>) =>
              this.store.setSpeakerVol(member.id, e.detail)}
          ></hf-slider>
        </div>
        <div class="member-vol-value">${member.volume}</div>
        ${canLeave
          ? html`
              <button
                class="member-leave"
                title="Leave group"
                @click=${() => this.store.ungroupSpeaker(member.id)}
              >
                ${Icons.x({ size: 13 })}
              </button>
            `
          : ''}
      </div>
    `;
  }

  private _renderIdleRow(g: Group): TemplateResult {
    const sp = g.lead;
    return html`
      <div class="idle-row">
        <div class="idle-icon">${Icons.speaker({ size: 14 })}</div>
        <div class="idle-info">
          <div class="idle-name">${sp.name}</div>
          <div class="idle-sub">${sp.model} · idle</div>
        </div>
        <button
          class="idle-group-btn"
          title="Group with other rooms"
          @click=${() => this.store.openGroupingSheet(sp.id)}
        >
          ${Icons.group({ size: 11 })} Group
        </button>
        <button
          class="idle-play-btn"
          title="Play solo here"
          aria-label="Play solo"
          @click=${() => this.store.startSoloPlayback(sp.id)}
        >
          ${Icons.play({ size: 11 })}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-output-tab': OutputTab;
  }
}
