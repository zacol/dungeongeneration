import { Vector2 } from '../geometry/vector2.js';

/**
 * The StatusEffects holds all informations about effects that affect player.
 *
 * @extends PIXI.Container
 */
export class StatusEffects extends PIXI.Container {
  constructor() {
    super();

    /**
     * @property {Number} maxEffects - The max amount of effects displayed.
     */
    this.maxEffects = 5;

    /**
     * @property {Entity} target - The entity object that should be checked.
     */
    this.target = null;
  }

  /**
   * Initialize the status effects UI element and create the PIXI objects for later use.
   *
   * @public
   */
  initialize() {
    const basePosition = new Vector2(15, 200);

    for (let i = 0; i < this.maxEffects; i++) {
      const effectContainer = new PIXI.Container();

      const texture = PIXI.Texture.from('status_empty.png');

      const statusEffectPosition = new Vector2(0, i * (texture.height + 5));
      const newPosition = statusEffectPosition.combine(basePosition);

      const statusEffect = new PIXI.Sprite(texture);

      statusEffect.position.x = newPosition.x;
      statusEffect.position.y = newPosition.y;

      effectContainer.addChild(statusEffect);

      const textObject = new PIXI.Text('0', {
        fontFamily: 'Courier New',
        fontSize: 12,
        fontWeight: 700,
        fill: '#ffffff',
        align: 'left'
      });

      const textPosition = newPosition.combine(
        new Vector2(texture.width - 15, texture.height - 20),
      );

      textObject.position.x = textPosition.x;
      textObject.position.y = textPosition.y;

      effectContainer.addChild(textObject);

      effectContainer.visible = false;

      this.addChild(effectContainer);
    }
  }

  /**
   * Update the status effect UI element, change the sprites and visibility according to the status effects on the target.
   *
   * @public
   */
  update() {
    const statusEffectComponent = this.target.getComponent(
      'statusEffectComponent',
    );

    for (let i = 0; i < this.maxEffects; i++) {
      const effectContainer = this.getChildAt(i);

      if (typeof statusEffectComponent.statusEffects[i] === 'undefined') {
        effectContainer.visible = false;

        return;
      }

      const statusEffect = effectContainer.getChildAt(0);
      const textObject = effectContainer.getChildAt(1);

      statusEffect.texture = PIXI.Texture.from(
        `status_${statusEffectComponent.statusEffects[i].name}.png`,
      );
      textObject.text = statusEffectComponent.statusEffects[i].turnsLeft;

      effectContainer.visible = true;
    }
  }

  /**
   * Set a target for the status effect UI element.
   *
   * @param {Entity} target - The entity object that should be checked.
   *
   * @public
   */
  setTarget(target) {
    this.target = target;
  }
}
