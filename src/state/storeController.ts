import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { Store } from './store.js';

/**
 * Bridges a Lit component to the Store. Subscribes on connect, unsubscribes
 * on disconnect, and triggers `requestUpdate()` on every store change.
 *
 * Construct in `willUpdate` once the `store` property has been bound:
 *
 * ```ts
 * @property({ attribute: false }) store!: Store;
 * private _ctrl?: StoreController;
 *
 * protected willUpdate(changed: PropertyValues) {
 *   if (changed.has('store') && this.store && !this._ctrl) {
 *     this._ctrl = new StoreController(this, this.store);
 *   }
 * }
 * ```
 */
export class StoreController implements ReactiveController {
  private _onChange = (): void => {
    this.host.requestUpdate();
  };

  constructor(
    private host: ReactiveControllerHost,
    private store: Store,
  ) {
    host.addController(this);
  }

  hostConnected(): void {
    this.store.addEventListener('change', this._onChange);
  }

  hostDisconnected(): void {
    this.store.removeEventListener('change', this._onChange);
  }
}
