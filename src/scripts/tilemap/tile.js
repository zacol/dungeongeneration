export class Tile {
	constructor (type, blockLight, room) {
		this.type = type;
		this.blockLight = blockLight;
		this.belongsTo = room || null;
		this.entities = [];
		this.lightLevel = 0;
		this.explored = false;

	}
	
	add(entity) {
		this.entities.push(entity);
	}

	remove(entity) {
		const index = this.entities.indexOf(entity);

		if(index === -1) {
			return false;
		} else {
			this.entities.splice(index, 1);

			return true;
		}
	}
};
