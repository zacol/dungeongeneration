/**
 * The weapon component holds information about the weapon.
 *
 * @param {Number} damage - The damage that this weapon does.
 */
export class Weapon {
  constructor(damage) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'weapon';

    /**
     * @property {Number} damage - The damage that this weapon does.
     */
    this.damage = damage;
  }

  /**
   * Function that gets called whenever the entity changes weapon.
   *
   * @public
   */
  update(damage) {
    this.damage = damage;
  }
}
