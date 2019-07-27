import {
  autoDetectRenderer,
  Container,
  Loader,
  SCALE_MODES,
  settings,
} from 'pixi.js';

import { UI } from '../ui/ui.js';
import { World } from './world.js';
import { SizeManager } from './sizemanager.js';
import { Map } from '../tilemap/map.js';
import { PlayerFactory } from '../factories/playerfactory.js';
import { Vector2 } from '../geometry/vector2.js';
import { Group } from '../gameobjects/group.js';
import { Combat } from '../gameobjects/systems/combat.js';
import { LightMap } from '../gameobjects/systems/lightmap.js';
import { Movement } from '../gameobjects/systems/movement.js';
import { Open } from '../gameobjects/systems/open.js';
import { PathFinding } from '../gameobjects/systems/pathfinding.js';
import { StatusEffectsSystem } from '../gameobjects/systems/statuseffects.js';
import { Inventory } from '../gameobjects/systems/inventory.js';
import { MapFactory } from '../tilemap/mapfactory.js';
import { MapDecorator } from '../tilemap/mapdecorator.js';
import { Scheduler } from '../time/scheduler.js';
import { Keyboard } from '../input/keyboard.js';
import { StatusFire } from '../gameobjects/statuseffects/fire.js';

/**
 * The heart of this roguelike game! In here we provide access to
 * all the other objects and function, and we handle the startup of the game.
 *
 * @param {Object} userSettings - The settings that the user provides.
 */
export class Game {
  constructor(userSettings) {
    /**
     * @property {Boolean} isInitialized - Boolean to see if the game is already initialized.
     */
    this.isInitialized = false;

    /**
     * @property {Boolean} isActive - Boolean to see if the game is currently active.
     */
    this.isActive = false;

    /**
     * @property {Map} map - Reference to the current map.
     */
    this.map = null;

    /**
     * @property {MapFactory} mapFactory - The mapFactory is responsible for creating rooms and corridors on this map.
     */
    this.mapFactory = null;

    /**
     * @property {MapDecorator} mapDecorator - The mapDecorator is responsible for decorating the map with props and enemies.
     */
    this.mapDecorator = null;

    /**
     * @property {Keyboard} keyboard - Reference to the keyboard object.
     */
    this.keyboard = null;

    /**
     * @property {Scheduler} scheduler - Reference to the Scheduler object.
     */
    this.scheduler = null;

    /**
     * @property {Object} staticSystems - An object with all the static systems.
     */
    this.staticSystems = {};

    /**
     * @property {Array} dynamicSystems - An array with all the current systems that need to be looped.
     */
    this.dynamicSystems = [];

    /**
     * @property {Entity} player - Reference to the player object.
     */
    this.player = null;

    /**
     * @property {World} world - Reference to the World object.
     */
    this.world = null;

    /**
     * @property {UI} stage - The UI object.
     */
    this.UI = null;

    /**
     * @property {PIXI.Stage} stage - The Pixi stage object.
     */
    this.stage = null;

    /**
     * @property {SizeManager} sizeManager - Reference to the Size Manager object.
     */
    this.sizeManager = null;

    /**
     * @property {PIXI.Renderer} renderer - The Pixi renderer object.
     */
    this.renderer = null;

    /**
     * @property {Object} settings - The default settings.
     */
    this.settings = {
      tilesX: 60, //The number of horizontal tiles on this map
      tilesY: 40, //The number of vertical tiles on this map
      zoom: 3, //The scale of the map
    };

    this.settings = {
      ...this.settings,
      ...userSettings,
    };

    this.load();
  }

  /**
   * Pre-load all assets required in the game.
   *
   * @private
   */
  load() {
    settings.SCALE_MODE = SCALE_MODES.NEAREST;

    const loader = Loader.shared;

    loader.add([
      'assets/tilesets/dungeon.json',
      'assets/sprites/entities.json',
      'assets/sprites/items.json',
      'assets/tilesets/decoration.json',
      'assets/tilesets/ui.json',
    ]);

    loader.once('complete', this.initialize.bind(this));

    loader.load();
  }

  /**
   * Initialize the game, create all objects.
   *
   * @private
   */
  initialize() {
    if (this.isInitialized) {
      return;
    }

    this.stage = new Container();

    this.sizeManager = new SizeManager(this);

    this.renderer = autoDetectRenderer({
      width: this.sizeManager.width,
      height: this.sizeManager.height,
      transparent: true,
    });

    document.body.appendChild(this.renderer.view);

    this.world = new World(this);

    this.keyboard = new Keyboard();

    this.scheduler = new Scheduler();

    this.initializeMap();

    this.staticSystems.movementSystem = new Movement(this);

    this.staticSystems.pathfindingSystem = new PathFinding(this);

    this.staticSystems.combatSystem = new Combat(this);

    this.staticSystems.openSystem = new Open(this);

    this.staticSystems.statusEffectsSystem = new StatusEffectsSystem(this);

    this.staticSystems.inventorySystem = new Inventory(this);

    this.dynamicSystems.push(new LightMap(this));

    this.initializePlayer();

    this.UI = new UI(this);

    this.isInitialized = true;

    this.isActive = true;

    this.update();

    for (let s = 0; s < this.dynamicSystems.length; s++) {
      this.dynamicSystems[s].update();
    }
  }

  /**
   * Creates and populates a new map.
   *
   * @private
   */
  initializeMap() {
    this.map = new Map(this);

    this.mapFactory = new MapFactory(this);

    this.mapDecorator = new MapDecorator(this);

    this.map.entities = new Group(this);

    this.mapFactory.generateRooms();

    this.mapDecorator.decorateMap();

    this.world.addChild(this.map.entities);
  }

  /**
   * Initializes and adds the player to the game.
   *
   * @private
   */
  initializePlayer() {
    const startPosition = new Vector2(this.map.entrance.x, this.map.entrance.y);

    const playerControls = {
      left: 65,
      right: 68,
      up: 87,
      down: 83,
      pickup: 69,
      dropdown: 82,
      wait: 32,
      equip1: 49,
      equip2: 50,
      equip3: 51,
      equip4: 52,
      equip5: 53,
      equip6: 54,
      equip7: 55,
      equip8: 56,
      equip9: 57,
    };

    this.player = PlayerFactory.newPlayerWarrior(
      this,
      startPosition,
      playerControls,
    );

    this.map.entities.add(this.player);

    const startingTile = this.map.tiles[startPosition.x][startPosition.y];

    startingTile.add(this.player);

    this.staticSystems.statusEffectsSystem.addStatusEffect(
      this.player,
      new StatusFire(),
    );

    this.scheduler.add(this.player, true);

    this.world.camera.follow(
      this.player,
      this.sizeManager.width / 2,
      this.sizeManager.height / 2,
    );
  }

  /**
   * The game loop - All the functions that need to be executed every time the game updates.
   *
   * @private
   */
  update() {
    this.UI.stats.begin();

    if (this.isInitialized && !this.isActive) {
      this.restart();
    }

    requestAnimationFrame(this.update.bind(this));

    while (!this.scheduler.lockCount) {
      this.scheduler.tick();
    }

    this.world.update();

    this.renderer.render(this.stage);

    this.UI.stats.end();
  }

  /**
   * Restarts the game with a fresh map and player.
   *
   * @private
   */
  restart() {
    this.scheduler.clear();

    this.stage.removeChildren();

    this.world = new World(this);

    this.initializeMap();
    this.initializePlayer();

    this.UI = new UI(this);

    this.staticSystems.pathfindingSystem.game = this;
    this.staticSystems.pathfindingSystem.initialize();

    this.UI.textLog.clear();

    this.isActive = true;
  }
}
