import { Queue } from './queue.js';

/**
 * Is able to keep track of time and manages scheduling events in a queue.
 */
export class Scheduler {
  constructor() {
    /**
     * @property {Number} time - Every queue starts at time zero
     */
    this.queue = null;

    /**
     * @property {Array} events - The array with all the repeated events
     */
    this.repeat = [];

    /**
     * @property {Object} current - The current event
     */
    this.current = null;

    /**
     * @property {int} lockCount - Recursive lock variable
     */
    this.lockCount = 0;

    //Initialize itself
    this.initialize();
  }

  /**
   * Initialize the game, create new Queue object.
   *
   * @private
   */
  initialize() {
    this.queue = new Queue();
  }

  /**
   * Returns the elapsed time since the beginning of the queue.
   *
   * @public
   *
   * @return {Number} The elapsed time.
   */
  getTime() {
    return this.queue.getTime();
  }

  /**
   * Schedule a new item.
   *
   * @public
   *
   * @param {Entity} entity - The entity being added.
   * @param {Boolean} repeat - Is this a recurring thing.
   *
   * @return {Scheduler} The current Scheduler object.
   */
  add(entity, repeat) {
    this.queue.add(entity, 1 / entity.getSpeed());

    if (repeat) {
      this.repeat.push(entity);
    }

    return this;
  }

  /**
   * Remove an item from the scheduler.
   *
   * @public
   *
   * @param {Entity} entity - The entity being removed.
   *
   * @return {Boolean} True if successfully removed, false if failed to remove.
   */
  remove(entity) {
    const result = this.queue.remove(entity);
    const index = this.repeat.indexOf(entity);

    if (index !== -1) {
      this.repeat.splice(index, 1);
    }

    if (this.current === entity) {
      this.current = null;
    }

    return result;
  }

  /**
   * Clear the scheduler.
   *
   * @public
   *
   * @return {Scheduler} The cleared Scheduler object.
   */
  clear() {
    this.queue.clear();
    this.repeat = [];
    this.current = null;

    return this;
  }

  /**
   * Get the next entity from the queue.
   *
   * @public
   *
   * @return {Entity} The next Entity from the queue.
   */
  next() {
    if (this.current && this.repeat.indexOf(this.current) !== -1) {
      this.queue.add(this.current, 1 / this.current.getSpeed());
    }

    this.current = this.queue.get();

    return this.current;
  }

  /**
   * Function that is called when the game continues one tick.
   *
   * @public
   *
   * @return {Boolean} True if the entity could act, false if it stopped before that.
   */
  tick() {
    if (this.lockCount > 0) {
      return false;
    }

    const entity = this.next();

    if (entity === null) {
      return false;
    }

    entity.act();

    return true;
  }

  /**
   * Lock the scheduler so it won't continue until it's unlocked.
   *
   * The lock is recursive, that means it needs to be unlocked as many
   * times as it has been locked.
   *
   * @public
   */
  lock() {
    this.lockCount++;
  }

  /**
   * Unlock the scheduler, but only if it is locked.
   *
   * @public
   */
  unlock() {
    if (this.lockCount === 0) {
      return;
    }

    this.lockCount--;
  }
}
