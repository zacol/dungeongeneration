//Because Browserify encapsulates every module, use strict won't apply to the global scope and break everything
'use strict';

//Require necessary modules
var Utils = require('./utils.js'),
	UI = require('../ui/ui.js'),
	Camera = require('./camera.js').Camera,
	World = require('./world.js'),
	SizeManager = require('./sizemanager.js').SizeManager,
	Map = require('../tilemap/map.js').Map,
	PlayerFactory = require('../factories/playerfactory.js').PlayerFactory,
	ItemFactory = require('../factories/itemfactory.js').ItemFactory,
	Vector2 = require('../geometry/vector2.js').Vector2,
	Group = require('../gameobjects/group.js').Group,
	Combat = require('../gameobjects/systems/combat.js'),
	LightMap = require('../gameobjects/systems/lightmap.js'),
	Movement = require('../gameobjects/systems/movement.js'),
	Open = require('../gameobjects/systems/open.js'),
	PathFinding = require('../gameobjects/systems/pathfinding.js'),
	statusEffectsSystem = require('../gameobjects/systems/statuseffects.js'),
	inventorySystem = require('../gameobjects/systems/inventory.js'),
	MapFactory = require('../tilemap/mapfactory.js'),
	MapDecorator = require('../tilemap/mapdecorator.js'),
	Scheduler = require('../time/scheduler.js'),
	Keyboard = require('../input/keyboard.js').Keyboard,
	StatusFire = require('../gameobjects/statuseffects/fire.js');

/**
 * Game Constructor
 *
 * @class Game
 * @classdesc The heart of this roguelike game! In here we provide access to
 * all the other objects and function, and we handle the startup of the game
 *
 * @param {Object} userSettings - The settings that the user provides
 */
export class Game {
	constructor(userSettings) {
		this.isInitialized = false;
		this.isActive = false;
		this.map = null;
		this.mapFactory = null;
		this.mapDecorator = null;
		this.keyboard = null;
		this.scheduler = null;
		this.staticSystems = {};
		this.dynamicSystems = [];
		this.player = null;
		this.world = null;
		this.UI = null;
		this.sizeManager = null;
		this.stage = null;
		this.renderer = null;
		this.settings = {
			tilesX: 60, //The number of horizontal tiles on this map
			tilesY: 40, //The number of vertical tiles on this map
			zoom: 3 //The scale of the map
		};
		this.settings = Utils.extend(this.settings, userSettings);
		this.load();
	}

	load() {
		PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

		const loader = PIXI.loader;

        loader.add([
            'assets/tilesets/dungeon.json',
            'assets/sprites/entities.json',
            'assets/sprites/items.json',
            'assets/tilesets/decoration.json',
            'assets/tilesets/ui.json'
        ]);

        loader.once('complete', this.initialize.bind(this));

		loader.load();
	}

	initialize() {
		if(this.isInitialized) {
			return;
		}

		this.stage = new PIXI.Container();

        this.sizeManager = new SizeManager(this);

		this.renderer = PIXI.autoDetectRenderer(this.sizeManager.width, this.sizeManager.height);

		document.body.appendChild(this.renderer.view);

		this.world = new World(this);

		this.keyboard = new Keyboard();

		this.scheduler = new Scheduler();

		this.initializeMap();

		this.staticSystems.movementSystem = new Movement(this);

		this.staticSystems.pathfindingSystem = new PathFinding(this);

		this.staticSystems.combatSystem = new Combat(this);

		this.staticSystems.openSystem = new Open(this);

		this.staticSystems.statusEffectsSystem = new statusEffectsSystem(this);

		this.staticSystems.inventorySystem = new inventorySystem(this);

		this.dynamicSystems.push(new LightMap(this));

		this.initializePlayer();

		this.UI = new UI(this);

		this.isInitialized = true;

		this.isActive = true;

        this.update();

        for(var s = 0; s < this.dynamicSystems.length; s++) {
            this.dynamicSystems[s].update();
        }
	}

	initializeMap() {
		this.map = new Map(this);

		this.mapFactory = new MapFactory(this);

		this.mapDecorator = new MapDecorator(this);

		this.map.entities = new Group(this);

		this.mapFactory.generateRooms();

		this.mapDecorator.decorateMap();

		this.world.addChild(this.map.entities);
	}

	initializePlayer() {
        const startPosition = new Vector2(this.map.entrance.x, this.map.entrance.y);

        const playerControls = {
            "left": 65,
            "right": 68,
            "up": 87,
            "down": 83,
            "pickup": 69,
            "dropdown": 82,
			"wait": 32,
			"equip1": 49,
			"equip2": 50,
			"equip3": 51,
			"equip4": 52,
			"equip5": 53,
			"equip6": 54,
			"equip7": 55,
			"equip8": 56,
			"equip9": 57,
        };

        this.player = PlayerFactory.newPlayerWarrior(this, startPosition, playerControls);

		this.map.entities.add(this.player);

		const startingTile = this.map.tiles[startPosition.x][startPosition.y];

		startingTile.add(this.player);

		this.staticSystems.statusEffectsSystem.addStatusEffect(this.player, new StatusFire());

		this.scheduler.add(this.player, true);

		this.world.camera.follow(this.player, this.sizeManager.width / 2, this.sizeManager.height / 2);
	}

	update() {
		this.UI.stats.begin();

		if(this.isInitialized && !this.isActive) {
			this.restart();
		}

		requestAnimationFrame(this.update.bind(this));

		while(!this.scheduler.lockCount) {
			this.scheduler.tick();
		}

		this.world.update();

		this.renderer.render(this.stage);

		this.UI.stats.end();

	}

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
};