import { Entity } from '../gameobjects/entity.js';
import { MoveBehaviours } from '../gameobjects/behaviours/moveBehaviours.js';
import { Position } from '../gameobjects/components/position.js';
import { Collide } from '../gameobjects/components/collide.js';
import { Health } from '../gameobjects/components/health.js';
import { CanFight } from '../gameobjects/components/canfight.js';
import { Weapon } from '../gameobjects/components/weapon.js';
import { MovementComponent } from '../gameobjects/components/movement.js';
import { Tooltip } from '../gameobjects/components/tooltip.js';

/**
 * A factory that creates enemies' entities.
 * Enemies are the creatues that chase you up and try to hurt you:
 * spiders, skeletons, dwarves and other bad guys.
 */
export class EnemyFactory {
  /**
   * Create an entity that represents spider.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   *
   * @return {Entity} An enemy entity object.
   */
  static newSpider(game, position) {
    const entity = new Entity(
      game,
      'Arachnid',
      'Quick Spider',
      'spider_small_right.png',
      2000,
    );

    entity.addComponent(new Health(20));

    entity.addComponent(new Position(position));

    entity.addComponent(new Collide(true));

    entity.addComponent(
      new MovementComponent(game, entity, MoveBehaviours.walkBehaviour()),
    );

    entity.addComponent(new Weapon(4));

    const canAttackTypes = ['Player'];

    entity.addComponent(new CanFight(game, canAttackTypes));

    entity.addComponent(
      new Tooltip(
        entity.name,
        'Arachnid Enemy',
        "The quick spider is twice as fast as you and will definitely attack you. It's just programmed to do so.",
      ),
    );

    return entity;
  }

  /**
   * Create an entity that represents skeletion.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   *
   * @return {Entity} An enemy entity object.
   */
  static newSkeleton(game, position) {
    const entity = new Entity(
      game,
      'Undead',
      'Skeleton',
      'skeleton_right.png',
      1000,
    );

    entity.addComponent(new Health(50));

    entity.addComponent(new Position(position));

    entity.addComponent(new Collide(true));

    entity.addComponent(
      new MovementComponent(game, entity, MoveBehaviours.walkBehaviour()),
    );

    entity.addComponent(new Weapon(10));

    const canAttackTypes = ['Player'];

    entity.addComponent(new CanFight(game, canAttackTypes));

    entity.addComponent(
      new Tooltip(
        entity.name,
        'Undead Enemy',
        'The skeleton is a very dangerous but unstable enemy. If you stab just right his bones will collapse.',
      ),
    );

    return entity;
  }

  /**
   * Create an entity that represents dwarf.
   *
   * @param {Game} game - Reference to the currently running game.
   * @param {Vector2} position - The position object of this entity.
   *
   * @return {Entity} An enemy entity object.
   */
  static newDwarf(game, position) {
    const entity = new Entity(
      game,
      'Dwarf',
      'Mountain Dwarf',
      'dwarf_right.png',
      1000,
    );

    entity.addComponent(new Health(20));

    entity.addComponent(new Position(position));

    entity.addComponent(new Collide(true));

    entity.addComponent(
      new MovementComponent(game, entity, MoveBehaviours.walkBehaviour()),
    );

    entity.addComponent(new Weapon(4));

    const canAttackTypes = ['Player'];

    entity.addComponent(new CanFight(game, canAttackTypes));

    entity.addComponent(
      new Tooltip(
        entity.name,
        'Dwarf Enemy',
        'Dwarf are stubborn and set in their ways.',
      ),
    );

    return entity;
  }
}
