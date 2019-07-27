/**
 * The Open system handles opening entities and making sure the collision is turned of after they are opened.
 *
 * @param {Game} game - Reference to the currently running game
 */
export class Open {
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
   */
  handleSingleEntity(entity) {
    const canOpenComponent = entity.getComponent('canOpen');
    const positionComponent = entity.getComponent('position');
    const collideComponent = entity.getComponent('collide');
    const tooltipComponent = entity.getComponent('tooltip').Tooltip;

    if (canOpenComponent.state !== 'open') {
      canOpenComponent.state = 'open';

      entity.textureName = entity.textureName.replace('closed', 'open');

      entity.sprite.texture = PIXI.Texture.fromFrame(entity.textureName);

      collideComponent.collide = false;

      tooltipComponent.type = 'Open';

      this.game.map.tiles[positionComponent.position.x][
        positionComponent.position.y
      ].blockLight = false;
    }
  }
}
