import { PropFactory } from '../factories/propfactory.js';
import { DecorationFactory } from '../factories/decorationfactory.js';
import { EnemyFactory } from '../factories/enemyfactory.js';
import { Vector2 } from '../geometry/vector2.js';
import { Utils } from '../core/utils.js';

/**
 * The object that is responsible for decorating the map.
 *
 * @param {Game} game - Reference to the current game object.
 */
export class MapDecorator {
  constructor(game) {
    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Array} tileArray - An array that stores which bitwise numbers should get certain tiles from the tileset.
     */
    this.tileArray = [];

    this.initialize();
  }

  /**
   * Perform the needed actions before decorating the map.
   *
   * @private
   */
  initialize() {
    // Filling the tileArray used by the auto tiling in the setTileNumbers function, a more detailed explanation can be found there.
    this.tileArray['wall_single'] = [206];
    this.tileArray['wall_single_alone'] = [
      124,
      182,
      214,
      222,
      238,
      239,
      246,
      252,
      254,
      255,
    ];
    this.tileArray['wall_pillar_left'] = [125, 204, 212, 253];
    this.tileArray['wall_corner_left'] = [76, 92, 148, 156, 220, 221];
    this.tileArray['wall_top_end'] = [123, 187, 217, 243, 249, 251];
    this.tileArray['wall_top_continue'] = [
      58,
      106,
      122,
      154,
      186,
      200,
      202,
      218,
      234,
      250,
    ];
    this.tileArray['wall_corner_left_down'] = [25, 89, 57, 97, 105, 113, 121];
    this.tileArray['wall_left_continue'] = [24, 72, 88];
    this.tileArray['wall_corner_right'] = [
      100,
      102,
      134,
      166,
      183,
      198,
      228,
      230,
      231,
      247,
    ];
    this.tileArray['wall_corner_both'] = [192];
    this.tileArray['pillar_right'] = [32];
    this.tileArray['pillar_left'] = [16];
    this.tileArray['pillar_both'] = [48];
    this.tileArray['wall'] = [
      17,
      33,
      49,
      68,
      85,
      101,
      117,
      132,
      149,
      161,
      165,
      181,
      196,
      213,
      229,
      245,
    ];
    this.tileArray['wall_corner_right_down'] = [
      35,
      51,
      145,
      147,
      163,
      177,
      179,
    ];
    this.tileArray['wall_right_continue'] = [34, 162, 130];
    this.tileArray['wall_continue_left_corner'] = [64, 80];
    this.tileArray['wall_continue_right_corner'] = [128, 160];
    this.tileArray['wall_corner_left_down_corner_right'] = [96];
    this.tileArray['wall_continue_left_corner_right_right'] = [152, 216];
    this.tileArray['wall_corner_right_corner_left_up'] = [144];
    this.tileArray['wall_continue_left_corner_right'] = [104, 120];
    this.tileArray['wall_continue_right_corner_left'] = [50, 146, 178];
    this.tileArray['wall_corner_right_corner_left'] = [98, 194, 226];
  }

  /**
   * A function that starts the decorating of the map, calling all the necessary functions.
   *
   * @public
   */
  decorateMap() {
    this.placeEntrance();
    this.placeExit();

    this.setTileNumbers();

    this.generateDoors();

    this.populateDungeon();
  }

  /**
   * This function sets the correct tileset row and number for each tile.
   *
   * The key of the tileArray is representing the tile on the tileset.
   * The values represent the results that can come out of the bitwise calculation of surrounding tiles.
   * Calculating these values is rather easy following this graph:
   *
   * 16 - 1 - 32
   *  8 - x - 2
   * 64 - 4 - 128
   *
   * X is the tile that is currently being checked. For every floor tile that surrounds the current tile
   * a certain value is added. For example: If there are floor tiles, above, left and bottom left of the current tile
   * you end up with the number 74. This always describes an unique layout on the map and therefore translates to a certain tile on the tileset.
   *
   * @private
   */
  setTileNumbers() {
    const map = this.game.map;

    for (let x = 0; x < map.settings.tilesX; x++) {
      for (let y = 0; y < map.settings.tilesY; y++) {
        if (map.tiles[x][y].type === 1) {
          //Get the tile at the location of the possible door location
          //TODO: Write a function on the map that returns the surrounding tiles
          const tileLeft = this.game.map.tiles[x - 1][y];
          const tileRight = this.game.map.tiles[x + 1][y];
          const tileDown = this.game.map.tiles[x][y + 1];
          const tileUp = this.game.map.tiles[x][y - 1];
          const tileUpperLeft = this.game.map.tiles[x - 1][y - 1];
          const tileUpperRight = this.game.map.tiles[x + 1][y - 1];
          const tileLowerLeft = this.game.map.tiles[x - 1][y + 1];
          const tileLowerRight = this.game.map.tiles[x + 1][y + 1];

          //Start out with tile number 0
          let tileNumber = 0;

          //Check every tile and increment a value when it is a floor typed tile
          if (tileUp.type === 2) {
            tileNumber += 1;
          }
          if (tileRight.type === 2) {
            tileNumber += 2;
          }
          if (tileDown.type === 2) {
            tileNumber += 4;
          }
          if (tileLeft.type === 2) {
            tileNumber += 8;
          }
          if (tileUpperLeft.type === 2) {
            tileNumber += 16;
          }
          if (tileUpperRight.type === 2) {
            tileNumber += 32;
          }
          if (tileLowerLeft.type === 2) {
            tileNumber += 64;
          }
          if (tileLowerRight.type === 2) {
            tileNumber += 128;
          }

          for (let index in this.tileArray) {
            //If the value matches, we choose the key number of this array as the corresponding tile on the spritesheet
            if (this.tileArray[index].indexOf(tileNumber) !== -1) {
              //Set the tile number to the corresponding tile
              map.tiles[x][y].tileNumber = index;

              //Chose a random row, 0 or 1. This is to add a little more variety in the tiles
              map.tiles[x][y].tileRow = Utils.randomNumber(0, 1);

              const rand = Utils.randomNumber(1, 2);

              const textureName = index + '_' + rand + '.png';

              map.pixitiles[x][y].texture = PIXI.Texture.fromFrame(textureName);

              break;
            }
          }
        } else if (map.tiles[x][y].type === 2) {
          const random = Utils.randomNumber(1, 4);

          const texturename = 'floor_' + random + '.png';

          this.game.map.pixitiles[x][y].texture = PIXI.Texture.fromFrame(
            texturename,
          );
        }

        if (map.tiles[x][y].type === 2) {
          if (Utils.randomNumber(0, 100) >= 80) {
            const grassEntity = DecorationFactory.newGrass(
              this.game,
              new Vector2(x, y),
            );

            map.tiles[x][y].add(grassEntity);

            map.entities.add(grassEntity);
          }
        }
      }
    }
  }

  /**
   * Get the first room on the roomsToExit list and turns it into the entrance room.
   *
   * @private
   */
  placeEntrance() {
    const entrancePosition = this.game.map.roomsToExit[0].getRandomPosition();

    const entranceEntity = PropFactory.newEntrance(this.game, entrancePosition);

    this.game.map.entities.add(entranceEntity);

    this.game.map.entrance = entrancePosition;
  }

  /**
   * Get the last room on the roomsToExit list and turns it into the exit room.
   *
   * @private
   */
  placeExit() {
    const exitPosition = this.game.map.roomsToExit[
      this.game.map.roomsToExit.length - 1
    ].getRandomPosition();

    const exitEntity = PropFactory.newExit(this.game, exitPosition);

    this.game.map.entities.add(exitEntity);

    this.game.map.exit = exitPosition;
  }

  /**
   * Generate some doors and spread them out over the map!
   *
   * @private
   */
  generateDoors() {
    // Loop through all possible door locations
    // TODO: Don't store the possible door locations in the mapfactory, store it in the map that is being created and decorated.
    for (
      let i = 0;
      i < this.game.mapFactory.possibleDoorLocations.length;
      i++
    ) {
      const doorLocation = this.game.mapFactory.possibleDoorLocations[i];

      // Get the tile at the location of the possible door location.
      // TODO: Write a function on the map that returns tiles in a certain radius.
      const tileLeft = this.game.map.tiles[doorLocation.x - 1][doorLocation.y];
      const tileRight = this.game.map.tiles[doorLocation.x + 1][doorLocation.y];
      const tileUp = this.game.map.tiles[doorLocation.x][doorLocation.y - 1];
      const tileDown = this.game.map.tiles[doorLocation.x][doorLocation.y + 1];

      const randomNumber = Utils.randomNumber(0, 100);

      // If the tiles left and right are walls and the tiles above and below are floors.
      if (
        tileLeft.type === 1 &&
        tileRight.type === 1 &&
        tileUp.entities.length === 0 &&
        tileDown.entities.length === 0 &&
        tileUp.type === 2 &&
        tileDown.type === 2 &&
        randomNumber > 50
      ) {
        this.placeDoor(doorLocation, false);
        // If the tiles left and right are floors and the tiles above and below are walls.
      } else if (
        tileLeft.type === 2 &&
        tileRight.type === 2 &&
        tileLeft.entities.length === 0 &&
        tileRight.entities.length === 0 &&
        tileUp.type === 1 &&
        tileDown.type === 1 &&
        randomNumber > 50
      ) {
        this.placeDoor(doorLocation, true);
      }
    }
  }

  /**
   * Place the entrance and exit objects on the map.
   *
   * @private
   */
  placeDoor(position, orientation) {
    const tileAtPosition = this.game.map.tiles[position.x][position.y];

    const doorEntity = PropFactory.newDoor(this.game, position);

    if (orientation === true) {
      doorEntity.textureName = 'door_vertical_closed.png';

      doorEntity.sprite.texture = PIXI.Texture.fromFrame(
        'door_vertical_closed.png',
      );
    }

    this.game.map.entities.add(doorEntity);

    tileAtPosition.add(doorEntity);

    tileAtPosition.blockLight = true;
  }

  /**
   * Populate the dungeon with enemies and or friendlies.
   * This function is due to some heavy changes.
   *
   * @private
   */
  populateDungeon() {
    for (let i = 0; i < this.game.map.mediumRooms.length; i++) {
      const room = this.game.map.mediumRooms[i];

      for (let x = room.x1; x < room.x2; x++) {
        for (let y = room.y1; y < room.y2; y++) {
          if (this.game.map.tiles[x][y].type === 2) {
            if (Utils.randomNumber(0, 100) >= 90) {
              var enemyEntity = EnemyFactory.newDwarf(
                this.game,
                new Vector2(x, y),
              );

              this.game.map.tiles[x][y].add(enemyEntity);

              this.game.map.entities.add(enemyEntity);

              this.game.scheduler.add(enemyEntity, true);
            }
          }
        }
      }
    }

    for (let b = 0; b < this.game.map.hardRooms.length; b++) {
      const hardRoom = this.game.map.hardRooms[b];

      for (let xPos = hardRoom.x1; xPos < hardRoom.x2; xPos++) {
        for (let yPos = hardRoom.y1; yPos < hardRoom.y2; yPos++) {
          if (this.game.map.tiles[xPos][yPos].type === 2) {
            if (Utils.randomNumber(0, 100) >= 90) {
              enemyEntity = EnemyFactory.newSkeleton(
                this.game,
                new Vector2(xPos, yPos),
              );

              this.game.map.tiles[xPos][yPos].add(enemyEntity);

              this.game.map.entities.add(enemyEntity);

              this.game.scheduler.add(enemyEntity, true);
            }
          }
        }
      }
    }
  }
}
