export class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	combine(other) {
		return new Vector2(this.x + other.x, this.y + other.y);
	}

	add(other) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;

		return Math.abs(Math.sqrt((dx * dx) + (dy * dy)));
	}

	distance(pos) {
		const dx = pos.x - this.x;
		const dy = pos.y - this.y;

		return Math.abs(Math.sqrt((dx * dx) + (dy * dy)));
	}

	manhattan(pos) {
		return(Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y));
	}

	clone() {
		return(new Vector2(this.x, this.y));
	}

	toString() {
		return(`(${this.x}, ${this.y})`);
	}
};