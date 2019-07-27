/**
 * The Inventory system handles grabbing/dropping items and manages other inventory actions.
 *
 * @param {Game} game - Reference to the currently running game.
 */
export class Inventory {
  constructor(game) {
    /**
     * @property {Game} game - Reference to the current game object
     */
    this.game = game;
  }

  /**
   * Performs the pickup operations for this specific system on one entity.
   *
   * @public
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   * @param {Boolean} multiple - True if you want to pickup multiple items at once.
   */
  pickUp(entity, multiple) {
    const positionComponent = entity.getComponent('position');
    const inventoryComponent = entity.getComponent('inventory');

    if (inventoryComponent.isFull()) {
      this.game.UI.textLog.addMessage('Your inventory is full!');

      return;
    }

    const currentTile = this.game.map.getTileAt(positionComponent.position);

    const pickups = [];

    if (currentTile.entities.length > 1) {
      for (let i = 0; i < currentTile.entities.length; i++) {
        if (currentTile.entities[i].hasComponent('canPickUp')) {
          pickups.push(currentTile.entities[i]);
        }
      }
    }

    if (pickups.length === 0) {
      this.game.UI.textLog.addMessage('There is nothing here...');

      return;
    }

    this.pickUpOne(inventoryComponent, pickups.shift(), currentTile);

    if (multiple) {
      for (let p = 0; p <= pickups.length; p++) {
        this.pickUpOne(inventoryComponent, pickups.shift(), currentTile);
      }
    }
  }

  /**
   * Pickup a single entity, remove it from the map and add it to the inventory component.
   *
   * @private
   *
   * @param {Object} inventoryComponent - The inventory that picks up the provided item.
   * @param {Entity} pickup - The entity that is being picked up.
   * @param {Tile} currentTile - The tile which holds the entity being picked up.
   */
  pickUpOne(inventoryComponent, pickup, currentTile) {
    inventoryComponent.add(pickup);

    this.game.UI.textLog.addMessage(`You picked up a ${pickup.name}`);

    this.game.map.entities.remove(pickup);

    currentTile.remove(pickup);

    this.game.UI.quickslotBar.add(pickup);
  }

  /**
   * Performs the dropdown operations for this specific system on one entity.
   *
   * @public
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   */
  dropDown(entity) {
    const positionComponent = entity.getComponent('position');
    const inventoryComponent = entity.getComponent('inventory');

    if (inventoryComponent.active === null) {
      this.game.UI.textLog.addMessage('You have no selected item!');

      return;
    }

    const newPosition = positionComponent.position;

    this.dropDownOne(
      inventoryComponent,
      inventoryComponent.active,
      newPosition,
    );
  }

  /**
   * Pickup a single entity, remove it from the map and add it to the inventory component.
   *
   * @private
   *
   * @param {Object} inventoryComponent - The inventory that picks up the provided item.
   * @param {Entity} loss - The entity that is being droped down.
   * @param {Tile} newPosition - The new position which will hold the entity being droped up.
   */
  dropDownOne(inventoryComponent, loss, newPosition) {
    const currentTile = this.game.map.getTileAt(newPosition);

    const lossPositionComponent = loss.getComponent('position');
    lossPositionComponent.position = newPosition;

    const index = inventoryComponent.slots.indexOf(loss);

    inventoryComponent.remove(index);

    this.game.UI.textLog.addMessage(`You droped a ${loss.name}`);

    this.game.map.entities.add(loss);

    currentTile.add(loss);

    this.game.UI.quickslotBar.remove(index);
  }

  /**
   * Performs the equip operations for this specific system on one entity.
   *
   * @public
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   * @param {Entity} index - The index that is being selected by this system.
   */
  equip(entity, index) {
    const inventoryComponent = entity.getComponent('inventory');
    const weaponComponent = entity.getComponent('weapon');

    const item = inventoryComponent.slots[index];

    if (item === undefined) {
      this.game.UI.textLog.addMessage('This slot is empty!');

      return;
    }

    this.equipOne(inventoryComponent, weaponComponent, item, index);
  }

  /**
   * Equick a single entity.
   *
   * @private
   *
   * @param {Object} inventoryComponent - The inventory that picks up the provided item.
   * @param {Entity} item - The entity that is being equiped.
   */
  equipOne(inventoryComponent, weaponComponent, item, index) {
    const itemWeaponComponent = item.getComponent('weapon');
    weaponComponent.update(itemWeaponComponent.damage);

    inventoryComponent.setActive(index);

    this.game.UI.textLog.addMessage(`You equiped a ${item.name}`);

    this.game.UI.quickslotBar.highlight(index);
  }
}
