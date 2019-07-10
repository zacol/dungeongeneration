//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules
var Entity = require('../gameobjects/entity.js').Entity,
    Weapon = require('../gameobjects/components/weapon.js'),
    CanPickUp = require('../gameobjects/components/canpickup.js').CanPickUp,
    Tooltip = require('../gameobjects/components/tooltip.js'),
    Position = require('../gameobjects/components/position.js');

/**
 * @class ItemFactory
 * @classdesc A factory that returns pre made item entities with
 * a set of components
 */
export class ItemFactory {
    static newKnife(game, position) {
        const entity = new Entity(
            game,
            'Item',
            'Knife',
            'knife.png'
        );

        entity.addComponent(new Position(position));

        entity.addComponent(new Weapon(5));

        const canPickedUpBy = ['Player'];

        entity.addComponent(new CanPickUp(game, canPickedUpBy));

        entity.addComponent(new Tooltip(
            'Short Sword',
            'Item',
            'Weapon'
        ));

        return entity;
    }
    
    static newShortSword(game, position) {
        const entity = new Entity(
            game,
            'Item',
            'Short Sword',
            'short_sword.png'
        );

        entity.addComponent(new Position(position));

        entity.addComponent(new Weapon(10));

        const canPickedUpBy = ['Player'];

        entity.addComponent(new CanPickUp(game, canPickedUpBy));

        entity.addComponent(new Tooltip(
            'Knife',
            'Item',
            'Weapon'
        ));

        return entity;
    }
};