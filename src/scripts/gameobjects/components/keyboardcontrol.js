import { Vector2 } from '../../geometry/vector2.js';

/**
 * An component that tells the system that this entity can be controlled with the keyboard.
 * 
 * @param {Game} game - Reference to the current game object.
 * @param {Entity} entity - Reference to the entity that has this component.
 * @param {Object} controls - Associative array with every control that this entity uses.
 */
export class KeyboardControl {
  constructor(game, entity, controls) {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'keyboardControl';

    /**
     * @property {Entity} entity - Reference to the entity that has this component.
     */
    this.entity = entity;

    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Array} controls - Associative array with every control that this entity uses.
     */
    this.controls = controls;

    /**
     * @property {Keyboard} keyboard - Reference to the keyboard object.
     */
    this.keyboard = game.keyboard;

    /**
     * @property {Scheduler} scheduler - Reference to the scheduler object.
     */
    this.scheduler = game.scheduler;

    this.initialize();
  }

  /**
   * Adds the event listener for keyboards events on this entity.
   *
   * @private
   */
  initialize() {
    for (let key in this.controls) {
      if (this.controls.hasOwnProperty(key)) {
        switch (key) {
          case 'left':
          case 'right':
          case 'up':
          case 'down':
            const directionKey = this.keyboard.getKey(this.controls[key]);

            directionKey.onDown.on(
              this.controls[key],
              this.newPosition.bind(this, key),
              this,
            );
            break;

          case 'pickup':
            const pickUpKey = this.keyboard.getKey(this.controls[key]);

            pickUpKey.onDown.on(
              this.controls[key],
              this.pickUp.bind(this),
              this,
            );

            break;

          case 'dropdown':
            const dropDownKey = this.keyboard.getKey(this.controls[key]);

            dropDownKey.onDown.on(
              this.controls[key],
              this.dropDown.bind(this),
              this,
            );

            break;

          case 'equip1':
          case 'equip2':
          case 'equip3':
          case 'equip4':
          case 'equip5':
          case 'equip6':
          case 'equip7':
          case 'equip8':
          case 'equip9':
            const equipKey = this.keyboard.getKey(this.controls[key]);

            equipKey.onDown.on(
              this.controls[key],
              this.equip.bind(this, key),
              this,
            );

            break;

          case 'wait':
            const waitKey = this.keyboard.getKey(this.controls[key]);

            waitKey.onDown.on(this.controls[key], this.wait.bind(this), this);

            break;
        }
      }
    }
  }

  /**
   * The function that gets called when a player moves.
   *
   * @private
   *
   * @param {String} direction - The direction the entities are being moved.
   */
  newPosition(direction) {
    let movement;

    switch (direction) {
      case 'left':
        movement = new Vector2(-1, 0);

        break;

      case 'up':
        movement = new Vector2(0, -1);

        break;

      case 'right':
        movement = new Vector2(1, 0);

        break;

      case 'down':
        movement = new Vector2(0, 1);

        break;
    }

    const positionComponent = this.entity.getComponent('position');

    const newPosition = positionComponent.position.combine(movement);

    this.game.staticSystems.movementSystem.handleSingleEntity(
      this.entity,
      newPosition,
    );

    for (let s = 0; s < this.game.dynamicSystems.length; s++) {
      this.game.dynamicSystems[s].update();
    }

    this.scheduler.unlock();
  }

  /**
   * Function that is bound to the 'pickup' key and gets executed every time the user presses it.
   *
   * @private
   */
  pickUp() {
    this.game.staticSystems.inventorySystem.pickUp(this.entity, false);
  }

  /**
   * Function that is bound to the 'dropdown' key and gets executed every time the user presses it.
   *
   * @private
   */
  dropDown() {
    this.game.staticSystems.inventorySystem.dropDown(this.entity);
  }

  /**
   * Function that is bound to the 'equip' key and gets executed every time the user presses it.
   *
   * @private
   */
  equip(slot) {
    const text = slot.substr(slot.length - 1);

    const index = parseInt(text) - 1;

    this.game.staticSystems.inventorySystem.equip(this.entity, index);
  }

  /**
   * Function that is bound to the 'wait' key and makes the player skip a turn
   *
   * @private
   */
  wait() {
    this.scheduler.unlock();
  }
}
