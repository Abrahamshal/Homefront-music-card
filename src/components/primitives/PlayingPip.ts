import { html, css, type TemplateResult } from 'lit';

/**
 * Animated EQ-bars indicator used in pills/chips to denote a playing group.
 * Exposed as a template helper rather than a custom element so the parent's
 * shadow root carries the keyframes only once across many instances.
 */
export const playingPipStyles = css`
  .hf-pip {
    display: inline-flex;
    align-items: flex-end;
    gap: 1.5px;
    height: 10px;
  }
  .hf-pip > span {
    width: 2px;
    border-radius: 1px;
    transform-origin: bottom;
  }
  .hf-pip > span:nth-child(1) {
    height: 6px;
    animation: hf-eq-a 0.9s ease-in-out infinite;
  }
  .hf-pip > span:nth-child(2) {
    height: 9px;
    animation: hf-eq-b 0.9s ease-in-out infinite 0.15s;
  }
  .hf-pip > span:nth-child(3) {
    height: 5px;
    animation: hf-eq-c 0.9s ease-in-out infinite 0.3s;
  }
  @keyframes hf-eq-a {
    0%, 100% { transform: scaleY(0.55); }
    50% { transform: scaleY(1.35); }
  }
  @keyframes hf-eq-b {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.45); }
  }
  @keyframes hf-eq-c {
    0%, 100% { transform: scaleY(0.75); }
    50% { transform: scaleY(1.15); }
  }
`;

export function playingPip(color: string): TemplateResult {
  const bg = `background:${color}`;
  return html`
    <span class="hf-pip" aria-hidden="true">
      <span style=${bg}></span>
      <span style=${bg}></span>
      <span style=${bg}></span>
    </span>
  `;
}
