//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules
var Entity = require('../gameobjects/entity.js').Entity,
	Position = require('../gameobjects/components/position.js'),
	CanOpen = require('../gameobjects/components/canopen.js').CanOpen,
	Collide = require('../gameobjects/components/collide.js').Collide,
	Tooltip = require('../gameobjects/components/tooltip.js');

/**
 * @class PropFactory
 * @classdesc A factory that returns pre made props with
 * a set of components. Props are like decorations but can be touched: boxes, boulders, and doors.
 */
export class PropFactory {
	static newEntrance(game, position) {
		const entity = new Entity(
			game,
			'Prop',
			'Entrance',
			'stairs_up.png'
		);

		entity.addComponent(new Position(position));

		return entity;
	}

	static newExit(game, position) {
		const entity = new Entity(
			game, 
			'Prop', 
			'Exit', 
			'stairs_down.png'
		);

		entity.addComponent(new Position(position));

		return entity;
	}

	static newDoor(game, position) {
		const entity = new Entity(
			game,
			'Prop',
			'Wooden Door',
			'door_horizontal_closed.png',
		);
		
		entity.addComponent(new Position(position));

		entity.addComponent(new CanOpen(game, entity));

		entity.addComponent(new Collide(true));

		entity.addComponent(new Tooltip(
			entity.name,
			'Closed',
			''
		));

		return entity;
	}
};