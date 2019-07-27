import { Tile } from './tile.js';
import { Vector2 } from '../geometry/vector2.js';
import { Utils } from '../core/utils.js';

/**
 * A room object that creates his own layout.
 *
 * @param {Number} x - The x coordinate of the top left corner of this room.
 * @param {Number} y - The y coordinate of the top left corner of this room.
 * @param {Number} w - The width of this room.
 * @param {Number} h - The height of this room.
 */
export class Room {
  constructor(x, y, w, h) {
    /**
     * @property {Number} x1 - The X position of the top left corner of this room.
     */
    this.x1 = x;

    /**
     * @property {Number} x2 - The X position of the top right corner of this room.
     */
    this.x2 = w + x;

    /**
     * @property {Number} y1 - The Y position of top left corner of this room.
     */
    this.y1 = y;

    /**
     * @property {Number} y2 - The Y position of bottom left corner of this room.
     */
    this.y2 = y + h;

    /**
     * @property {Number} w - The width of this room, defined in tiles.
     */
    this.w = w;

    /**
     * @property {Number} h - The height of this room, defined in tiles.
     */
    this.h = h;

    /**
     * @property {Array} layout - The array that contains the layout of this room.
     */
    this.layout = [];

    /**
     * @property {Object} exit - An object that holds the exit coordinates of this room.
     */
    this.exit = null;
  }

  /**
   * Initialize the layout of the room, filling it with default tiles.
   *
   * @public
   */
  initialize() {
    for (let x = 0; x < this.w; x++) {
      this.layout[x] = [];

      for (let y = 0; y < this.h; y++) {
        // Check if the position filled has to be a wall or floor.
        if (y === 0 || y === this.h - 1 || x === 0 || x === this.w - 1) {
          // Create a new wall tile.
          this.layout[x][y] = new Tile(1, true, this, 0, 10);
        } else {
          // Create a new floor tile.
          this.layout[x][y] = new Tile(
            2,
            false,
            this,
            3,
            Utils.randomNumber(2, 5),
          );
        }
      }
    }
  }

  /**
   * Generate an exit on a random side of this room.
   *
   * @public
   */
  generateExit() {
    switch (Utils.randomNumber(1, 4)) {
      case 1: // Top
        this.exit = { x: Utils.randomNumber(1, this.w - 2), y: this.h - 2 };
        break;
      case 2: // Bottom
        this.exit = { x: Utils.randomNumber(1, this.w - 2), y: 1 };
        break;
      case 3: // Left
        this.exit = { x: this.w - 2, y: Utils.randomNumber(1, this.h - 2) };
        break;
      case 4: // Right
        this.exit = { x: 1, y: Utils.randomNumber(1, this.h - 2) };
        break;
    }
  }

  /**
   * Returns a random position that is inside the current room.
   *
   * @public
   *
   * @return {Vector2} Vector2 object of a random position inside the room.
   */
  getRandomPosition() {
    let positionX = Utils.randomNumber(2, this.w - 3);
    let positionY = Utils.randomNumber(2, this.h - 3);

    positionX += this.x1;
    positionY += this.y1;

    return new Vector2(positionX, positionY);
  }
}
