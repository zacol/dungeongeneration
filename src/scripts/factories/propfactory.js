import { Entity } from '../gameobjects/entity.js';
import { Position } from '../gameobjects/components/position.js';
import { CanOpen } from '../gameobjects/components/canopen.js';
import { Collide } from '../gameobjects/components/collide.js';
import { Tooltip } from '../gameobjects/components/tooltip.js';

/**
 * A factory that creates props' entities.
 * Props are things that player sees and interact with:
 * boxes, chests, doors and other interactive items.
 */
export class PropFactory {
  /**
   * Create an entity that represents entrance.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   *
   * @return {Entity} An entrance entity object.
   */
  static newEntrance(game, position) {
    const entity = new Entity(game, 'Prop', 'Entrance', 'stairs_up.png');

    entity.addComponent(new Position(position));

    return entity;
  }

  /**
   * Create an entity that represents exit.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   *
   * @return {Entity} An exit entity object.
   */
  static newExit(game, position) {
    const entity = new Entity(game, 'Prop', 'Exit', 'stairs_down.png');

    entity.addComponent(new Position(position));

    return entity;
  }

  /**
   * Create an entity that represents door.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   *
   * @return {Entity} A door entity object.
   */
  static newDoor(game, position) {
    const entity = new Entity(
      game,
      'Prop',
      'Wooden Door',
      'door_horizontal_closed.png',
    );

    entity.addComponent(new Position(position));

    entity.addComponent(new CanOpen(game, entity));

    entity.addComponent(new Collide(true));

    entity.addComponent(new Tooltip(entity.name, 'Closed', ''));

    return entity;
  }
}
