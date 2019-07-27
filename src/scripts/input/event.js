/**
 * An object that can announce and listen for events.
 * Inspired by the great tutorial at:
 * https://corcoran.io/2013/06/01/building-a-minimal-javascript-event-system/
 */
export class Event {
  constructor() {
    /**
     * @property {Object} events - An associative array with all the current events.
     */
    this.events = {};
  }

  /**
   * Function that handles keydown events.
   *
   * @public
   *
   * @param {String} type - The type of event that can be triggered.
   * @param {Function} callback - The function that has to be performed as a callback.
   * @param {Object} context - The object that should be accessible when the event is called.
   */
  on(type, callback, context) {
    if (!this.events.hasOwnProperty(type)) {
      this.events[type] = [];
    }

    this.events[type].push([callback, context]);
  }

  /**
   * Function that is called when an event is triggered.
   *
   * @public
   *
   * @param {String} type - The type of event that is triggered.
   */
  trigger(type) {
    const tail = Array.prototype.slice.call(arguments, 1);

    const callbacks = this.events[type];

    if (callbacks !== undefined) {
      for (let i = 0; i < callbacks.length; i++) {
        const callback = callbacks[i][0];
        let context;

        if (callbacks[i][1] === undefined) {
          context = this;
        } else {
          context = callbacks[i][1];
        }

        callback.apply(context, tail);
      }
    }
  }
}
