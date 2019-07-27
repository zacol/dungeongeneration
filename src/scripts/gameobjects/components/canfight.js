import { Event } from '../../input/event.js';

/**
 * An component that tells the system that this entity can fight.
 * 
 * @param {Game} game - Reference to the currently running game.
 * @param {Array} canAttackTypes - Array of entity types that can be attacked.
 */
export class CanFight {
  constructor(game, canAttackTypes) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'canFight';

    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Array} canAttackTypes - Array of entity types that can be attacked.
     */
    this.canAttackTypes = canAttackTypes;

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
    if (this.canAttackEntity(entity)) {
      this.game.staticSystems.combatSystem.handleSingleEntity(
        entity,
        collisionEntity,
      );
    }
  }

  /**
   * Function to determine if an entity can be attacked by this entity.
   *
   * @private
   *
   * @param {Entity} entity - The entity being checked.
   */
  canAttackEntity(entity) {
    if (this.canAttackTypes.length === 0) {
      return true;
    }

    if (this.canAttackTypes.indexOf(entity.type) !== -1) {
      return true;
    }

    return false;
  }
}
