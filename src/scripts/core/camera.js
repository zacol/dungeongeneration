import { Boundary } from '../geometry/boundary.js';

export class Camera {
	constructor(game, position) {
		this.game = game;
		this.position = position;
		this.viewportWidth = game.sizeManager.width;
		this.viewportHeight = game.sizeManager.height;
		this.minimumDistanceX = 0;
		this.minimumDistanceY = 0;
		this.followObject = null;

		this.viewportBoundary = new Boundary(
			this.position.x * (game.settings.tileSize * this.game.settings.zoom),
			this.position.y * (game.settings.tileSize * this.game.settings.zoom),
			this.viewportWidth,
			this.viewportHeight
		);

		this.mapBoundary = new Boundary(
			0,
			0,
			game.settings.tilesX * (game.settings.tileSize * this.game.settings.zoom),
			game.settings.tilesY * (game.settings.tileSize * this.game.settings.zoom)
		);
	}

	follow(followEntity, minimumDistanceX, minimumDistanceY) {
		this.followObject = followEntity.components.position;

		this.minimumDistanceX = minimumDistanceX;
		this.minimumDistanceY = minimumDistanceY;
	}

	update() {
		if (this.followObject !== null) {
			var tileSize = this.game.map.settings.tileSize * this.game.settings.zoom;
			var newPosition = {
				x : this.position.x,
				y : this.position.y
			};

			var followCenterX = (this.followObject.position.x * tileSize) + (tileSize / 2);
			var followCenterY = (this.followObject.position.y * tileSize) + (tileSize / 2);

			if (followCenterX - this.position.x + this.minimumDistanceX > this.viewportWidth) {
				newPosition.x = Math.floor(followCenterX - (this.viewportWidth - this.minimumDistanceX));
			} else if (followCenterX - this.minimumDistanceX < this.position.x) {
				newPosition.x = Math.floor(followCenterX - this.minimumDistanceX);
			}

			if (followCenterY - this.position.y + this.minimumDistanceY > this.viewportHeight) {
				newPosition.y = Math.floor(followCenterY - (this.viewportHeight - this.minimumDistanceY));
			} else if (followCenterY - this.minimumDistanceY < this.position.y) {
				newPosition.y = Math.floor(followCenterY - this.minimumDistanceY);
			}
		}

		this.viewportBoundary.set(newPosition.x, newPosition.y);

		if (this.game.settings.cameraBounds && !this.viewportBoundary.isWithin(this.mapBoundary)) {
			if (this.viewportBoundary.left < this.mapBoundary.left) {
				newPosition.x = this.mapBoundary.left;
			}

			if (this.viewportBoundary.top < this.mapBoundary.top) {
				newPosition.y = this.mapBoundary.top;
			}

			if (this.viewportBoundary.right > this.mapBoundary.right) {
				newPosition.x = this.mapBoundary.right - this.viewportWidth;
			}

			if (this.viewportBoundary.bottom > this.mapBoundary.bottom) {
				newPosition.y = this.mapBoundary.bottom - this.viewportHeight;
			}
		}

		const oldPosition = {
			x : this.position.x,
			y : this.position.y
		};

		TweenMax.to(oldPosition, 0.5, {
			x : newPosition.x,
			y : newPosition.y,
			onUpdate: function () {
				this.position.x = Math.ceil(oldPosition.x);
				this.position.y = Math.ceil(oldPosition.y);
			},
			onUpdateScope: this
		});
	}
};