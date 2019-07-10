import { Key } from './key.js';

export class Keyboard {

	constructor() {
		this.keys = {};

		this.initialize();
	}

	initialize() {
		this._onKeyDown = (event) => {
			return this.processKeyDown(event);
		};

		this._onKeyUp = (event) => {
			return this.processKeyUp(event);
		};

		window.addEventListener('keydown', this._onKeyDown, false);
		window.addEventListener('keyup', this._onKeyUp, false);
	}

	getKey(keycode) {
		if (this.keys[keycode] === undefined) {
			this.keys[keycode] = new Key(keycode);
		}

		return this.keys[keycode];
	}

	processKeyDown(event) {
		if (this.keys[event.keyCode] !== undefined) {
			event.preventDefault();

			this.keys[event.keyCode].processKeyDown(event);

		}
	}

	processKeyUp(event) {
		if (this.keys[event.keyCode] !== undefined) {
			event.preventDefault();

			this.keys[event.keyCode].processKeyUp(event);
		}
	}
};