//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules
var Vector2 = require('../geometry/vector2.js');

/**
 * QuickslotBar constructor
 *
 * @class QuickslotBar
 * @classdesc The Quickslot Bar holds all quickslots and manages the rendering of this UI element
 * Inherits from PIXI.Container
 *
 * @param {Game} game - Reference to the currently running game
 */
var QuickslotBar = function(game) {

	/**
	 * Inherit the constructor from the PIXI.Container object
	 */
	PIXI.Container.call(this);

	/**
	 * @property {Game} game - Reference to the current game object
	 */
	this.game = game;

	/**
	 * @property {Number} maxQuickslots - The maximum amount of quickslots displayed in this bar
	 */
	this.maxQuickslots = 9;

};

//Inherit the prototype from the PIXI.Container
QuickslotBar.prototype = Object.create(PIXI.Container.prototype);
QuickslotBar.prototype.constructor = QuickslotBar;

/**
 * Initialize the QuickslotBar and create PIXI objects for later use
 * @public
 */
QuickslotBar.prototype.initialize = function() {

	//Calculate the base position of the quickslot container
	var basePosition = new Vector2((this.game.sizeManager.width / 2) - (this.maxQuickslots * 44) - 21, this.game.sizeManager.height - 57);

	//Create all text objects for the textlog
	for(var i = 0; i < this.maxQuickslots; i++) {

		//Calculate the new position of the quickslot
		var quickslotPosition = new Vector2(i * 44, 0);
		var newPosition = quickslotPosition.combine(basePosition);

		//Create the texture from an image path
		var texture = PIXI.Texture.fromFrame("itemslot.png");

		//Create a new Sprite using the texture
		var quickslot = new PIXI.Sprite(texture);

		//Set the new position to the quickslot
		quickslot.position.x = newPosition.x;
		quickslot.position.y = newPosition.y;

		//Scale the image up 3 times
		quickslot.scale = new PIXI.Point(3, 3);

		//Add the Quickslot object to the container
		this.addChild(quickslot);

		//Create a new empty PIXI.Text object and style it
		var textObject = new PIXI.Text("" + (i + 1), { font: "10px Courier New", fill: "#606060", align: "left"});

		//Calculate the new text position
		var textPosition = newPosition.combine(new Vector2(30, 30));

		//Set the correct position for this text object
		textObject.position.x = textPosition.x;
		textObject.position.y = textPosition.y;

		//Add the new PIXI.Text object
		this.addChild(textObject);

	}

};


QuickslotBar.prototype.add = function(entity) {

	//Get the inventory component from the player entity and store it temporarily in a variable
	var inventoryComponent = this.game.player.getComponent("inventory");

	//Calculate the base position of the quickslot container
	var basePosition = new Vector2((this.game.sizeManager.width / 2) - (this.maxQuickslots * 44) - 21, this.game.sizeManager.height - 57);

	//Calculate the new position of the item
	var nextSlot = inventoryComponent.slots.length - 1;
	var itemPosition = new Vector2(nextSlot * 44 - 1, -2);
	var newPosition = itemPosition.combine(basePosition);

	//Create the texture from an image path
	var texture = PIXI.Texture.fromFrame(entity.textureName);

	//Create a new Sprite using the texture
	var item = new PIXI.Sprite(texture);

	//Set the new position to the item
	item.position.x = newPosition.x;
	item.position.y = newPosition.y;

	//Set the image transparency
	item.alpha = 0.5;

	//Scale the image up 3 times
	item.scale = new PIXI.Point(3, 3);

	//Add the item object to the container
	this.addChild(item);
};

QuickslotBar.prototype.remove = function(entityIndex) {

	//Get the inventory component from the player entity and store it temporarily in a variable
	var inventoryComponent = this.game.player.getComponent("inventory");

	// Number of max quickslots is multiplied by two because of 
	// container contains the same amount of quickslot textures
	// and texts assign to them
	var item = this.getChildAt(this.maxQuickslots * 2 + entityIndex);

	// Remove item
	this.removeChild(item);

	// Iterate through all items in the inventory component
	for(var i = 0; i < inventoryComponent.slots.length; i++) {

		//Calculate the base position of the quickslot container
		var basePosition = new Vector2((this.game.sizeManager.width / 2) - (this.maxQuickslots * 44) - 21, this.game.sizeManager.height - 57);

		//Calculate the new position of the item
		var itemPosition = new Vector2(i * 44, 0);
		var newPosition = itemPosition.combine(basePosition);

		item = this.getChildAt(this.maxQuickslots * 2 + i);

		//Set the new position to the item
		item.position.x = newPosition.x;

	}

}

QuickslotBar.prototype.highlight = function(entityIndex) {

	//Get the inventory component from the player entity and store it temporarily in a variable
	var inventoryComponent = this.game.player.getComponent("inventory");

	// Iterate through all items in the inventory component
	for(var i = 0; i < inventoryComponent.slots.length; i++) {

		// Number of max quickslots is multiplied by two because of 
		// container contains the same amount of quickslot textures
		// and texts assign to them
		var item = this.getChildAt(this.maxQuickslots * 2 + i);

		//Set the proper alpha transparency
		if (i === entityIndex) {
			item.alpha = 1;
		} else {
			item.alpha = 0.5;
		}

	}

}

//Export the Browserify module
module.exports = QuickslotBar;
