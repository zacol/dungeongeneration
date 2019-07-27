/**
 * The Status Effects System handles adding and removing status effects on entities with the Status Effect Component.
 *
 * @param {Game} game - Reference to the currently running game.
 */
export class StatusEffectsSystem {
  constructor(game) {
    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;
  }

  /**
   * Performs the needed operations for this specific system on one entity.
   * 
   * @public
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   */
  handleSingleEntity(entity) {
    const statusEffectComponent = entity.getComponent('statusEffectComponent');

    if (statusEffectComponent.statusEffects.length > 0) {
      for (let i = 0; i < statusEffectComponent.statusEffects.length; i++) {
        statusEffectComponent.statusEffects[i].update(entity);
      }
    }
  }

  /**
   * Function to return every status effect currently on an entity.
   * 
   * @protected
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   *
   * @return {Array} An array filled with every status effect.
   */
  getStatusEffects(entity) {
    const statusEffectComponent = entity.getComponent('statusEffectComponent');

    return statusEffectComponent.statusEffects;
  }

  /**
   * Function to add a new status effect to this entity.
   * 
   * @protected
   *
   * @param {Entity} entity - The entity that needs a new status effect.
   * @param {Object} statusEffect - The status effect that is being added.
   */
  addStatusEffect(entity, statusEffect) {
    const statusEffectComponent = entity.getComponent('statusEffectComponent');

    let index = -1;

    for (let i = 0; i < statusEffectComponent.statusEffects.length; i++) {
      if (statusEffectComponent.statusEffects[i].name === statusEffect.name) {
        index = i;

        break;
      }
    }

    if (index !== -1) {
      if (statusEffect.stackable === true) {
        // If the status effect should add it's turns left to the existing status effect or
        // if it should reset the status effect back to it's original turns left.
        if (statusEffect.addStack === true) {
          // Add all new turns left to the existing status effect.
          statusEffectComponent.statusEffects[index].turnsLeft +=
            statusEffect.turnsLeft;
        } else {
          // Reset the turns left of the existing status effect to the default turns left provided by the new status effect.
          statusEffectComponent.statusEffects[index].turnsLeft =
            statusEffect.turnsLeft;
        }
      }
    } else {
      statusEffectComponent.statusEffects.push(statusEffect);
    }
  }

  /**
   * Function to remove a status effect from this entity.
   * 
   * @protected
   *
   * @param {Entity} entity - The entity that needs a status effect to be removed.
   * @param {Object} statusEffect - The status effect that is being removed.
   *
   * @return {Boolean} Returns true when the status effect is removed, returns false when not.
   */
  removeStatusEffect(entity, statusEffect) {
    const statusEffectComponent = entity.getComponent('statusEffectComponent');

    const index = statusEffectComponent.statusEffects.indexOf(statusEffect);

    if (index === -1) {
      return false;
    }

    statusEffectComponent.statusEffects.splice(index, 1);

    return true;
  }
};