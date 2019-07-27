/**
 * The Status Effect Component holds all status effects on an entity.
 */
export class StatusEffectComponent {
  constructor() {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'statusEffectComponent';

    /**
     * @property {Array} statusEffects - An array with every status effect that is on this entity.
     */
    this.statusEffects = [];
  }
}
