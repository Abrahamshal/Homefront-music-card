import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Cross-browser-styled range input.
 *
 * The prototype injected a per-instance <style> block to scope its
 * ::-webkit-slider-* and ::-moz-range-* pseudo-elements; with shadow DOM we
 * just put them in `static styles` and drive the dynamic bits (color,
 * percentage, dimensions) through CSS custom properties.
 *
 * Emits `hf-input` (CustomEvent<number>) on every change. Keep this name
 * distinct from the native `input` event so listeners can target ours
 * without unwrap.
 */
@customElement('hf-slider')
export class Slider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property() color = '#fff';
  @property() track = 'rgba(255,255,255,0.18)';
  @property({ type: Number, attribute: 'track-height' }) trackHeight = 4;
  @property({ type: Number }) thumb = 14;
  @property({ attribute: 'aria-label' }) override ariaLabel = '';

  static styles = css`
    :host {
      --hf-pct: 0%;
      --hf-color: #fff;
      --hf-track: rgba(255, 255, 255, 0.18);
      --hf-track-h: 4px;
      --hf-thumb: 14px;
      display: block;
      width: 100%;
      padding: 8px 0;
    }
    input[type='range'] {
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
      outline: none;
      margin: 0;
      display: block;
      height: var(--hf-thumb);
    }
    input[type='range']::-webkit-slider-runnable-track {
      height: var(--hf-track-h);
      border-radius: var(--hf-track-h);
      background: linear-gradient(
        to right,
        var(--hf-color) 0%,
        var(--hf-color) var(--hf-pct),
        var(--hf-track) var(--hf-pct),
        var(--hf-track) 100%
      );
    }
    input[type='range']::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
      width: var(--hf-thumb);
      height: var(--hf-thumb);
      border-radius: 50%;
      background: var(--hf-color);
      border: 0;
      margin-top: calc((var(--hf-track-h) - var(--hf-thumb)) / 2);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    input[type='range']::-moz-range-track {
      height: var(--hf-track-h);
      border-radius: var(--hf-track-h);
      background: var(--hf-track);
    }
    input[type='range']::-moz-range-progress {
      height: var(--hf-track-h);
      border-radius: var(--hf-track-h);
      background: var(--hf-color);
    }
    input[type='range']::-moz-range-thumb {
      width: var(--hf-thumb);
      height: var(--hf-thumb);
      border-radius: 50%;
      background: var(--hf-color);
      border: 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
  `;

  protected render() {
    const pct = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.setProperty('--hf-pct', `${pct}%`);
    this.style.setProperty('--hf-color', this.color);
    this.style.setProperty('--hf-track', this.track);
    this.style.setProperty('--hf-track-h', `${this.trackHeight}px`);
    this.style.setProperty('--hf-thumb', `${this.thumb}px`);
    return html`<input
      type="range"
      min=${this.min}
      max=${this.max}
      .value=${String(this.value)}
      aria-label=${this.ariaLabel || 'Slider'}
      @input=${this._onInput}
    />`;
  }

  private _onInput = (e: Event) => {
    const v = Number((e.target as HTMLInputElement).value);
    this.value = v;
    this.dispatchEvent(new CustomEvent<number>('hf-input', { detail: v, bubbles: true, composed: true }));
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-slider': Slider;
  }
}
