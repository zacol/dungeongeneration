import { Entity } from '../gameobjects/entity.js';

export class Group extends PIXI.Container {
	constructor(game) {
		super();

		this.game = game;
		this.entities = [];
	}

	add(entity) {
		if (!entity instanceof Entity) {
			return;
		}
	
		this.addChild(entity.sprite);
	
		if (entity.hasComponent('position')) {
			const positionComponent = entity.getComponent('position');
	
			const newPosition = {
				x: positionComponent.position.x * 16,
				y: positionComponent.position.y * 16
			};
	
			entity.sprite.position = new PIXI.Point(newPosition.x, newPosition.y);
	
		}
	
		this.entities.push(entity);
	}

	remove(entity) {
		const index = this.entities.indexOf(entity);
	
		if (index === -1) {
			return;
		}
	
		this.removeChild(entity.sprite);
	
		this.entities.splice(index, 1);
	}

	get() {
		const entitiesMatch = [];
	
		for(let i = 0; i < this.entities.length; i++) {
			const isThere = [];
	
			for(let a = 0; a < arguments.length; a++) {
	
				if (this.entities[i].components[arguments[a]]) {
					isThere.push(1);
				}
	
			}
	
			if (isThere.length === arguments.length) {
				entitiesMatch.push(this.entities[i]);
			}
		}

		return entitiesMatch;
	}
};

//Inherit the prototype from the PIXI.Container
// Group.prototype = Object.create(PIXI.Container.prototype);
// Group.prototype.constructor = Group;