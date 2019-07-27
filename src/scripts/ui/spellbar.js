import {
  Container,
  Point,
  Sprite,
  Text,
  Texture,
} from 'pixi.js';

import { Vector2 } from '../geometry/vector2.js';

/**
 * The Spell Bar holds all spells and manages the rendering of this UI element.
 *
 * @extends Container
 */
export class SpellBar extends Container {
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
     * @property {Number} maxSpellslots - The maximum amount of spell slots displayed in this bar.
     */
    this.maxSpellslots = 9;
  }

  /**
   * Initialize the QuickslotBar and create PIXI objects for later use.
   *
   * @public
   */
  initialize() {
    const basePosition = new Vector2(
      this.game.sizeManager.width / 2 + 21,
      this.game.sizeManager.height - 57,
    );

    for (let i = 0; i < this.maxSpellslots; i++) {
      const quickslotPosition = new Vector2(i * 44, 0);
      const newPosition = quickslotPosition.combine(basePosition);

      const texture = Texture.from('itemslot.png');

      const quickslot = new Sprite(texture);

      quickslot.position.x = newPosition.x;
      quickslot.position.y = newPosition.y;

      quickslot.scale = new Point(3, 3);

      this.addChild(quickslot);

      const textObject = new Text(`${i + 1}`, {
        fontFamily: 'Courier New',
        fontSize: 12,
        fill: '#606060',
        align: 'left'
      });

      const textPosition = newPosition.combine(new Vector2(30, 30));

      textObject.position.x = textPosition.x;
      textObject.position.y = textPosition.y;

      this.addChild(textObject);
    }
  }
}
