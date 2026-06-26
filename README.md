# Homefront Music Card

A Home Assistant Lovelace card for whole‑home audio, built for **multi‑account households**. It is a fork of the excellent [maxi‑media‑player](https://github.com/punxaphil/maxi-media-player) (a.k.a. custom‑sonos‑card) that keeps maxi's smooth, Sonos‑style interface and **adds one thing maxi/Music Assistant can't do on their own: browsing your music by source account.**

> If two people in your home each have their own Spotify (or Pandora, Apple Music, Tidal…) connected to Music Assistant, the standard library merges them into one giant flat list. This card lets you browse **per account** — "Abe's Spotify", "Marlene's Spotify", "Eileen's Pandora" — and drill down from there.

---

## The use case (why this exists)

Music Assistant is fantastic at pulling many streaming accounts into one place. But that's also the problem in a shared home: once everything is merged, you can't tell whose playlists are whose. You scroll one endless "Playlists" list mixing four people's libraries.

We run a multi‑zone home on **WiiM amps + Music Assistant**, with several family members' streaming accounts connected. We wanted a wall‑tablet card that:

- looks and feels like Sonos (grouping, volumes, queue, now‑playing), and
- lets each person find **their own** music quickly, separated by account.

[maxi‑media‑player](https://github.com/punxaphil/maxi-media-player) already nailed the first half — it's polished and smooth, and rebuilding that from scratch would have been wasted effort. So instead of writing a new card, we **forked maxi and added the per‑account browser**. Everything else is maxi's proven UI, untouched.

## What's different from maxi

Everything maxi does, plus:

- **🎯 Sources tab (the headline feature).** A new media‑browser view powered by Music Assistant's native `music/browse` command. It starts at **one folder per provider account** instead of a merged library, so each person's Spotify/Pandora/etc. is separate. Drill: **Account → category (Playlists, Artists, Albums, Tracks…) → playlist → tracks**, with cover art (and clean fallback icons where art is missing). Open a Spotify playlist to see its tracks, with a **Play‑all** button.
- **🔎 Filter‑in‑list search.** Inside any list (a playlist, your Tracks, an account's folders) a magnifier reveals an instant client‑side filter so you can find a song without scrolling.
- **⚡ Faster tab loads.** The Music Assistant / queue integration discovery is memoized, so opening Search, Favorites, and Sources is near‑instant after the first time instead of re‑querying every open.
- **🎛️ Centered bottom tabs.** When you configure only a couple of sections (say Volumes + Grouping), the tab icons stay centered instead of splitting to the card's edges.
- **🧭 No more "jump to player."** Tapping a track while browsing the Sources tab plays it without yanking you to the now‑playing screen, so you can keep browsing.

The Sources tab defaults on, because per‑account browsing is the whole point of this fork.

## Requirements

This card targets a **Music Assistant + WiiM (Linkplay)** setup. You'll want:

1. **[Music Assistant](https://www.music-assistant.io/)** — installed, with your streaming accounts connected. This is what makes the per‑account browsing possible.
2. **[Music Assistant Queue Actions](https://github.com/droans/ha-mass-queue)** (HACS, `mass_queue`) — the Sources tab calls Music Assistant's native `music/browse` through this integration. **Without it, the Sources tab can't load** (the rest of the card still works).
3. **A Music Assistant media player** configured as the card's `entityId`. For multi‑room sync we target WiiM group leaders' MA entities (see [maxi's docs](https://punxaphil.github.io/maxi-media-player/) for grouping config).

If Music Assistant or the queue integration is missing, the Sources tab shows a help message instead of failing silently.

## Installation (HACS)

This is a **custom repository** (not yet in the HACS default store):

1. In Home Assistant, open **HACS → Frontend**.
2. Top‑right **⋮ → Custom repositories**.
3. Repository: `https://github.com/Abrahamshal/Homefront-music-card` — Category: **Lovelace/Dashboard**.
4. Find **Homefront Music Card** in the list and **Download**.
5. Hard‑refresh your browser (Ctrl/Cmd+Shift+R) after installing or updating.

The card registers as `custom:homefront-music-card`.

## Configuration

Configuration mirrors maxi‑media‑player — see the **[maxi configuration docs](https://punxaphil.github.io/maxi-media-player/)** — just use the `homefront-music-card` type. Minimal example:

```yaml
type: custom:homefront-music-card
entityId: media_player.your_music_assistant_player
entityPlatform: music_assistant   # enables the Sources tab + search
sections:
  - player
  - media browser
  - grouping
  - volumes
```

`entityPlatform: music_assistant` is what unlocks the per‑account Sources browser and Music Assistant search.

## Credit & license

This project stands entirely on the shoulders of **[punxaphil](https://github.com/punxaphil)** and the maxi‑media‑player / custom‑sonos‑card contributors. Please star and support the upstream project.

- Upstream source is vendored under [`maxi-media-player/`](maxi-media-player/) and keeps its original **Apache License 2.0**.
- Our changes (the Sources browser and the fixes above) are released under the **same Apache License 2.0**.
- Attribution and a summary of changes are in [`NOTICE`](NOTICE).

Licensed under the [Apache License, Version 2.0](LICENSE).
