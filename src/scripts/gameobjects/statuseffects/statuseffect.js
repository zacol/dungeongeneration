/**
 * The base class for status effects.
 */
export class StatusEffect {
  constructor() {
    /**
     * @property {String} name - The name of this status effect. This field is always required!
     */
    this.name = 'Base Effect';

    /**
     * @property {Number} turnsLeft - The amount of turns this status effect is going to last.
     */
    this.turnsLeft = 0;

    /**
     * @property {Boolean} stackable - Can this status effect be applied more than once.
     */
    this.stackable = false;

    /**
     * @property {Boolean} addStack - If this effect is stackable, should the turns left be added or reset to it's default value.
     */
    this.addStack = false;
  }

  /**
   * Function that gets called whenever the game updates 1 tick. This function should be overwritten by status effects.
   *
   * @protected
   *
   * @param {Entity} entity - The entity that is currently acting.
   */
  update(entity) {
    this.baseUpdate(entity);
  }

  /**
   * Function that checks if this status effect should be removed already
   *
   * @protected
   *
   * @param {Entity} entity - The entity that is currently acting
   */
  baseUpdate(entity) {
    this.turnsLeft--;

    if (this.turnsLeft <= 0) {
      entity.removeStatusEffect(this);
    }
  }
}
