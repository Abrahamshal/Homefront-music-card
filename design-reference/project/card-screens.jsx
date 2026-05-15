// card-screens.jsx
// Shared screen renderers used by all 3 card variations.
// Each screen receives { s, T, dens } — state hook, theme tokens, density spec.
//
//   s: from useMusicCard()
//   T: theme tokens (colors, fonts, surfaces)
//   dens: DENSITY[…]
//
// Variation files own only Player + TabBar + card frame.

const I = window.MA_I;
const cx = (...xs) => xs.filter(Boolean).join(" ");

// ── Reusable: section title bar in the screen body ─────────────────────────
function ScreenHeader({ title, sub, action, T }) {
  return (
    <div style={{ padding: "16px 16px 8px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text, letterSpacing: T.headingTracking ?? "-0.01em", fontFamily: T.headingFont ?? T.font, lineHeight: 1.05 }}>{title}</div>
        {sub && <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 4 }}>{sub}</div>}
      </div>
      {action}
    </div>
  );
}

// ── BackBar: breadcrumb-style nav for the browser ──────────────────────────
function BackBar({ s, T }) {
  const { crumbs } = s.browser;
  return (
    <div style={{
      padding: "10px 14px 6px", display: "flex", alignItems: "center", gap: 6,
      flexWrap: "wrap", color: T.textDim, fontSize: 12,
    }}>
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          <button onClick={() => s.popToCrumb(i)}
                  style={{
                    background: "transparent", border: 0, padding: "3px 6px", borderRadius: 6,
                    color: i === crumbs.length - 1 ? T.text : T.textDim,
                    fontWeight: i === crumbs.length - 1 ? 600 : 500,
                    cursor: "pointer", fontSize: 12, font: "inherit",
                  }}>{c.label}</button>
          {i < crumbs.length - 1 && <I.chev size={11} stroke={T.textDim} />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── ProviderTile ───────────────────────────────────────────────────────────
function ProviderTile({ provider, onClick, T, large }) {
  const sz = large ? 56 : 44;
  const bg = `linear-gradient(135deg, oklch(72% 0.18 ${provider.brandHue}), oklch(48% 0.16 ${(provider.brandHue + 30) % 360}))`;
  return (
    <button onClick={onClick} style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius ?? 14,
      padding: 14, display: "flex", alignItems: "center", gap: 14, color: T.text,
      cursor: "pointer", textAlign: "left", font: "inherit", width: "100%",
    }}>
      <div style={{
        width: sz, height: sz, borderRadius: large ? 14 : 10, background: bg, flex: "none",
        display: "grid", placeItems: "center", color: "#fff",
        fontFamily: T.headingFont ?? T.font, fontWeight: 700, fontSize: sz * 0.45,
        boxShadow: "inset 0 -8px 18px rgba(0,0,0,0.18)",
      }}>{provider.glyph || provider.name[0]}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{provider.name}</div>
        <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 2 }}>
          {provider.accounts.length} account{provider.accounts.length > 1 ? "s" : ""} · connected
        </div>
      </div>
      <I.chev size={16} stroke={T.textDim} />
    </button>
  );
}

// ── AccountTile ────────────────────────────────────────────────────────────
function AccountTile({ acc, onClick, T }) {
  return (
    <button onClick={onClick} style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius ?? 12,
      padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, color: T.text,
      cursor: "pointer", textAlign: "left", font: "inherit", width: "100%",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `conic-gradient(from 220deg, ${T.accent}, oklch(70% 0.14 ${(220) % 360}))`,
        color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13,
      }}>{acc.name.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase()}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{acc.name}</div>
        <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 2 }}>{acc.tier}</div>
      </div>
      <I.chev size={16} stroke={T.textDim} />
    </button>
  );
}

// ── Sub-tab strip used inside an account ───────────────────────────────────
const SUBTABS = [
  { id: "playlists", label: "Playlists", icon: I.list },
  { id: "albums",    label: "Albums",    icon: I.album },
  { id: "artists",   label: "Artists",   icon: I.artist },
  { id: "tracks",    label: "Tracks",    icon: I.note },
  { id: "radio",     label: "Radio",     icon: I.radio },
];
function SubTabs({ value, onChange, T }) {
  return (
    <div style={{
      display: "flex", gap: 4, padding: "4px 14px 8px",
      overflowX: "auto", scrollbarWidth: "none",
    }}>
      {SUBTABS.map(t => {
        const active = value === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
                  style={{
                    background: active ? T.accent : "transparent",
                    color: active ? T.accentText ?? "#fff" : T.textDim,
                    border: `1px solid ${active ? T.accent : T.border}`,
                    borderRadius: 999, padding: "5px 12px", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", font: "inherit", whiteSpace: "nowrap",
                  }}>{t.label}</button>
        );
      })}
    </div>
  );
}

// ── BrowserScreen ──────────────────────────────────────────────────────────
function BrowserScreen({ s, T, dens }) {
  const D = s.D;
  const { providerId, accountId, sub, detailId } = s.browser;
  const provider = providerId ? D.providerById(providerId) : null;

  const pickProvider = (p) => s.pushCrumb({ kind: "provider", label: p.name }, { providerId: p.id });
  const pickAccount  = (a) => s.pushCrumb({ kind: "account",  label: a.name }, { accountId: a.id, sub: "playlists", detailId: null });
  const openDetail   = (item) => s.pushCrumb({ kind: "detail", label: item.name }, { detailId: item.id });

  let body;
  if (!providerId) {
    body = (
      <div style={{ padding: "0 14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <SectionLabel T={T}>Connected sources</SectionLabel>
        {D.providers.map(p => <ProviderTile key={p.id} provider={p} T={T} onClick={() => pickProvider(p)} />)}
      </div>
    );
  } else if (!accountId) {
    body = (
      <div style={{ padding: "0 14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <SectionLabel T={T}>{provider.name} · choose an account</SectionLabel>
        {provider.accounts.map(a => <AccountTile key={a.id} acc={a} T={T} onClick={() => pickAccount(a)} />)}
      </div>
    );
  } else if (detailId) {
    const item = D.playlists.find(p => p.id === detailId) || D.albums.find(a => a.id === detailId);
    body = (
      <div style={{ padding: "0 0 16px" }}>
        <DetailHeader item={item} T={T} s={s} />
        <div style={{ padding: "0 14px" }}>
          {D.tracks.slice(0, 10).map((tr, i) => (
            <TrackRow key={tr.id} tr={tr} index={i + 1} T={T} dens={dens}
                      onPlay={() => { /* would queue + play */ }} />
          ))}
        </div>
      </div>
    );
  } else {
    body = (
      <>
        <SubTabs value={sub} onChange={(v) => s.browserGo({ sub: v })} T={T} />
        <div style={{ padding: "0 14px 16px" }}>
          {sub === "playlists" && (
            <Grid2>{D.playlists.map(p => <ArtTile key={p.id} obj={p} title={p.name} sub={p.trackCount + " tracks"} T={T} onClick={() => openDetail(p)} />)}</Grid2>
          )}
          {sub === "albums" && (
            <Grid2>{D.albums.map(a => <ArtTile key={a.id} obj={a} title={a.name} sub={a.artist} T={T} onClick={() => openDetail(a)} />)}</Grid2>
          )}
          {sub === "artists" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {D.artistList.slice(0, 12).map((n, i) => (
                <button key={n} style={artistRow(T)}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `conic-gradient(from ${i*40}deg, oklch(70% 0.18 ${i*30}), oklch(46% 0.16 ${(i*30 + 60)%360}))` }} />
                  <div style={{ fontSize: 14, color: T.text, fontWeight: 500 }}>{n}</div>
                  <div style={{ marginLeft: "auto", color: T.textDim, fontSize: 11 }}>Artist</div>
                </button>
              ))}
            </div>
          )}
          {sub === "tracks" && (
            <div>
              {D.tracks.slice(0, 12).map((tr, i) => (
                <TrackRow key={tr.id} tr={tr} index={i + 1} T={T} dens={dens} />
              ))}
            </div>
          )}
          {sub === "radio" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {D.radioStations.map(r => (
                <button key={r.id} style={radioRow(T)}>
                  <window.AlbumArt obj={r} size={44} radius={10} glyph={<I.radio size={18} stroke="#fff" />} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 2 }}>{r.genre}</div>
                  </div>
                  <I.play size={16} stroke={T.text} fill={T.text} />
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: 12 }}>
      <BackBar s={s} T={T} />
      {body}
    </div>
  );
}

function SectionLabel({ children, T }) {
  return (
    <div style={{
      padding: "4px 4px 6px", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em",
      textTransform: "uppercase", color: T.textDim,
    }}>{children}</div>
  );
}

function Grid2({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{children}</div>;
}

function ArtTile({ obj, title, sub, T, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius ?? 12,
      padding: 8, display: "flex", flexDirection: "column", gap: 8, color: T.text,
      cursor: "pointer", textAlign: "left", font: "inherit",
    }}>
      <window.AlbumArt obj={obj} size="100%" radius={8}
                       style={{ width: "100%", aspectRatio: "1 / 1", height: "auto" }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        <div style={{ fontSize: 11, color: T.textDim, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>
      </div>
    </button>
  );
}

function TrackRow({ tr, index, T, dens, onPlay }) {
  const D = window.MA_DATA;
  const album = D.albumById(tr.albumId);
  return (
    <button onClick={onPlay} style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 4px", background: "transparent", border: 0,
      borderBottom: `1px solid ${T.divider}`, width: "100%", cursor: "pointer",
      color: T.text, textAlign: "left", font: "inherit",
    }}>
      {index != null && <div style={{ width: 18, textAlign: "right", color: T.textDim, fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{index}</div>}
      <window.AlbumArt obj={album} size={36} radius={6} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tr.name}</div>
        <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tr.artist} · {tr.album}</div>
      </div>
      <div style={{ color: T.textDim, fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{D.fmtTime(tr.durationSec)}</div>
    </button>
  );
}

function DetailHeader({ item, T, s }) {
  const D = window.MA_DATA;
  if (!item) return null;
  const isPlaylist = !!item.trackCount;
  return (
    <div style={{
      padding: "8px 14px 16px", display: "flex", gap: 14, alignItems: "flex-end",
    }}>
      <window.AlbumArt obj={item} size={112} radius={14}
                       style={{ boxShadow: "0 12px 24px rgba(0,0,0,0.28)" }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textDim }}>{isPlaylist ? "Playlist" : "Album"}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: T.text, letterSpacing: "-0.01em", marginTop: 4, lineHeight: 1.1 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: T.textDim, marginTop: 6 }}>
          {isPlaylist ? `${item.owner} · ${item.trackCount} tracks` : `${item.artist} · ${item.year}`}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button style={pillBtn(T, true)}><I.play size={13} fill="currentColor" stroke="none" /> Play</button>
          <button style={pillBtn(T)}><I.plus size={13} /> Queue</button>
        </div>
      </div>
    </div>
  );
}

function pillBtn(T, primary) {
  return {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: primary ? T.accent : "transparent",
    color: primary ? (T.accentText ?? "#fff") : T.text,
    border: primary ? "0" : `1px solid ${T.border}`,
    borderRadius: 999, padding: "7px 14px", fontWeight: 600, fontSize: 12,
    cursor: "pointer", font: "inherit",
  };
}
function artistRow(T) {
  return {
    display: "flex", alignItems: "center", gap: 12, padding: "8px 4px",
    background: "transparent", border: 0, borderBottom: `1px solid ${T.divider}`,
    width: "100%", cursor: "pointer", font: "inherit",
  };
}
function radioRow(T) {
  return {
    display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
    background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12,
    width: "100%", cursor: "pointer", font: "inherit",
  };
}

// ── GroupingScreen (multi-group) ───────────────────────────────────────────
// One card per active group, with its own now-playing peek, group volume,
// member sliders, and "make active" / "leave group" actions. An "Idle" rail
// at the bottom lists solo speakers you can add to a group or start solo on.
function GroupingScreen({ s, T, dens }) {
  const activeGroups = s.groups.filter(g => !g.isIdle);
  const idleGroups   = s.groups.filter(g =>  g.isIdle);

  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "8px 14px 16px" }}>
      <ScreenHeader title="Speakers & groups"
        sub={`${activeGroups.length} group${activeGroups.length===1?"":"s"} · ${s.speakers.length} speakers total`} T={T} />

      {/* Active groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
        {activeGroups.map(g => (
          <GroupCard key={g.leadId} g={g} s={s} T={T} />
        ))}
      </div>

      {/* Idle / solo */}
      {idleGroups.length > 0 && (
        <>
          <div style={{
            margin: "20px 4px 8px", display: "flex", alignItems: "center", gap: 8,
            fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: T.textDim,
          }}>
            Idle
            <div style={{ flex: 1, height: 1, background: T.divider }} />
            {idleGroups.length}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {idleGroups.map(g => (
              <IdleSpeakerRow key={g.leadId} g={g} s={s} T={T} />
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: 16, padding: "0 4px" }}>
        <div style={{ fontSize: 11, color: T.textDim, lineHeight: 1.5 }}>
          Tap a group's name to control it from the Player tab. Add idle speakers
          to the active group with the + chip, or start them solo with ▶.
        </div>
      </div>
    </div>
  );
}

function GroupCard({ g, s, T }) {
  const D = s.D;
  const track = g.player ? D.trackById(g.player.queue[g.player.currentIdx]) : null;
  const album = track ? D.albumById(track.albumId) : null;

  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${g.isActive ? T.accent : T.border}`,
      borderRadius: 14, overflow: "hidden",
      boxShadow: g.isActive ? `0 0 0 2px ${T.accent}26` : "none",
      transition: "border-color .15s, box-shadow .15s",
    }}>
      {/* header row: art + name + active chip + play/pause */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px 10px" }}>
        {album
          ? <window.AlbumArt obj={album} size={46} radius={9} />
          : <div style={{ width: 46, height: 46, borderRadius: 9, background: T.input, display: "grid", placeItems: "center", color: T.textDim }}>
              <window.MA_I.speaker size={18} />
            </div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <button onClick={() => s.setActiveLead(g.leadId)} style={{
            background: "transparent", border: 0, padding: 0, font: "inherit",
            color: T.text, textAlign: "left", cursor: "pointer", minWidth: 0, width: "100%",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{g.name}</div>
            {g.isActive && <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
              color: T.accent, padding: "1px 6px",
              border: `1px solid ${T.accent}`, borderRadius: 4, textTransform: "uppercase",
              flex: "none",
            }}>Active</span>}
          </button>
          <div style={{ fontSize: 11, color: T.textDim, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {track ? <>
              <span style={{ color: T.text }}>{track.name}</span> · {track.artist}
            </> : "Idle"}
          </div>
        </div>
        <button onClick={() => s.openGroupingSheet(g.leadId)} title="Group rooms"
                style={{
                  height: 32, padding: "0 10px", borderRadius: 999,
                  background: "transparent", border: `1px solid ${T.border}`,
                  color: T.text, cursor: "pointer", font: "inherit",
                  display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, flex: "none",
                }}>
          <window.MA_I.group size={13} stroke="currentColor" />
          Group
        </button>
        <button onClick={() => s.toggleGroupPlay(g.leadId)} style={{
          width: 32, height: 32, borderRadius: "50%",
          background: g.playing ? T.accent : "transparent",
          color: g.playing ? T.accentText : T.text,
          border: g.playing ? "0" : `1px solid ${T.border}`,
          cursor: "pointer", display: "grid", placeItems: "center", padding: 0, flex: "none",
        }} aria-label={g.playing ? "Pause group" : "Play group"}>
          {g.playing ? <window.MA_I.pause size={14} /> : <window.MA_I.play size={14} />}
        </button>
      </div>

      {/* group volume */}
      <div style={{ padding: "0 12px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: -2 }}>
          <window.MA_I.group size={13} stroke={T.textDim} />
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: T.textDim }}>
            Group · {g.members.length} speaker{g.members.length===1?"":"s"}
          </div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: T.textDim, fontVariantNumeric: "tabular-nums" }}>
            {g.player ? g.player.groupVolume : g.lead.volume}
          </div>
        </div>
        <window.Slider
          value={g.player ? g.player.groupVolume : g.lead.volume}
          onChange={(v) => s.setGroupVolumeFor(g.leadId, v)}
          color={T.accent} track={T.sliderTrack}
        />
      </div>

      {/* members */}
      <div style={{ borderTop: `1px solid ${T.divider}`, padding: "6px 12px 10px" }}>
        {g.members.map(m => (
          <MemberRow key={m.id} member={m} group={g} s={s} T={T} />
        ))}
      </div>
    </div>
  );
}

function MemberRow({ member, group, s, T }) {
  const isLead = member.id === group.leadId;
  const canLeave = group.members.length > 1;
  return (
    <div style={{ padding: "6px 0", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 12.5, color: T.text, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.name}</div>
          {isLead && group.members.length > 1 && (
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: T.textDim, textTransform: "uppercase" }}>Lead</span>
          )}
        </div>
        <div style={{ paddingTop: 1 }}>
          <window.Slider
            value={member.volume}
            onChange={(v) => s.setSpeakerVol(member.id, v)}
            color={T.textDim} track={T.sliderTrack} height={3} thumb={10}
          />
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: T.textDim, width: 22, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{member.volume}</div>
      {canLeave && (
        <button onClick={() => s.ungroupSpeaker(member.id)} title="Leave group"
                style={{ width: 24, height: 24, padding: 0, border: 0, background: "transparent", color: T.textDim, cursor: "pointer" }}>
          <window.MA_I.x size={13} />
        </button>
      )}
    </div>
  );
}

function IdleSpeakerRow({ g, s, T }) {
  const sp = g.lead;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10,
    }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: T.input, display: "grid", placeItems: "center", color: T.textDim, flex: "none" }}>
        <window.MA_I.speaker size={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sp.name}</div>
        <div style={{ fontSize: 10.5, color: T.textDim, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sp.model} · idle</div>
      </div>
      <button onClick={() => s.openGroupingSheet(sp.id)} title="Group with other rooms"
              style={{
                fontSize: 11, fontWeight: 600, color: T.text,
                padding: "4px 9px", borderRadius: 999,
                background: "transparent", border: `1px solid ${T.border}`, cursor: "pointer", font: "inherit",
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
        <window.MA_I.group size={11} stroke="currentColor" /> Group
      </button>
      <button onClick={() => s.startSoloPlayback(sp.id)} title="Play solo here"
              style={{
                width: 26, height: 26, borderRadius: 999,
                background: T.accent, color: T.accentText, border: 0,
                cursor: "pointer", display: "grid", placeItems: "center", padding: 0, flex: "none",
              }}>
        <window.MA_I.play size={11} fill="currentColor" stroke="none" />
      </button>
    </div>
  );
}

// ── GroupSheet ─────────────────────────────────────────────────────────────
// Sonos-style modal sheet. Lead group is shown at the top with a list of
// rooms below; each row is a checkbox. Tap to add or remove the room from
// the group. If the room is currently in another group, it's transferred.
// Apply commits all changes at once.
function GroupSheet({ s, T }) {
  const sheet = s.groupingSheet;
  const [draft, setDraft] = useState(() => new Set());
  const initialised = useRef(false);

  useEffect(() => {
    if (sheet.open) {
      // Seed the draft membership from the current group, including the lead.
      const lead = sheet.leadId;
      const initial = new Set(s.speakers.filter(sp => sp.leadId === lead).map(sp => sp.id));
      // Always include the lead/anchor so the room being grouped FROM is checked.
      initial.add(lead);
      setDraft(initial);
      initialised.current = true;
    }
  }, [sheet.open, sheet.leadId]);

  if (!sheet.open) return null;
  const leadSpeaker = s.speakers.find(sp => sp.id === sheet.leadId);
  if (!leadSpeaker) return null;

  const toggle = (id) => {
    setDraft(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        // Don't allow removing the anchor itself — that's the room we're
        // grouping rooms TO. To stop playing in it, unselect everything else
        // and apply (or use Leave on the group card).
        if (id === sheet.leadId && next.size > 1) return prev;
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const apply = () => {
    const ids = Array.from(draft);
    s.commitGroupMembers(sheet.leadId, ids);
  };

  // For each speaker, figure out current group context so we can show
  // "Currently in: Patio" etc. next to it.
  const groupNameFor = (sp) => {
    const lead = sp.leadId;
    if (lead === sheet.leadId) return null; // already in this group
    const grp = s.groups.find(g => g.leadId === lead);
    if (!grp) return null;
    if (grp.members.length === 1) return grp.player ? "Playing solo" : "Idle";
    return `In ${grp.name}`;
  };

  const totalSelected = draft.size;
  const changed = !initialised.current ? false : (() => {
    const currentSet = new Set(s.speakers.filter(sp => sp.leadId === sheet.leadId).map(sp => sp.id));
    currentSet.add(sheet.leadId);
    if (currentSet.size !== draft.size) return true;
    for (const id of currentSet) if (!draft.has(id)) return true;
    return false;
  })();

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "flex-end", justifyContent: "stretch",
      animation: "ma-fade 0.18s ease-out",
    }} onClick={s.closeGroupingSheet}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: T.bg, color: T.text, width: "100%",
        borderTopLeftRadius: 18, borderTopRightRadius: 18,
        boxShadow: "0 -20px 40px rgba(0,0,0,0.45)",
        maxHeight: "92%", display: "flex", flexDirection: "column",
        animation: "ma-slide-up 0.24s cubic-bezier(.2,.7,.3,1)",
      }}>
        {/* drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 4, background: T.border }} />
        </div>

        {/* header */}
        <div style={{ padding: "6px 18px 12px", borderBottom: `1px solid ${T.divider}` }}>
          <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em" }}>Group rooms</div>
          <div style={{ fontSize: 12, color: T.textDim, marginTop: 4 }}>
            Choose rooms to play in sync with <span style={{ color: T.text, fontWeight: 600 }}>{leadSpeaker.name}</span>.
          </div>
        </div>

        {/* list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {s.speakers.map(sp => {
            const checked = draft.has(sp.id);
            const anchor = sp.id === sheet.leadId;
            const ctx = groupNameFor(sp);
            return (
              <button key={sp.id} onClick={() => toggle(sp.id)} style={{
                display: "flex", alignItems: "center", gap: 14,
                width: "100%", padding: "12px 18px",
                background: "transparent", border: 0, cursor: "pointer", font: "inherit",
                color: T.text, textAlign: "left",
                borderBottom: `1px solid ${T.divider}`,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: checked ? T.accent : "transparent",
                  border: `1.5px solid ${checked ? T.accent : T.border}`,
                  display: "grid", placeItems: "center", flex: "none",
                  transition: "background .12s, border-color .12s",
                }}>{checked && <window.MA_I.check size={15} stroke={T.accentText ?? "#fff"} sw="2.6" />}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{sp.name}</div>
                    {anchor && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
                        color: T.accent, padding: "1px 5px", textTransform: "uppercase",
                        border: `1px solid ${T.accent}`, borderRadius: 4,
                      }}>Anchor</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 2 }}>
                    {sp.model}{ctx ? ` · ${ctx}` : ""}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: T.textDim, fontVariantNumeric: "tabular-nums" }}>vol {sp.volume}</div>
              </button>
            );
          })}
        </div>

        {/* footer */}
        <div style={{
          padding: "12px 18px 18px", borderTop: `1px solid ${T.divider}`,
          display: "flex", alignItems: "center", gap: 10,
          background: T.surface,
        }}>
          <div style={{ fontSize: 12, color: T.textDim, flex: 1 }}>
            {totalSelected === 0
              ? "Group will be dissolved"
              : totalSelected === 1
                ? "Will play solo"
                : `${totalSelected} rooms grouped`}
          </div>
          <button onClick={s.closeGroupingSheet} style={{
            padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: "transparent", border: `1px solid ${T.border}`, color: T.text,
            cursor: "pointer", font: "inherit",
          }}>Cancel</button>
          <button onClick={apply} disabled={!changed} style={{
            padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: changed ? T.accent : T.input,
            color: changed ? (T.accentText ?? "#fff") : T.textDim,
            border: 0, cursor: changed ? "pointer" : "default", font: "inherit",
            opacity: changed ? 1 : 0.7,
          }}>Done</button>
        </div>
      </div>
    </div>
  );
}
window.GroupSheet = GroupSheet;

// ── SearchScreen ───────────────────────────────────────────────────────────
function SearchScreen({ s, T, dens }) {
  const q = s.search.query.trim().toLowerCase();
  const D = s.D;
  const filter = s.search.filter;

  // Generate per-provider results from local data
  const matches = useMemo(() => {
    if (!q) return null;
    const ix = (s) => s.toLowerCase().includes(q);
    const tracks    = D.tracks.filter(t => ix(t.name) || ix(t.artist));
    const albums    = D.albums.filter(a => ix(a.name) || ix(a.artist));
    const artists   = D.artistList.filter(ix);
    const playlists = D.playlists.filter(p => ix(p.name));
    return { tracks, albums, artists, playlists };
  }, [q]);

  const filterDef = [
    { id: "all", label: "All" }, { id: "tracks", label: "Tracks" },
    { id: "albums", label: "Albums" }, { id: "artists", label: "Artists" },
    { id: "playlists", label: "Playlists" },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 14px 8px", borderBottom: `1px solid ${T.divider}` }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: T.input, borderRadius: 999, padding: "8px 12px",
          border: `1px solid ${T.border}`,
        }}>
          <I.search size={16} stroke={T.textDim} />
          <input value={s.search.query}
                 onChange={(e) => s.setSearch({ ...s.search, query: e.target.value })}
                 placeholder="Search Spotify, Apple Music, SoundCloud…"
                 style={{
                   flex: 1, background: "transparent", border: 0, outline: 0,
                   color: T.text, fontSize: 13.5, font: "inherit",
                 }} />
          {s.search.query && (
            <button onClick={() => s.setSearch({ ...s.search, query: "" })}
                    style={{ background: "transparent", border: 0, padding: 2, cursor: "pointer", color: T.textDim }}>
              <I.x size={14} />
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10, overflowX: "auto", scrollbarWidth: "none" }}>
          {filterDef.map(f => {
            const active = filter === f.id;
            return (
              <button key={f.id} onClick={() => s.setSearch({ ...s.search, filter: f.id })}
                      style={{
                        background: active ? T.accent : "transparent",
                        color: active ? T.accentText ?? "#fff" : T.textDim,
                        border: `1px solid ${active ? T.accent : T.border}`,
                        borderRadius: 999, padding: "3px 10px", fontSize: 11.5, fontWeight: 600,
                        cursor: "pointer", font: "inherit", whiteSpace: "nowrap",
                      }}>{f.label}</button>
            );
          })}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {!matches ? (
          <SearchSuggestions T={T} />
        ) : (
          <div style={{ padding: "10px 14px 16px" }}>
            {D.providers.map(p => {
              // Mock: each provider gets a slice of the global matches.
              let trackHits   = matches.tracks.slice(0, 4);
              let albumHits   = matches.albums.slice(0, 2);
              let artistHits  = matches.artists.slice(0, 2);
              let playlistHits= matches.playlists.slice(0, 2);
              if (p.id === "apple")      { trackHits = matches.tracks.slice(1, 4); albumHits = matches.albums.slice(2, 4); }
              if (p.id === "soundcloud") { trackHits = matches.tracks.slice(2, 5); albumHits = []; }

              if (filter === "tracks")    { albumHits = []; artistHits = []; playlistHits = []; }
              if (filter === "albums")    { trackHits = []; artistHits = []; playlistHits = []; }
              if (filter === "artists")   { trackHits = []; albumHits = []; playlistHits = []; }
              if (filter === "playlists") { trackHits = []; albumHits = []; artistHits = []; }

              const total = trackHits.length + albumHits.length + artistHits.length + playlistHits.length;
              if (total === 0) return null;
              return (
                <div key={p.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0 8px" }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 5,
                      background: `linear-gradient(135deg, oklch(70% 0.18 ${p.brandHue}), oklch(46% 0.16 ${(p.brandHue + 30)%360}))`,
                      color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 10,
                    }}>{p.glyph || p.name[0]}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.text }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: T.textDim, marginLeft: "auto" }}>{total} result{total>1?"s":""}</div>
                  </div>
                  {trackHits.length > 0 && (
                    <div style={{ marginBottom: 6 }}>
                      <SmallLabel T={T}>Tracks</SmallLabel>
                      {trackHits.map((tr, i) => <TrackRow key={tr.id} tr={tr} T={T} dens={dens} />)}
                    </div>
                  )}
                  {albumHits.length > 0 && (
                    <div style={{ marginBottom: 6 }}>
                      <SmallLabel T={T}>Albums</SmallLabel>
                      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "4px 0" }}>
                        {albumHits.map(a => (
                          <div key={a.id} style={{ width: 96, flex: "none" }}>
                            <window.AlbumArt obj={a} size={96} radius={8} />
                            <div style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                            <div style={{ fontSize: 10.5, color: T.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.artist}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {artistHits.length > 0 && (
                    <div style={{ marginBottom: 6 }}>
                      <SmallLabel T={T}>Artists</SmallLabel>
                      {artistHits.map((n, i) => (
                        <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 4px", borderBottom: `1px solid ${T.divider}` }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `conic-gradient(from ${i*60}deg, oklch(70% 0.18 ${i*40}), oklch(46% 0.16 ${(i*40 + 60)%360}))` }} />
                          <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{n}</div>
                          <div style={{ marginLeft: "auto", fontSize: 11, color: T.textDim }}>Artist</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {playlistHits.length > 0 && (
                    <div>
                      <SmallLabel T={T}>Playlists</SmallLabel>
                      {playlistHits.map(pl => (
                        <div key={pl.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 4px", borderBottom: `1px solid ${T.divider}` }}>
                          <window.AlbumArt obj={pl} size={36} radius={6} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{pl.name}</div>
                            <div style={{ fontSize: 11, color: T.textDim }}>{pl.trackCount} tracks</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SmallLabel({ children, T }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textDim, marginBottom: 4 }}>{children}</div>
  );
}
function SearchSuggestions({ T }) {
  const D = window.MA_DATA;
  const suggestions = ["khruangbin", "jazz", "deep focus", "ambient", "tycho", "discover weekly"];
  return (
    <div style={{ padding: "14px 14px" }}>
      <SmallLabel T={T}>Try searching</SmallLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {suggestions.map(t => (
          <div key={t} style={{
            padding: "5px 10px", borderRadius: 999, background: T.surface,
            border: `1px solid ${T.border}`, color: T.text, fontSize: 12, fontWeight: 500,
          }}>{t}</div>
        ))}
      </div>
      <SmallLabel T={T}>Recent</SmallLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {D.tracks.slice(0, 4).map(t => <TrackRow key={t.id} tr={t} T={T} />)}
      </div>
    </div>
  );
}

// ── QueueScreen ────────────────────────────────────────────────────────────
function QueueScreen({ s, T, dens }) {
  const D = s.D;
  const upcoming = s.queue.slice(s.currentIdx + 1);
  const playing  = D.trackById(s.queue[s.currentIdx]);

  const upcomingItems = upcoming.map((id, i) => {
    const idxInQueue = s.currentIdx + 1 + i;
    return { key: id + "@" + idxInQueue, id, idxInQueue };
  });

  const selectedCount = s.selectedTracks.size;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header / toolbar */}
      {!s.multiMode ? (
        <div style={{ padding: "14px 14px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.text, fontFamily: T.headingFont ?? T.font, letterSpacing: T.headingTracking ?? "-0.01em", lineHeight: 1.05 }}>Queue</div>
            <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 4 }}>{upcoming.length} upcoming · drag to reorder</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => s.setMultiMode(true)} style={iconBtn(T)} aria-label="Select"><I.check size={16} /></button>
            <button onClick={s.clearQueue} style={iconBtn(T)} aria-label="Clear"><I.trash size={16} /></button>
          </div>
        </div>
      ) : (
        <div style={{ padding: "14px 14px 8px", display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => { s.setMultiMode(false); s.setSelectedTracks(new Set()); }} style={iconBtn(T)}><I.x size={16} /></button>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{selectedCount} selected</div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <button onClick={() => s.removeBulk(s.selectedTracks)} style={pillBtn(T, true)}>Remove</button>
          </div>
        </div>
      )}

      {/* Now playing row */}
      <div style={{ padding: "0 14px 12px" }}>
        <SmallLabel T={T}>Now playing</SmallLabel>
        <div style={{
          display: "flex", alignItems: "center", gap: 12, padding: "8px 10px",
          background: T.surfaceAlt ?? T.surface, border: `1px solid ${T.border}`, borderRadius: 12,
        }}>
          <window.AlbumArt obj={D.albumById(playing.albumId)} size={44} radius={8} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, animation: "ma-pulse 1.4s ease-in-out infinite" }} />
              <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{playing.name}</div>
            </div>
            <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{playing.artist}</div>
          </div>
        </div>
      </div>

      {/* Up next */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 16px" }}>
        <SmallLabel T={T}>Up next · {upcoming.length}</SmallLabel>
        {upcomingItems.length === 0 ? (
          <div style={{ padding: "30px 0", textAlign: "center", color: T.textDim, fontSize: 12 }}>Queue is empty</div>
        ) : (
          <window.DraggableQueue
            items={upcomingItems}
            rowHeight={56}
            onReorder={(from, to) => s.moveQueue(s.currentIdx + 1 + from, s.currentIdx + 1 + to)}
            renderRow={(item, i, { onGripDown, isDragging }) => {
              const tr = D.trackById(item.id);
              const selected = s.selectedTracks.has(item.idxInQueue);
              return (
                <window.SwipeRow
                  height={56}
                  onDelete={() => s.removeFromQueue(item.idxInQueue)}
                  theme={{ rowBg: T.bg }}
                >
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 6px", height: 56, boxSizing: "border-box",
                    background: selected ? T.selected ?? "rgba(255,255,255,0.07)" : "transparent",
                    borderRadius: 8,
                  }}>
                    {s.multiMode ? (
                      <button onClick={() => {
                        const ns = new Set(s.selectedTracks);
                        if (ns.has(item.idxInQueue)) ns.delete(item.idxInQueue);
                        else ns.add(item.idxInQueue);
                        s.setSelectedTracks(ns);
                      }} style={{
                        width: 20, height: 20, borderRadius: 5,
                        background: selected ? T.accent : "transparent",
                        border: `1.5px solid ${selected ? T.accent : T.border}`,
                        display: "grid", placeItems: "center", padding: 0, cursor: "pointer", flex: "none",
                      }}>{selected && <I.check size={12} stroke={T.accentText ?? "#fff"} sw="3" />}</button>
                    ) : (
                      <div onMouseDown={onGripDown} onTouchStart={onGripDown}
                           style={{ cursor: "grab", padding: 4, color: T.textDim, flex: "none", touchAction: "none" }}
                           aria-label="Drag handle">
                        <I.drag size={14} stroke={T.textDim} />
                      </div>
                    )}
                    <window.AlbumArt obj={D.albumById(tr.albumId)} size={40} radius={6} />
                    <div style={{ flex: 1, minWidth: 0 }}
                         onClick={() => s.multiMode ? null : s.playTrackAt(item.idxInQueue)}>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tr.name}</div>
                      <div style={{ fontSize: 11.5, color: T.textDim, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tr.artist}</div>
                    </div>
                    <div style={{ color: T.textDim, fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{D.fmtTime(tr.durationSec)}</div>
                    {!s.multiMode && (
                      <button onClick={() => s.moveToTop(item.idxInQueue)}
                              style={{ background: "transparent", border: 0, padding: 4, color: T.textDim, cursor: "pointer" }}
                              aria-label="Play next">
                        <I.playNext size={14} stroke={T.textDim} />
                      </button>
                    )}
                  </div>
                </window.SwipeRow>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

function iconBtn(T) {
  return {
    width: 32, height: 32, borderRadius: 8, padding: 0,
    background: T.surface, border: `1px solid ${T.border}`,
    color: T.text, display: "grid", placeItems: "center", cursor: "pointer", font: "inherit",
  };
}

Object.assign(window, {
  BrowserScreen, GroupingScreen, SearchScreen, QueueScreen,
  ScreenHeader, BackBar, SmallLabel, SectionLabel, TrackRow, pillBtn, iconBtn,
});
