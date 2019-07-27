/**
 * A single tile on the map, contains data about it's location and origin.
 *
 * @param {Number} type - The kind of tile: wall, floor, void, etc.
 * @param {Boolean} blockLight - Does this tile block light, yes or no.
 * @param {Room} room - The room that this tile belongs to.
 */
export class Tile {
  constructor(type, blockLight, room) {
    /**
     * @property {Number} type - The kind of tile, wall, floor, void, etc.
     */
    this.type = type;

    /**
     * @property {Boolean} blockLight - Does this tile block light, yes or no.
     */
    this.blockLight = blockLight;

    /**
     * @property {Null|Room} belongsTo - The room that this tile belongs to.
     */
    this.belongsTo = room || null;

    /**
     * @property {Array} entities - An array that holds all entities on this tile.
     */
    this.entities = [];

    /**
     * @property {Number} lightLevel - The brightness of the current tile.
     */
    this.lightLevel = 0;

    /**
     * @property {Boolean} explored - Boolean if a tile has already been explorer by the player.
     */
    this.explored = false;
  }

  /**
   * Function that adds an entity to a tile.
   *
   * @public
   *
   * @param {Entity} entity - The entity being added to a tile.
   */
  add(entity) {
    this.entities.push(entity);
  }

  /**
   * Function that removes an entity from a tile.
   *
   * @public
   *
   * @param {Entity} entity - The entity being removed from a tile.
   *
   * @return {Boolean} Returns true on success, returns false on failure.
   */
  remove(entity) {
    const index = this.entities.indexOf(entity);

    if (index === -1) {
      return false;
    } else {
      this.entities.splice(index, 1);

      return true;
    }
  }
}
