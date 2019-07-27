/**
 * The health component is responsible for managing the health.
 * 
 * @param {Number} maxHealth - The new and maximum health of the entity.
 */
export class Health {
  constructor(maxHealth) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'health';

    /**
     * @property {Number} minHealth - The minimum health of the entity.
     */
    this.minHealth = 0;

    /**
     * @property {Number} health - The starting, and maximum health of the entity.
     */
    this.health = this.maxHealth = maxHealth;
  }

  /**
   * Returns the percentage of health that is left.
   *
   * @public
   *
   * @return {Number} Percentage rounded to 2 decimals.
   */
  percentage() {
    return this.health / this.maxHealth;
  }

  /**
   * Check if the entity has full health.
   *
   * @public
   *
   * @return {Boolean} True when full health, false when damaged.
   */
  isDamaged() {
    return this.health < this.maxHealth;
  }

  /**
   * Check whether the entity is dead.
   *
   * @public
   *
   * @return {Boolean} True when dead, false when alive.
   */
  isDead() {
    return this.health <= this.minHealth;
  }

  /**
   * Function to take damage.
   *
   * @public
   *
   * @param {Number} damage - The amount of health that must be subtracted from the entity.
   */
  takeDamage(damage) {
    this.health -= damage;

    if (this.health < this.minHealth) {
      this.health = this.minHealth;
    }
  }
}
