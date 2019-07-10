export class Event {
	constructor() {
		this.events = {};
	}

	on(type, callback, context) {
		if (!this.events.hasOwnProperty(type)) {
			this.events[type] = [];
		}

		this.events[type].push([callback, context]);
	}

	trigger(type) {
		const tail = Array.prototype.slice.call(arguments, 1);

		const callbacks = this.events[type];

		if (callbacks !== undefined) {
			for(let i = 0; i < callbacks.length; i++) {
				const callback = callbacks[i][0];
				let context;

				if (callbacks[i][1] === undefined) {
					context = this;
				} else {
					context = callbacks[i][1];
				}

				callback.apply(context, tail);
			}
		}
	}
};