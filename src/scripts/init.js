//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

import { Game } from './core/game.js';

export class Intialize {
	constructor() {
		// Empty for now
		this.options = {};
		
		this.game = new Game(this.options);
	}
};

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

window.addEventListener('load', new Intialize);
