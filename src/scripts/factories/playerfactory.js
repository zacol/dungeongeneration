//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules
var Entity = require('../gameobjects/entity.js').Entity,
	Health = require('../gameobjects/components/health.js').Health,
	LightSource = require('../gameobjects/components/lightsource.js'),
	Collide = require('../gameobjects/components/collide.js').Collide,
	Weapon = require('../gameobjects/components/weapon.js'),
	KeyboardControl = require('../gameobjects/components/keyboardcontrol.js'),
	CanFight = require('../gameobjects/components/canfight.js').CanFight,
	StatusEffectComponent = require('../gameobjects/components/statuseffect.js'),
	Tooltip = require('../gameobjects/components/tooltip.js'),
	Inventory = require('../gameobjects/components/inventory.js'),
	Position = require('../gameobjects/components/position.js');

/**
 * @class PlayerFactory
 * @classdesc A factory that returns pre made player entities with
 * a set of components
 */
export class PlayerFactory {
	static newPlayerWarrior(game, position, controls) {
		const entity = new Entity(
			game, 
			'Player', 
			'You', 
			'warrior_right.png', 
			1000
		);

		entity.addComponent(new Health(100));

		entity.addComponent(new Position(position));

		entity.addComponent(new KeyboardControl(
			game,
			entity,
			controls
		));

		entity.addComponent(new LightSource(true, 6));

		entity.addComponent(new Collide(true));

		entity.addComponent(new Inventory());

		entity.addComponent(new StatusEffectComponent());

		entity.addComponent(new Weapon(1));

		var canAttackTypes = [];

		entity.addComponent(new CanFight(game, canAttackTypes));

		entity.addComponent(new Tooltip(
			'Player',
			'',
			''
		));

		return entity;
	}
};