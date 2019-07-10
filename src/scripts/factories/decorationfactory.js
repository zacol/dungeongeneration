var Entity = require('../gameobjects/entity.js').Entity,
	Position = require('../gameobjects/components/position.js'),
	Utils = require('../core/utils.js');

export class DecorationFactory {
	static newGrass(game, position) {
		const entity = new Entity(
			game,
			'Decoration',
			'Grass',
			'grass_' + Utils.randomNumber(1, 4) + '.png'
		);

		entity.addComponent(new Position(position));

		return entity;
	}
};