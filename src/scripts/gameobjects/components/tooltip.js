/**
 * A tooltip that will show up when the player hovers his mouse over the entity.
 * 
 * @param {String} title - The title of the tooltip
 * @param {String} type - The type of entity
 * @param {String} description - The description of this entity
 */
export class Tooltip {
  constructor(title, type, description) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'tooltip';

    /**
     * @property {Array} title - The title of the tooltip.
     */
    this.title = title;

    /**
     * @property {Array} type - The type of entity.
     */
    this.type = type;

    /**
     * @property {Array} description - The description of this entity.
     */
    this.description = description;
  }
}
