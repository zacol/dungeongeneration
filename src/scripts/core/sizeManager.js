//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules


/**
 * SizeManager constructor
 *
 * @class SizeManager
 * @classdesc The size manager handles the scale and resizing of the canvas object
 *
 * @param {Game} game - Reference to the current game object
 */
export class SizeManager {
    constructor(game) {
        this.game = game;
        this.width = 0;
        this.height = 0;
        this.minWidth = null;
        this.maxWidth = null;
        this.minHeight = null;
        this.maxHeight = null;
    
        this.initialize();
    }

    initialize() {
        this.setSize();

        window.addEventListener('resize', this.windowResize.bind(this), false);
    }

    setSize() {
        let width = 0;
        let height = 0;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        if (this.minWidth !== null && this.minWidth >= innerWidth) {
            width = this.minWidth;
        } else if (this.maxWidth !== null && this.maxWidth <= innerWidth) {
            width = this.maxWidth;
        } else {
            width = innerWidth;
        }

        if (this.minHeight !== null && this.minHeight >= innerHeight) {
            height = this.minHeight;
        } else if (this.maxHeight !== null && this.maxHeight <= innerHeight) {
            height = this.maxHeight;
        } else {
            height = innerHeight;
        }

        this.width = width;
        this.height = height;
    }

	windowResize() {
        this.setSize();

        this.game.renderer.resize(this.width, this.height);
    }
};