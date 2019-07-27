import { Event } from './event.js';

/**
 * An object that handles a single key on a keyboard.
 * 
 * @param {Number} keycode - The keycode of this specific key.
 */
export class Key {
  constructor(keycode) {
    /**
     * @property {Number} keyCode - The keycode of this specific key.
     */
    this.keyCode = keycode;

    /**
     * @property {Boolean} isDown - Boolean to see if the key is down.
     */
    this.isDown = false;

    /**
     * @property {Boolean} isUp - Boolean to see if the key is up.
     */
    this.isUp = false;

    /**
     * @property {Number} lastDown - Timestamp of the last key press.
     */
    this.lastDown = 0;

    /**
     * @property {Number} lastUp - Timestamp of the last key release.
     */
    this.lastUp = 0;

    /**
     * @property {Number} delay - Delay between two events on keydown.
     */
    this.delay = 50;

    /**
     * @property {Event} onDown - Event that handles onDown event.
     */
    this.onDown = new Event();

    /**
     * @property {Event} onUp - Event that handles onUp event.
     */
    this.onUp = new Event();
  }

  /**
   * Function that handles keydown events.
   *
   * @public
   *
   * @param {Object} event - The event object.
   */
  processKeyDown(event) {
    if (this.isDown) {
      if (event.timeStamp > this.lastDown + this.delay) {
        this.onDown.trigger(this.keyCode);
        this.lastDown = event.timeStamp;
      }
    } else {
      this.isDown = true;
      this.isUp = false;
      this.lastDown = event.timeStamp;

      this.onDown.trigger(this.keyCode);
    }
  }

  /**
   * Function that handles keyup events.
   *
   * @public
   *
   * @param {Object} event - The event object.
   */
  processKeyUp(event) {
    this.isDown = false;
    this.isUp = true;
    this.lastUp = event.timeStamp;

    this.onUp.trigger(this.keyCode);
  }
}
