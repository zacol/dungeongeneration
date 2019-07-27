/**
 * An Vector2 Object.
 *
 * @param {Number} x - The x coordinate of this vector2 object.
 * @param {Number} y - The y coordinate of this vector2 object.
 */
export class Vector2 {
  constructor(x, y) {
    /**
     * @property {Number} x - The x coordinate of this vector2 object.
     */
    this.x = x;

    /**
     * @property {Number} x - The y coordinate of this vector2 object.
     */
    this.y = y;
  }

  /**
   * Add another Vector2 object to this Vector2 object.
   *
   * @public
   *
   * @param {Vector2} other - The other Vector2 object.
   *
   * @return {Vector2} The combined Vector2 object.
   */
  combine(other) {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  /**
   * Add another Vector2 object.
   *
   * @public
   *
   * @param {Vector2} other - The other Vector2 object.
   *
   * @return {Number} The value of both added Vector2 objects.
   */
  add(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;

    return Math.abs(Math.sqrt(dx * dx + dy * dy));
  }

  /**
   * Distance to another Vector2 object.
   *
   * @public
   *
   * @param {Object} pos - The position of the other Vector2 object.
   *
   * @return {Number} The distance to the other Vector2 object.
   */
  distance(pos) {
    const dx = pos.x - this.x;
    const dy = pos.y - this.y;

    return Math.abs(Math.sqrt(dx * dx + dy * dy));
  }

  /**
   * Manhattan distance to another object.
   *
   * @public
   *
   * @param {Object} pos - The position of the other Vector2 object.
   *
   * @return {Number} The manhattan distance to the other Vector2 object.
   */
  manhattan(pos) {
    return Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y);
  }

  /**
   * Clone the current Vector2 object.
   *
   * @public
   *
   * @return {Vector2} The cloned Vector2 object.
   */
  clone() {
    return new Vector2(this.x, this.y);
  }

  /**
   * Create a string from this Vector2 object.
   *
   * @public
   *
   * @return {String} The Vector2 object as a string.
   */
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
