//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules
var Event = require('../../input/event.js').Event;

export class CanFight {
    constructor(game, canAttackTypes) {
        this.name = 'canFight';
        this.game = game;
        this.canAttackTypes = canAttackTypes;
        this.events = new Event();

        this.initialize();
    }
    
    initialize() {
        this.events.on('bumpInto', this.bumpInto, this);
    }

    bumpInto(entity, collisionEntity) {
        if (this.canAttackEntity(entity)) {
            this.game.staticSystems.combatSystem.handleSingleEntity(entity, collisionEntity);
        }
    }

    canAttackEntity(entity) {
        if (this.canAttackTypes.length === 0) {
            return true;
        }

        if (this.canAttackTypes.indexOf(entity.type) !== -1) {
            return true;
        }

        return false;
    }
};