import {
  Container,
  Point,
} from 'pixi.js';

import { Camera } from './camera.js';
import { Vector2 } from '../geometry/vector2.js';

/**
 * The World object holds all objects that are in the game world, entities, the map etc. They all move according to the camera.
 *
 * @param {Game} game - Reference to the currently running game.
 *
 * @extends Container
 */
export class World extends Container {
  constructor(game) {
    super();

    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Camera} camera - Reference to the camera
     */
    this.camera = null;

    this.initialize();
  }

  /**
   * Initialize the UI elements and add them to this container.
   *
   * @private
   */
  initialize() {
    this.camera = new Camera(this.game, new Vector2(0, 0));

    //Scale the entire world
    this.scale = new Point(
      this.game.settings.zoom,
      this.game.settings.zoom,
    );

    //Add the container object to the stage
    this.game.stage.addChild(this);
  }

  /**
   * Update the game world by updating the camera's position and changing the world's position according to the cameras new position.
   *
   * @public
   */
  update() {
    this.camera.update();

    this.position = new Point(
      -this.camera.position.x,
      -this.camera.position.y,
    );
  }
}
