import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import MediaControlService from '../services/media-control-service';
import Store from '../model/store';
import { CardConfig, PlayerConfig } from '../types';
import { mdiPower, mdiVolumeHigh, mdiVolumeMute } from '@mdi/js';
import { MediaPlayer } from '../model/media-player';
import './icon-button';

// Don't flood the websocket while the user drags - one call per interval, plus a
// final one on release.
const SLIDE_SEND_INTERVAL_MS = 100;
// How long to keep showing the value the user picked before giving up on hass
// reporting it back (some players quantize the level they were given).
const SETTLE_TIMEOUT_MS = 2000;

class Volume extends LitElement {
  @property({ attribute: false }) store!: Store;
  private config!: CardConfig;
  private playerConfig!: PlayerConfig;
  private mediaControlService!: MediaControlService;
  @property({ attribute: false }) player!: MediaPlayer;
  @property({ type: Boolean }) updateMembers = true;
  @property() volumeClicked?: () => void;
  @property() slim: boolean = false;
  @property() isPlayer: boolean = false;
  @state() private sliderMoving: boolean = false;
  @state() private startVolumeSliderMoving: number = 0;
  // The value the user is dragging towards. The card rebuilds its store - and with
  // it every MediaPlayer - on each hass update, so without this we'd keep pushing
  // the (still stale) volume from hass back into ha-control-slider and the thumb
  // would snap backwards mid-drag.
  @state() private localVolume?: number;
  private pendingVolume?: number;
  private sendTimer?: number;
  private settleTimer?: number;
  private lastSentAt = 0;
  private togglePower = async () => await this.mediaControlService.togglePower(this.player);

  protected willUpdate() {
    // hass caught up with what the user picked - hand control back to it.
    if (!this.sliderMoving && this.localVolume !== undefined && this.player?.getVolume() === this.localVolume) {
      this.clearLocalVolume();
    }
  }

  disconnectedCallback() {
    this.clearSendTimer();
    this.clearSettleTimer();
    super.disconnectedCallback();
  }

  render() {
    this.config = this.store.config;
    this.playerConfig = this.config.player ?? {};
    this.mediaControlService = this.store.mediaControlService;

    const volume = this.localVolume ?? this.player.getVolume();
    const max = this.getMax();

    const isMuted = this.updateMembers ? this.player.isGroupMuted() : this.player.isMemberMuted();
    const muteIcon = isMuted ? mdiVolumeMute : mdiVolumeHigh;
    const disabled = this.player.ignoreVolume;

    const globalSliderHeight = this.config.volumeSliderHeight;
    const sliderHeight = this.isPlayer ? (this.playerConfig.volumeSliderHeight ?? globalSliderHeight) : globalSliderHeight;
    const muteButtonSize = this.isPlayer ? this.playerConfig.volumeMuteButtonSize : undefined;
    const iconButtonSize = muteButtonSize ?? sliderHeight;
    const buttonStyle = [
      sliderHeight ? `height: ${sliderHeight}rem;` : '',
      iconButtonSize ? `--icon-button-size: ${iconButtonSize}rem;--icon-size: ${iconButtonSize * 0.75}rem;` : '',
    ].join('');
    const sliderStyle = sliderHeight ? `--control-slider-thickness: ${sliderHeight}rem;` : '';
    return html`
      <div class="volume" slim=${this.slim || nothing}>
        <sonos-icon-button
          .disabled=${disabled}
          @click=${this.mute}
          .path=${muteIcon}
          hide=${(this.isPlayer && this.playerConfig.hideVolumeMuteButton) || nothing}
          style=${buttonStyle}
        >
        </sonos-icon-button>
        <div class="volume-slider">
          <ha-control-slider
            .value=${volume}
            max=${max}
            @value-changed=${this.volumeChanged}
            @slider-moved=${this.sliderMoved}
            .disabled=${disabled}
            class=${this.config.dynamicVolumeSlider && max === 100 ? 'over-threshold' : ''}
            style=${sliderStyle}
          ></ha-control-slider>
          <div class="volume-level" hide=${(this.isPlayer && this.playerConfig.hideVolumePercentage) || nothing}>
            <div style="flex: ${volume}">${volume > 0 ? '0%' : ''}</div>
            <div class="percentage">${volume}%</div>
            <div style="flex: ${max - volume};text-align: right">${volume < max ? `${max}%` : ''}</div>
          </div>
        </div>
        <div class="percentage-slim" hide=${this.slim && nothing}>${volume}%</div>
        <sonos-icon-button hide=${this.store.hidePower()} @click=${this.togglePower} .path=${mdiPower} style=${buttonStyle}></sonos-icon-button>
      </div>
    `;
  }

  private getMax() {
    // Pinned while dragging so the slider doesn't rescale (and the thumb jump) when
    // the user crosses the dynamic threshold.
    const volume = this.sliderMoving ? this.startVolumeSliderMoving : (this.localVolume ?? this.player.getVolume());
    const dynamicThreshold = Math.max(0, Math.min(this.config.dynamicVolumeSliderThreshold ?? 20, 100));
    const dynamicMax = Math.max(0, Math.min(this.config.dynamicVolumeSliderMax ?? 30, 100));
    return volume < dynamicThreshold && this.config.dynamicVolumeSlider ? dynamicMax : 100;
  }

  private sliderMoved(e: Event) {
    const newVolume = volumeFromEvent(e);
    if (newVolume === undefined) {
      return;
    }
    if (!this.sliderMoving) {
      this.startVolumeSliderMoving = this.player.getVolume();
      this.sliderMoving = true;
    }
    this.clearSettleTimer();
    this.localVolume = newVolume;
    if (this.config.changeVolumeOnSlide) {
      this.queueVolumeSend(newVolume);
    }
  }

  private async volumeChanged(e: Event) {
    this.sliderMoving = false;
    this.clearSendTimer();
    this.pendingVolume = undefined;
    const newVolume = volumeFromEvent(e) ?? this.localVolume;
    if (newVolume === undefined) {
      return;
    }
    this.localVolume = newVolume;
    this.startSettleTimer();
    return await this.setVolume(newVolume);
  }

  private queueVolumeSend(volume: number) {
    this.pendingVolume = volume;
    if (this.sendTimer !== undefined) {
      return;
    }
    const delay = Math.max(0, SLIDE_SEND_INTERVAL_MS - (Date.now() - this.lastSentAt));
    this.sendTimer = window.setTimeout(() => {
      this.sendTimer = undefined;
      const pending = this.pendingVolume;
      this.pendingVolume = undefined;
      if (pending !== undefined) {
        void this.setVolume(pending);
      }
    }, delay);
  }

  private async setVolume(volume: number) {
    this.lastSentAt = Date.now();
    return await this.mediaControlService.volumeSet(this.player, volume, this.updateMembers);
  }

  private startSettleTimer() {
    this.clearSettleTimer();
    this.settleTimer = window.setTimeout(() => {
      this.settleTimer = undefined;
      this.clearLocalVolume();
    }, SETTLE_TIMEOUT_MS);
  }

  private clearLocalVolume() {
    this.clearSettleTimer();
    this.localVolume = undefined;
  }

  private clearSendTimer() {
    if (this.sendTimer !== undefined) {
      clearTimeout(this.sendTimer);
      this.sendTimer = undefined;
    }
  }

  private clearSettleTimer() {
    if (this.settleTimer !== undefined) {
      clearTimeout(this.settleTimer);
      this.settleTimer = undefined;
    }
  }

  private async mute() {
    return await this.mediaControlService.toggleMute(this.player, this.updateMembers);
  }

  static get styles() {
    return css`
      ha-control-slider {
        --control-slider-color: var(--accent-color);
      }

      ha-control-slider.over-threshold {
        --control-slider-color: var(--primary-text-color);
      }

      ha-control-slider[disabled] {
        --control-slider-color: var(--disabled-text-color);
      }

      *[slim] * {
        --icon-button-size: 30px;
        --icon-size: 20px;
      }

      *[slim] .volume-level {
        display: none;
      }

      .volume {
        display: flex;
        flex: 1;
      }

      .volume-slider {
        flex: 1;
        padding-right: 0.6rem;
      }

      *[slim] .volume-slider {
        display: flex;
        align-items: center;
      }

      .volume-level {
        font-size: calc(var(--sonos-font-size, 1rem) * 0.75);
        display: flex;
      }

      .percentage {
        flex: 2;
      }

      .percentage,
      .percentage-slim {
        font-weight: bold;
        align-self: center;
      }

      *[hide] {
        display: none;
      }

      sonos-icon-button {
        height: 40px;
        align-self: start;
      }
    `;
  }
}
// ha-control-slider only updates its own `value` property when the drag ends, so
// during a drag the live value is available on the event detail and nowhere else.
function volumeFromEvent(e: Event): number | undefined {
  const detailValue = (e as CustomEvent<{ value?: number } | undefined>).detail?.value;
  const value = detailValue ?? Number.parseInt((e?.target as HTMLInputElement)?.value);
  return Number.isFinite(value) ? Math.round(value) : undefined;
}

customElements.define('sonos-volume', Volume);
