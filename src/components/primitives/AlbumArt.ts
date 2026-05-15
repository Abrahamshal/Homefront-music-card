import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { artGradient, type HuedArt } from '../../state/mockData.js';

/**
 * Renders a hued CSS-gradient tile that "is" album/playlist/radio art in the
 * mock; we'll swap to real `entity_picture` URLs in Phase 2.
 *
 * - `size` may be a number (px) or a CSS length ("100%") so callers can drop
 *   the art into a parent that controls aspect ratio (the big Player art).
 * - `boxShadow` is exposed so the Player can apply a deep drop shadow without
 *   wrapping the element in another div solely for that purpose.
 */
@customElement('hf-album-art')
export class AlbumArt extends LitElement {
  @property({ attribute: false }) obj: Partial<HuedArt> | null | undefined;
  @property() size: number | string = 48;
  @property({ type: Number }) radius = 8;
  @property({ attribute: false }) glyph?: TemplateResult | string;
  @property() boxShadow = '';

  static styles = css`
    :host {
      display: inline-block;
      flex: none;
      line-height: 0;
    }
    .art {
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.18),
        inset 0 -8px 18px rgba(0, 0, 0, 0.18);
    }
    .scan {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 40%);
      pointer-events: none;
    }
    .glyph {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 700;
      letter-spacing: -0.03em;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      line-height: 1;
    }
  `;

  protected render() {
    const sizeCss = typeof this.size === 'number' ? `${this.size}px` : this.size;
    const glyphSize = typeof this.size === 'number' ? this.size * 0.34 : 16;
    const bg = artGradient(this.obj);
    const wrapStyle = `width:${sizeCss};height:${sizeCss};border-radius:${this.radius}px;background:${bg};${this.boxShadow ? `box-shadow:${this.boxShadow}` : ''}`;
    return html`
      <div class="art" style=${wrapStyle}>
        ${this.glyph ? html`<div class="glyph" style="font-size:${glyphSize}px">${this.glyph}</div>` : ''}
        <div class="scan"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-album-art': AlbumArt;
  }
}
