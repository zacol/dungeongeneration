import { TextLog } from '../ui/textlog.js';
import { QuickslotBar } from '../ui/quickslotbar.js';
import { SpellBar } from '../ui/spellbar.js';
import { TooltipElement } from '../ui/tooltipelement.js';
import { StatusEffects } from '../ui/statuseffects.js';
import { Vector2 } from '../geometry/vector2.js';

/**
 * The UI object holds all UI elements.
 *
 * @extends PIXI.Container
 */
export class UI extends PIXI.Container {
  /**
   * @param {Game} game - Reference to the currently running game.
   */
  constructor(game) {
    super();

    /**
     * @property {Game} game - Reference to the current game object.
     */
    this.game = game;

    /**
     * @property {Stats} stats - Reference to Stats object.
     */
    this.stats = null;

    /**
     * @property {TextLog} textlog - Reference to TextLog object.
     */
    this.textLog = null;

    /**
     * @property {QuickslotBar} quickslotBar - Reference to QuickslotBar object.
     */
    this.quickslotBar = null;

    /**
     * @property {SpellBar} spellbar - Reference to SpellBar object.
     */
    this.spellbar = null;

    /**
     * @property {StatusEffects} statusEffects - Reference to StatusEffects object.
     */
    this.statusEffects = null;

    /**
     * @property {PIXI.Sprite} mousePointer - Reference to the mouse pointer object.
     */
    this.mousePointer = null;

    /**
     * @property {PIXI.Container} tooltip - Reference to the tooltip object.
     */
    this.tooltip = null;

    this.initialize();
  }

  /**
   * Initialize the UI elements and add them to this container.
   *
   * @private
   */
  initialize() {
    this.initializeStats();
    this.initializeTextLog();
    this.initializeBars();
    this.initializeStatusEffects();
    this.initializeMousePointer();
    this.initializeTooltip();

    this.game.stage.interactive = true;
    this.game.stage.mousemove = this.mouseMove.bind(this);

    this.game.stage.addChild(this);
  }

  /**
   * Initialize the UI Stats object and add it to the DOM.
   *
   * @private
   */
  initializeStats() {
    this.stats = new Stats();

    this.stats.setMode(0); // 0: fps, 1: ms

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.right = '10px';
    this.stats.domElement.style.top = '10px';

    document.body.appendChild(this.stats.domElement);
  }

  /**
   * Initialize the UI TextLog object and add a message to it.
   *
   * @private
   */
  initializeTextLog() {
    this.textLog = new TextLog();
    this.textLog.initialize();

    const textLogMessage = 'You enter the basement and look around';

    this.textLog.addMessage(textLogMessage);

    this.addChild(this.textLog);
  }

  /**
   * Initialize the UI QuickslotBar and the SpellBar.
   *
   * @private
   */
  initializeBars() {
    this.quickslotBar = new QuickslotBar(this.game);
    this.quickslotBar.initialize();

    this.addChild(this.quickslotBar);

    this.spellBar = new SpellBar(this.game);
    this.spellBar.initialize();

    this.addChild(this.spellBar);
  }

  /**
   * Initialize the UI Status Effects.
   *
   * @private
   */
  initializeStatusEffects() {
    this.statusEffects = new StatusEffects(this.game);
    this.statusEffects.initialize();

    this.statusEffects.setTarget(this.game.player);

    this.addChild(this.statusEffects);
  }

  /**
   * Initialize the UI Mouse Pointer.
   *
   * @private
   */
  initializeMousePointer() {
    this.mousePointer = PIXI.Sprite.from('mousepointer.png');
    this.mousePointer.scale = new PIXI.Point(
      this.game.settings.zoom,
      this.game.settings.zoom,
    );

    this.addChild(this.mousePointer);
  }

  /**
   * Initialize the UI Tooltip.
   *
   * @private
   */
  initializeTooltip() {
    this.tooltip = new TooltipElement();
    this.tooltip.initialize();

    this.addChild(this.tooltip);
  }

  /**
   * The function that is called everytime the mouse moves.
   *
   * @private
   */
  //TODO: Clean up this function and split it up
  //TODO: Make sure this function also is called when the user moves, this way the tooltip won't weirdly float around on a wrong location
  mouseMove(mousedata) {
    const map = this.game.map;
    const camera = this.game.world.camera;
    const tilesize = map.settings.tileSize * this.game.settings.zoom;

    const cameraXOffset = camera.position.x % tilesize;
    const cameraYOffset = camera.position.y % tilesize;

    const tileXRel = Math.floor(
      (mousedata.data.global.x + cameraXOffset) / tilesize,
    );
    const tileYRel = Math.floor(
      (mousedata.data.global.y + cameraYOffset) / tilesize,
    );

    const tileXAbs = Math.floor(
      (mousedata.data.global.x + camera.position.x) / tilesize,
    );
    const tileYAbs = Math.floor(
      (mousedata.data.global.y + camera.position.y) / tilesize,
    );

    const tilePosition = new Vector2(tileXAbs, tileYAbs);

    if (!map.insideBounds(tilePosition)) {
      this.tooltip.visible = this.mousePointer.visible = false;
      return;
    }

    const tile = map.getTileAt(tilePosition);

    // If the tile isn't a floor tile, you can't walk there so why bother showing the mouse pointer
    // Also don't show the mouse pointer if you haven't explored the tile yet
    if (tile.type !== 2 || !tile.explored) {
      this.tooltip.visible = this.mousePointer.visible = false;
      return;
    }

    this.mousePointer.visible = true;
    this.mousePointer.position = new PIXI.Point(
      tileXRel * tilesize - cameraXOffset,
      tileYRel * tilesize - cameraYOffset,
    );

    if (tile.entities.length === 0) {
      this.tooltip.visible = false;
      return;
    }

    const lastEntity = tile.entities[tile.entities.length - 1];

    if (lastEntity.hasComponent('tooltip')) {
      const tooltipComponent = lastEntity.getComponent('tooltip');

      this.tooltip.updateText(
        tooltipComponent.title,
        tooltipComponent.type,
        tooltipComponent.description,
      );

      this.tooltip.position = new PIXI.Point(
        mousedata.data.global.x,
        mousedata.data.global.y,
      );

      this.tooltip.visible = true;
    } else {
      this.tooltip.visible = false;
    }
  }
}
