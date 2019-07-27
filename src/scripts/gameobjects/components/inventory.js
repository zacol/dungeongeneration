/**
 * The Inventory component is responsible for keeping track of what an entity carries along with him.
 */
export class Inventory {
  constructor() {
    /**
     * @property {String} name - The name of this system. This field is always required!
     */
    this.name = 'inventory';

    /**
     * @property {Number} maxSlots - The maximum amount of slots in this inventory.
     */
    this.maxSlots = 9;

    /**
     * @property {Array} slots - An array that holds all items in this inventory.
     */
    this.slots = [];

    /**
     * @property {Object} active - The item that is currently using by entity.
     */
    this.active = null;
  }

  /**
   * Add a new item to the inventory.
   *
   * @public
   *
   * @param {Object} item - The new item that is added to this inventory.
   */
  add(item) {
    this.slots.push(item);
  }

  /**
   * Remove an item from the inventory.
   *
   * @public
   *
   * @param {Object} item - The item that is removed from this inventory.
   */
  remove(index) {
    this.slots.splice(index, 1);

    this.active = null;
  }

  setActive(index) {
    this.active = this.slots[index];
  }

  /**
   * Function to clear the entire inventory.
   *
   * @public
   */
  clear() {
    this.slots = [];
  }

  /**
   * Check whether the inventory is full or not.
   *
   * @public
   *
   * @return {Boolean} True is full, false is not.
   */
  isFull() {
    return this.slots.length >= this.maxSlots;
  }

  /**
   * Check whether the inventory is empty or not.
   *
   * @public
   *
   * @return {Boolean} True is empty, false is not.
   */
  isEmpty() {
    return this.slots.length === 0;
  }
}
