# Claude Code Kickoff Prompt

Copy and paste the text inside the fenced block below as the **first message** of a new Claude Code session, after `cd`-ing into the project root on your Mac.

---

```
You are taking over the homefront-music-card project. This is a Home Assistant custom Lovelace card for Music Assistant + WiiM multi-room control, designed for a specific homeowner deployment (summer home, 11 WiiM Amps in a rack, multi-account Spotify, Apple Music, Tidal).

Before doing ANYTHING, read these files in this order:

1. README.md — high-level orientation
2. docs/ARCHITECTURE.md — the architectural decisions, especially the sync architecture (MA for content, WiiM-native Linkplay for grouping). This is load-bearing — do not deviate without flagging.
3. docs/SPEC.md — screen-by-screen feature spec
4. docs/ROADMAP.md — phased build plan. We are starting at Phase 0.
5. docs/HA_INTEGRATION.md — concrete HA / MA / WiiM service shapes and gotchas
6. design-reference/README.md, then design-reference/chats/chat1.md — the original conversation that shaped the UI design
7. design-reference/project/Music Assistant Card.html and the JSX files it imports — the design prototype

After you've read those, do the following before writing any code:

1. Summarize back to me, in your own words, the sync architecture decision and why it's load-bearing. I want to confirm you understand it before we proceed.
2. List the Phase 0 tasks from ROADMAP.md and tell me which one you'll start with.
3. Ask me any clarifying questions you have about the spec, especially anything in the SPEC.md that's ambiguous about real HA behavior vs. the prototype.

After my confirmation, proceed with Phase 0: repo + build setup. Build incrementally — get the toolchain working end-to-end with a placeholder "Hello, Music Assistant" Lit component before touching any of the real UI. We test in HA at the end of each phase before moving on.

Important constraints:

- Stack: Lit + TypeScript + Rollup. No React. Do not introduce new top-level dependencies without asking.
- Target HA version: whatever is current (2026.x). Use modern HA APIs (`hass.callWS`, `hass.callService`).
- Code style: Functional Lit elements with reactive controllers. Each screen is a separate component file. Composition over inheritance.
- Comments: short, only when the code's intent isn't obvious. The prototype files have great inline rationale — port the *non-obvious* comments into the TS port.
- Commit hygiene: commit at the end of every meaningful chunk (e.g., "Phase 0: rollup builds placeholder card" is one commit; "Port AlbumArt primitive" is another). Use conventional-commit style.

Don't:

- Rewrite the architecture decisions in docs/ARCHITECTURE.md without explicit approval.
- Introduce a state-management library (Redux, MobX, Zustand). The prototype's state model is simple enough that a single observable store class is sufficient.
- Add tests in Phase 0 or Phase 1. We add them in Phase 4 once the architecture has stopped moving.
- Skip the setup-help mode (Phase 2 task) — it's the only thing that gives a non-technical user a chance of recovering from a missing integration.
- Use MA grouping (`media_player.join` on MA entities) when WiiM grouping (`media_player.join` on WiiM entities) is what we want. Re-read the architecture doc if you find yourself reaching for MA grouping.

Begin.
```

---

## A few extra things to know before you paste

- The first thing Claude Code will likely do is `ls` the repo and start reading files. Let it. It's grounding itself.
- When it asks clarifying questions at step 3, answer them concretely. Vagueness here cascades.
- After Phase 0 is done and you've verified the "Hello" card works in HA, save the conversation, start a new Claude Code session, and re-orient it with a shorter follow-up:

  > "Continue the homefront-music-card project. Read README.md, docs/ARCHITECTURE.md, and docs/ROADMAP.md to orient. Phase 0 is complete — see commit history. We're starting Phase 1. Proceed."

  Long Claude Code sessions accumulate context drift; resetting between phases keeps each session sharp.
- Commit and push to GitHub regularly. A bad refactor is recoverable from `git reset`; an unrecoverable diff that's been edited for two hours is painful.

## When you hit a wall

- **Wrong service shape**: re-check `docs/HA_INTEGRATION.md`, then check the live integration's documentation, then call the service manually from HA Dev Tools → Services and observe what works. Update `HA_INTEGRATION.md` with what you learn.
- **Linkplay grouping behaving weirdly**: re-read `docs/ARCHITECTURE.md`'s sync section. Most weird behavior comes from accidentally using MA grouping or AirPlay where we meant Linkplay.
- **Performance issues**: profile with HA's frontend dev tools, look for excess re-renders on every `hass` tick. Memoize speaker list / group tree.
- **Stuck on UX**: re-look at `design-reference/project/cards-variations.jsx` for the Refined card. The prototype's interaction details are deliberate; if your port feels worse, you've probably lost something subtle. Diff your version against the prototype.
