/**
 * A component that tells if the entity is passable or not.
 * 
 * @param {Boolean} collide - True or false depending on if it should collide with other entities.
 */
export class Collide {
  constructor(collide) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'collide';

    /**
     * @property {Boolean} collide - True or false depending on if it should collide with other entities.
     */
    this.collide = collide;
  }
}
