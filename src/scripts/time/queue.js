/**
 * Stores events and is able to retrieve them based on their time.
 */
export class Queue {
  constructor() {
    /**
     * @property {Number} time - Every queue starts at time zero.
     */
    this.time = 0;

    /**
     * @property {Array} events - The array with all the events.
     */
    this.events = [];

    /**
     * @property {Array} eventTimes - The array with all the times of the events.
     */
    this.eventTimes = [];
  }

  /**
   * Returns the elapsed time since the beginning of this queue.
   *
   * @public
   *
   * @return {Number} The elapsed time.
   */
  getTime() {
    return this.time;
  }

  /**
   * Clear all events that are queued.
   *
   * @public
   */
  clear() {
    this.events = [];
    this.eventTimes = [];
  }

  /**
   * Function to call when you want to follow a specific entity.
   *
   * @public
   *
   * @param {Entity} event - The event that is being added to the queue.
   * @param {Number} time - The time on which this event should be executed.
   */
  add(event, time) {
    const index = this.events.length;

    for (let i = 0; i < this.eventTimes.length; i++) {
      // If the current events time is bigger than the supplied time we have to insert the new event here
      if (this.eventTimes[i] > time) {
        index = i;

        break;
      }
    }

    this.events.splice(index, 0, event);

    this.eventTimes.splice(index, 0, time);
  }

  /**
   * Returns the next entity after removing it from the queue.
   *
   * @public
   *
   * @return {Entity} The next entity from the queue.
   */
  get() {
    if (this.events.length === 0) {
      return null;
    }

    const time = this.eventTimes.splice(0, 1)[0];

    if (time > 0) {
      this.time += time;

      for (let i = 0; i < this.eventTimes.length; i++) {
        this.eventTimes[i] -= time;
      }
    }

    return this.events.splice(0, 1)[0];
  }

  /**
   * Remove a specific event from the queue.
   *
   * @public
   *
   * @param {Entity} event - The event that is being added to the queue.
   *
   * @return {Boolean} True if successfully removed, false if failed.
   */
  remove(event) {
    const index = this.events.indexOf(event);

    if (index === -1) {
      return false;
    }

    this.events.splice(index, 1);
    this.eventTimes.splice(index, 1);

    return true;
  }
}
