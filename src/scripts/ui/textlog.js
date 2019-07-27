/**
 * The TextLog holds and stores all messages that entities send to it.
 *
 * @extends PIXI.Container
 */
export class TextLog extends PIXI.Container {
  constructor() {
    super();

    /**
     * @property {Number} fontSize - The size of the text.
     */
    this.color = 'rgba(255, 255, 255, 1)';

    /**
     * @property {Number} fontSize - The size of the text.
     */
    this.fontSize = 12;

    /**
     * @property {Number} margin - The margin between the lines of the text log.
     */
    this.margin = 5;

    /**
     * @property {String} font - The font that the text is being rendered in.
     */
    this.font = 'Courier New';

    /**
     * @property {Number} maxMessages - The max amount of messages displayed in the text log.
     */
    this.maxMessages = 5;

    /**
     * @property {Array} messages - An array filled with all text log messages.
     */
    this.messages = [];
  }

  /**
   * Initialize the textlog and create the PIXI.Text objects for later use.
   *
   * @public
   */
  initialize() {
    for (let i = 0; i < this.maxMessages; i++) {
      const textObject = new PIXI.Text('', {
        font: this.fontSize + 'px ' + this.font,
        fill: this.color,
        align: 'left',
      });

      textObject.position.x = 15;
      textObject.position.y = 15 + (textObject.height + this.margin) * i;

      this.addChild(textObject);
    }
  }

  /**
   * Calls the render function of each of the containers children.
   *
   * @public
   */
  updateText() {
    const messages = this.getMessages();

    for (let i = 0; i < this.maxMessages; i++) {
      if (!messages[messages.length - 1 - i]) {
        break;
      }

      this.getChildAt(i).text = messages[messages.length - 1 - i];
    }
  }

  /**
   * Function to add a new message to the text log.
   *
   * @public
   *
   * @param {String} message - The message that has to be stored.
   */
  addMessage(message) {
    this.messages.push(message);

    this.updateText();
  }

  /**
   * Function that returns all messages.
   *
   * @public
   *
   * @return {Array} The array with all messages.
   */
  getMessages() {
    return this.messages;
  }

  /**
   * Clear all messages stored in the textlog.
   *
   * @public
   */
  clear() {
    this.messages = [];

    for (let i = 0; i < this.maxMessages; i++) {
      this.getChildAt(i).text = '';
    }
  }
}
