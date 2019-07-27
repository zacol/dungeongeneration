import { Entity } from '../gameobjects/entity.js';
import { Weapon } from '../gameobjects/components/weapon.js';
import { CanPickUp } from '../gameobjects/components/canpickup.js';
import { Tooltip } from '../gameobjects/components/tooltip.js';
import { Position } from '../gameobjects/components/position.js';

/**
 * A factory that creates items' entities.
 * Items are things that player can pick up and use:
 * weapons, armors, talismans and other usable items.
 */
export class ItemFactory {
  /**
   * Create an entity that represents knife.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   *
   * @return {Entity} An item entity object.
   */
  static newKnife(game, position) {
    const entity = new Entity(game, 'Item', 'Knife', 'knife.png');

    entity.addComponent(new Position(position));

    entity.addComponent(new Weapon(5));

    const canPickedUpBy = ['Player'];

    entity.addComponent(new CanPickUp(game, canPickedUpBy));

    entity.addComponent(new Tooltip('Short Sword', 'Item', 'Weapon'));

    return entity;
  }

  /**
   * Create an entity that represents short sword.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   *
   * @return {Entity} An item entity object.
   */
  static newShortSword(game, position) {
    const entity = new Entity(game, 'Item', 'Short Sword', 'short_sword.png');

    entity.addComponent(new Position(position));

    entity.addComponent(new Weapon(10));

    const canPickedUpBy = ['Player'];

    entity.addComponent(new CanPickUp(game, canPickedUpBy));

    entity.addComponent(new Tooltip('Knife', 'Item', 'Weapon'));

    return entity;
  }
}
