import { Entity } from '../gameobjects/entity.js';
import { Position } from '../gameobjects/components/position.js';
import { Utils } from '../core/utils.js';

/**
 * A factory that returns decorations' entities.
 * Decorations are things that player sees but doesn't interact with:
 * grass, bushes, debris and other visual details.
 */
export class DecorationFactory {
  /**
   * Create an entity that represents grass.
   *
   * @return {Entity} A decoration entity object.
   */
  static newGrass(game, position) {
    const entity = new Entity(
      game,
      'Decoration',
      'Grass',
      `grass_${Utils.randomNumber(1, 4)}.png`,
    );

    entity.addComponent(new Position(position));

    return entity;
  }
}
