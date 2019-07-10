var Tile = require('./tile.js').Tile,
	Vector2 = require('../geometry/vector2.js').Vector2,
	Utils = require('../core/utils.js');

export class Room {
	constructor(x, y, w, h) {
		this.x1 = x;
		this.x2 = w + x;
		this.y1 = y;
		this.y2 = y + h;
		this.w = w;
		this.h = h;
		this.layout = [];
		this.exit = null;
	}

	initialize() {
		for(let x = 0; x < this.w; x++) {
			this.layout[x] = [];
			
			for(let y = 0; y < this.h; y++) {

				// Check if the position filled has to be a wall or floor
				if(y === 0 || y === this.h - 1 || x === 0 || x === this.w - 1) {
					// Create a new wall tile
					this.layout[x][y] = new Tile(
						1,
						true,
						this,
						0,
						10
					);
				} else {
					// Create a new floor tile
					this.layout[x][y] = new Tile(
						2,
						false,this,
						3,
						Utils.randomNumber(2, 5)
					);
				}
			}
		}
	}

	generateExit() {
		switch(Utils.randomNumber(1, 4)) {
			case(1): // Top
				this.exit = {x: Utils.randomNumber(1, this.w - 2), y: this.h - 2};
				break;
			case(2): // Bottom
				this.exit = {x: Utils.randomNumber(1, this.w - 2), y: 1};
				break;
			case(3): // Left
				this.exit = {x: this.w - 2, y: Utils.randomNumber(1, this.h - 2)};
				break;
			case(4): // Right
				this.exit = {x: 1, y: Utils.randomNumber(1, this.h - 2)};
				break;
		}
	}

	getRandomPosition() {
		let positionX = Utils.randomNumber(2, this.w - 3);
		let positionY = Utils.randomNumber(2, this.h - 3);

		positionX += this.x1;
		positionY += this.y1;

		return new Vector2(positionX, positionY);
	}
};
