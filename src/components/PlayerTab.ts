import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { mockData, fmtTime, albumById } from '../state/mockData.js';
import { theme } from '../styles/theme.js';
import { Icons } from './Icons.js';
import './primitives/AlbumArt.js';
import './primitives/Slider.js';

/**
 * Phase 1 first paint: hardcoded against the first track in the mock queue,
 * with local state for play/pause, shuffle, repeat, and scrubber position so
 * the controls feel alive without a store yet.
 *
 * Phase 1 step "store" replaces these locals with reactive controller state
 * sourced from `src/state/store.ts`; the rendering JSX below stays identical.
 */
@customElement('hf-player-tab')
export class PlayerTab extends LitElement {
  @state() private _position = 48;
  @state() private _playing = true;
  @state() private _shuffle = false;
  @state() private _repeat: 'off' | 'all' | 'one' = 'off';

  private get _track() {
    const id = mockData.initialQueue[0]!;
    return mockData.trackById(id) ?? mockData.tracks[0]!;
  }
  private get _album() {
    return albumById(this._track.albumId)!;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
      padding: 8px 16px 16px;
      color: var(--hf-text, #ecedef);
      font-family: var(--hf-font, sans-serif);
      box-sizing: border-box;
    }
    .art-wrap {
      margin: 8px auto 16px;
      aspect-ratio: 1 / 1;
      max-width: 280px;
      width: 92%;
    }
    hf-album-art {
      display: block;
      width: 100%;
      height: 100%;
    }
    .meta {
      text-align: center;
      padding: 0 8px;
    }
    .eyebrow {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--hf-text-dim);
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-top: 6px;
      letter-spacing: -0.01em;
    }
    .artist {
      font-size: 13px;
      color: var(--hf-text-dim);
      margin-top: 4px;
    }
    .scrubber {
      padding: 14px 4px 0;
    }
    .times {
      display: flex;
      justify-content: space-between;
      margin-top: -2px;
      color: var(--hf-text-dim);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    .transport {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
      padding: 12px 0 4px;
    }
    .icon-btn {
      width: 38px;
      height: 38px;
      border-radius: 999px;
      padding: 0;
      background: transparent;
      border: 0;
      color: var(--hf-text);
      cursor: pointer;
      display: grid;
      place-items: center;
      font: inherit;
    }
    .icon-btn[aria-pressed='true'] {
      color: var(--hf-accent);
    }
    .play-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    }
    .output {
      margin-top: 12px;
      display: flex;
      align-items: stretch;
      background: var(--hf-surface-alt);
      border: 1px solid var(--hf-border);
      border-radius: 12px;
      overflow: hidden;
    }
    .output-main {
      flex: 1;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      background: transparent;
      border: 0;
      color: var(--hf-text);
      cursor: pointer;
      font: inherit;
      text-align: left;
      min-width: 0;
    }
    .output-name {
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .output-sub {
      font-size: 10.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
    }
    .output-group-btn {
      padding: 0 14px;
      background: transparent;
      border: 0;
      border-left: 1px solid var(--hf-border);
      color: var(--hf-text);
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 600;
    }
  `;

  protected render() {
    const tr = this._track;
    const al = this._album;
    return html`
      <div class="art-wrap">
        <hf-album-art
          .obj=${al}
          size="100%"
          radius="18"
          boxShadow="0 18px 40px rgba(0,0,0,0.35)"
        ></hf-album-art>
      </div>
      <div class="meta">
        <div class="eyebrow">${this._shuffle ? 'Shuffle' : 'Now Playing'} · ${al.name}</div>
        <div class="title">${tr.name}</div>
        <div class="artist">${tr.artist}</div>
      </div>
      <div class="scrubber">
        <hf-slider
          .value=${this._position}
          .min=${0}
          .max=${tr.durationSec}
          .color=${theme.accent}
          .track=${theme.sliderTrack}
          @hf-input=${(e: CustomEvent<number>) => (this._position = e.detail)}
        ></hf-slider>
        <div class="times">
          <span>${fmtTime(this._position)}</span>
          <span>-${fmtTime(tr.durationSec - this._position)}</span>
        </div>
      </div>
      <div class="transport">
        <button
          class="icon-btn"
          aria-pressed=${this._shuffle}
          aria-label="Shuffle"
          @click=${() => (this._shuffle = !this._shuffle)}
        >
          ${Icons.shuffle({ size: 18 })}
        </button>
        <button class="icon-btn" aria-label="Previous" @click=${this._prev}>
          ${Icons.prev({ size: 22 })}
        </button>
        <button
          class="play-btn"
          aria-label=${this._playing ? 'Pause' : 'Play'}
          @click=${() => (this._playing = !this._playing)}
        >
          ${this._playing ? Icons.pause({ size: 22 }) : Icons.play({ size: 22 })}
        </button>
        <button class="icon-btn" aria-label="Next" @click=${this._next}>
          ${Icons.next({ size: 22 })}
        </button>
        <button
          class="icon-btn"
          aria-pressed=${this._repeat !== 'off'}
          aria-label="Repeat"
          @click=${this._cycleRepeat}
        >
          ${this._repeat === 'one' ? Icons.rep1({ size: 18 }) : Icons.rep({ size: 18 })}
        </button>
      </div>
      <div class="output">
        <button class="output-main" type="button">
          ${Icons.speaker({ size: 16, stroke: theme.accent })}
          <div style="flex:1; min-width:0">
            <div class="output-name">Living Room</div>
            <div class="output-sub">Volume 38</div>
          </div>
        </button>
        <button class="output-group-btn" type="button">
          ${Icons.group({ size: 13 })} Group
        </button>
      </div>
    `;
  }

  private _prev = () => {
    this._position = 0;
  };
  private _next = () => {
    this._position = 0;
  };
  private _cycleRepeat = () => {
    this._repeat = this._repeat === 'off' ? 'all' : this._repeat === 'all' ? 'one' : 'off';
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-player-tab': PlayerTab;
  }
}
