/**
 * The movement system is responsible for handling collision between entities and moving them.
 *
 * @param {Game} game - Reference to the currently running game.
 */
export class Movement {
  constructor(game) {
    /**
     * @property {Game} game - Reference to the current game object
     */
    this.game = game;
  }

  /**
   * Performs the needed operations for this specific system on one entity.
   *
   * @public
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   * @param {Object} newPosition - The new x or y coordinates the entity is trying to move to.
   */
  handleSingleEntity(entity, newPosition) {
    this.changeDirection(entity, newPosition);

    if (this.canMove(entity, newPosition)) {
      const positionComponent = entity.getComponent('position');

      const currentTile = this.game.map.tiles[positionComponent.position.x][
        positionComponent.position.y
      ];
      const nextTile = this.game.map.tiles[newPosition.x][newPosition.y];

      currentTile.remove(entity);

      nextTile.add(entity);

      TweenMax.to(entity.sprite.position, 0.5, {
        x: newPosition.x * this.game.map.settings.tileSize,
        y: newPosition.y * this.game.map.settings.tileSize,
      });

      positionComponent.position = newPosition;
    }
  }

  /**
   * Changes the direction of a sprite based on it's new position.
   * This way a sprite can face left or right based on it's movement.
   *
   * @private
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   * @param {Object} newPosition - The new x or y coordinates the entity is trying to move to.
   */
  changeDirection(entity, newPosition) {
    const positionComponent = entity.getComponent('position');

    if (newPosition.x > positionComponent.position.x) {
      entity.textureName = entity.textureName.replace('left', 'right');
    } else if (newPosition.x < positionComponent.position.x) {
      entity.textureName = entity.textureName.replace('right', 'left');
    }

    entity.sprite.texture = PIXI.Texture.fromFrame(entity.textureName);
  }

  /**
   * Function that gets called when an entity wants to move.
   *
   * @private
   *
   * @param {Entity} entity - The entity that is being checked against the map.
   * @param {Object} newPosition - The new position the entity is trying to move to.
   *
   * @return {Boolean} True when an entity can move to the new position, false when the entity is obstructed.
   */
  canMove(entity, newPosition) {
    const nextTile = this.game.map.getTileAt(newPosition);

    if (nextTile.type !== 2) {
      return false;
    }

    if (nextTile.entities.length !== 0) {
      let canContinue = true;

      for (let i = 0; i < nextTile.entities.length; i++) {
        if (nextTile.entities[i].hasComponent('collide')) {
          const collideComponent = nextTile.entities[i].getComponent('collide');

          if (collideComponent.collide === true) {
            canContinue = false;
          }
        }

        for (let key in nextTile.entities[i].components) {
          if (typeof nextTile.entities[i] === 'undefined') {
            // The entity could have died in a previous bumpInto event.
            // Thus we should abort the loop of the entity no longer exists.
            break;
          }

          // Make sure that obj[key] belongs to the object and was not inherited.
          if (nextTile.entities[i].components.hasOwnProperty(key)) {
            // Check if the component has an events parameter.
            if (
              typeof nextTile.entities[i].components[key].events !== 'undefined'
            ) {
              // Trigger the specified event.
              nextTile.entities[i].components[key].events.trigger(
                'bumpInto',
                entity,
                nextTile.entities[i],
              );
            }
          }
        }
      }

      // If there was even one entity that we couldn't collide with on the next tile this will return false.
      return canContinue;
    }

    // Function made it all the way down here, that means the entity is able to move to the new position.
    return true;
  }
}
