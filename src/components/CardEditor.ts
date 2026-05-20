import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  HomeAssistant,
  HomefrontCardConfig,
  ZoneConfig,
} from '../types.js';

interface HaCardHelpers {
  createCardElement?: (config: { type: string; [k: string]: unknown }) => Promise<HTMLElement>;
}

declare global {
  interface Window {
    /**
     * HA-exposed helper that lazy-loads the card-render bundle. Note it
     * does NOT load the entity-picker / form widgets on its own — for
     * those we need to instantiate a card that depends on them.
     */
    loadCardHelpers?: () => Promise<HaCardHelpers>;
  }
}

/**
 * Visual editor for the Homefront Music Card.
 *
 * Registered by the card's static `getConfigElement()` and rendered by
 * HA's "Edit card" dialog. The editor:
 *
 * - Shows auto-discovered zones (read-only) and lets the user override
 *   with explicit entity pairings.
 * - Exposes the layout / density / accent / debug toggles as form
 *   controls instead of YAML.
 *
 * Uses HA's built-in `<ha-entity-picker>` for entity selection — that
 * element is registered globally in HA's frontend, so we just template
 * it in. If HA's frontend isn't loaded (e.g., dev preview outside HA),
 * the field gracefully falls back to a plain text input.
 */
@customElement('hf-card-editor')
export class CardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config?: HomefrontCardConfig;

  /** Set once we've successfully triggered HA's picker bundle load. */
  private _pickerInitTriggered = false;

  public setConfig(config: HomefrontCardConfig): void {
    this._config = { ...config };
  }

  /**
   * Once both `hass` and `_config` are bound (HA edit-card dialog sets
   * them in either order), kick off the picker-bundle load. We do this
   * in `updated` rather than `firstUpdated` because the first render
   * can fire before `hass` lands.
   */
  override updated(): void {
    if (
      !this._pickerInitTriggered &&
      this.hass &&
      this._config &&
      !customElements.get('ha-entity-picker')
    ) {
      this._pickerInitTriggered = true;
      void this._loadEntityPicker();
    }
  }

  /**
   * Trigger registration of `<ha-entity-picker>`. HA doesn't ship it as
   * part of `loadCardHelpers()`'s core bundle — to force-load it we
   * instantiate a throwaway built-in `entities` card and ask for its
   * config element, which transitively imports the picker module.
   * Standard pattern across community custom-card editors.
   */
  private async _loadEntityPicker(): Promise<void> {
    try {
      const helpers = await window.loadCardHelpers?.();
      if (!helpers?.createCardElement) return;
      const card = await helpers.createCardElement({
        type: 'entities',
        entities: [],
      });
      const ctor = card?.constructor as {
        getConfigElement?: () => Promise<HTMLElement>;
      };
      await ctor?.getConfigElement?.();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[homefront-music-card] failed to load ha-entity-picker:', err);
    } finally {
      // Re-render whether we succeeded or not — successful → picker
      // upgrades; failed → text-input fallback shows.
      this.requestUpdate();
    }
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      color: var(--primary-text-color, #111);
    }
    .section {
      margin-bottom: 18px;
      padding: 14px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      border-radius: 10px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.6));
      margin: 0 0 12px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 10px;
    }
    .field-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    label {
      font-size: 12px;
      font-weight: 600;
    }
    select,
    input[type='text'],
    input[type='color'] {
      padding: 6px 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
      color: inherit;
      font: inherit;
      font-size: 13px;
    }
    input[type='color'] {
      padding: 2px;
      width: 50px;
      height: 32px;
    }
    .zone-card {
      padding: 10px;
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      border-radius: 8px;
      margin-bottom: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
    }
    .zone-card .remove {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: 0;
      cursor: pointer;
      font-size: 18px;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.55));
      padding: 4px 8px;
    }
    .add-zone {
      padding: 8px 14px;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border: 0;
      border-radius: 6px;
      font: inherit;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .checkbox-row input {
      margin: 0;
    }
    .discovery-note {
      font-size: 11.5px;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.55));
      line-height: 1.5;
    }
  `;

  protected render() {
    if (!this._config) return html``;
    return html`
      ${this._renderLayoutSection()}
      ${this._renderZonesSection()}
      ${this._renderDisplaySection()}
    `;
  }

  private _renderLayoutSection() {
    return html`
      <div class="section">
        <div class="section-title">Layout</div>
        <p class="hint">
          Card (default) is a phone-shaped widget. Panel pairs with a
          Lovelace view in <em>Panel (1 card)</em> mode for a full-page
          UI — set the view's type to Panel under Edit view as well.
        </p>
        <div class="field">
          <label>Mode</label>
          <select
            @change=${(e: Event) =>
              this._set('layout', (e.target as HTMLSelectElement).value as
                | 'card'
                | 'panel')}
          >
            <option value="card" ?selected=${this._config!.layout !== 'panel'}>
              Card (default)
            </option>
            <option value="panel" ?selected=${this._config!.layout === 'panel'}>
              Panel (full-page)
            </option>
          </select>
        </div>
      </div>
    `;
  }

  private _renderZonesSection() {
    const zones = this._config?.zones ?? [];
    return html`
      <div class="section">
        <div class="section-title">Zones</div>
        <p class="hint">
          By default the card auto-discovers WiiM/MA entity pairs from
          HA's entity registry. Add a zone here only to override or to
          rename one for display.
        </p>
        ${zones.length === 0
          ? html`
              <div class="discovery-note">
                No manual zones — auto-discovery is in effect.
              </div>
            `
          : ''}
        ${zones.map((zone, i) => this._renderZoneCard(zone, i))}
        <button class="add-zone" @click=${() => this._addZone()}>
          + Add zone
        </button>
      </div>
    `;
  }

  private _renderZoneCard(zone: ZoneConfig, idx: number) {
    return html`
      <div class="zone-card">
        <button
          class="remove"
          @click=${() => this._removeZone(idx)}
          title="Remove zone"
        >
          ×
        </button>
        <div class="field">
          <label>Name</label>
          <input
            type="text"
            .value=${zone.name ?? ''}
            placeholder="Display name (e.g. Pool)"
            @input=${(e: Event) =>
              this._updateZone(
                idx,
                'name',
                (e.target as HTMLInputElement).value,
              )}
          />
        </div>
        <div class="field">
          <label>WiiM entity</label>
          ${this._renderEntityField(zone.wiim, (v) =>
            this._updateZone(idx, 'wiim', v),
          )}
        </div>
        <div class="field">
          <label>Music Assistant entity</label>
          ${this._renderEntityField(zone.ma, (v) =>
            this._updateZone(idx, 'ma', v),
          )}
        </div>
      </div>
    `;
  }

  /**
   * Render HA's `<ha-entity-picker>` when it's registered (we trigger
   * registration in `firstUpdated`); fall back to a plain text input
   * if HA's editor bundle is unavailable (e.g., dev preview outside HA
   * proper, or `loadCardHelpers` is missing).
   */
  private _renderEntityField(value: string, onChange: (v: string) => void) {
    if (customElements.get('ha-entity-picker')) {
      return html`
        <ha-entity-picker
          .hass=${this.hass}
          .value=${value ?? ''}
          .includeDomains=${['media_player']}
          allow-custom-entity
          @value-changed=${(e: CustomEvent<{ value: string }>) =>
            onChange(e.detail.value)}
        ></ha-entity-picker>
      `;
    }
    return html`
      <input
        type="text"
        .value=${value ?? ''}
        placeholder="media_player.…"
        @input=${(e: Event) => onChange((e.target as HTMLInputElement).value)}
      />
    `;
  }

  private _renderDisplaySection() {
    const cfg = this._config!;
    return html`
      <div class="section">
        <div class="section-title">Display</div>
        <div class="field">
          <label>Density</label>
          <select
            @change=${(e: Event) =>
              this._set('density', (e.target as HTMLSelectElement).value as
                | 'compact'
                | 'regular'
                | 'comfy')}
          >
            <option value="compact" ?selected=${cfg.density === 'compact'}>
              Compact
            </option>
            <option
              value="regular"
              ?selected=${!cfg.density || cfg.density === 'regular'}
            >
              Regular
            </option>
            <option value="comfy" ?selected=${cfg.density === 'comfy'}>
              Comfy
            </option>
          </select>
        </div>
        <div class="field">
          <label>Accent color</label>
          <div class="field-row">
            <input
              type="color"
              .value=${cfg.accent_color ?? '#e08a4a'}
              @input=${(e: Event) =>
                this._set('accent_color', (e.target as HTMLInputElement).value)}
            />
            <input
              type="text"
              .value=${cfg.accent_color ?? '#e08a4a'}
              placeholder="#e08a4a"
              style="width: 110px"
              @input=${(e: Event) =>
                this._set('accent_color', (e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
        <div class="field">
          <label>Theme</label>
          <select
            @change=${(e: Event) =>
              this._set('theme', (e.target as HTMLSelectElement).value as
                | 'dark'
                | 'light'
                | 'auto')}
          >
            <option value="dark" ?selected=${!cfg.theme || cfg.theme === 'dark'}>
              Dark
            </option>
            <option value="light" ?selected=${cfg.theme === 'light'}>
              Light
            </option>
            <option value="auto" ?selected=${cfg.theme === 'auto'}>
              Auto (follow OS preference)
            </option>
          </select>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            id="hf-debug-toggle"
            .checked=${!!cfg.debug}
            @change=${(e: Event) =>
              this._set('debug', (e.target as HTMLInputElement).checked)}
          />
          <label for="hf-debug-toggle">Show diagnostic overlay</label>
        </div>
      </div>
    `;
  }

  // ── helpers ─────────────────────────────────────────────────────────────

  private _set<K extends keyof HomefrontCardConfig>(
    key: K,
    value: HomefrontCardConfig[K],
  ): void {
    if (!this._config) return;
    this._config = { ...this._config, [key]: value };
    this._fireChange();
  }

  private _addZone(): void {
    const zones: ZoneConfig[] = [
      ...(this._config?.zones ?? []),
      { name: '', wiim: '', ma: '' },
    ];
    this._set('zones', zones);
  }

  private _updateZone(idx: number, field: keyof ZoneConfig, value: string): void {
    if (!this._config) return;
    const zones = [...(this._config.zones ?? [])];
    const existing = zones[idx];
    if (!existing) return;
    zones[idx] = { ...existing, [field]: value };
    this._set('zones', zones);
  }

  private _removeZone(idx: number): void {
    if (!this._config) return;
    const zones = [...(this._config.zones ?? [])];
    zones.splice(idx, 1);
    this._set('zones', zones);
  }

  private _fireChange(): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hf-card-editor': CardEditor;
  }
}
