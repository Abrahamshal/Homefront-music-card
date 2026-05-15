// card-core.jsx
// Shared brains + UI primitives for all 3 Music Assistant card variations.
// Exposes: useMusicCard, Icon, AlbumArt, Slider, SwipeRow, DraggableQueue,
//          QueueBulkBar, BrowserFlow, ProviderTile, SearchScreen, GroupingScreen
// Cards pass a `theme` palette so primitives can recolor themselves.

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ── icons ──────────────────────────────────────────────────────────────────
const SVG = ({ d, size = 20, stroke = "currentColor", fill = "none", sw = 1.7, vb = 24, children }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`}
       fill={fill} stroke={stroke} strokeWidth={sw}
       strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);
const I = {
  play:   (p) => <SVG {...p} fill="currentColor" stroke="none" d="M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z" />,
  pause:  (p) => <SVG {...p} fill="currentColor" stroke="none"><rect x="6" y="5" width="4.2" height="14" rx="1.2" /><rect x="13.8" y="5" width="4.2" height="14" rx="1.2" /></SVG>,
  prev:   (p) => <SVG {...p} fill="currentColor" stroke="none" d="M6 5h2v14H6V5zm14 .9v12.2a1 1 0 0 1-1.55.83L9 12.83a1 1 0 0 1 0-1.66l9.45-6.1A1 1 0 0 1 20 5.9z" />,
  next:   (p) => <SVG {...p} fill="currentColor" stroke="none" d="M18 5h-2v14h2V5zM4 5.9v12.2a1 1 0 0 0 1.55.83L15 12.83a1 1 0 0 0 0-1.66L5.55 5.07A1 1 0 0 0 4 5.9z" />,
  shuffle:(p) => <SVG {...p} d="M16 4h4v4 M20 4l-7 7 M4 4l16 16 M16 20h4v-4 M4 20l5-5" />,
  rep:    (p) => <SVG {...p} d="M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3" />,
  rep1:   (p) => <SVG {...p}><path d="M4 9V8a3 3 0 0 1 3-3h11l-3-3 M20 15v1a3 3 0 0 1-3 3H6l3 3" /><text x="12" y="14" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" stroke="none">1</text></SVG>,
  queue:  (p) => <SVG {...p} d="M4 7h11 M4 12h11 M4 17h7 M16 14v6 l3-2" />,
  search: (p) => <SVG {...p} d="M11 4a7 7 0 1 0 4.6 12.3L20 20 M11 4a7 7 0 0 1 7 7" />,
  home:   (p) => <SVG {...p} d="M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-8z" />,
  speaker:(p) => <SVG {...p} d="M5 9h3l4-4v14l-4-4H5z M16 8a5 5 0 0 1 0 8 M19 5a9 9 0 0 1 0 14" />,
  group:  (p) => <SVG {...p} d="M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3 2.7-5 6-5s4 1 4 1 M14 21c0-2.5 1.5-4 4-4s4 1.5 4 4" />,
  dot3:   (p) => <SVG {...p} fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></SVG>,
  x:      (p) => <SVG {...p} d="M6 6l12 12 M18 6L6 18" />,
  chev:   (p) => <SVG {...p} d="M9 6l6 6-6 6" />,
  chevL:  (p) => <SVG {...p} d="M15 6l-6 6 6 6" />,
  chevD:  (p) => <SVG {...p} d="M6 9l6 6 6-6" />,
  plus:   (p) => <SVG {...p} d="M12 5v14 M5 12h14" />,
  check:  (p) => <SVG {...p} d="M5 12l4 4 10-10" />,
  drag:   (p) => <SVG {...p} fill="currentColor" stroke="none" sw="0"><circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" /><circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" /></SVG>,
  trash:  (p) => <SVG {...p} d="M5 7h14 M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M7 7l1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13" />,
  top:    (p) => <SVG {...p} d="M12 19V7 M6 13l6-6 6 6 M5 4h14" />,
  playNext:(p)=> <SVG {...p} d="M5 5l10 7-10 7V5z M19 6v12" sw="2" />,
  radio:  (p) => <SVG {...p} d="M4 12a8 8 0 0 1 14-5.5 M6 16a4 4 0 0 1 5-5 M3 20l14-14"><circle cx="13" cy="18" r="2" /></SVG>,
  list:   (p) => <SVG {...p} d="M4 6h16 M4 12h16 M4 18h16" />,
  album:  (p) => <SVG {...p} sw="1.6"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /></SVG>,
  artist: (p) => <SVG {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></SVG>,
  note:   (p) => <SVG {...p} d="M9 18V6l11-2v12 M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3z M20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />,
  heart:  (p) => <SVG {...p} d="M12 21s-7-4.5-9-9.2C1.3 8 4 4 8 5c2 .5 3.2 2 4 3 .8-1 2-2.5 4-3 4-1 6.7 3 5 6.8C19 16.5 12 21 12 21z" />,
  filter: (p) => <SVG {...p} d="M4 5h16l-6 8v6l-4-2v-4L4 5z" />,
};
window.MA_I = I;

// ── tiny tag util ──────────────────────────────────────────────────────────
const cx = (...xs) => xs.filter(Boolean).join(" ");

// ── density spec ───────────────────────────────────────────────────────────
const DENSITY = {
  compact: { pad: 12, gap: 8,  rowH: 44, fs: 13,   tabH: 52, titleSize: 26 },
  regular: { pad: 16, gap: 12, rowH: 54, fs: 13.5, tabH: 60, titleSize: 30 },
  comfy:   { pad: 20, gap: 16, rowH: 64, fs: 14,   tabH: 68, titleSize: 34 },
};
window.MA_DENSITY = DENSITY;

// ── state hook (multi-group aware) ─────────────────────────────────────────
//
// Speakers are individual "players" in Music Assistant terms. Two or more
// players synced together form a "group", led by one member. We model that
// by giving every speaker a `leadId`:
//   - leadId === speaker.id  → solo (its own lead)
//   - leadId === otherId     → grouped under that lead
//
// Each lead speaker carries its own player state: queue, current track,
// playback flags, group volume. The card is "focused" on one of them at a
// time via `activeLeadId`; flipping focus is how you control different
// rooms from the same card without losing the others' state.
//
function defaultPlayer(queue, position, gv) {
  return {
    queue: queue.slice(),
    currentIdx: 0,
    position,
    playing: true,
    shuffle: false,
    repeat: "off",
    groupVolume: gv,
  };
}

function useMusicCard() {
  const D = window.MA_DATA;
  const [tab, setTab] = useState("player");

  // Speakers — strip the legacy `on`/`master` fields and give each a leadId.
  const [speakers, setSpeakers] = useState(() => {
    const base = D.speakers.map(s => {
      const { on, master, ...rest } = s;
      return { ...rest, leadId: rest.id }; // every speaker starts solo
    });
    // Seed an initial 2-speaker group: Kitchen joins Living Room.
    return base.map(s => s.id === "sp2" ? { ...s, leadId: "sp1" } : s);
  });

  // Per-lead player state.
  const [players, setPlayers] = useState(() => ({
    sp1: { ...defaultPlayer(D.initialQueue, 48, 38), playing: true },
    sp5: { ...defaultPlayer(["tr3","tr18","tr7","tr12","tr22"], 14, 60), playing: true, shuffle: true },
    // sp3, sp4, sp6 are solo + idle (no player state yet).
  }));
  const [activeLeadId, setActiveLeadIdRaw] = useState("sp1");

  const setActiveLead = (lid) => {
    // Lazy-create player state when focusing a previously-idle speaker.
    setPlayers(p => p[lid] ? p : ({ ...p, [lid]: defaultPlayer(D.initialQueue, 0, 30) }));
    setActiveLeadIdRaw(lid);
  };

  const [browser, setBrowser] = useState({
    crumbs: [{ kind: "root", label: "Sources" }],
    providerId: null, accountId: null,
    sub: "playlists", detailId: null,
  });
  const [search, setSearch] = useState({ query: "", filter: "all" });
  const [selectedTracks, setSelectedTracks] = useState(() => new Set());
  const [multiMode, setMultiMode] = useState(false);

  // ── derived: groups ──────────────────────────────────────────────────────
  // Every distinct leadId is a group; ungrouped (solo + idle) speakers are
  // groups of one with no player state.
  const groups = useMemo(() => {
    const byLead = {};
    speakers.forEach(s => { (byLead[s.leadId] = byLead[s.leadId] || []).push(s); });
    return Object.keys(byLead).map(lid => {
      const members = byLead[lid];
      const lead = members.find(m => m.id === lid) || members[0];
      const ps = players[lid];
      const name = members.length === 1
        ? lead.name
        : members.map(m => m.name).join(" + ");
      return {
        leadId: lid,
        lead,
        members,
        name,
        player: ps,                    // undefined if idle
        playing: !!ps?.playing,
        isActive: lid === activeLeadId,
        isIdle: !ps,
      };
    }).sort((a, b) => {
      // Active first, then playing groups, then idle solos
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
      if (a.isIdle !== b.isIdle)     return a.isIdle ? 1 : -1;
      return a.lead.name.localeCompare(b.lead.name);
    });
  }, [speakers, players, activeLeadId]);

  // Active player state, derived. Falls back to a stub so the player tab
  // doesn't crash on edge cases.
  const player = players[activeLeadId] || defaultPlayer(D.initialQueue, 0, 30);
  const queue = player.queue;
  const currentIdx = player.currentIdx;
  const position = player.position;
  const playing = player.playing;
  const shuffle = player.shuffle;
  const repeat = player.repeat;
  const groupVolume = player.groupVolume;
  const currentTrack = D.trackById(queue[currentIdx]) || D.tracks[0];
  const currentAlbum = D.albumById(currentTrack.albumId);
  const activeGroup = groups.find(g => g.leadId === activeLeadId) || groups[0];

  // ── per-player mutators ─────────────────────────────────────────────────
  const updateActivePlayer = (patch) =>
    setPlayers(p => ({ ...p, [activeLeadId]: { ...(p[activeLeadId] || defaultPlayer([], 0, 30)), ...(typeof patch === "function" ? patch(p[activeLeadId] || {}) : patch) } }));
  const updatePlayer = (lid, patch) =>
    setPlayers(p => ({ ...p, [lid]: { ...(p[lid] || defaultPlayer([], 0, 30)), ...(typeof patch === "function" ? patch(p[lid] || {}) : patch) } }));

  const setPlaying  = (v) => updateActivePlayer(prev => ({ playing:  typeof v === "function" ? v(prev.playing)  : v }));
  const setShuffle  = (v) => updateActivePlayer(prev => ({ shuffle:  typeof v === "function" ? v(prev.shuffle)  : v }));
  const setRepeat   = (v) => updateActivePlayer(prev => ({ repeat:   typeof v === "function" ? v(prev.repeat)   : v }));
  const setPosition = (v) => updateActivePlayer(prev => ({ position: typeof v === "function" ? v(prev.position) : v }));
  const setQueue       = (v) => updateActivePlayer(prev => ({ queue:      typeof v === "function" ? v(prev.queue)       : v }));
  const setCurrentIdx  = (v) => updateActivePlayer(prev => ({ currentIdx: typeof v === "function" ? v(prev.currentIdx)  : v }));

  // advance clock for ALL playing groups, so the Grouping screen feels live.
  useEffect(() => {
    const t = setInterval(() => {
      setPlayers(ps => {
        let changed = false;
        const out = { ...ps };
        Object.keys(out).forEach(lid => {
          const p = out[lid];
          if (!p?.playing) return;
          const tr = D.trackById(p.queue[p.currentIdx]);
          if (!tr) return;
          if (p.position + 1 >= tr.durationSec) {
            out[lid] = { ...p, position: 0, currentIdx: Math.min(p.queue.length - 1, p.currentIdx + 1) };
          } else {
            out[lid] = { ...p, position: p.position + 1 };
          }
          changed = true;
        });
        return changed ? out : ps;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []); // eslint-disable-line

  const next = () => { setCurrentIdx(i => Math.min(player.queue.length - 1, i + 1)); setPosition(0); };
  const prev = () => {
    if (player.position > 3) setPosition(0);
    else setCurrentIdx(i => Math.max(0, i - 1));
  };

  // ── speakers / groups ───────────────────────────────────────────────────
  const setSpeakerVol = (id, v) => setSpeakers(ss => ss.map(s => s.id === id ? { ...s, volume: v } : s));
  // Apply a group's volume by setting all member volumes to v + recording it
  // on the group player state.
  const setGroupVolumeFor = (leadId, v) => {
    updatePlayer(leadId, { groupVolume: v });
    setSpeakers(ss => ss.map(s => s.leadId === leadId ? { ...s, volume: v } : s));
  };
  const setGroupVolume = (v) => setGroupVolumeFor(activeLeadId, v);

  // Move a speaker into a group. If the speaker was the lead of its own
  // group, that whole group dissolves and its player state is dropped.
  const addSpeakerToGroup = (speakerId, leadId) => {
    if (speakerId === leadId) return;
    setSpeakers(ss => ss.map(s => s.id === speakerId ? { ...s, leadId } : s));
    setPlayers(p => {
      if (!p[speakerId]) return p;
      const copy = { ...p };
      delete copy[speakerId];
      return copy;
    });
    if (activeLeadId === speakerId) setActiveLeadIdRaw(leadId);
  };
  // Make a speaker solo (its own lead).
  const ungroupSpeaker = (speakerId) =>
    setSpeakers(ss => ss.map(s => s.id === speakerId ? { ...s, leadId: speakerId } : s));

  // Sonos-style multi-room commit: reconcile membership of one group against
  // the full speaker list. `newMemberIds` is the desired final membership of
  // the group identified by `leadId` (the lead can change if the old lead is
  // unchecked).
  const [groupingSheet, setGroupingSheet] = useState({ open: false, leadId: null });
  const openGroupingSheet = (leadId) => setGroupingSheet({ open: true, leadId });
  const closeGroupingSheet = () => setGroupingSheet(g => ({ ...g, open: false }));

  const commitGroupMembers = (leadId, newMemberIds) => {
    const memberSet = new Set(newMemberIds);
    // If the old lead is being kept, it stays the lead; otherwise the first
    // remaining checked speaker becomes the new lead. Empty = group dissolves.
    const newLead = memberSet.has(leadId) ? leadId : (newMemberIds[0] || null);

    setSpeakers(ss => ss.map(sp => {
      const wasMember = sp.leadId === leadId;
      const willBeMember = memberSet.has(sp.id);
      if (willBeMember)       return { ...sp, leadId: newLead };
      if (wasMember)          return { ...sp, leadId: sp.id }; // dropped from group → solo idle
      return sp;
    }));

    setPlayers(p => {
      const out = { ...p };
      if (!newLead) {
        // Group dissolved entirely — drop its player state.
        delete out[leadId];
      } else if (newLead !== leadId) {
        // Lead transferred — carry the playback over.
        out[newLead] = p[leadId] || defaultPlayer(D.initialQueue, 0, 30);
        delete out[leadId];
      }
      // Speakers joining from their OWN solo player lose that player state
      // (they're now slaved to the group lead).
      newMemberIds.forEach(id => { if (id !== newLead && out[id]) delete out[id]; });
      return out;
    });

    if (activeLeadId === leadId && newLead && newLead !== leadId) {
      setActiveLeadIdRaw(newLead);
    } else if (activeLeadId === leadId && !newLead) {
      // Group dissolved while active — refocus on any remaining lead.
      setSpeakers(prev => {
        const next = prev.find(sp => sp.leadId === sp.id);
        if (next) setActiveLeadIdRaw(next.id);
        return prev;
      });
    }
    closeGroupingSheet();
  };

  // Toggle a group's playback (used from the grouping screen).
  const toggleGroupPlay = (leadId) => updatePlayer(leadId, p => ({ playing: !p.playing }));
  // Start playback on a previously-idle solo speaker.
  const startSoloPlayback = (speakerId) => {
    setPlayers(p => ({ ...p, [speakerId]: defaultPlayer(D.initialQueue, 0, 30) }));
    setActiveLeadIdRaw(speakerId);
  };

  // ── queue actions (target active group) ─────────────────────────────────
  const removeFromQueue = (idx) => {
    setQueue(q => { const nq = q.slice(); nq.splice(idx, 1); return nq; });
    if (idx < currentIdx) setCurrentIdx(i => i - 1);
  };
  const moveQueue = (from, to) => {
    setQueue(q => {
      if (from === to) return q;
      const nq = q.slice();
      const [m] = nq.splice(from, 1);
      nq.splice(to, 0, m);
      return nq;
    });
    setCurrentIdx(ci => {
      if (from === ci) return to;
      if (from < ci && to >= ci) return ci - 1;
      if (from > ci && to <= ci) return ci + 1;
      return ci;
    });
  };
  const playTrackAt = (idx) => { setCurrentIdx(idx); setPosition(0); setPlaying(true); };
  const moveToTop = (idx) => moveQueue(idx, currentIdx + 1);
  const clearQueue = () => setQueue(q => q.slice(0, currentIdx + 1));
  const removeBulk = (ids) => {
    setQueue(q => q.filter((_, i) => !ids.has(i)));
    setSelectedTracks(new Set());
    setMultiMode(false);
  };

  // Browser nav helpers (unchanged)
  const browserGo = (patch) => setBrowser(b => ({ ...b, ...patch }));
  const pushCrumb = (crumb, patch = {}) =>
    setBrowser(b => ({ ...b, ...patch, crumbs: [...b.crumbs, crumb] }));
  const popToCrumb = (idx) =>
    setBrowser(b => {
      const c = b.crumbs.slice(0, idx + 1);
      const last = c[c.length - 1];
      if (last.kind === "root")     return { ...b, crumbs: c, providerId: null, accountId: null, detailId: null };
      if (last.kind === "provider") return { ...b, crumbs: c, accountId: null, detailId: null };
      if (last.kind === "account")  return { ...b, crumbs: c, detailId: null };
      return { ...b, crumbs: c };
    });

  // Backward-compat: old screens called toggleSpeaker / setAllVol. Map them
  // to the new semantics so the other variations keep working unchanged.
  const toggleSpeaker = (id) => {
    const sp = speakers.find(x => x.id === id);
    if (!sp) return;
    if (sp.leadId === activeLeadId && id !== activeLeadId) ungroupSpeaker(id);
    else if (sp.leadId !== activeLeadId)                   addSpeakerToGroup(id, activeLeadId);
  };
  const setAllVol = (v) => setGroupVolumeFor(activeLeadId, v);

  return {
    D,
    tab, setTab,
    // active-player surface (backward compatible)
    playing, setPlaying,
    shuffle, setShuffle,
    repeat, setRepeat,
    queue, setQueue,
    currentIdx, setCurrentIdx,
    currentTrack, currentAlbum,
    position, setPosition,
    next, prev,
    speakers, toggleSpeaker, setSpeakerVol,
    groupVolume, setGroupVolume, setAllVol,
    // multi-group surface
    groups, activeGroup, activeLeadId, setActiveLead,
    addSpeakerToGroup, ungroupSpeaker, setGroupVolumeFor,
    toggleGroupPlay, startSoloPlayback, updatePlayer,
    // group sheet
    groupingSheet, openGroupingSheet, closeGroupingSheet, commitGroupMembers,
    // shared
    browser, browserGo, pushCrumb, popToCrumb,
    search, setSearch,
    selectedTracks, setSelectedTracks,
    multiMode, setMultiMode,
    removeFromQueue, moveQueue, playTrackAt, moveToTop, clearQueue, removeBulk,
  };
}
window.useMusicCard = useMusicCard;

// ── AlbumArt: a gradient tile representing artwork ─────────────────────────
function AlbumArt({ obj, size = 48, radius = 8, glyph, overlay, style, className }) {
  const D = window.MA_DATA;
  const bg = D.artGradient(obj || {});
  return (
    <div className={className}
         style={{
           width: size, height: size, borderRadius: radius,
           background: bg, position: "relative", flex: "none",
           boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.18), inset 0 -8px 18px rgba(0,0,0,0.18)",
           overflow: "hidden",
           ...style,
         }}>
      {glyph && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.85)", fontWeight: 700, fontSize: size * 0.34,
          letterSpacing: "-0.03em", textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        }}>{glyph}</div>
      )}
      {/* subtle scan light */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(255,255,255,0.18), transparent 40%)",
        pointerEvents: "none",
      }} />
      {overlay}
    </div>
  );
}
window.AlbumArt = AlbumArt;

// ── Slider: themed range input ─────────────────────────────────────────────
function Slider({ value, onChange, min = 0, max = 100, color = "#fff", track = "rgba(255,255,255,0.18)", height = 4, thumb = 14, ariaLabel }) {
  const id = useRef("sl" + Math.random().toString(36).slice(2, 8)).current;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ position: "relative", width: "100%", padding: "8px 0" }}>
      <style>{`
        #${id}.ma-sl{appearance:none;-webkit-appearance:none;width:100%;background:transparent;outline:none;margin:0;display:block;height:${thumb}px}
        #${id}.ma-sl::-webkit-slider-runnable-track{height:${height}px;border-radius:${height}px;background:linear-gradient(to right, ${color} 0%, ${color} ${pct}%, ${track} ${pct}%, ${track} 100%)}
        #${id}.ma-sl::-moz-range-track{height:${height}px;border-radius:${height}px;background:${track}}
        #${id}.ma-sl::-moz-range-progress{height:${height}px;border-radius:${height}px;background:${color}}
        #${id}.ma-sl::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:${thumb}px;height:${thumb}px;border-radius:50%;background:${color};border:0;margin-top:${(height-thumb)/2}px;box-shadow:0 1px 3px rgba(0,0,0,0.4)}
        #${id}.ma-sl::-moz-range-thumb{width:${thumb}px;height:${thumb}px;border-radius:50%;background:${color};border:0;box-shadow:0 1px 3px rgba(0,0,0,0.4)}
      `}</style>
      <input id={id} className="ma-sl" type="range" min={min} max={max} value={value}
             aria-label={ariaLabel}
             onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}
window.Slider = Slider;

// ── SwipeRow: tap+drag horizontally to reveal a delete action ──────────────
function SwipeRow({ children, onDelete, height, bg = "#e0413a", icon, theme }) {
  const [dx, setDx] = useState(0);
  const startX = useRef(null);
  const startDx = useRef(0);
  const open = dx <= -64;
  const onDown = (e) => {
    startX.current = (e.touches ? e.touches[0].clientX : e.clientX);
    startDx.current = dx;
  };
  const onMove = (e) => {
    if (startX.current == null) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    let d = startDx.current + (x - startX.current);
    if (d > 0) d = 0;
    if (d < -110) d = -110;
    setDx(d);
  };
  const onUp = () => {
    startX.current = null;
    if (dx < -64) setDx(-92);
    else setDx(0);
  };
  return (
    <div style={{ position: "relative", height, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: 92,
        background: bg, display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", cursor: "pointer",
      }} onClick={onDelete}>
        {icon || <I.trash size={18} stroke="#fff" />}
      </div>
      <div
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
        onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
        style={{ transform: `translateX(${dx}px)`, transition: startX.current ? "none" : "transform 0.18s", height: "100%", background: theme?.rowBg ?? "transparent", cursor: "grab" }}>
        {children}
      </div>
    </div>
  );
}
window.SwipeRow = SwipeRow;

// ── DraggableQueue: a list that supports drag-reorder via grip ─────────────
function DraggableQueue({ items, renderRow, onReorder, rowHeight }) {
  const [dragIdx, setDragIdx] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);
  const startY = useRef(0);
  const containerRef = useRef(null);

  const onGripDown = (idx) => (e) => {
    e.preventDefault();
    setDragIdx(idx);
    setHoverIdx(idx);
    startY.current = (e.touches ? e.touches[0].clientY : e.clientY);
  };

  useEffect(() => {
    if (dragIdx == null) return;
    const onMove = (e) => {
      const y = (e.touches ? e.touches[0].clientY : e.clientY);
      const dy = y - startY.current;
      const newPos = Math.round(dragIdx + dy / rowHeight);
      setHoverIdx(Math.max(0, Math.min(items.length - 1, newPos)));
    };
    const onUp = () => {
      if (dragIdx != null && hoverIdx != null && hoverIdx !== dragIdx) onReorder(dragIdx, hoverIdx);
      setDragIdx(null);
      setHoverIdx(null);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragIdx, hoverIdx, rowHeight, items.length]);

  // Compute Y offsets per item
  const order = items.map((_, i) => i);
  if (dragIdx != null && hoverIdx != null) {
    const [m] = order.splice(dragIdx, 1);
    order.splice(hoverIdx, 0, m);
  }
  const positions = {};
  order.forEach((origIdx, newIdx) => { positions[origIdx] = newIdx * rowHeight; });

  return (
    <div ref={containerRef} style={{ position: "relative", height: items.length * rowHeight }}>
      {items.map((item, i) => {
        const y = positions[i];
        const dragging = i === dragIdx;
        return (
          <div key={item.key ?? i}
               style={{
                 position: "absolute", left: 0, right: 0, top: 0,
                 transform: `translateY(${y}px)`,
                 transition: dragging ? "none" : "transform 0.18s cubic-bezier(.2,.7,.3,1)",
                 zIndex: dragging ? 10 : 1,
                 opacity: dragging ? 0.92 : 1,
                 filter: dragging ? "drop-shadow(0 8px 22px rgba(0,0,0,0.4))" : "none",
               }}>
            {renderRow(item, i, { onGripDown: onGripDown(i), isDragging: dragging })}
          </div>
        );
      })}
    </div>
  );
}
window.DraggableQueue = DraggableQueue;

window.MA_CORE_READY = true;
