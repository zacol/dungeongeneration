export class Entity {
	constructor(game, type, name, sprite, speed) {
		this.game = game;
		this.type = type;
		this.name = name;
		this.speed = speed || 1000;
		this.textureName = sprite;
		this.sprite = PIXI.Sprite.fromFrame(sprite);
		this.components = {};
	}

	act() {
		if (this.hasComponent('statusEffectComponent')) {
			this.game.staticSystems.statusEffectsSystem.handleSingleEntity(this);
		}

		if (this.hasComponent('keyboardControl')) {
			this.game.UI.statusEffects.update();

			this.game.scheduler.lock();
		} else {
			const movementComponent = this.getComponent('movement');

			movementComponent.execute();
		}
	}

	getSpeed() {
		return this.speed;
	}

	hasComponent(name) {
		return (this.components[name] !== undefined);
	}

	getComponent(name) {
		return this.components[name];
	}

	addComponent(component) {
		this.components[component.name] = component;
	}

	removeComponent(component) {
		this.components[component.name] = undefined;
	}

	removeStatusEffect(statusEffect) {
		return this.game.staticSystems.statusEffectsSystem.removeStatusEffect(this, statusEffect);
	}
};