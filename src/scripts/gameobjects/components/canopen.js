import { Event } from '../../input/event.js';

/**
 * An component that tells the system that this entity can be opened by another entity.
 * 
 * @param {Game} game - Reference to the currently running game.
 * @param {Entity} entity - Reference to the entity that has this component.
 */
export class CanOpen {
  constructor(game, entity) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'canOpen';

    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Entity} entity - Reference to the entity that has this component.
     */
    this.entity = entity;

    /**
     * @property {Event} events - Event holder.
     */
    this.events = new Event();

    /**
     * @property {String} state - The state of this door: closed, opened, etc.
     */
    this.state = 'closed';

    this.initialize();
  }

  /**
   * Adds the bump into function to the event list.
   *
   * @private
   */
  initialize() {
    this.events.on('bumpInto', this.bumpInto, this);
  }

  /**
   * Function to perform when something collides with this entity.
   *
   * @public
   */
  bumpInto() {
    this.game.staticSystems.openSystem.handleSingleEntity(this.entity);
  }
}
