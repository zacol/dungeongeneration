import { Vector2 } from '../../geometry/vector2.js';
import * as EasyStar from '../../libraries/easystar.js';

/**
 * The system that handles pathfinding calculates new routes for entities with a certain behaviour.
 *
 * @param {Game} game - Reference to the currently running game
 */
export class PathFinding {
  constructor(game) {
    /**
     * @property {Game} game - Reference to the current game object
     */
    this.game = game;

    /**
     * @property {EasyStar} easyStar - Reference to the EasyStar library
     */
    this.easystar = null;

    this.initialize();
  }
  
  /**
   * Initialize the game, create all objects.
   * 
   * @private
   */
  initialize() {
    this.easystar = new EasyStar.js();

    this.easystar.setGrid(this.game.map.typeList());

    this.easystar.disableDiagonals();
  }

  /**
   * Performs the needed operations for this specific system on one entity.
   * 
   * @public
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   * @param {Array} acceptableTiles - The entity is able to walk on the tiles in this array.
   */
  handleSingleEntity(entity, acceptableTiles) {
    this.easystar.setAcceptableTiles(acceptableTiles);

    const positionComponent = entity.getComponent('position');

    // TODO: Make this dynamic, not every enemy should chase the player
    const behaviour = 'attack';

    switch (behaviour) {
      case 'attack':
        const player = this.game.player;
        const playerPositionComponent = player.getComponent('position');

        const tileAtPos = this.game.map.getTileAt(positionComponent.position);

        // If the entity is in the visible area of the player, it should act.
        if (tileAtPos.lightLevel > 0.7) {
          this.easystar.findPath(
            // Find a path from.
            positionComponent.position.x,
            positionComponent.position.y,

            // Find a path to.
            playerPositionComponent.position.x,
            playerPositionComponent.position.y,

            // Callback function.
            this.findPathHandler.bind(this, entity),
          );

          // Calculate the path.
          this.easystar.calculate();
        }

        break;
    }
  }

  /**
   * Function that handles the result of the EasyStar findPath function.
   * 
   * @private
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   * @param {Array} path - An array with in each position an object with the next position of the path.
   */
  findPathHandler(entity, path) {
    // TODO: Make sure enemies don't kill eachother, they have to find another route or collaborate.
    if (path === null || path.length === 0) {
      console.log('no path found');
    } else {
      const newPosition = new Vector2(path[1].x, path[1].y);

      this.game.staticSystems.movementSystem.handleSingleEntity(
        entity,
        newPosition,
      );
    }
  }
};