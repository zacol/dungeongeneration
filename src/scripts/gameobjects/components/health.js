export class Health {
	constructor(maxHealth) {
		this.name = 'health';
		this.minHealth = 0;
		this.health = this.maxHealth = maxHealth;
	}

	percentage() {
		return this.health / this.maxHealth;
	}

	isDamaged() {
		return this.health < this.maxHealth;
	}

	isDead() {
		return this.health <= this.minHealth;
	}

	takeDamage(damage) {
		this.health -= damage;

		if (this.health < this.minHealth) {
			this.health = this.minHealth;
		}
	}
};
