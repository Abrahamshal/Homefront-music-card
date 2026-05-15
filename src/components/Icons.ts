import { html, type TemplateResult } from 'lit';

export interface IconProps {
  size?: number;
  stroke?: string;
  fill?: string;
  /** Stroke width. */
  sw?: number;
}

type IconRenderer = (p?: IconProps) => TemplateResult;

function strokeIcon(d: string, opts: { sw?: number } = {}): IconRenderer {
  return (p: IconProps = {}) => {
    const size = p.size ?? 20;
    const stroke = p.stroke ?? 'currentColor';
    const sw = p.sw ?? opts.sw ?? 1.7;
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${stroke} stroke-width=${sw} stroke-linecap="round" stroke-linejoin="round"><path d=${d} /></svg>`;
  };
}

function fillIcon(d: string): IconRenderer {
  return (p: IconProps = {}) => {
    const size = p.size ?? 20;
    const fill = p.fill ?? 'currentColor';
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill=${fill} stroke="none"><path d=${d} /></svg>`;
  };
}

export const Icons = {
  play: fillIcon('M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z'),

  pause: (p: IconProps = {}) => {
    const size = p.size ?? 20;
    const fill = p.fill ?? 'currentColor';
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill=${fill} stroke="none">
      <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
    </svg>`;
  },

  prev: fillIcon('M6 5h2v14H6V5zm14 .9v12.2a1 1 0 0 1-1.55.83L9 12.83a1 1 0 0 1 0-1.66l9.45-6.1A1 1 0 0 1 20 5.9z'),
  next: fillIcon('M18 5h-2v14h2V5zM4 5.9v12.2a1 1 0 0 0 1.55.83L15 12.83a1 1 0 0 0 0-1.66L5.55 5.07A1 1 0 0 0 4 5.9z'),

  shuffle: strokeIcon('M16 4h4v4 M20 4l-7 7 M4 4l16 16 M16 20h4v-4 M4 20l5-5'),
  rep: strokeIcon('M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3'),

  rep1: (p: IconProps = {}) => {
    const size = p.size ?? 20;
    const stroke = p.stroke ?? 'currentColor';
    const sw = p.sw ?? 1.7;
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${stroke} stroke-width=${sw} stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3" />
      <text x="12" y="14" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor" stroke="none">1</text>
    </svg>`;
  },

  queue: strokeIcon('M4 7h11 M4 12h11 M4 17h7 M16 14v6 l3-2'),
  search: strokeIcon('M11 4a7 7 0 1 0 4.6 12.3L20 20 M11 4a7 7 0 0 1 7 7'),
  home: strokeIcon('M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-8z'),
  speaker: strokeIcon('M5 9h3l4-4v14l-4-4H5z M16 8a5 5 0 0 1 0 8 M19 5a9 9 0 0 1 0 14'),
  group: strokeIcon('M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 2.7-5 6-5s4 1 4 1 M14 21c0-2.5 1.5-4 4-4s4 1.5 4 4'),

  dot3: (p: IconProps = {}) => {
    const size = p.size ?? 20;
    const fill = p.fill ?? 'currentColor';
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill=${fill} stroke="none">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>`;
  },

  x: strokeIcon('M6 6l12 12 M18 6L6 18'),
  chev: strokeIcon('M9 6l6 6-6 6'),
  chevL: strokeIcon('M15 6l-6 6 6 6'),
  chevD: strokeIcon('M6 9l6 6 6-6'),
  plus: strokeIcon('M12 5v14 M5 12h14'),
  check: strokeIcon('M5 12l4 4 10-10'),

  drag: (p: IconProps = {}) => {
    const size = p.size ?? 20;
    const fill = p.fill ?? 'currentColor';
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill=${fill} stroke="none">
      <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
    </svg>`;
  },

  trash: strokeIcon('M5 7h14 M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13'),
  top: strokeIcon('M12 19V7 M6 13l6-6 6 6 M5 4h14'),
  playNext: strokeIcon('M5 5l10 7-10 7V5z M19 6v12', { sw: 2 }),
  radio: strokeIcon('M4 12a8 8 0 0 1 14-5.5 M6 16a4 4 0 0 1 5-5 M3 20l14-14'),
  list: strokeIcon('M4 6h16 M4 12h16 M4 18h16'),

  album: (p: IconProps = {}) => {
    const size = p.size ?? 20;
    const stroke = p.stroke ?? 'currentColor';
    const sw = p.sw ?? 1.6;
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${stroke} stroke-width=${sw} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>`;
  },

  artist: (p: IconProps = {}) => {
    const size = p.size ?? 20;
    const stroke = p.stroke ?? 'currentColor';
    const sw = p.sw ?? 1.7;
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${stroke} stroke-width=${sw} stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>`;
  },

  note: strokeIcon('M9 18V6l11-2v12 M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3z M20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z'),
  heart: strokeIcon('M12 21s-7-4.5-9-9.2C1.3 8 4 4 8 5c2 .5 3.2 2 4 3 .8-1 2-2.5 4-3 4-1 6.7 3 5 6.8C19 16.5 12 21 12 21z'),
  filter: strokeIcon('M4 5h16l-6 8v6l-4-2v-4L4 5z'),

  sun: (p: IconProps = {}) => {
    const size = p.size ?? 14;
    const stroke = p.stroke ?? 'currentColor';
    const sw = p.sw ?? 1.7;
    return html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${stroke} stroke-width=${sw} stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6l1.4 1.4 M17 17l1.4 1.4 M5.6 18.4l1.4-1.4 M17 7l1.4-1.4" />
    </svg>`;
  },

  moon: strokeIcon('M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'),
} as const satisfies Record<string, IconRenderer>;

export type IconName = keyof typeof Icons;
