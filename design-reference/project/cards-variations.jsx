// cards-variations.jsx
// The three Music Assistant card variations: Refined, Editorial, Ambient.
// Each renders the same state through its own chrome + player layout + tab bar.

const { useState, useEffect, useMemo } = React;
const I = window.MA_I;

// ── theme tokens ───────────────────────────────────────────────────────────
const FONT_SANS = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
const FONT_DISPLAY = '"Instrument Serif", "Cormorant Garamond", "PT Serif", Georgia, serif';
const FONT_MONO = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, "SF Mono", monospace';

function refinedTheme(dark) {
  return dark ? {
    name: "refined",
    font: FONT_SANS, headingFont: FONT_SANS,
    bg: "#16181d", surface: "#1d2026", surfaceAlt: "#23272f",
    text: "#ecedef", textDim: "rgba(236,237,239,0.55)",
    border: "rgba(255,255,255,0.07)", borderActive: "rgba(255,255,255,0.16)", divider: "rgba(255,255,255,0.05)",
    accent: "#e08a4a", accentText: "#1b0f06",
    sliderTrack: "rgba(255,255,255,0.12)",
    input: "rgba(255,255,255,0.04)", selected: "rgba(224,138,74,0.12)",
    radius: 14,
  } : {
    name: "refined",
    font: FONT_SANS, headingFont: FONT_SANS,
    bg: "#f4f3f0", surface: "#ffffff", surfaceAlt: "#fafaf7",
    text: "#1c1b18", textDim: "rgba(28,27,24,0.55)",
    border: "rgba(0,0,0,0.07)", borderActive: "rgba(0,0,0,0.16)", divider: "rgba(0,0,0,0.06)",
    accent: "#c46a30", accentText: "#fff7f0",
    sliderTrack: "rgba(0,0,0,0.10)",
    input: "rgba(0,0,0,0.03)", selected: "rgba(196,106,48,0.10)",
    radius: 14,
  };
}

function editorialTheme(dark) {
  return dark ? {
    name: "editorial",
    font: FONT_SANS, headingFont: FONT_DISPLAY, monoFont: FONT_MONO,
    headingTracking: "-0.02em",
    bg: "#0e0e0e", surface: "#1a1a1a", surfaceAlt: "#222",
    text: "#f3f1ec", textDim: "rgba(243,241,236,0.5)",
    border: "rgba(243,241,236,0.10)", borderActive: "rgba(243,241,236,0.22)", divider: "rgba(243,241,236,0.08)",
    accent: "#d75a4a", accentText: "#fff",
    sliderTrack: "rgba(243,241,236,0.10)",
    input: "rgba(243,241,236,0.04)", selected: "rgba(215,90,74,0.12)",
    radius: 4,
  } : {
    name: "editorial",
    font: FONT_SANS, headingFont: FONT_DISPLAY, monoFont: FONT_MONO,
    headingTracking: "-0.02em",
    bg: "#f5f0e8", surface: "#fbf6ee", surfaceAlt: "#fffaf2",
    text: "#1a1612", textDim: "rgba(26,22,18,0.55)",
    border: "rgba(26,22,18,0.10)", borderActive: "rgba(26,22,18,0.24)", divider: "rgba(26,22,18,0.08)",
    accent: "#b03222", accentText: "#fff7f0",
    sliderTrack: "rgba(26,22,18,0.10)",
    input: "rgba(26,22,18,0.03)", selected: "rgba(176,50,34,0.10)",
    radius: 4,
  };
}

function ambientTheme(dark, h1 = 220, h2 = 280) {
  return dark ? {
    name: "ambient",
    font: FONT_SANS, headingFont: FONT_SANS,
    bg: `oklch(20% 0.05 ${h2})`,
    surface: "rgba(255,255,255,0.06)", surfaceAlt: "rgba(255,255,255,0.10)",
    text: "#f6f5f3", textDim: "rgba(246,245,243,0.62)",
    border: "rgba(255,255,255,0.10)", borderActive: "rgba(255,255,255,0.22)", divider: "rgba(255,255,255,0.07)",
    accent: "#ffffff", accentText: `oklch(22% 0.05 ${h1})`,
    sliderTrack: "rgba(255,255,255,0.18)",
    input: "rgba(255,255,255,0.06)", selected: "rgba(255,255,255,0.10)",
    radius: 18,
    glass: true,
  } : {
    name: "ambient",
    font: FONT_SANS, headingFont: FONT_SANS,
    bg: `oklch(94% 0.03 ${h1})`,
    surface: "rgba(255,255,255,0.55)", surfaceAlt: "rgba(255,255,255,0.7)",
    text: "#1a1b1f", textDim: "rgba(26,27,31,0.6)",
    border: "rgba(0,0,0,0.06)", borderActive: "rgba(0,0,0,0.16)", divider: "rgba(0,0,0,0.06)",
    accent: "#1a1b1f", accentText: "#ffffff",
    sliderTrack: "rgba(0,0,0,0.10)",
    input: "rgba(255,255,255,0.6)", selected: "rgba(0,0,0,0.06)",
    radius: 18,
    glass: true,
  };
}

// ── Top mini-bar shared across all 3 cards (HA card title row) ─────────────
function CardTitle({ s, T, dark, onToggleDark, density, onCycleDensity, label = "Music Assistant" }) {
  const playingGroups = s.groups.filter(g => g.playing).length;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "10px 14px 8px",
    }}>
      <I.note size={14} stroke={T.text} />
      <div style={{ fontSize: 12, fontWeight: 600, color: T.text, letterSpacing: "0.02em" }}>{label}</div>
      <div style={{ fontSize: 11, color: T.textDim, marginLeft: 6 }}>
        · {playingGroups} group{playingGroups === 1 ? "" : "s"} playing
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
        <button onClick={onCycleDensity} title="Density" style={miniBtn(T)}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", color: T.textDim, textTransform: "uppercase" }}>{density[0]}</span>
        </button>
        <button onClick={onToggleDark} title="Theme" style={miniBtn(T)}>
          {dark ? <SunIcon size={13} T={T} /> : <MoonIcon size={13} T={T} />}
        </button>
      </div>
    </div>
  );
}

function miniBtn(T) {
  return {
    width: 24, height: 24, borderRadius: 6, padding: 0,
    background: "transparent", border: `1px solid ${T.border}`,
    color: T.textDim, display: "grid", placeItems: "center", cursor: "pointer", font: "inherit",
  };
}
function SunIcon({ size = 14, T }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6l1.4 1.4 M17 17l1.4 1.4 M5.6 18.4l1.4-1.4 M17 7l1.4-1.4" />
    </svg>
  );
}
function MoonIcon({ size = 14, T }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

// ── 1. REFINED ─────────────────────────────────────────────────────────────
function RefinedCard({ density = "regular" }) {
  const s = window.useMusicCard();
  const [dark, setDark] = useState(true);
  const T = refinedTheme(dark);
  const dens = window.MA_DENSITY[density];

  return (
    <div style={{
      width: "100%", height: "100%", background: T.bg, color: T.text,
      fontFamily: T.font, display: "flex", flexDirection: "column",
      borderRadius: 16, overflow: "hidden", position: "relative",
      border: `1px solid ${T.border}`,
    }}>
      <CardTitle s={s} T={T} dark={dark} onToggleDark={() => setDark(d => !d)}
                 density={density} onCycleDensity={() => window.__cycleDensity?.()}
                 label="Music Assistant" />
      <GroupChipRail s={s} T={T} />

      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        {s.tab === "player"  && <RefinedPlayer s={s} T={T} dens={dens} />}
        {s.tab === "browser" && <window.BrowserScreen  s={s} T={T} dens={dens} />}
        {s.tab === "search"  && <window.SearchScreen   s={s} T={T} dens={dens} />}
        {s.tab === "group"   && <window.GroupingScreen s={s} T={T} dens={dens} />}
        {s.tab === "queue"   && <window.QueueScreen    s={s} T={T} dens={dens} />}
      </div>

      <RefinedTabBar s={s} T={T} dens={dens} />
      <window.GroupSheet s={s} T={T} />
    </div>
  );
}

// Horizontal rail of all groups; active one is solid, others are outlined.
// Idle solos appear ghosted, tap-to-focus also wakes them.
function GroupChipRail({ s, T }) {
  return (
    <div style={{
      display: "flex", gap: 6, padding: "2px 14px 10px",
      overflowX: "auto", scrollbarWidth: "none",
      borderBottom: `1px solid ${T.divider}`,
    }}>
      {s.groups.map(g => {
        const active = g.isActive;
        return (
          <button key={g.leadId} onClick={() => s.setActiveLead(g.leadId)} style={{
            flex: "none", display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 10px 5px 8px", borderRadius: 999, cursor: "pointer", font: "inherit",
            background: active ? T.accent : "transparent",
            color: active ? T.accentText : (g.isIdle ? T.textDim : T.text),
            border: `1px solid ${active ? T.accent : T.border}`,
            opacity: g.isIdle ? 0.7 : 1,
            whiteSpace: "nowrap", maxWidth: 220, overflow: "hidden",
          }}>
            {g.playing ? (
              <PlayingPip color={active ? T.accentText : T.accent} />
            ) : (
              <I.speaker size={11} stroke="currentColor" />
            )}
            <span style={{ fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 180 }}>
              {g.name}
            </span>
            {g.members.length > 1 && (
              <span style={{
                fontSize: 9.5, fontWeight: 700, padding: "1px 5px", borderRadius: 999,
                background: active ? "rgba(0,0,0,0.18)" : T.input,
                color: active ? T.accentText : T.textDim,
              }}>{g.members.length}</span>
            )}
          </button>
        );
      })}
      <button onClick={() => s.setTab("group")} title="Manage groups" style={{
        flex: "none", width: 28, height: 28, borderRadius: 999,
        background: "transparent", border: `1px dashed ${T.border}`,
        display: "grid", placeItems: "center", color: T.textDim, cursor: "pointer", padding: 0,
      }}>
        <I.group size={13} />
      </button>
    </div>
  );
}

function PlayingPip({ color }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "flex-end", gap: 1.5, height: 10,
    }}>
      <span style={{ width: 2, height: 6, background: color, borderRadius: 1, animation: "ma-eq1 0.9s ease-in-out infinite" }} />
      <span style={{ width: 2, height: 9, background: color, borderRadius: 1, animation: "ma-eq2 0.9s ease-in-out infinite" }} />
      <span style={{ width: 2, height: 5, background: color, borderRadius: 1, animation: "ma-eq3 0.9s ease-in-out infinite" }} />
    </span>
  );
}
window.PlayingPip = PlayingPip;

function RefinedPlayer({ s, T, dens }) {
  const tr = s.currentTrack;
  const al = s.currentAlbum;
  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "8px 16px 16px" }}>
      <div style={{
        margin: "8px auto 16px", aspectRatio: "1 / 1",
        maxWidth: 280, width: "92%",
      }}>
        <window.AlbumArt obj={al} size="100%" radius={18}
                         style={{ width: "100%", height: "100%",
                                  boxShadow: "0 18px 40px rgba(0,0,0,0.35)" }} />
      </div>
      <div style={{ textAlign: "center", padding: "0 8px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textDim }}>
          {s.shuffle ? "Shuffle" : "Now Playing"} · {al.name}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6, letterSpacing: "-0.01em", color: T.text }}>{tr.name}</div>
        <div style={{ fontSize: 13, color: T.textDim, marginTop: 4 }}>{tr.artist}</div>
      </div>

      {/* scrubber */}
      <div style={{ padding: "14px 4px 0" }}>
        <window.Slider
          value={s.position} min={0} max={tr.durationSec}
          onChange={s.setPosition}
          color={T.accent} track={T.sliderTrack}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: -2, color: T.textDim, fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
          <span>{s.D.fmtTime(s.position)}</span>
          <span>-{s.D.fmtTime(tr.durationSec - s.position)}</span>
        </div>
      </div>

      {/* transport */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, padding: "12px 0 4px" }}>
        <IconBtn onClick={() => s.setShuffle(v => !v)} active={s.shuffle} T={T}><I.shuffle size={18} /></IconBtn>
        <IconBtn onClick={s.prev} T={T}><I.prev size={22} /></IconBtn>
        <button onClick={() => s.setPlaying(p => !p)} style={{
          width: 56, height: 56, borderRadius: "50%",
          background: T.accent, color: T.accentText, border: 0,
          display: "grid", placeItems: "center", cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
        }} aria-label={s.playing ? "Pause" : "Play"}>
          {s.playing ? <I.pause size={22} /> : <I.play size={22} />}
        </button>
        <IconBtn onClick={s.next} T={T}><I.next size={22} /></IconBtn>
        <IconBtn onClick={() => s.setRepeat(r => r === "off" ? "all" : r === "all" ? "one" : "off")}
                 active={s.repeat !== "off"} T={T}>
          {s.repeat === "one" ? <I.rep1 size={18} /> : <I.rep size={18} />}
        </IconBtn>
      </div>

      {/* output indicator (active group) */}
      <div style={{
        marginTop: 12, display: "flex", alignItems: "stretch",
        background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12,
        overflow: "hidden",
      }}>
        <button onClick={() => s.setTab("group")} style={{
          flex: 1, padding: "10px 12px",
          display: "flex", alignItems: "center", gap: 10,
          background: "transparent", border: 0, color: T.text, cursor: "pointer", font: "inherit",
          textAlign: "left", minWidth: 0,
        }}>
          <I.speaker size={16} stroke={T.accent} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {s.activeGroup?.name || "No output"}
            </div>
            <div style={{ fontSize: 10.5, color: T.textDim, marginTop: 2 }}>
              {s.activeGroup?.members.length > 1 ? `Grouped · ${s.activeGroup.members.length} speakers · ` : ""}Volume {s.groupVolume}
              {s.groups.filter(g => !g.isActive && g.playing).length > 0 && (
                <span> · {s.groups.filter(g => !g.isActive && g.playing).length} other group{s.groups.filter(g => !g.isActive && g.playing).length > 1 ? "s" : ""} playing</span>
              )}
            </div>
          </div>
        </button>
        <button onClick={() => s.openGroupingSheet(s.activeLeadId)}
                title="Group rooms" aria-label="Group rooms"
                style={{
                  padding: "0 14px", background: "transparent",
                  border: 0, borderLeft: `1px solid ${T.border}`,
                  color: T.text, cursor: "pointer", font: "inherit",
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 11.5, fontWeight: 600,
                }}>
          <I.group size={13} stroke="currentColor" />
          Group
        </button>
      </div>
    </div>
  );
}

function IconBtn({ onClick, children, active, T }) {
  return (
    <button onClick={onClick} style={{
      width: 38, height: 38, borderRadius: 999, padding: 0,
      background: "transparent", border: 0,
      color: active ? T.accent : T.text, cursor: "pointer",
      display: "grid", placeItems: "center", font: "inherit",
    }}>{children}</button>
  );
}

function RefinedTabBar({ s, T, dens }) {
  const tabs = [
    { id: "player",  label: "Player",  icon: I.play },
    { id: "browser", label: "Browse",  icon: I.home },
    { id: "search",  label: "Search",  icon: I.search },
    { id: "queue",   label: "Queue",   icon: I.queue },
    { id: "group",   label: "Output",  icon: I.speaker },
  ];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
      borderTop: `1px solid ${T.border}`, background: T.surface,
      paddingBottom: 4,
    }}>
      {tabs.map(t => {
        const active = s.tab === t.id;
        const Icon = t.icon;
        return (
          <button key={t.id} onClick={() => s.setTab(t.id)} style={{
            background: "transparent", border: 0, padding: "8px 0 6px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: active ? T.accent : T.textDim, cursor: "pointer", font: "inherit",
            position: "relative",
          }}>
            {active && <div style={{
              position: "absolute", top: 0, left: "30%", right: "30%", height: 2,
              background: T.accent, borderRadius: 2,
            }} />}
            <Icon size={18} />
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.01em" }}>{t.label}</div>
          </button>
        );
      })}
    </div>
  );
}

// ── 2. EDITORIAL ───────────────────────────────────────────────────────────
function EditorialCard({ density = "regular" }) {
  const s = window.useMusicCard();
  const [dark, setDark] = useState(false);
  const T = editorialTheme(dark);
  const dens = window.MA_DENSITY[density];

  return (
    <div style={{
      width: "100%", height: "100%", background: T.bg, color: T.text,
      fontFamily: T.font, display: "flex", flexDirection: "column",
      borderRadius: 6, overflow: "hidden",
      border: `1px solid ${T.border}`,
    }}>
      <CardTitle s={s} T={T} dark={dark} onToggleDark={() => setDark(d => !d)}
                 density={density} onCycleDensity={() => window.__cycleDensity?.()}
                 label="MA · Editorial" />
      <EditorialTabBar s={s} T={T} />

      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        {s.tab === "player"  && <EditorialPlayer s={s} T={T} dens={dens} />}
        {s.tab === "browser" && <window.BrowserScreen  s={s} T={T} dens={dens} />}
        {s.tab === "search"  && <window.SearchScreen   s={s} T={T} dens={dens} />}
        {s.tab === "group"   && <window.GroupingScreen s={s} T={T} dens={dens} />}
        {s.tab === "queue"   && <window.QueueScreen    s={s} T={T} dens={dens} />}
      </div>
    </div>
  );
}

function EditorialTabBar({ s, T }) {
  const tabs = [
    { id: "player",  label: "Playing" },
    { id: "browser", label: "Library" },
    { id: "search",  label: "Search" },
    { id: "queue",   label: "Queue" },
    { id: "group",   label: "Output" },
  ];
  return (
    <div style={{
      display: "flex", gap: 0,
      borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
      background: T.surfaceAlt, padding: "0 14px",
    }}>
      {tabs.map(t => {
        const active = s.tab === t.id;
        return (
          <button key={t.id} onClick={() => s.setTab(t.id)} style={{
            background: "transparent", border: 0,
            padding: "10px 0", marginRight: 18,
            color: active ? T.text : T.textDim, cursor: "pointer", font: "inherit",
            fontFamily: T.headingFont, fontStyle: "italic", fontSize: 17,
            fontWeight: 400, letterSpacing: "-0.01em",
            borderBottom: `2px solid ${active ? T.accent : "transparent"}`,
            marginBottom: -1,
          }}>{t.label}</button>
        );
      })}
    </div>
  );
}

function EditorialPlayer({ s, T, dens }) {
  const tr = s.currentTrack;
  const al = s.currentAlbum;
  const D = s.D;
  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "16px 18px 20px" }}>
      {/* eyebrow */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: T.monoFont, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textDim }}>
          № {String(s.currentIdx + 1).padStart(2, "0")} / {String(s.queue.length).padStart(2, "0")}
        </div>
        <div style={{ fontFamily: T.monoFont, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textDim }}>
          {s.playing ? "On Air" : "Paused"}
        </div>
      </div>

      {/* hero: small art + huge type */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end", marginTop: 18 }}>
        <window.AlbumArt obj={al} size={104} radius={4}
                         style={{ flex: "none", boxShadow: "0 12px 28px rgba(0,0,0,0.25)" }} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontFamily: T.headingFont, fontWeight: 400,
            fontSize: 30, letterSpacing: "-0.025em", color: T.text,
            lineHeight: 0.98,
            wordBreak: "break-word",
          }}>{tr.name}</div>
          <div style={{ fontSize: 13, color: T.textDim, marginTop: 8, fontStyle: "italic", fontFamily: T.headingFont, fontWeight: 400 }}>
            by {tr.artist}
          </div>
        </div>
      </div>

      {/* metadata row */}
      <div style={{
        marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "10px 14px", paddingTop: 14, borderTop: `1px solid ${T.border}`,
        fontFamily: T.monoFont,
      }}>
        <MetaCell label="Album" value={al.name} T={T} />
        <MetaCell label="Year" value={al.year} T={T} />
        <MetaCell label="Source" value="Spotify" T={T} />
        <MetaCell label="Duration" value={D.fmtTime(tr.durationSec)} T={T} />
      </div>

      {/* scrubber */}
      <div style={{ marginTop: 16 }}>
        <window.Slider value={s.position} min={0} max={tr.durationSec}
                       onChange={s.setPosition} color={T.accent} track={T.sliderTrack} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: -2, color: T.textDim, fontSize: 10.5, fontFamily: T.monoFont, fontVariantNumeric: "tabular-nums" }}>
          <span>{D.fmtTime(s.position)}</span>
          <span>{D.fmtTime(tr.durationSec)}</span>
        </div>
      </div>

      {/* transport — minimal asymmetric row */}
      <div style={{
        marginTop: 18, paddingTop: 16, borderTop: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <button onClick={() => s.setPlaying(p => !p)} style={{
          width: 52, height: 52, borderRadius: 0, background: T.text, color: T.bg,
          border: 0, display: "grid", placeItems: "center", cursor: "pointer", flex: "none",
        }} aria-label={s.playing ? "Pause" : "Play"}>
          {s.playing ? <I.pause size={20} /> : <I.play size={20} />}
        </button>
        <button onClick={s.prev} style={editorialMiniBtn(T)} aria-label="Prev"><I.prev size={16} /></button>
        <button onClick={s.next} style={editorialMiniBtn(T)} aria-label="Next"><I.next size={16} /></button>
        <div style={{ flex: 1 }} />
        <button onClick={() => s.setShuffle(v => !v)}
                style={{ ...editorialMiniBtn(T), color: s.shuffle ? T.accent : T.textDim }}><I.shuffle size={15} /></button>
        <button onClick={() => s.setRepeat(r => r === "off" ? "all" : r === "all" ? "one" : "off")}
                style={{ ...editorialMiniBtn(T), color: s.repeat !== "off" ? T.accent : T.textDim }}>
          {s.repeat === "one" ? <I.rep1 size={15} /> : <I.rep size={15} />}
        </button>
      </div>

      {/* outputs bar */}
      <button onClick={() => s.setTab("group")} style={{
        marginTop: 18, width: "100%", padding: "10px 12px",
        display: "flex", alignItems: "center", gap: 10, color: T.text,
        background: "transparent", border: `1px solid ${T.border}`, borderRadius: 4,
        cursor: "pointer", font: "inherit",
      }}>
        <div style={{ fontFamily: T.monoFont, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textDim }}>Playing on</div>
        <div style={{ flex: 1, fontSize: 12, textAlign: "left", fontStyle: "italic", fontFamily: T.headingFont, marginLeft: 8, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {s.activeGroup?.name || "Nothing"}
        </div>
        <I.chev size={13} stroke={T.textDim} />
      </button>
    </div>
  );
}

function MetaCell({ label, value, T }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textDim }}>{label}</div>
      <div style={{ fontSize: 12, color: T.text, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
    </div>
  );
}

function editorialMiniBtn(T) {
  return {
    width: 34, height: 34, borderRadius: 0,
    background: "transparent", border: `1px solid ${T.border}`,
    color: T.text, display: "grid", placeItems: "center", cursor: "pointer", font: "inherit",
  };
}

// ── 3. AMBIENT ─────────────────────────────────────────────────────────────
function AmbientCard({ density = "regular" }) {
  const s = window.useMusicCard();
  const [dark, setDark] = useState(true);
  const al = s.currentAlbum;
  // recolor card bg using current album hues
  const T = ambientTheme(dark, al.h1, al.h2);
  const dens = window.MA_DENSITY[density];

  // gradient background derived from album art
  const heroBg = `
    radial-gradient(120% 90% at 20% -10%, oklch(${dark ? 55 : 88}% 0.16 ${al.h1}) 0%, transparent 60%),
    radial-gradient(120% 90% at 90% 110%, oklch(${dark ? 30 : 78}% 0.14 ${al.h2}) 0%, transparent 55%),
    ${T.bg}`;

  return (
    <div style={{
      width: "100%", height: "100%", background: heroBg, color: T.text,
      fontFamily: T.font, display: "flex", flexDirection: "column",
      borderRadius: 20, overflow: "hidden", position: "relative",
      transition: "background 0.6s",
      border: `1px solid ${T.border}`,
    }}>
      <CardTitle s={s} T={T} dark={dark} onToggleDark={() => setDark(d => !d)}
                 density={density} onCycleDensity={() => window.__cycleDensity?.()}
                 label="MA · Ambient" />

      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        {s.tab === "player"  && <AmbientPlayer s={s} T={T} dens={dens} />}
        {s.tab === "browser" && <window.BrowserScreen  s={s} T={T} dens={dens} />}
        {s.tab === "search"  && <window.SearchScreen   s={s} T={T} dens={dens} />}
        {s.tab === "group"   && <window.GroupingScreen s={s} T={T} dens={dens} />}
        {s.tab === "queue"   && <window.QueueScreen    s={s} T={T} dens={dens} />}
      </div>

      <AmbientTabBar s={s} T={T} dark={dark} />
    </div>
  );
}

function AmbientPlayer({ s, T, dens }) {
  const tr = s.currentTrack;
  const al = s.currentAlbum;
  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "10px 18px 18px" }}>
      <div style={{
        position: "relative", margin: "8px auto 18px",
        maxWidth: 260, width: "92%", aspectRatio: "1 / 1",
      }}>
        <window.AlbumArt obj={al} size="100%" radius={22}
                         style={{ width: "100%", height: "100%",
                                  boxShadow: "0 24px 48px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.18)" }} />
        {/* blurred glow behind */}
        <div style={{
          position: "absolute", inset: -28, zIndex: -1,
          background: `radial-gradient(circle, oklch(70% 0.20 ${al.h1}) 0%, transparent 65%)`,
          filter: "blur(28px)", opacity: 0.55,
        }} />
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: T.text, letterSpacing: "-0.01em" }}>{tr.name}</div>
        <div style={{ fontSize: 13, color: T.textDim, marginTop: 4 }}>{tr.artist} · {al.name}</div>
      </div>

      <div style={{ padding: "16px 4px 4px" }}>
        <window.Slider value={s.position} min={0} max={tr.durationSec}
                       onChange={s.setPosition} color={T.text} track={T.sliderTrack} thumb={12} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: -2, color: T.textDim, fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
          <span>{s.D.fmtTime(s.position)}</span>
          <span>-{s.D.fmtTime(tr.durationSec - s.position)}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 6 }}>
        <IconBtn onClick={() => s.setShuffle(v => !v)} active={s.shuffle} T={T}><I.shuffle size={17} /></IconBtn>
        <IconBtn onClick={s.prev} T={T}><I.prev size={22} /></IconBtn>
        <button onClick={() => s.setPlaying(p => !p)} style={{
          width: 60, height: 60, borderRadius: "50%",
          background: T.text, color: T.accentText, border: 0,
          display: "grid", placeItems: "center", cursor: "pointer",
          boxShadow: "0 12px 24px rgba(0,0,0,0.28)",
        }} aria-label={s.playing ? "Pause" : "Play"}>
          {s.playing ? <I.pause size={24} /> : <I.play size={24} />}
        </button>
        <IconBtn onClick={s.next} T={T}><I.next size={22} /></IconBtn>
        <IconBtn onClick={() => s.setRepeat(r => r === "off" ? "all" : r === "all" ? "one" : "off")}
                 active={s.repeat !== "off"} T={T}>
          {s.repeat === "one" ? <I.rep1 size={17} /> : <I.rep size={17} />}
        </IconBtn>
      </div>

      <button onClick={() => s.setTab("group")} style={{
        marginTop: 16, width: "100%", padding: "10px 14px",
        display: "flex", alignItems: "center", gap: 10, color: T.text,
        background: T.surface, backdropFilter: "blur(20px)",
        border: `1px solid ${T.border}`, borderRadius: 14,
        cursor: "pointer", font: "inherit",
      }}>
        <I.speaker size={16} stroke={T.text} />
        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {s.activeGroup?.name || "No output"}
          </div>
          <div style={{ fontSize: 10.5, color: T.textDim, marginTop: 2 }}>
            {s.activeGroup?.members.length > 1 ? `${s.activeGroup.members.length} speakers · ` : ""}Volume {s.groupVolume}
          </div>
        </div>
        <I.chev size={14} stroke={T.textDim} />
      </button>
    </div>
  );
}

function AmbientTabBar({ s, T, dark }) {
  const tabs = [
    { id: "player",  icon: I.play,    label: "Play" },
    { id: "browser", icon: I.home,    label: "Browse" },
    { id: "search",  icon: I.search,  label: "Search" },
    { id: "queue",   icon: I.queue,   label: "Queue" },
    { id: "group",   icon: I.speaker, label: "Audio" },
  ];
  return (
    <div style={{
      padding: "8px 14px 14px",
      display: "flex", justifyContent: "center",
    }}>
      <div style={{
        display: "flex", gap: 2, padding: 4,
        background: dark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.65)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        border: `1px solid ${T.border}`, borderRadius: 999,
        boxShadow: "0 8px 24px rgba(0,0,0,0.20)",
      }}>
        {tabs.map(t => {
          const active = s.tab === t.id;
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => s.setTab(t.id)} style={{
              padding: active ? "8px 14px" : "8px 10px",
              borderRadius: 999, border: 0, cursor: "pointer", font: "inherit",
              background: active ? T.text : "transparent",
              color: active ? T.accentText : T.text,
              display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
            }} aria-label={t.label}>
              <Icon size={16} />
              {active && <span style={{ fontSize: 11, fontWeight: 600 }}>{t.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { RefinedCard });
