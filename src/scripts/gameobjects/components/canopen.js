import { Event } from '../../input/event.js';

export class CanOpen {
	constructor(game, entity) {
		this.name = 'canOpen';
		this.game = game;
		this.entity = entity;
		this.events = new Event();
		this.state = 'closed';
		
		this.initialize();
	}
	
	initialize() {
		this.events.on('bumpInto', this.bumpInto, this);
	}

	bumpInto() {
		this.game.staticSystems.openSystem.handleSingleEntity(this.entity);
	}
};
