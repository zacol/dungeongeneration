//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules
var Vector2 = require('../../geometry/vector2.js');

/**
 * KeyboardControl Component constructor
 *
 * @class KeyboardControl
 * @classdesc An component that tells the system that this entity can be controlled with the keyboard
 *
 * @param {Game} game - Reference to the current game object
 * @param {Entity} entity - Reference to the entity that has this component
 * @param {Object} controls - Associative array with every control that this entity uses
 */
var KeyboardControl = function(game, entity, controls) {

	/**
	 * @property {String} name - The name of this system. This field is always required!
	 */
	this.name = 'keyboardControl';

	/**
	 * @property {Entity} entity - Reference to the entity that has this component
	 */
	this.entity = entity;

	/**
	 * @property {Game} game - Reference to the current game object
	 */
	this.game = game;

	/**
	 * @property {Array} controls - Associative array with every control that this entity uses
	 */
	this.controls = controls;

	/**
	 * @property {Keyboard} keyboard - Reference to the keyboard object
	 */
	this.keyboard = game.keyboard;

	/**
	 * @property {Scheduler} scheduler - Reference to the scheduler object
	 */
	this.scheduler = game.scheduler;

	//Initialize the component
	this.initialize();

};

KeyboardControl.prototype = {

	/**
	 * The 'constructor' for this component
	 * Adds the event listener for keyboards events on this entity
	 * @private
	 */
	initialize: function() {

		//Loop through each control keycode of this entity
		for(var key in this.controls) {

			//Make sure that obj[key] belongs to the object and was not inherited
			if(this.controls.hasOwnProperty(key)) {

				switch(key) {

					case("left"):
					case("right"):
					case("up"):
					case("down"):

						//Add up key and tell it to move the entities up when it hits
						var directionKey = this.keyboard.getKey(this.controls[key]);

						//Attach the new position function to the keydown event
						directionKey.onDown.on(this.controls[key], this.newPosition.bind(this, key), this);
						break;

					case("pickup"):

						//Add up key and tell it to pick up the entities when it hits
						var pickUpKey = this.keyboard.getKey(this.controls[key]);

						//Attach the pick up function to the keydown event
						pickUpKey.onDown.on(this.controls[key], this.pickUp.bind(this), this);

						break;
					
					case("dropdown"):

						//Add up key and tell it to drop down the entities when it hits
						var dropDownKey = this.keyboard.getKey(this.controls[key]);

						//Attach the drop down function to the keydown event
						dropDownKey.onDown.on(this.controls[key], this.dropDown.bind(this), this);

						break;
					
					case("equip1"):
					case("equip2"):
					case("equip3"):
					case("equip4"):
					case("equip5"):
					case("equip6"):
					case("equip7"):
					case("equip8"):
					case("equip9"):

						//Add up key and tell it to equip the entities when it hits
						var equipKey = this.keyboard.getKey(this.controls[key]);

						//Attach the equip function to the keydown event
						equipKey.onDown.on(this.controls[key], this.equip.bind(this, key), this);

						break;

					case("wait"):

						//Add up key and tell it to wait the entities when it hits
						var waitKey = this.keyboard.getKey(this.controls[key]);

						//Attach the wait function to the keydown event
						waitKey.onDown.on(this.controls[key], this.wait.bind(this), this);

						break;

				}

			}

		}

	},

	/**
	 * The function that gets called when a player moves
	 * @protected
	 *
	 * @param {String} direction - The direction the entities are being moved
	 */
	newPosition: function(direction) {

		//Define variables
		var movement;

		//Check which controls are being pressed and update the player accordingly
		switch(direction) {

			case ("left"):

				movement = new Vector2(-1, 0);

				break;

			case ("up"):

				movement = new Vector2(0, -1);

				break;

			case ("right"):

				movement = new Vector2(1, 0);

				break;

			case ("down"):

				movement = new Vector2(0, 1);

				break;

		}

		//Get the components
		var positionComponent = this.entity.getComponent("position");

		//Calculate the new position
		var newPosition = positionComponent.position.combine(movement);

		//Tell the movement system that you want to move to the new position
		this.game.staticSystems.movementSystem.handleSingleEntity(this.entity, newPosition);

        //Loop through each dynamic system
        for(var s = 0; s < this.game.dynamicSystems.length; s++) {

            //Update the current system
            this.game.dynamicSystems[s].update();

        }

		//Unlock the scheduler because the player has moved
		this.scheduler.unlock();

	},

	/**
	 * Function that is bound to the 'pickup' key and gets
	 * executed every time the user presses it.
	 * @protected
	 */
	pickUp: function() {

		//Tell the inventory system to handle a pickup for this entity
		this.game.staticSystems.inventorySystem.pickUp(this.entity, false);

	},
	
	/**
	 * Function that is bound to the 'dropdown' key and gets
	 * executed every time the user presses it.
	 * @protected
	 */
	dropDown: function() {

		//Tell the inventory system to handle a dropdown for this entity
		this.game.staticSystems.inventorySystem.dropDown(this.entity);

	},

	/**
	 * The function that gets called when a player equips item
	 * @protected
	 *
	 * @param {String} slot - The slot from quickslot bar the entities are being equiped
	 */
	equip: function(slot) {

		//Get text correspondent to this slot
		var text = slot.substr(slot.length - 1);
		
		//Get index correspondent with this slot
		var index = parseInt(text) - 1;

		//Tell the inventory system to handle a equip for this entity
		this.game.staticSystems.inventorySystem.equip(this.entity, index);

	},

	/**
	 * Function that is bound to the 'wait' key and makes the player skip a turn
	 * @protected
	 */
	wait: function() {

		//Unlock the scheduler because the player has moved
		this.scheduler.unlock();

	}

};

//Export the Browserify module
module.exports = KeyboardControl;

