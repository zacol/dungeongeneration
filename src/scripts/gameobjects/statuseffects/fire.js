import { StatusEffect } from './statuseffect.js';

/**
 * Whenever an entity is on fire this status effect is applied to the entity.
 */
export class StatusFire extends StatusEffect {
  constructor() {
    super();

    /**
     * @property {String} name - The name of this status effect. This field is always required!
     */
    this.name = 'fire';

    /**
     * @property {Number} turnsLeft - The amount of turns this status effect is going to last
     */
    this.turnsLeft = 5;

    /**
     * @property {Boolean} stackable - Can this status effect be applied more than once
     */
    this.stackable = false;

    /**
     * @property {Boolean} addStack - If this effect is stackable, should the turns left be added or reset to it's default value
     */
    this.addStack = false;
  }

  /**
   * Function that gets called whenever the game updates 1 tick.
   *
   * @public
   *
   * @param {Entity} entity - The entity that is currently acting.
   */
  update(entity) {
    // TODO: Make this the stats component, we don't want individual components for everything.
    const healthComponent = entity.getComponent('health');

    healthComponent.takeDamage(5);

    this.baseUpdate(entity);
  }
}
