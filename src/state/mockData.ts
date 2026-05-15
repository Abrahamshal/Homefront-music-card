// Mock data ported from design-reference/project/data.js.
// Phase 1 wires the UI against this in-memory data only — Phase 2 replaces
// every read here with a derivation off real Home Assistant state.
//
// Album / playlist / radio art is rendered as CSS gradients from {h1, h2} hue
// pairs. No external image assets in the mock, so the prototype renders
// consistently against any theme.

export interface HuedArt {
  /** Primary hue in degrees (0–360), used as the gradient's first stop. */
  h1: number;
  /** Secondary hue in degrees, used as the gradient's second stop. */
  h2: number;
}

export interface Album extends HuedArt {
  id: string;
  name: string;
  artist: string;
  year: number;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  /** Album display name (denormalized for fast list rendering). */
  album: string;
  albumId: string;
  durationSec: number;
}

export interface Playlist extends HuedArt {
  id: string;
  name: string;
  /** Display name of the playlist owner ("you", "Editorial", a provider, …). */
  owner: string;
  trackCount: number;
  /** Short mood/genre line shown under the playlist name. */
  mood: string;
}

export interface RadioStation extends HuedArt {
  id: string;
  name: string;
  genre: string;
}

export interface ProviderAccount {
  id: string;
  /** Display name of the account (e.g. "tom@home", "Family · shared"). */
  name: string;
  /** Subscription tier label shown under the account name. */
  tier: string;
  email: string;
}

export interface Provider {
  id: string;
  name: string;
  /** Single-character glyph rendered inside the provider tile (may be empty). */
  glyph: string;
  /** Hue used to color the provider tile's gradient. */
  brandHue: number;
  accounts: ProviderAccount[];
}

export interface MockSpeaker {
  id: string;
  name: string;
  room: string;
  model: string;
  /** Volume 0–100. */
  volume: number;
}

const artistList: readonly string[] = [
  'Khruangbin', 'Mac DeMarco', 'Tycho', 'Bonobo', 'Floating Points',
  'Caroline Polachek', 'Hiatus Kaiyote', 'Jamie xx', 'Nils Frahm', 'SAULT',
  'FKJ', 'Men I Trust', 'Big Thief', 'Beach House', 'Mild High Club',
  'ODESZA', 'Phoebe Bridgers', 'Vulfpeck', 'Yussef Dayes', 'Arooj Aftab',
];

const trackNames: readonly string[] = [
  'Pelota', 'White Gloves', 'A Walk', 'Cirrus', 'Birth', 'Welcome To My Island',
  'Red Room', 'Loud Places', 'Says', 'Wildfires', 'Skyline', 'Tides',
  'Lemon Twigs', 'Last Light', 'Mountain at My Gates', 'Slow Burn', 'Vega',
  'Daydream', 'Mirror Maru', 'Late Night', 'Soft Universe', 'Ondas', 'Reverie',
  'Long Way Home', 'Eclipse', 'Powder Blue', 'Dreamcaster', 'After Hours', 'Ember',
];

const albums: readonly Album[] = [
  { id: 'al1',  name: 'Mordechai',           artist: 'Khruangbin',        h1: 22,  h2: 350, year: 2020 },
  { id: 'al2',  name: 'Salad Days',          artist: 'Mac DeMarco',       h1: 142, h2: 80,  year: 2014 },
  { id: 'al3',  name: 'Awake',               artist: 'Tycho',             h1: 200, h2: 280, year: 2014 },
  { id: 'al4',  name: 'Migration',           artist: 'Bonobo',            h1: 32,  h2: 210, year: 2017 },
  { id: 'al5',  name: 'Crush',               artist: 'Floating Points',   h1: 320, h2: 18,  year: 2019 },
  { id: 'al6',  name: 'Pang',                artist: 'Caroline Polachek', h1: 290, h2: 340, year: 2019 },
  { id: 'al7',  name: 'Mood Valiant',        artist: 'Hiatus Kaiyote',    h1: 12,  h2: 330, year: 2021 },
  { id: 'al8',  name: 'In Colour',           artist: 'Jamie xx',          h1: 50,  h2: 200, year: 2015 },
  { id: 'al9',  name: 'Spaces',              artist: 'Nils Frahm',        h1: 220, h2: 240, year: 2013 },
  { id: 'al10', name: 'Untitled (Black Is)', artist: 'SAULT',             h1: 0,   h2: 18,  year: 2020 },
  { id: 'al11', name: 'French Kiwi Juice',   artist: 'FKJ',               h1: 175, h2: 90,  year: 2017 },
  { id: 'al12', name: 'Oncle Jazz',          artist: 'Men I Trust',       h1: 195, h2: 250, year: 2019 },
  { id: 'al13', name: 'U.F.O.F.',            artist: 'Big Thief',         h1: 100, h2: 175, year: 2019 },
  { id: 'al14', name: 'Bloom',               artist: 'Beach House',       h1: 280, h2: 200, year: 2012 },
  { id: 'al15', name: 'Skiptracing',         artist: 'Mild High Club',    h1: 36,  h2: 5,   year: 2016 },
  { id: 'al16', name: 'A Moment Apart',      artist: 'ODESZA',            h1: 245, h2: 300, year: 2017 },
  { id: 'al17', name: 'Punisher',            artist: 'Phoebe Bridgers',   h1: 215, h2: 245, year: 2020 },
  { id: 'al18', name: 'Vulture Prince',      artist: 'Arooj Aftab',       h1: 18,  h2: 28,  year: 2021 },
];

const tracks: readonly Track[] = trackNames.map((name, i) => {
  const al = albums[i % albums.length]!;
  return {
    id: `tr${i + 1}`,
    name,
    artist: al.artist,
    album: al.name,
    albumId: al.id,
    durationSec: 120 + ((i * 47) % 240),
  };
});

const playlists: readonly Playlist[] = [
  { id: 'pl1', name: 'Deep Focus',       owner: 'Music Assistant', trackCount: 86,  h1: 220, h2: 280, mood: 'instrumental·calm' },
  { id: 'pl2', name: 'Late-Night Drive', owner: 'you',             trackCount: 42,  h1: 260, h2: 340, mood: 'atmospheric·downtempo' },
  { id: 'pl3', name: 'Sunday Cooking',   owner: 'you',             trackCount: 58,  h1: 30,  h2: 18,  mood: 'soul·jazz' },
  { id: 'pl4', name: 'Mellow Mornings',  owner: 'Editorial',       trackCount: 64,  h1: 50,  h2: 30,  mood: 'acoustic·warm' },
  { id: 'pl5', name: 'Workout',          owner: 'you',             trackCount: 38,  h1: 0,   h2: 340, mood: 'high tempo·electronic' },
  { id: 'pl6', name: 'Liked Songs',      owner: 'you',             trackCount: 312, h1: 130, h2: 180, mood: 'your favorites' },
  { id: 'pl7', name: 'Patio Sessions',   owner: 'you',             trackCount: 51,  h1: 180, h2: 220, mood: 'summer·chill' },
  { id: 'pl8', name: 'Discover Weekly',  owner: 'Editorial',       trackCount: 30,  h1: 290, h2: 200, mood: 'new finds' },
];

const radioStations: readonly RadioStation[] = [
  { id: 'rd1', name: 'KCRW · Eclectic 24', genre: 'Eclectic',     h1: 12,  h2: 340 },
  { id: 'rd2', name: 'NTS Radio 1',        genre: 'Underground',  h1: 30,  h2: 12  },
  { id: 'rd3', name: 'BBC 6 Music',        genre: 'Alternative',  h1: 200, h2: 250 },
  { id: 'rd4', name: 'WWOZ New Orleans',   genre: 'Jazz · Blues', h1: 38,  h2: 5   },
  { id: 'rd5', name: 'Worldwide FM',       genre: 'Global',       h1: 165, h2: 220 },
];

const providers: readonly Provider[] = [
  {
    id: 'spotify',
    name: 'Spotify',
    glyph: 'S',
    brandHue: 140,
    accounts: [
      { id: 'sp-main',   name: 'tom@home',        tier: 'Premium', email: 'tom@home.local' },
      { id: 'sp-shared', name: 'Family · shared', tier: 'Family',  email: 'fam@home.local' },
    ],
  },
  {
    id: 'apple',
    name: 'Apple Music',
    glyph: '',
    brandHue: 0,
    accounts: [
      { id: 'ap-tom', name: 'tom@icloud', tier: 'Individual', email: 'tom@icloud.com' },
    ],
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    glyph: '~',
    brandHue: 25,
    accounts: [
      { id: 'sc-tom', name: '@tom_listens', tier: 'Go+', email: 'tom@sc.local' },
    ],
  },
];

// Speakers in the mock are deliberately mixed-vendor (Sonos, HomePod, WiiM).
// The real card replaces these with WiiM-derived state in Phase 2; the
// prototype's mix exists so the UI exercises model-name rendering.
const speakers: readonly MockSpeaker[] = [
  { id: 'sp1', name: 'Living Room', room: 'Living Room', model: 'Sonos Era 300',  volume: 38 },
  { id: 'sp2', name: 'Kitchen',     room: 'Kitchen',     model: 'Sonos One',      volume: 28 },
  { id: 'sp3', name: 'Bedroom',     room: 'Bedroom',     model: 'HomePod mini',   volume: 18 },
  { id: 'sp4', name: 'Office',      room: 'Office',      model: 'WiiM Pro + KEF', volume: 45 },
  { id: 'sp5', name: 'Patio',       room: 'Outside',     model: 'Sonos Move 2',   volume: 60 },
  { id: 'sp6', name: 'Bathroom',    room: 'Bathroom',    model: 'HomePod mini',   volume: 22 },
];

const initialQueue: readonly string[] = [
  'tr1', 'tr5', 'tr12', 'tr18', 'tr9', 'tr3', 'tr22', 'tr7', 'tr15', 'tr27', 'tr2', 'tr11',
];

export function fmtTime(secs: number): string {
  const clamped = Math.max(0, Math.floor(secs));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${s < 10 ? `0${s}` : s}`;
}

export function albumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id);
}

export function trackById(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}

export function providerById(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}

export interface ArtGradientOptions {
  /** Gradient angle in degrees. Defaults to 135 (top-left → bottom-right). */
  angle?: number;
  /** Lightness offset added to both stops (use to brighten in light themes). */
  lift?: number;
}

/**
 * CSS gradient that "is" the album/playlist/radio art. Returns a string
 * suitable for use in a `background` property.
 */
export function artGradient(obj: Partial<HuedArt> | null | undefined, opts: ArtGradientOptions = {}): string {
  const { angle = 135, lift = 0 } = opts;
  if (!obj) return 'linear-gradient(135deg,#444,#222)';
  const h1 = obj.h1 ?? 200;
  const h2 = obj.h2 ?? 280;
  const l1 = 56 + lift;
  const l2 = 30 + lift;
  return `linear-gradient(${angle}deg, oklch(${l1}% 0.18 ${h1}), oklch(${l2}% 0.16 ${h2}))`;
}

export const mockData = {
  albums,
  tracks,
  playlists,
  radioStations,
  providers,
  speakers,
  initialQueue,
  artistList,
  fmtTime,
  albumById,
  trackById,
  providerById,
  artGradient,
} as const;

export type MockData = typeof mockData;
