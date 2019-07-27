import { Vector2 } from '../../geometry/vector2.js';

/**
 * The lightmap system recalculates the lightmap and makes sure that explored areas are visible.
 *
 * @param {Game} game - Reference to the currently running game.
 */
export class LightMap extends PIXI.ParticleContainer {
  constructor(game) {
    super(3000, {
      alpha: true
    });
    
    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Object} mapSize - The size of the current map.
     */
    this.mapSize = {x: game.map.settings.tilesX, y: game.map.settings.tilesY};

    /**
     * @property {Object} tiles - Object that is being used to store tile data before returning it.
     */
    this.tiles = [];

    /**
     * @property {Array} pixitiles - An array that holds all lightmap objects.
     */
    this.pixitiles = [];

    /**
     * @property {Array} mult - Multipliers for transforming coordinates into other octants.
     */
    this.mult = [
      [1, 0, 0, -1, -1, 0, 0, 1],
      [0, 1, -1, 0, 0, -1, 1, 0],
      [0, 1, 1, 0, 0, -1, -1, 0],
      [1, 0, 0, 1, -1, 0, 0, -1]
    ];

    /**
     * @property {Boolean} tilesLit - Boolean to see if game tiles have been lit.
     */
    this.tilesLit = false;

    this.initialize();
  }

  /**
   * Initialize the layout of the lightmap.
   * 
   * @private
   */
  initialize() {
    for(let x = 0; x < this.game.map.settings.tilesX; x++) {
      this.pixitiles[x] = [];

      for(let y = 0; y < this.game.map.settings.tilesY; y++) {
        this.pixitiles[x][y] = PIXI.Sprite.fromFrame('void.png');

        this.pixitiles[x][y].position.x = x * this.game.map.settings.tileSize;
        this.pixitiles[x][y].position.y = y * this.game.map.settings.tileSize;

        this.addChild(this.pixitiles[x][y]);
      }
    }

    this.game.world.addChild(this);
  }

  /**
   * Function that gets called when the game continues one tick.
   * 
   * @public
   */
  update() {
    if(this.game.isActive) {
      const entities = this.game.map.entities.get("lightSource", "position");

      for(let i = 0; i < entities.length; i++) {
        this.handleSingleEntity(entities[i]);
      }

      this.tilesLit = true;
    } else if (this.tilesLit) {
      this.clear();
      this.tilesLit = false;
    }
  };

  /**
   * Performs the needed operations for this specific system on one entity.
   * 
   * @public
   *
   * @param {Entity} entity - The entity that is being processed by this system.
   */
  handleSingleEntity(entity) {
    const lightSourceComponent = entity.getComponent("lightSource");
    const positionComponent = entity.getComponent("position");

    const newLight = this.clear().concat(this.calculate(lightSourceComponent, positionComponent.position));

    for(let l = 0; l < newLight.length; l++) {
      if (!this.game.map.tiles[newLight[l].x][newLight[l].y].explored) {
        this.pixitiles[newLight[l].x][newLight[l].y].alpha = 1 - newLight[l].lightLevel;

        this.game.map.tiles[newLight[l].x][newLight[l].y].explored = true;
      } else {
        if (1 - newLight[l].lightLevel < 0.7) {
          this.pixitiles[newLight[l].x][newLight[l].y].alpha = 1 - newLight[l].lightLevel;
          this.game.map.tiles[newLight[l].x][newLight[l].y].lightLevel = newLight[l].lightLevel;
        } else {
          this.pixitiles[newLight[l].x][newLight[l].y].alpha = 0.7;
          this.game.map.tiles[newLight[l].x][newLight[l].y].lightLevel = 0.7;
        }
      }
    }
  };

  /**
   * Function that checks if a tile blocks light or not.
   * 
   * @private
   *
   * @param {Number} x - The X position of the tile.
   * @param {Number} y - The Y position of the tile.
   *
   * @return {Boolean} True when the tile does block light, false when the tile doesn't block light.
   */
  doesTileBlock(x, y) {
    return this.game.map.tiles[x][y].blockLight;
  };

  /**
   * Function to calculate a new octant.
   * 
   * @private
   */
  calculateOctant(position, row, start, end, lightsource, xx, xy, yx, yy, id) {
    this.tiles.push({
      x: position.x,
      y: position.y,
      lightLevel: 0
    });

    let newStart = 0;

    if(start < end) {
      return;
    }

    const radiusSquared = lightsource.radius * lightsource.radius;

    for(let i = row; i < lightsource.radius + 1; i++) {
      let dx = -i - 1;
      const dy = -i;

      let blocked = false;

      while(dx <= 0) {

        dx += 1;

        const X = position.x + dx * xx + dy * xy;
        const Y = position.y + dx * yx + dy * yy;

        if (X < this.mapSize.x && X >= 0 && Y < this.mapSize.y && Y >= 0) {
          const lSlope = (dx - 0.5) / (dy + 0.5);
          const rSlope = (dx + 0.5) / (dy - 0.5);

          if (start < rSlope) {
            continue;
          } else if (end > lSlope) {
            break;
          } else {
            if (dx * dx + dy * dy < radiusSquared) {
              const pos1 = new Vector2(X, Y);
              const pos2 = position;
              const d = (pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y);

              this.tiles.push({
                x: X,
                y: Y,
                lightLevel: (lightsource.gradient === false) ? 1 : (1 - (d / (lightsource.radius * lightsource.radius)))
              });
            }

            if (blocked) {
              if (this.doesTileBlock(X, Y)) {
                newStart = rSlope;
                continue;
              } else {
                blocked = false;
                start = newStart;
              }
            } else {
              if (this.doesTileBlock(X, Y) && i < lightsource.radius) {
                blocked = true;
                this.calculateOctant(position, i + 1, start, lSlope, lightsource, xx, xy, yx, yy, id + 1);

                newStart = rSlope;
              }
            }
          }
        }
      }

      if (blocked) {
        break;
      }
    }
  };

  /**
   * Sets flag lit to false on all tiles within radius of position specified.
   * 
   * @private
   *
   * @return {Array} An empty array.
   */
  clear() {
	let i = this.tiles.length;
	
    while(i--) {
      this.tiles[i].lightLevel = 0;
    }

	const o = this.tiles;
	
    this.tiles = [];
	
	return o;
  };

  /**
   * Calculate the new lightning from this lightsource.
   * 
   * @private
   *
   * @param {LightSource} lightSource - The lightsource that is being calculated.
   * @param {Position} position - The position of the lightsource.
   *
   * @return {Array} An array containing all tiles.
   */
  calculate(lightSource, position) {
    for(let i = 0; i < 8; i++) {
      this.calculateOctant(position, 1, 1.0, 0.0, lightSource,
        this.mult[0][i], this.mult[1][i], this.mult[2][i], this.mult[3][i], 0);
    }

    this.tiles.push({
      x: position.x,
      y: position.y,
      lightLevel: 1
    });

    return this.tiles;
  };
};