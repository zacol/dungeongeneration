/**
 * The size manager handles the scale and resizing of the canvas object.
 * 
 * @param {Game} game - Reference to the current game object.
 */
export class SizeManager {
  constructor(game) {
    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Number} width - The width of the canvas.
     */
    this.width = 0;

    /**
     * @property {Number} height - The height of the canvas.
     */
    this.height = 0;

    /**
     * @property {Null|Number} minWidth - The minimum width of the canvas.
     */
    this.minWidth = null;

    /**
     * @property {Null|Number} maxWidth - The maximum width of the canvas.
     */
    this.maxWidth = null;

    /**
     * @property {Null|Number} minHeight - The minimum height of the canvas.
     */
    this.minHeight = null;

    /**
     * @property {Null|Number} maxHeight - The maximum height of the canvas.
     */
    this.maxHeight = null;

    this.initialize();
  }

  /**
   * Setup width and height, and bind event listener.
   *
   * @private
   */
  initialize() {
    this.setSize();

    window.addEventListener('resize', this.windowResize.bind(this), false);
  }

  /**
   * Function to set the width and height of the game based on set parameters.
   *
   * @private
   */
  setSize() {
    let width = 0;
    let height = 0;
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    if (this.minWidth !== null && this.minWidth >= innerWidth) {
      width = this.minWidth;
    } else if (this.maxWidth !== null && this.maxWidth <= innerWidth) {
      width = this.maxWidth;
    } else {
      width = innerWidth;
    }

    if (this.minHeight !== null && this.minHeight >= innerHeight) {
      height = this.minHeight;
    } else if (this.maxHeight !== null && this.maxHeight <= innerHeight) {
      height = this.maxHeight;
    } else {
      height = innerHeight;
    }

    this.width = width;
    this.height = height;
  }

  /**
   * Callback that is executed whenever the window resizes.
   *
   * @private
   */
  windowResize() {
    this.setSize();

    this.game.renderer.resize(this.width, this.height);
  }
}
