import { Tile } from './tile.js';

export class Map extends PIXI.Container {
	constructor (game) {
		super();

		this.game = game;
		this.entities = null;
		this.settings = {};
		this.rooms = [];
		this.tiles = [];
		this.pixitiles = [];
		this.entrance = null;
		this.exit = null;
		this.allRooms = [];
		this.mediumRooms = [];
		this.hardRooms = [];
		this.roomsToExit = [];

		this.initialize();
	}

	initialize() {
		this.settings = {
			tilesX: 60, // The number of horizontal tiles on this map
			tilesY: 40, // The number of vertical tiles on this map
			tileSize: 16, // The width and height of a single tile
			maxRooms: 15, // The maximum number of rooms on this map
			minRoomWidth: 5, // The minimum width of a single room
			maxRoomWidth: 8, // The maximum width of a single room
			minRoomHeight: 5, // The minimum height of a single room
			maxRoomHeight: 8, // The maximum height of a single room
			roomSpacing: 1, // The length of a corridor, 0 for no corridors
			maxMainRooms: 10,
			maxMediumRooms: 15,
			maxHardRooms: 5
		};
	
		for(let x = 0; x < this.settings.tilesX; x++) {
			this.tiles[x] = [];
			this.pixitiles[x] = [];
	
			for(let y = 0; y < this.settings.tilesY; y++) {
				this.tiles[x][y] = new Tile(
					0,
					true,
					0,
					0
				);
	
				this.pixitiles[x][y] = PIXI.Sprite.fromFrame('void.png');
	
				this.pixitiles[x][y].position.x = x * this.settings.tileSize;
				this.pixitiles[x][y].position.y = y * this.settings.tileSize;
	
				this.addChild(this.pixitiles[x][y]);
			}

		}
	
		this.game.world.addChild(this);
	}

	getTileAt (position) {
		let tile = this.tiles[position.x][position.y];
	
		if (tile) {
			return tile;
		} else {
			return new Tile();
		}
	}

	insideBounds(position) {
		return(
			position.x > 0 &&
			position.x < this.settings.tilesX &&
			position.y > 0 &&
			position.y < this.settings.tilesY
		);
	}

	typeList() {
		const mapTypeList = [];
	
		for(let y = 0; y < this.settings.tilesY; y++) {
			mapTypeList.push([]);
	
			for(let x = 0; x < this.settings.tilesX; x++) {
				mapTypeList[y][x] = this.tiles[x][y].type;
			}
		}

		return mapTypeList;
	}

	roomFits(room) {
		if (
			room.x1 < 1 ||
			room.x2 > this.settings.tilesX - 1 ||
			room.y1 < 1 ||
			room.y2 > this.settings.tilesY - 1
		) {
			return false;
		}
	
		for(let i = 0; i < this.allRooms.length; i++) {
			if(
				room.x1 <= this.allRooms[i].x2 &&
				room.x2 >= this.allRooms[i].x1 &&
				room.y1 <= this.allRooms[i].y2 &&
				room.y2 >= this.allRooms[i].y1
			) {
				return false;
			}
		}
		
		return true;
	};
};