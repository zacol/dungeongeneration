//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

/**
 * Inventory Component constructor
 *
 * @class Inventory
 * @classdesc The Inventory component is responsible for keeping track of what an entity carries along with him
 */
var Inventory = function() {

	/**
	 * @property {String} name - The name of this system. This field is always required!
	 */
	this.name = 'inventory';

	/**
	 * @property {Number} maxSlots - The maximum amount of slots in this inventory
	 */
	this.maxSlots = 9;

	/**
	 * @property {Array} slots - An array that holds all items in this inventory
	 */
	this.slots = [];

	/**
	 * @property {Entity} active - An entity that is active in this inventory
	 */
	this.active = null;

};

Inventory.prototype = {

	/**
	 * Add an item to the inventory
	 * @public
	 *
	 * @param {Object} item - The item that is added to this inventory
	 */
	add: function(item) {

		this.slots.push(item);

	},
	
	/**
	 * Remove an item from the inventory
	 * @public
	 *
	 * @param {Object} index - The item index that is removed to this inventory
	 */
	remove: function(index) {
		
		this.slots.splice(index, 1);

		this.active = null;

	},

	/**
	 * Set an item from the inventory at a given index active
	 * @public
	 *
	 * @param {Object} index - The item index that is selected to this inventory
	 */
	setActive: function(index) {

		this.active = this.slots[index];

	},

	/**
	 * Function to clear the entire inventory
	 * @public
	 */
	clear: function() {

		this.slots = [];

	},

	/**
	 * Check whether the inventory is full or not
	 * @public
	 *
	 * @return {Boolean} True is full, false is not
	 */
	isFull: function() {

		return (this.slots.length >= this.maxSlots);

	},
	
	/**
	 * Check whether the inventory is empty or not
	 * @public
	 *
	 * @return {Boolean} True is empty, false is not
	 */
	isEmpty: function() {

		return (this.slots.length === 0);

	}

};

//Export the Browserify module
module.exports = Inventory;
