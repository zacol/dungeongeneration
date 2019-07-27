/**
 * The position component holds x and y position of the entity.
 *
 * @param {Vector2} position - The position object of this entity.
 */
export class Position {
  constructor(position) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'position';

    /**
     * @property {Vector2} position - The position object of this entity.
     */
    this.position = position;
  }
}
