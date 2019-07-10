import { Event } from './event.js';

export class Key {
	constructor (keycode) {
		this.keyCode = keycode;
		this.isDown = false;
		this.isUp = false;
		this.lastDown = 0;
		this.lastUp = 0;
		this.delay = 50;
		this.onDown = new Event();
		this.onUp = new Event();
	}

	processKeyDown(event) {
		if (this.isDown) {
			if (event.timeStamp > this.lastDown + this.delay) {
				this.onDown.trigger(this.keyCode);
				this.lastDown = event.timeStamp;
			}
		} else {
			this.isDown = true;
			this.isUp = false;
			this.lastDown = event.timeStamp;


			this.onDown.trigger(this.keyCode);
		}
	}

	processKeyUp(event) {
		this.isDown = false;
		this.isUp = true;
		this.lastUp = event.timeStamp;

		this.onUp.trigger(this.keyCode);
	}
};