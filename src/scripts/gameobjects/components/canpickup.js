import { Event } from '../../input/event.js';

/**
 * An component that tells the system that this entity can be picked up.
 *
 * @param {Game} game - Reference to the currently running game.
 * @param {Array} canPickUpTypes - Array of entity types that can pick up this item.
 */
export class CanPickUp {
  constructor(game, canPickUpTypes) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'canPickUp';

    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Array} canPickUpTypes - Array of entity types that can pick up this item.
     */
    this.canPickUpTypes = canPickUpTypes;

    /**
     * @property {Event} events - Event holder.
     */
    this.events = new Event();

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
   *
   * @param {Entity} entity - The entity being checked.
   * @param {Entity} collisionEntity - The entity being checked that is bumping into this entity.
   */
  bumpInto(entity, collisionEntity) {
    if (
      this.canEntityPickUp(entity) &&
      entity.hasComponent('inventory') &&
      !entity.hasComponent('keyboardControl')
    ) {
      // TODO: Implement behaviour for entities ( not the player ) that pick up items they found
      // Players pick up items by standing on the tile and pressing their 'pick up' key
      // Enemies should be able to grab a weapon or item and equip/use it!
    }
  }

  /**
   * Function to determine if an entity can be attacked by this entity.
   *
   * @private
   *
   * @param {Entity} entity - The entity being checked.
   */
  canEntityPickUp(entity) {
    if (this.canPickUpTypes.length === 0) {
      return true;
    }

    if (this.canPickUpTypes.indexOf(entity.type) >= 0) {
      return true;
    }

    return false;
  }
}
