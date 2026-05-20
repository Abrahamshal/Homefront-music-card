import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Store } from '../state/store.js';
import { StoreController } from '../state/storeController.js';
import { Icons } from './Icons.js';

/**
 * Sonos-style bottom-sheet modal. Renders nothing when the store says the
 * sheet is closed. When open, shows a checkbox per speaker; the anchor (the
 * speaker the sheet was opened from) is locked checked. Done commits via
 * `store.commitGroupMembers`; Cancel discards.
 *
 * Mounted at the host card root (not inside .body) so it overlays the tab
 * content. The host must have `position: relative; overflow: hidden` for
 * the absolute positioning here to anchor correctly.
 */
@customElement('hf-group-sheet')
export class GroupSheet extends LitElement {
  @property({ attribute: false }) store!: Store;

  /** Per-open draft of selected speaker IDs. Reseeded each time the sheet opens. */
  @state() private _draft: Set<string> = new Set();

  /** Snapshot of `_draft` at open time, for the changed/unchanged check. */
  private _initialDraft: Set<string> = new Set();

  private _ctrl?: StoreController;
  private _wasOpen = false;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('store') && this.store && !this._ctrl) {
      this._ctrl = new StoreController(this, this.store);
    }
    if (this.store) {
      const isOpen = this.store.groupingSheet.open;
      if (isOpen && !this._wasOpen) {
        this._seedDraft();
      }
      this._wasOpen = isOpen;
    }
  }

  private _seedDraft(): void {
    const lead = this.store.groupingSheet.leadId;
    if (!lead) return;
    const members = this.store.speakers
      .filter((sp) => sp.leadId === lead)
      .map((sp) => sp.id);
    members.push(lead); // Anchor is always part of the draft.
    const seed = new Set(members);
    this._draft = seed;
    this._initialDraft = new Set(seed);
  }

  static styles = css`
    :host {
      position: absolute;
      inset: 0;
      z-index: 50;
      pointer-events: none;
    }
    :host([data-open]) {
      pointer-events: auto;
    }
    .scrim {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      animation: hf-sheet-fade 0.18s ease-out;
    }
    .sheet {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--hf-bg);
      color: var(--hf-text);
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
      box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.45);
      max-height: 92%;
      display: flex;
      flex-direction: column;
      animation: hf-sheet-slide 0.24s cubic-bezier(0.2, 0.7, 0.3, 1);
    }
    @keyframes hf-sheet-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes hf-sheet-slide {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .grip {
      display: flex;
      justify-content: center;
      padding: 8px 0 4px;
    }
    .grip > div {
      width: 36px;
      height: 4px;
      border-radius: 4px;
      background: var(--hf-border);
    }
    .header {
      padding: 6px 18px 12px;
      border-bottom: 1px solid var(--hf-divider);
    }
    .header-title {
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .header-sub {
      font-size: 12px;
      color: var(--hf-text-dim);
      margin-top: 4px;
    }
    .header-sub strong {
      color: var(--hf-text);
      font-weight: 600;
    }
    .list {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      padding: 12px 18px;
      background: transparent;
      border: 0;
      cursor: pointer;
      font: inherit;
      color: var(--hf-text);
      text-align: left;
      border-bottom: 1px solid var(--hf-divider);
    }
    .check {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: transparent;
      border: 1.5px solid var(--hf-border);
      display: grid;
      place-items: center;
      flex: none;
      transition: background 0.12s, border-color 0.12s;
    }
    .row[data-checked='true'] .check {
      background: var(--hf-accent);
      border-color: var(--hf-accent);
      color: var(--hf-accent-text);
    }
    .row-info {
      flex: 1;
      min-width: 0;
    }
    .row-name-line {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .row-name {
      font-size: 14.5px;
      font-weight: 600;
    }
    .anchor-tag {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: var(--hf-accent);
      padding: 1px 5px;
      text-transform: uppercase;
      border: 1px solid var(--hf-accent);
      border-radius: 4px;
    }
    .row-sub {
      font-size: 11.5px;
      color: var(--hf-text-dim);
      margin-top: 2px;
    }
    .row-vol {
      font-size: 11px;
      color: var(--hf-text-dim);
      font-variant-numeric: tabular-nums;
    }
    .footer {
      padding: 12px 18px 18px;
      border-top: 1px solid var(--hf-divider);
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--hf-surface);
    }
    .footer-status {
      font-size: 12px;
      color: var(--hf-text-dim);
      flex: 1;
    }
    .btn {
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      font: inherit;
    }
    .btn-cancel {
      background: transparent;
      border: 1px solid var(--hf-border);
      color: var(--hf-text);
    }
    .btn-done {
      padding: 8px 18px;
      background: var(--hf-accent);
      color: var(--hf-accent-text);
      border: 0;
    }
    .btn-done[disabled] {
      background: var(--hf-input);
      color: var(--hf-text-dim);
      cursor: default;
      opacity: 0.7;
    }
  `;

  protected render() {
    const sheet = this.store?.groupingSheet;
    if (!sheet?.open) {
      this.toggleAttribute('data-open', false);
      return html``;
    }
    this.toggleAttribute('data-open', true);

    const lead = sheet.leadId!;
    const leadSpeaker = this.store.speakers.find((sp) => sp.id === lead);
    if (!leadSpeaker) return html``;

    const total = this._draft.size;
    const changed = this._diffChanged();
    const status =
      total === 0
        ? 'Group will be dissolved'
        : total === 1
          ? 'Will play solo'
          : `${total} rooms grouped`;

    return html`
      <div class="scrim" @click=${() => this.store.closeGroupingSheet()}></div>
      <div class="sheet" @click=${(e: Event) => e.stopPropagation()}>
        <div class="grip"><div></div></div>
        <div class="header">
          <div class="header-title">Group rooms</div>
          <div class="header-sub">
            Choose rooms to play in sync with
            <strong>${leadSpeaker.name}</strong>.
          </div>
        </div>
        <div class="list">
          ${this.store.speakers.map((sp) => {
            const checked = this._draft.has(sp.id);
            const isAnchor = sp.id === lead;
            return html`
              <button
                class="row"
                data-checked=${checked}
                @click=${() => this._toggle(sp.id)}
              >
                <div class="check">
                  ${checked ? Icons.check({ size: 15, sw: 2.6 }) : ''}
                </div>
                <div class="row-info">
                  <div class="row-name-line">
                    <div class="row-name">${sp.name}</div>
                    ${isAnchor ? html`<span class="anchor-tag">Anchor</span>` : ''}
                  </div>
                  <div class="row-sub">
                    ${sp.model}${this._contextFor(sp.id, lead)
                      ? ` · ${this._contextFor(sp.id, lead)}`
                      : ''}
                  </div>
                </div>
                <div class="row-vol">vol ${sp.volume}</div>
              </button>
            `;
          })}
        </div>
        <div class="footer">
          <div class="footer-status">${status}</div>
          <button class="btn btn-cancel" @click=${() => this.store.closeGroupingSheet()}>
            Cancel
          </button>
          <button
            class="btn btn-done"
            ?disabled=${!changed}
            @click=${this._apply}
          >
            Done
          </button>
        </div>
      </div>
    `;
  }

  private _toggle(id: string): void {
    const sheet = this.store.groupingSheet;
    const next = new Set(this._draft);
    if (next.has(id)) {
      // Don't allow removing the anchor itself unless it's the only one.
      if (id === sheet.leadId && next.size > 1) return;
      next.delete(id);
    } else {
      next.add(id);
    }
    this._draft = next;
  }

  private _apply = (): void => {
    const sheet = this.store.groupingSheet;
    if (!sheet.leadId) return;
    this.store.commitGroupMembers(sheet.leadId, Array.from(this._draft));
  };

  private _diffChanged(): boolean {
    if (this._initialDraft.size !== this._draft.size) return true;
    for (const id of this._initialDraft) if (!this._draft.has(id)) return true;
    return false;
  }

  /** Context line under each row: where this speaker currently is. */
  private _contextFor(spId: string, sheetLead: string): string | null {
    const sp = this.store.speakers.find((s) => s.id === spId);
    if (!sp) return null;
    if (sp.leadId === sheetLead) return null; // Already in this group.
    const grp = this.store.groups.find((g) => g.leadId === sp.leadId);
    if (!grp) return null;
    if (grp.members.length === 1) return grp.player ? 'Playing solo' : 'Idle';
    return `In ${grp.name}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-group-sheet': GroupSheet;
  }
}
