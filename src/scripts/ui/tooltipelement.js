/**
 * The TooltipElement displays information when user hovers the pointer over entity.
 *
 * @extends PIXI.Container
 */
export class TooltipElement extends PIXI.Container {
  constructor() {
    super();

    /**
     * @property {PIXI.Graphics} background - The background of the tooltip.
     */
    this.background = null;

    /**
     * @property {PIXI.Text} title - The title of the tooltip.
     */
    this.title = null;

    /**
     * @property {PIXI.Text} type - The type of entity.
     */
    this.type = null;

    /**
     * @property {PIXI.Text} description - The description of entity.
     */
    this.description = null;
  }

  /**
   * Initialize the tooltip and create the PIXI.Text objects for later use.
   *
   * @public
   */
  initialize() {
    this.background = new PIXI.Graphics();

    this.addChild(this.background);

    this.title = new PIXI.Text('', {
      font: 'bold 12px Courier New',
      fill: '#ffffff',
      wordWrap: true,
      wordWrapWidth: 150,
    });

    this.title.position.x = 15;

    this.addChild(this.title);

    this.type = new PIXI.Text('', {
      font: '12px Courier New',
      fill: '#ffffff',
      wordWrap: true,
      wordWrapWidth: 150,
    });

    this.type.position.x = 15;

    this.addChild(this.type);

    this.description = new PIXI.Text('', {
      font: '12px Courier New',
      fill: '#b4b4b4',
      wordWrap: true,
      wordWrapWidth: 150,
    });

    this.description.position.x = 15;

    this.addChild(this.description);
  }

  /**
   * Calls the render function of each of the containers children.
   *
   * @public
   *
   * @param {String} title - The title of the entity tooltip element.
   * @param {String} type - The type of the entity with the tooltip element.
   * @param {String} description - The description of the entity with the tooltip element.
   */
  updateText(title, type, description) {
    this.title.text = title;
    this.type.text = type;
    this.description.text = description;

    let yPos = 15;

    this.title.position.y = yPos;

    if (title !== '') {
      yPos += this.title.height;
    }

    this.type.position.y = yPos;

    if (type !== '') {
      yPos += this.type.height;
    }

    this.description.position.y = yPos;

    if (description !== '') {
      yPos += this.description.height;
    }

    yPos += 15;

    this.background.clear();
    this.background.beginFill(0x000000, 0.5);
    this.background.drawRect(0, 0, this.width + 15, yPos);
  }
}
