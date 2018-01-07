import createDebug from 'debug';
import ghostEvents from './ghost-events';
import calculateText from './calculate-text';

const debug = createDebug('cogsistency:content:overlay');

/**
 * Creates overlays for a given element type
 *
 * Example:
 * ```js
 * const overlay = new Overlay({
 *   selector: 'input[type="submit"]',
 *   styles: {
 *     default: `
 *       background-color: #000;
 *       color: #FFF;
 *     `,
 *     active: `
 *       border: 5px solid #00F;
 *     `
 *   }
 * })
 * ```
 */
export default class Overlay {
  /**
   * constructor
   *
   * @param  {Object} config the overlay configuration consisting of:
   * - {String} selector: the selector for the given element type
   * - {Object} styles: object containing "default" and "active" keys (each set to strings of css)
   * - {String} fallbackText: text to be used if the target element has no text
   */
  constructor(config) {
    this.config = config;
    debug('config: ', this.config);
    this.items = [];
    this.toggleFocus = this.toggleFocus.bind(this);

    this.update();
  }

  update() {
    this.clean();
    this.items = Array.from(document.querySelectorAll(this.config.selector)).map(target => ({
      target,
      overlay: this.createOverlay(target)
    }));
    this.attachEvents();

    debug('update: ', this.items);
  }

  clean() {
    this.items.forEach(item => {
      document.body.removeChild(item.overlay);
      item.target.removeEventListener('focus', this.toggleFocus);
      item.target.removeEventListener('blur', this.toggleFocus);
    });
  }

  toggleFocus(e) {
    debug(`${e.type} fired`);
    const item = this.items.find(item => item.target === e.target);

    if (item) {
      item.overlay.shadowRoot.querySelector('div').classList.toggle('target-focused');
    }
  }

  attachEvents() {
    this.items.forEach(item => {
      item.target.addEventListener('focus', this.toggleFocus);
      item.target.addEventListener('blur', this.toggleFocus);

      // pass mouse events through from overlay to target
      ghostEvents(item, [
        'mouseover',
        'mouseout',
        'click'
      ]);
    });
  }

  createOverlay(target) {
    // create host for shadow
    const host = document.createElement('div');
    document.body.appendChild(host);
    // create a shadow to dump the overlay / styles in
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<div>${calculateText(target) || this.config.fallbackText}</div>`;
    shadow.innerHTML += `
      <style>
        div { ${this.config.styles.default} }
        div:hover, div.target-focused { ${this.config.styles.active} }
      </style>
    `;

    // add styles to position the overlay directly on top of target
    const rect = target.getBoundingClientRect();
    const { x, y, width, height } = rect;

    shadow.innerHTML += `
      <style>
        div {
          z-index: 2147483647;
          position: absolute;
          top: ${y}px;
          left: ${x}px;
          width: ${width}px;
          height: ${height}px;
        }
      </style>
    `;

    return host;
  }
}
