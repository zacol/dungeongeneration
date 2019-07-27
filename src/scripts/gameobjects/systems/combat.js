/**
 * The system that handles combat.
 *
 * @param {Game} game - Reference to the currently running game.
 */
export class Combat {
  constructor(game) {
    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;
  }

  /**
   * Performs the needed operations for this specific system on one entity.
   *
   * @public
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   * @param {Entity} enemyEntity - The entity that is being attacked.
   */
  handleSingleEntity(entity, enemyEntity) {
    const weaponComponent = entity.getComponent('weapon');

    if (enemyEntity.hasComponent('health')) {
      const healthComponent = enemyEntity.getComponent('health');

      healthComponent.takeDamage(weaponComponent.damage);

      const textLogMessage = `${entity.name} hit ${enemyEntity.name} for ${weaponComponent.damage} damage`;

      if (healthComponent.isDead()) {
        this.remove(enemyEntity);

        textLogMessage += ' and killed him with that attack!';
      }

      this.game.UI.textLog.addMessage(textLogMessage);
    }
  }

  /**
   * Remove a dead entity.
   *
   * @private
   *
   * @param {Entity} entity - The entity that is dead.
   */
  remove(entity) {
    if (entity.hasComponent('keyboardControl')) {
      this.game.scheduler.lock();
      this.game.isActive = false;
    }

    this.game.map.entities.remove(entity);

    this.game.scheduler.remove(entity);

    const positionComponent = entity.getComponent('position');

    const currentTile = this.game.map.tiles[positionComponent.position.x][
      positionComponent.position.y
    ];

    currentTile.remove(entity);
  }
}
