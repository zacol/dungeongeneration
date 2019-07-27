import { Boundary } from '../geometry/boundary.js';

/**
 * A camera that follows an object in the viewport on the canvas.
 *
 * @param {Game} game - Reference to the currently running game.
 * @param {Vector2} position - The position object of this entity.
 */
export class Camera {
  constructor(game, position) {
    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Vector2} position - The x and y top left coordinates of this camera, in pixels.
     */
    this.position = position;

    /**
     * @property {Number} viewportWidth - The width of the game's canvas, in pixels.
     */
    this.viewportWidth = game.sizeManager.width;

    /**
     * @property {Number} viewportHeight - The height of the game's canvas, in pixels.
     */
    this.viewportHeight = game.sizeManager.height;

    /**
     * @property {Number} minimumDistanceX - The minimal distance from horizontal borders before the camera starts to move, in pixels.
     */
    this.minimumDistanceX = 0;

    /**
     * @property {Number} minimumDistanceY - The minimal distance from vertical borders before the camera starts to move, in pixels.
     */
    this.minimumDistanceY = 0;

    /**
     * @property {Object} followObject - The object that should be followed by the camera.
     */
    this.followObject = null;

    /**
     * @property {Boundary} viewportBoundary - The boundary that represents the viewport.
     */
    this.viewportBoundary = new Boundary(
      this.position.x * (game.settings.tileSize * this.game.settings.zoom),
      this.position.y * (game.settings.tileSize * this.game.settings.zoom),
      this.viewportWidth,
      this.viewportHeight,
    );

    /**
     * @property {Boundary} mapBoundary - The boundary that represents the viewport.
     */
    this.mapBoundary = new Boundary(
      0,
      0,
      game.settings.tilesX * (game.settings.tileSize * this.game.settings.zoom),
      game.settings.tilesY * (game.settings.tileSize * this.game.settings.zoom),
    );
  }

  /**
   * Function to call when you want to follow a specific entity.
   *
   * @private
   *
   * @param {Entity} followEntity - The entity that should be followed by the camera, this entity is required to have the position component.
   * @param {Number} minimumDistanceX - The minimal distance from horizontal borders before the camera starts to move.
   * @param {Number} minimumDistanceY - The minimal distance from vertical borders before the camera starts to move.
   */
  follow(followEntity, minimumDistanceX, minimumDistanceY) {
    this.followObject = followEntity.components.position;

    this.minimumDistanceX = minimumDistanceX;
    this.minimumDistanceY = minimumDistanceY;
  }

  /**
   * Function to update the camera to a new position, for example following an object.
   *
   * @private
   */
  update() {
    const newPosition = {
      x: this.position.x,
      y: this.position.y,
    };

    if (this.followObject !== null) {
      const tileSize =
        this.game.map.settings.tileSize * this.game.settings.zoom;

      const followCenterX =
        this.followObject.position.x * tileSize + tileSize / 2;
      const followCenterY =
        this.followObject.position.y * tileSize + tileSize / 2;

      if (
        followCenterX - this.position.x + this.minimumDistanceX >
        this.viewportWidth
      ) {
        newPosition.x = Math.floor(
          followCenterX - (this.viewportWidth - this.minimumDistanceX),
        );
      } else if (followCenterX - this.minimumDistanceX < this.position.x) {
        newPosition.x = Math.floor(followCenterX - this.minimumDistanceX);
      }

      if (
        followCenterY - this.position.y + this.minimumDistanceY >
        this.viewportHeight
      ) {
        newPosition.y = Math.floor(
          followCenterY - (this.viewportHeight - this.minimumDistanceY),
        );
      } else if (followCenterY - this.minimumDistanceY < this.position.y) {
        newPosition.y = Math.floor(followCenterY - this.minimumDistanceY);
      }
    }

    this.viewportBoundary.set(newPosition.x, newPosition.y);

    if (
      this.game.settings.cameraBounds &&
      !this.viewportBoundary.isWithin(this.mapBoundary)
    ) {
      if (this.viewportBoundary.left < this.mapBoundary.left) {
        newPosition.x = this.mapBoundary.left;
      }

      if (this.viewportBoundary.top < this.mapBoundary.top) {
        newPosition.y = this.mapBoundary.top;
      }

      if (this.viewportBoundary.right > this.mapBoundary.right) {
        newPosition.x = this.mapBoundary.right - this.viewportWidth;
      }

      if (this.viewportBoundary.bottom > this.mapBoundary.bottom) {
        newPosition.y = this.mapBoundary.bottom - this.viewportHeight;
      }
    }

    const oldPosition = {
      x: this.position.x,
      y: this.position.y,
    };

    TweenMax.to(oldPosition, 0.5, {
      x: newPosition.x,
      y: newPosition.y,
      onUpdate: function() {
        this.position.x = Math.ceil(oldPosition.x);
        this.position.y = Math.ceil(oldPosition.y);
      },
      onUpdateScope: this,
    });
  }
}
