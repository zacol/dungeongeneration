//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

/**
 * Boundary constructor
 *
 * @class Boundary
 * @classdesc A rectangle that represents the whole map or the viewport of the camera
 *
 * @param {Number} left - The left position of this boundary, in pixels
 * @param {Number} top - The top position of this boundary, in pixels
 * @param {Number} width - The width of this boundary, in pixels
 * @param {Number} height - The height of this boundary, in pixels
 */
export class Boundary {
	constructor(left, top, width, height) {
		this.left = left || 0;
		this.top = top || 0;
		this.width = width || 0;
		this.height = height || 0;
		this.right = (this.left + this.width);
		this.bottom = (this.top + this.height);
	}

	set(left, top, width, height) {
		this.left = left;
		this.top = top;
		this.width = width || this.width;
		this.height = height || this.height;
		this.right = (this.left + this.width);
		this.bottom = (this.top + this.height);
	}

	isWithin(boundary) {
		return(
			boundary.left <= this.left &&
			boundary.right >= this.right &&
			boundary.top <= this.top &&
			boundary.bottom >= this.bottom
		);

	}

	isOverlapping(boundary) {
		return(
			this.left < boundary.right &&
			boundary.left < this.right &&
			this.top < boundary.bottom &&
			boundary.top < this.bottom
		);
	}
};