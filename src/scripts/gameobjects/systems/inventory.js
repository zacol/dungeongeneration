//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

/**
 * Inventory System constructor
 *
 * @class Open
 * @classdesc The Inventory system handles grabbing/dropping items and manages other inventory actions
 *
 * @param {Game} game - Reference to the currently running game
 */
var Inventory = function(game) {

	/**
	 * @property {Game} game - Reference to the current game object
	 */
	this.game = game;

};

Inventory.prototype = {

	/**
	 * Performs the pickup operations for this specific system on one entity
	 * @public
	 *
	 * @param {Entity} entity - The entity that is being processed by this system
	 * @param {Boolean} multiple - True if you want to pickup multiple items at once
	 */
	pickUp: function(entity, multiple) {

		//Get the components from the current entity and store them temporarily in a variable
		var positionComponent = entity.getComponent("position");
		var inventoryComponent = entity.getComponent("inventory");

		//If the inventory is full, we can exit as soon as possible
		if(inventoryComponent.isFull()) {

			//Add the text log message to the textlog UI element
			this.game.UI.textLog.addMessage('Your inventory is full!');

			return;

		}

		//Get the tile to which the entity is trying to move
		var currentTile = this.game.map.getTileAt(positionComponent.position);

		//Define variables
		var pickups = [];

		//Check if there are more entities on the tile than just the entity that we are processing
		if(currentTile.entities.length > 1) {

			//Loop through each entity and check if they have the 'canPickUp' component
			for(var i = 0; i < currentTile.entities.length; i++) {

				if(currentTile.entities[i].hasComponent('canPickUp')) {

					pickups.push(currentTile.entities[i]);

				}

			}

		}

		if(pickups.length === 0) {

			//Add the text log message to the textlog UI element
			this.game.UI.textLog.addMessage('There is nothing here...');

			return;

		}

		//Pick up a single item
		this.pickUpOne(inventoryComponent, pickups.shift(), currentTile);

		//If we need to pickup all items on the current tile, loop through them and pick them all up
		if(multiple) {

			for(var p = 0; p <= pickups.length; p++) {

				this.pickUpOne(inventoryComponent, pickups.shift(), currentTile);

			}

		}

	},

	/**
	 * Pickup a single entity, remove it from the map and add it to the inventory component
	 * @private
	 *
	 * @param {Object} inventoryComponent - The inventory that picks up the provided item
	 * @param {Entity} pickup - The entity that is being picked up
	 * @param {Tile} currentTile - The tile which holds the entity being picked up
	 */
	pickUpOne: function(inventoryComponent, pickup, currentTile) {

		//Add the entity to the inventory component
		inventoryComponent.add(pickup);

		//Add the text log message to the textlog UI element
		this.game.UI.textLog.addMessage('You picked up a ' + pickup.name);

		//Remove the entity from the list of entities on the map
		this.game.map.entities.remove(pickup);

		//Remove the entity from the tile
		currentTile.remove(pickup);

		//Add the pickup to the quickslot bar UI element
		this.game.UI.quickslotBar.add(pickup);

	},

	/**
	 * Performs the dropdown operations for this specific system on one entity
	 * @public
	 *
	 * @param {Entity} entity - The entity that is being processed by this system
	 */
	dropDown: function(entity) {

		//Get the components from the current entity and store them temporarily in a variable
		var positionComponent = entity.getComponent("position");
		var inventoryComponent = entity.getComponent("inventory");
		
		//If the inventory has no selected item, we can exit as soon as possible
		if(inventoryComponent.active === null) {

			//Add the text log message to the textlog UI element
			this.game.UI.textLog.addMessage('You have no selected item!');

			return;

		}

		//Position of the current entity
		var newPosition = positionComponent.position;

		//Drop down a single item
		this.dropDownOne(inventoryComponent, inventoryComponent.active, newPosition);

	},

	/**
	 * Pickup a single entity, remove it from the map and add it to the inventory component
	 * @private
	 *
	 * @param {Object} inventoryComponent - The inventory that picks up the provided item
	 * @param {Entity} loss - The entity that is being droped down
	 * @param {Tile} newPosition - The new position which will hold the entity being droped up
	 */
	dropDownOne: function(inventoryComponent, loss, newPosition) {

		//Get the tile to which the entity is trying to move
		var currentTile = this.game.map.getTileAt(newPosition);
		
		//Set entity position as loss position
		var lossPositionComponent = loss.getComponent("position");
		lossPositionComponent.position = newPosition;
		
		//Find index of loss in slots
		var index = inventoryComponent.slots.indexOf(loss);
		
		//Remove the entity from the inventory component
		inventoryComponent.remove(index);

		//Add the text log message to the textlog UI element
		this.game.UI.textLog.addMessage('You droped a ' + loss.name);

		//Add the entity to the list of entities on the map
		this.game.map.entities.add(loss);

		//Add the entity to the tile
		currentTile.add(loss);

		//Remove the loss from the quickslot bar UI element
		this.game.UI.quickslotBar.remove(index);

	},

	/**
	 * Performs the equip operations for this specific system on one entity
	 * @public
	 *
	 * @param {Entity} entity - The entity that is being processed by this system
	 * @param {Entity} index - The index that is being selected by this system
	 */
	equip: function(entity, index) {

		//Get the components from the current entity and store them temporarily in a variable
		var inventoryComponent = entity.getComponent("inventory");
		var weaponComponent = entity.getComponent("weapon");

		var item = inventoryComponent.slots[index];

		//If the slot is empty, we can exit as soon as possible
		if(item === undefined) {

			//Add the text log message to the textlog UI element
			this.game.UI.textLog.addMessage('This slot is empty!');

			return;

		}

		//Equip a single item
		this.equipOne(inventoryComponent, weaponComponent, item, index);

	},

	/**
	 * Equick a single entity
	 * @private
	 *
	 * @param {Object} inventoryComponent - The inventory that picks up the provided item
	 * @param {Entity} item - The entity that is being equiped
	 */
	equipOne: function(inventoryComponent, weaponComponent, item, index) {

		//Update damage caused by this entity
		var itemWeaponComponent = item.getComponent("weapon");
		weaponComponent.update(itemWeaponComponent.damage);

		//Select the entity from the inventory component
		inventoryComponent.setActive(index);

		//Add the text log message to the textlog UI element
		this.game.UI.textLog.addMessage('You equiped a ' + item.name);

		//Remove the loss from the quickslot bar UI element
		this.game.UI.quickslotBar.highlight(index);
	}

};

//Export the Browserify module
module.exports = Inventory;

