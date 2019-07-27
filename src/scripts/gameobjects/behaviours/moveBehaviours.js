/**
 * An object that holds all move behaviours used in the Movement component.
 */
export class MoveBehaviours {
  /**
   * Function that returns a new walk behaviour.
   *
   * @public
   *
   * @return {Function} A function used in the strategy pattern.
   */
  static walkBehaviour() {
    return function(game, entity) {
      const acceptableTiles = [2];

      game.staticSystems.pathfindingSystem.handleSingleEntity(
        entity,
        acceptableTiles,
      );
    };
  }

  /**
   * Function that returns a new fly behaviour.
   *
   * @public
   *
   * @return {Function} A function used in the strategy pattern.
   */
  static flyBehaviour() {
    return function(game, entity) {
      const acceptableTiles = [2];

      game.staticSystems.pathfindingSystem.handleSingleEntity(
        entity,
        acceptableTiles,
      );
    };
  }
}
