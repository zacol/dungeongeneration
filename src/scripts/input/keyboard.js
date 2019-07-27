import { Key } from './key.js';

/**
 * An object that handles all keys used by entity.
 */
export class Keyboard {
  constructor() {
    /**
     * @property {Object} keys - Object that holds all keys.
     */
    this.keys = {};

    this.initialize();
  }

  /**
   * Function to initialize the keyboard and therefore user input.
   *
   * @private
   */
  initialize() {
    this._onKeyDown = event => {
      return this.processKeyDown(event);
    };

    this._onKeyUp = event => {
      return this.processKeyUp(event);
    };

    window.addEventListener('keydown', this._onKeyDown, false);
    window.addEventListener('keyup', this._onKeyUp, false);
  }

  /**
   * Function to get a specific key from the keyboard and add it if it does't exist yet.
   *
   * @public
   *
   * @param {Number} keycode - The keycode of the key being added.
   *
   * @return {Key} The Key object.
   */
  getKey(keycode) {
    if (this.keys[keycode] === undefined) {
      this.keys[keycode] = new Key(keycode);
    }

    return this.keys[keycode];
  }

  /**
   * Function that handles keydown events.
   *
   * @private
   *
   * @param {Object} event - The event object.
   */
  processKeyDown(event) {
    if (this.keys[event.keyCode] !== undefined) {
      event.preventDefault();

      this.keys[event.keyCode].processKeyDown(event);
    }
  }

  /**
   * Function that handles keydown events.
   *
   * @private
   *
   * @param {Object} event - The event object.
   */
  processKeyUp(event) {
    if (this.keys[event.keyCode] !== undefined) {
      event.preventDefault();

      this.keys[event.keyCode].processKeyUp(event);
    }
  }
}
