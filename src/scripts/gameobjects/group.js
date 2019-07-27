import {
  Container,
  Point,
} from 'pixi.js';

import { Entity } from '../gameobjects/entity.js';

/**
 * The object that holds multiple entities and is able to search them.
 *
 * @param {Game} game - A reference to the current game object
 * 
 * @extends Container
 */
export class Group extends Container {
  constructor(game) {
    super();

    /**
     * @property {Game} game - Reference to the current game object
     */
    this.game = game;

    /**
     * @property {Array} entities - Collection of all the entities in this group
     */
    this.entities = [];
  }

  /**
   * Function to add a new entity to this group.
   *
   * @public
   *
   * @param {Entity} entity - A reference to entity being added.
   */
  add(entity) {
    if (!entity instanceof Entity) {
      return;
    }

    this.addChild(entity.sprite);

    if (entity.hasComponent('position')) {
      const positionComponent = entity.getComponent('position');

      const newPosition = {
        x: positionComponent.position.x * 16,
        y: positionComponent.position.y * 16,
      };

      entity.sprite.position = new Point(newPosition.x, newPosition.y);
    }

    this.entities.push(entity);
  }

  /**
   * Function to remove an entity from this group.
   *
   * @public
   *
   * @param {Entity} entity - A reference to entity being removed.
   */
  remove(entity) {
    const index = this.entities.indexOf(entity);

    if (index === -1) {
      return;
    }

    this.removeChild(entity.sprite);

    this.entities.splice(index, 1);
  }

  /**
   * Function to return all entities with certain components
   * @public
   *
   * @return {Array} The array with all matching entities
   */
  get() {
    const entitiesMatch = [];

    for (let i = 0; i < this.entities.length; i++) {
      const isThere = [];

      for (let a = 0; a < arguments.length; a++) {
        if (this.entities[i].components[arguments[a]]) {
          isThere.push(1);
        }
      }

      if (isThere.length === arguments.length) {
        entitiesMatch.push(this.entities[i]);
      }
    }

    return entitiesMatch;
  }
}
