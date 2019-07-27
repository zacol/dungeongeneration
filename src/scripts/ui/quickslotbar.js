import { Vector2 } from '../geometry/vector2.js';

/**
 * The Quickslot Bar holds all quickslots and manages the rendering of this UI element.
 *
 * @extends PIXI.Container
 */
export class QuickslotBar extends PIXI.Container {
  /**
   * @param {Game} game - Reference to the currently running game.
   */
  constructor(game) {
    super();

    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Number} maxQuickslots - The maximum amount of quickslots displayed in this bar.
     */
    this.maxQuickslots = 9;
  }

  /**
   * Initialize the QuickslotBar and create PIXI objects for later use.
   *
   * @public
   */
  initialize() {
    const basePosition = new Vector2(
      this.game.sizeManager.width / 2 - this.maxQuickslots * 44 - 21,
      this.game.sizeManager.height - 57,
    );

    for (let i = 0; i < this.maxQuickslots; i++) {
      const quickslotPosition = new Vector2(i * 44, 0);
      const newPosition = quickslotPosition.combine(basePosition);

      const texture = PIXI.Texture.fromFrame('itemslot.png');

      const quickslot = new PIXI.Sprite(texture);

      quickslot.position.x = newPosition.x;
      quickslot.position.y = newPosition.y;

      quickslot.scale = new PIXI.Point(3, 3);

      this.addChild(quickslot);

      const textObject = new PIXI.Text('' + (i + 1), {
        font: '10px Courier New',
        fill: '#606060',
        align: 'left',
      });

      const textPosition = newPosition.combine(new Vector2(30, 30));

      textObject.position.x = textPosition.x;
      textObject.position.y = textPosition.y;

      this.addChild(textObject);
    }
  }

  add(entity) {
    const inventoryComponent = this.game.player.getComponent('inventory');

    const basePosition = new Vector2(
      this.game.sizeManager.width / 2 - this.maxQuickslots * 44 - 21,
      this.game.sizeManager.height - 57,
    );

    const nextSlot = inventoryComponent.slots.length - 1;
    const itemPosition = new Vector2(nextSlot * 44 - 1, -2);
    const newPosition = itemPosition.combine(basePosition);

    const texture = PIXI.Texture.fromFrame(entity.textureName);

    const item = new PIXI.Sprite(texture);

    item.position.x = newPosition.x;
    item.position.y = newPosition.y;

    item.alpha = 0.5;

    item.scale = new PIXI.Point(3, 3);

    this.addChild(item);
  }

  remove(entityIndex) {
    const inventoryComponent = this.game.player.getComponent('inventory');

    // Number of max quickslots is multiplied by two because of
    // container contains the same amount of quickslot textures
    // and texts assign to them
    const item = this.getChildAt(this.maxQuickslots * 2 + entityIndex);

    this.removeChild(item);

    for (let i = 0; i < inventoryComponent.slots.length; i++) {
      const basePosition = new Vector2(
        this.game.sizeManager.width / 2 - this.maxQuickslots * 44 - 21,
        this.game.sizeManager.height - 57,
      );

      const itemPosition = new Vector2(i * 44, 0);
      const newPosition = itemPosition.combine(basePosition);

      item = this.getChildAt(this.maxQuickslots * 2 + i);

      item.position.x = newPosition.x;
    }
  }

  highlight(entityIndex) {
    const inventoryComponent = this.game.player.getComponent('inventory');

    for (let i = 0; i < inventoryComponent.slots.length; i++) {
      // Number of max quickslots is multiplied by two because of
      // container contains the same amount of quickslot textures
      // and texts assign to them
      const item = this.getChildAt(this.maxQuickslots * 2 + i);

      if (i === entityIndex) {
        item.alpha = 1;
      } else {
        item.alpha = 0.5;
      }
    }
  }
}
