import { Entity } from '../gameobjects/entity.js';
import { Health } from '../gameobjects/components/health.js';
import { LightSource } from '../gameobjects/components/lightsource.js';
import { Collide } from '../gameobjects/components/collide.js';
import { Weapon } from '../gameobjects/components/weapon.js';
import { KeyboardControl } from '../gameobjects/components/keyboardcontrol.js';
import { CanFight } from '../gameobjects/components/canfight.js';
import { StatusEffectComponent } from '../gameobjects/components/statuseffect.js';
import { Tooltip } from '../gameobjects/components/tooltip.js';
import { Inventory } from '../gameobjects/components/inventory.js';
import { Position } from '../gameobjects/components/position.js';

/**
 * A factory that creates player entity.
 * The player is you! It is fairly self-explanatory, right?
 */
export class PlayerFactory {
  /**
   * Create an entity that represents player.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   * @param {Object} controls - Associative array with every control this entity uses.
   *
   * @return {Entity} A player entity object.
   */
  static newPlayerWarrior(game, position, controls) {
    const entity = new Entity(game, 'Player', 'You', 'warrior_right.png', 1000);

    entity.addComponent(new Health(100));

    entity.addComponent(new Position(position));

    entity.addComponent(new KeyboardControl(game, entity, controls));

    entity.addComponent(new LightSource(true, 6));

    entity.addComponent(new Collide(true));

    entity.addComponent(new Inventory());

    entity.addComponent(new StatusEffectComponent());

    entity.addComponent(new Weapon(1));

    const canAttackTypes = [];

    entity.addComponent(new CanFight(game, canAttackTypes));

    entity.addComponent(new Tooltip('Player', '', ''));

    return entity;
  }
}
