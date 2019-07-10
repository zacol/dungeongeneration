//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules
var Entity = require('../gameobjects/entity.js').Entity,
	MoveBehaviours = require('../gameobjects/behaviours/moveBehaviours.js'),
	Position = require('../gameobjects/components/position.js'),
	CanOpen = require('../gameobjects/components/canopen.js'),
	Collide = require('../gameobjects/components/collide.js').Collide,
	Health = require('../gameobjects/components/health.js').Health,
	CanFight = require('../gameobjects/components/canfight.js').CanFight,
	Weapon = require('../gameobjects/components/weapon.js'),
	MovementComponent = require('../gameobjects/components/movement.js'),
	Tooltip = require('../gameobjects/components/tooltip.js');

export class EnemyFactory {
	static newSpider(game, position) {
		const entity = new Entity(
			game,
			'Arachnid',
			'Quick Spider',
			'spider_small_right.png',
			2000
		);

		entity.addComponent(new Health(20));

		entity.addComponent(new Position(position));

		entity.addComponent(new Collide(true));

		entity.addComponent(new MovementComponent(
			game,
			entity,
			MoveBehaviours.walkBehaviour()
		));

		entity.addComponent(new Weapon(4));

		const canAttackTypes = ['Player'];

		entity.addComponent(new CanFight(game, canAttackTypes));

		entity.addComponent(new Tooltip(
			entity.name,
			'Arachnid Enemy',
			'The quick spider is twice as fast as you and will definitely attack you. It\'s just programmed to do so.'
		));

		return entity;
	}

	static newSkeleton(game, position) {
		var entity = new Entity(
			game,
			'Undead',
			'Skeleton',
			'skeleton_right.png',
			1000
		);

		entity.addComponent(new Health(50));

		entity.addComponent(new Position(position));

		entity.addComponent(new Collide(true));

		entity.addComponent(new MovementComponent(
			game,
			entity,
			MoveBehaviours.walkBehaviour()
		));

		entity.addComponent(new Weapon(10));

		var canAttackTypes = ["Player"];

		entity.addComponent(new CanFight(game, canAttackTypes));

		entity.addComponent(new Tooltip(
			entity.name,
			'Undead Enemy',
			'The skeleton is a very dangerous but unstable enemy. If you stab just right his bones will collapse.'
		));

		return entity;
	}
};