/**
 * A single entity in the game world.
 *
 * @param {Game} game - Reference to the currently running game.
 * @param {String} type - The type of this entity.
 * @param {String} name - The name of this entity.
 * @param {String} sprite - The name of the sprite used by this entity.
 * @param {Number} speed - The speed of this entity.
 */
export class Entity {
  constructor(game, type, name, sprite, speed) {
    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {String} type - The type of this entity.
     */
    this.type = type;

    /**
     * @property {String} name - The name of this entity.
     */
    this.name = name;

    /**
     * @property {Number} speed - The speed of this entity.
     */
    this.speed = speed || 1000;

    /**
     * @property {String} textureName - The name of the sprite of this entity.
     */
    this.textureName = sprite;

    /**
     * @property {PIXI.Sprite} sprite - The sprite of this entity.
     */
    this.sprite = PIXI.Sprite.fromFrame(sprite);

    /**
     * @property {Object} components - An object filled with all the components this entity has.
     */
    this.components = {};
  }

  /**
	 * Function that gets called when this entity is in a scheduler and it is his turn.
	 * 
   * @public
	 */
  act() {
    if (this.hasComponent('statusEffectComponent')) {
      this.game.staticSystems.statusEffectsSystem.handleSingleEntity(this);
    }

    if (this.hasComponent('keyboardControl')) {
      this.game.UI.statusEffects.update();

      this.game.scheduler.lock();
    } else {
      const movementComponent = this.getComponent('movement');

      movementComponent.execute();
    }
  }

  /**
	 * A function that returns the speed of this entity.
   * 
	 * @public
	 *
	 * @return {Number} The speed of this entity.
	 */
  getSpeed() {
    return this.speed;
  }

  /**
	 * Check whether this entity has a certain component.
   * 
	 * @public
	 *
	 * @param {String} name - The name of the component.
	 *
	 * @return {Boolean} True when the entity has the component, false when it doesn't have the component.
	 */
  hasComponent(name) {
    return this.components[name] !== undefined;
  }

  /**
	 * Get a certain component on this entity.
   * 
	 * @public
	 *
	 * @param {String} name - The name of the component.
	 *
	 * @return {Object} The component that this entity has.
	 */
  getComponent(name) {
    return this.components[name];
  }

  /**
	 * Add an existing component to this entity.
   * 
	 * @public
	 *
	 * @param {Object} component - The component that is getting added to this entity.
	 */
  addComponent(component) {
    this.components[component.name] = component;
  }

  /**
	 * Remove a component from this entity.
   * 
	 * @public
	 *
	 * @param {Object} component - The component that is getting removed from this entity.
	 */
  removeComponent(component) {
    this.components[component.name] = undefined;
  }

  // TODO: This function isn't really supposed to be here, but I also don't want to give every status effect a reference to the game to access the systems...
	/**
	 * Function to remove a status effect from this entity.
   * 
	 * @public
	 *
	 * @param {Object} statusEffect - The status effect that is being removed.
	 *
	 * @return {Boolean} Returns true when the status effect is removed, returns false when not.
   */
  removeStatusEffect(statusEffect) {
    return this.game.staticSystems.statusEffectsSystem.removeStatusEffect(
      this,
      statusEffect,
    );
  }
}
