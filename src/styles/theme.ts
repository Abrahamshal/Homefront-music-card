import { css, unsafeCSS } from 'lit';

/**
 * Refined palette ported from the prototype, dark + light variants. The
 * top-level card sets `data-theme` ('dark' | 'light') on the host; CSS
 * vars are scoped per attribute so components consuming `var(--hf-*)`
 * adapt automatically. `auto` switches via prefers-color-scheme.
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

export const themeLight = {
  bg: '#f4f3f0',
  surface: '#ffffff',
  surfaceAlt: '#fafaf7',
  text: '#1c1b18',
  textDim: 'rgba(28,27,24,0.55)',
  border: 'rgba(0,0,0,0.07)',
  borderActive: 'rgba(0,0,0,0.16)',
  divider: 'rgba(0,0,0,0.06)',
  accent: '#c46a30',
  accentText: '#fff7f0',
  sliderTrack: 'rgba(0,0,0,0.10)',
  input: 'rgba(0,0,0,0.03)',
  selected: 'rgba(196,106,48,0.10)',
  radius: '14px',
} as const;

export const themeVars = css`
  :host,
  :host([data-theme='dark']) {
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
  :host([data-theme='light']) {
    --hf-bg: ${unsafeCSS(themeLight.bg)};
    --hf-surface: ${unsafeCSS(themeLight.surface)};
    --hf-surface-alt: ${unsafeCSS(themeLight.surfaceAlt)};
    --hf-text: ${unsafeCSS(themeLight.text)};
    --hf-text-dim: ${unsafeCSS(themeLight.textDim)};
    --hf-border: ${unsafeCSS(themeLight.border)};
    --hf-border-active: ${unsafeCSS(themeLight.borderActive)};
    --hf-divider: ${unsafeCSS(themeLight.divider)};
    --hf-accent: ${unsafeCSS(themeLight.accent)};
    --hf-accent-text: ${unsafeCSS(themeLight.accentText)};
    --hf-slider-track: ${unsafeCSS(themeLight.sliderTrack)};
    --hf-input: ${unsafeCSS(themeLight.input)};
    --hf-selected: ${unsafeCSS(themeLight.selected)};
  }
  @media (prefers-color-scheme: light) {
    :host([data-theme='auto']) {
      --hf-bg: ${unsafeCSS(themeLight.bg)};
      --hf-surface: ${unsafeCSS(themeLight.surface)};
      --hf-surface-alt: ${unsafeCSS(themeLight.surfaceAlt)};
      --hf-text: ${unsafeCSS(themeLight.text)};
      --hf-text-dim: ${unsafeCSS(themeLight.textDim)};
      --hf-border: ${unsafeCSS(themeLight.border)};
      --hf-border-active: ${unsafeCSS(themeLight.borderActive)};
      --hf-divider: ${unsafeCSS(themeLight.divider)};
      --hf-accent: ${unsafeCSS(themeLight.accent)};
      --hf-accent-text: ${unsafeCSS(themeLight.accentText)};
      --hf-slider-track: ${unsafeCSS(themeLight.sliderTrack)};
      --hf-input: ${unsafeCSS(themeLight.input)};
      --hf-selected: ${unsafeCSS(themeLight.selected)};
    }
  }
`;
