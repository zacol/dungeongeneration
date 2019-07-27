import {
  Container,
  Sprite,
} from 'pixi.js';

import { Tile } from './tile.js';

/**
 * The object that holds all the rooms, corridors and tiles.
 *
 * @param {Game} game - Reference to the current game object.
 * 
 * @extends Container
 */
export class Map extends Container {
  constructor(game) {
    super();

    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Group} entities - Holds all the entities of this game.
     */
    this.entities = null;

    /**
     * @property {Object} settings - The empty settings object.
     */
    this.settings = {};

    /**
     * @property {Array} rooms - An array that holds all room objects.
     */
    this.rooms = [];

    /**
     * @property {Array} tiles - An array that holds all tile objects.
     */
    this.tiles = [];

    /**
     * @property {Array} pixitiles - An array that holds all tile objects.
     */
    this.pixitiles = [];

    /**
     * @property {Vector2} entrance - An object that holds the position of the entrance of this map.
     */
    this.entrance = null;

    /**
     * @property {Vector2} exit - An object that holds the position of the exit of this map.
     */
    this.exit = null;

    /**
     * @property {Array} allRooms - An array that holds all the rooms on this map.
     */
    this.allRooms = [];

    /**
     * @property {Array} mediumRooms - An array that holds all the medium rooms on this map.
     */
    this.mediumRooms = [];

    /**
     * @property {Array} hardRooms - An array that holds all the hard rooms on this map.
     */
    this.hardRooms = [];

    /**
     * @property {Array} roomsToExit - An array that holds all the rooms that go from the entrance to the exit on this map.
     */
    this.roomsToExit = [];

    this.initialize();
  }

  /**
   * Initialize the layout of the map, filling it with empty tiles.
   *
   * @private
   */
  initialize() {
    this.settings = {
      tilesX: 60, // The number of horizontal tiles on this map.
      tilesY: 40, // The number of vertical tiles on this map.
      tileSize: 16, // The width and height of a single tile.
      maxRooms: 15, // The maximum number of rooms on this map.
      minRoomWidth: 5, // The minimum width of a single room.
      maxRoomWidth: 8, // The maximum width of a single room.
      minRoomHeight: 5, // The minimum height of a single room.
      maxRoomHeight: 8, // The maximum height of a single room.
      roomSpacing: 1, // The length of a corridor, 0 for no corridors.
      maxMainRooms: 10,
      maxMediumRooms: 15,
      maxHardRooms: 5,
    };

    for (let x = 0; x < this.settings.tilesX; x++) {
      this.tiles[x] = [];
      this.pixitiles[x] = [];

      for (let y = 0; y < this.settings.tilesY; y++) {
        this.tiles[x][y] = new Tile(0, true, 0, 0);

        this.pixitiles[x][y] = Sprite.from('void.png');

        this.pixitiles[x][y].position.x = x * this.settings.tileSize;
        this.pixitiles[x][y].position.y = y * this.settings.tileSize;

        this.addChild(this.pixitiles[x][y]);
      }
    }

    this.game.world.addChild(this);
  }

  /**
   * Function to get a tile at a position.
   *
   * @public
   *
   * @param {Vector2} position - The position that is being requested.
   *
   * @return {Tile} The tile object that has been found, empty object otherwise.
   */
  getTileAt(position) {
    let tile = this.tiles[position.x][position.y];

    if (tile) {
      return tile;
    } else {
      return new Tile();
    }
  }

  /**
   * Function to check if one position is inside the maps boundary.
   *
   * @public
   *
   * @param {Vector2} position - The position that is being requested.
   *
   * @return {Boolean} Returns true if the position is within this map, returns false if it isn't.
   */
  insideBounds(position) {
    return (
      position.x > 0 &&
      position.x < this.settings.tilesX &&
      position.y > 0 &&
      position.y < this.settings.tilesY
    );
  }

  /**
   * Function that returns an array with only the tiletypes of every position. Used for EasyStar Pathfinding.
   *
   * @public
   *
   * @return {Array} Array with only the tiletypes of every position on the map.
   */
  typeList() {
    const mapTypeList = [];

    for (let y = 0; y < this.settings.tilesY; y++) {
      mapTypeList.push([]);

      for (let x = 0; x < this.settings.tilesX; x++) {
        mapTypeList[y][x] = this.tiles[x][y].type;
      }
    }

    return mapTypeList;
  }

  /**
   * Check if a single room overlaps a room that is already on the map and if it's inside the maps boundaries.
   *
   * @public
   *
   * @param {Room} room - The room object that has to be checked.
   *
   * @return {Boolean} True when the room intersects with an existing room, false when it's not intersecting.
   */
  roomFits(room) {
    if (
      room.x1 < 1 ||
      room.x2 > this.settings.tilesX - 1 ||
      room.y1 < 1 ||
      room.y2 > this.settings.tilesY - 1
    ) {
      return false;
    }

    for (let i = 0; i < this.allRooms.length; i++) {
      if (
        room.x1 <= this.allRooms[i].x2 &&
        room.x2 >= this.allRooms[i].x1 &&
        room.y1 <= this.allRooms[i].y2 &&
        room.y2 >= this.allRooms[i].y1
      ) {
        return false;
      }
    }

    return true;
  }
}
