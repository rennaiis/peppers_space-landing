import {Loader} from "@/utils/ps/scene/src/loader/Loader";
import {SceneController} from "@/utils/ps/scene/src/controllers/SceneController";
import {phaserManager} from "./loader/PhaserManager";

Loader.registerManager(phaserManager, "phaser");

class PhaserController extends SceneController {
  static EVENTS = {
    ready: "ready",
  };

  constructor(data) {
    super(data);

    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);

    this.storage.gameConfig = data.gameConfig ?? {};
  }

  static get canvas() {
    return (this._canvas ??= document.createElement("canvas"));
  }

  static get context() {
    return (this._context ??= this.canvas.getContext("webgl"));
  }

  get scenes() {
    return this?.game?.scene;
  }

  get scene() {
    // Получение дефолтной сцены
    return this?.game?.scene?.keys?.default;
  }

  get camera() {
    // Получение главной камеры
    return this?.scene?.cameras?.main;
  }

  get cameras() {
    return this?.scene?.cameras;
  }

  loadingSelect() {
    return Loader.load(this.storage.preload, {
      onLoad: this.onLoad,
      externalData: {scene: this.scene},
    });
  }

  appendContainer(container) {
    const {
      game: {canvas},
    } = this;

    container.appendChild(canvas);

    super.appendContainer(container);
  }

  async init() {
    await super.init();
    await this.initGame();
  }

  // NOTE: при указании настроек физики обязательно должен быть параметр fixedStep: false,
  // иначе физика будет обновлять раз в 16.6 мс и не будет синхронизирована с частотой обновления устройства

  // example: export const gameConfig = {
  //   width: 800,
  //   height: 600,
  //   title: "someGame",
  //   physics: {
  //     default: "arcade",
  //     arcade: {
  //       fixedStep: false,
  //       debug: getIsDebug(),
  //     },
  //   },
  // };

  initGame() {
    const {
      container,
      storage: {gameConfig},
    } = this;

    const {render, scale, ...otherProperties} = gameConfig;

    const fullConfig = {
      type: PHASER.WEBGL,
      ...(container && {parent: container}),
      canvas: PhaserController.canvas,
      context: PhaserController.context,
      title: "someGame",
      version: "1.0.0",
      autoFocus: true,
      disableContextMenu: true,
      banner: true,
      render: {
        resolution: Math.min(2, global.devicePixelRatio),
        antialias: true,
        transparent: true,
        powerPreference: "high-performance",
        ...render,
      },
      scale: {
        mode: PHASER.Scale.FIT,
        autoCenter: PHASER.Scale.CENTER_BOTH,
        autoRound: true,
        ...scale,
      },
      scene: this.createScene(),
      ...otherProperties,
    };

    const game = (this.game = new PHASER.Game(fullConfig));

    console.log("PHASER GAME>>");

    return new Promise(res => game.events.once(PhaserController.EVENTS.ready, res));
  }

  createScene() {
    const self = this;

    class PhaserScene extends PHASER.Scene {
      preload = self.preload;
      create = self.create;
      update = self.update;
    }

    return new PhaserScene();
  }

  preload() {}

  create() {}

  update() {}
}

export {PhaserController};
