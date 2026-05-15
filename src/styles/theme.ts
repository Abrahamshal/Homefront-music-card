import { css, unsafeCSS } from 'lit';

/**
 * Refined-dark palette ported from the prototype's `refinedTheme(true)`. We
 * ship dark-only for now; light theme is a Phase 4 polish item.
 *
 * Components consume these as `var(--hf-*)` rather than importing the JS
 * object, so the top-level card is the single source of truth and we can
 * later let users override the accent via card config without re-rendering
 * every descendant.
 */
export const theme = {
  bg: '#16181d',
  surface: '#1d2026',
  surfaceAlt: '#23272f',
  text: '#ecedef',
  textDim: 'rgba(236,237,239,0.55)',
  border: 'rgba(255,255,255,0.07)',
  borderActive: 'rgba(255,255,255,0.16)',
  divider: 'rgba(255,255,255,0.05)',
  accent: '#e08a4a',
  accentText: '#1b0f06',
  sliderTrack: 'rgba(255,255,255,0.12)',
  input: 'rgba(255,255,255,0.04)',
  selected: 'rgba(224,138,74,0.12)',
  radius: '14px',
} as const;

export const themeVars = css`
  :host {
    --hf-bg: ${unsafeCSS(theme.bg)};
    --hf-surface: ${unsafeCSS(theme.surface)};
    --hf-surface-alt: ${unsafeCSS(theme.surfaceAlt)};
    --hf-text: ${unsafeCSS(theme.text)};
    --hf-text-dim: ${unsafeCSS(theme.textDim)};
    --hf-border: ${unsafeCSS(theme.border)};
    --hf-border-active: ${unsafeCSS(theme.borderActive)};
    --hf-divider: ${unsafeCSS(theme.divider)};
    --hf-accent: ${unsafeCSS(theme.accent)};
    --hf-accent-text: ${unsafeCSS(theme.accentText)};
    --hf-slider-track: ${unsafeCSS(theme.sliderTrack)};
    --hf-input: ${unsafeCSS(theme.input)};
    --hf-selected: ${unsafeCSS(theme.selected)};
    --hf-radius: ${unsafeCSS(theme.radius)};
    --hf-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
`;
