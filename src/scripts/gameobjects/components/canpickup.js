import { Event } from '../../input/event.js';

export class CanPickUp {
    constructor(game, canPickUpTypes) {
        this.name = 'canPickUp';
        this.game = game;
        this.canPickUpTypes = canPickUpTypes;
        this.events = new Event();

        this.initialize();
    }

    initialize() {
        this.events.on('bumpInto', this.bumpInto, this);
    }

    bumpInto(entity, collisionEntity) {
        if (
            this.canEntityPickUp(entity) &&
            entity.hasComponent('inventory') &&
            !entity.hasComponent('keyboardControl')
        ) {
		   //TODO: Implement behaviour for entities ( not the player ) that pick up items they found
		   //Players pick up items by standing on the tile and pressing their 'pick up' key
		   //Enemies should be able to grab a weapon or item and equip/use it!
        }
    }

    canEntityPickUp(entity) {
        if (this.canPickUpTypes.length === 0) {
            return true;
        }

        if (this.canPickUpTypes.indexOf(entity.type) >= 0) {
            return true;
        }

        return false;
    }
};