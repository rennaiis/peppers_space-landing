import {Loader} from "@/utils/ps/scene/src/loader/Loader";
import {SceneController} from "@/utils/ps/scene/src/controllers/SceneController";
import {isAdded} from "@/utils/ps/frontend/src/window/isAdded";
import {pixiManager} from "./loader/PixiManager";
import {CustomTicker} from "@PS/pixi";

PIXI.extensions.add(PIXI.TickerPlugin);

Loader.registerManager(pixiManager, "pixijs");
PIXI.Ticker._shared = new CustomTicker();
PIXI.Ticker._shared.start();

class PixiController extends SceneController {
  static _applications = [];

  static async getApplication(index, settings) {
    if (!this._applications[index]) {
      this._applications[index] = new PIXI.Application();

      await this._applications[index].init(settings);

      const checkAdded = () => {
        const app = this._applications[index];
        !!isAdded(app?.renderer?.view?.canvas)
          ? !app.ticker.started && app.ticker.start()
          : app.ticker.started && app.ticker.stop();
        requestAnimationFrame(checkAdded);
      };
      requestAnimationFrame(checkAdded);
    }

    return this._applications[index];
  }

  constructor(data) {
    super(data);

    this.applicationSettings = data.applicationSettings ?? {};

    this.onResize = this.onResize.bind(this);
  }

  loadingSelect() {
    return Promise.all([this.preloadAssets(), super.preloadGameSpace()]);
  }

  preloadAssets() {
    return Loader.load(this.storage.preload, {
      onLoad: this.onLoad,
      externalData: {
        stage: this.stage,
      },
    });
  }

  onResize({width, height} = this._size) {
    const {renderer} = this;

    renderer.resize(width, height);
    this._size = {width, height};
  }

  get renderer() {
    return this.app?.renderer;
  }

  get canvas() {
    return this.app?.renderer?.view?.canvas;
  }

  get ticker() {
    return this.app?.ticker;
  }

  appendContainer(container) {
    globalThis.__PIXI_APP__ = this.app;

    if (this.renderer) container.appendChild(this.canvas);

    this.app.stage.removeChildren();
    this.app.stage.addChild(this.stage);

    super.appendContainer(container);
  }

  async init() {
    super.init();
    await this.initApplication();

    if (this.container) this.appendContainer(this.container);
  }

  async initApplication() {
    const {applicationSettings} = this;

    this.appResolution = Math.min(2, window.devicePixelRatio);

    this.stage = new PIXI.Container();
    this.stage.label = "STAGE";

    this.app = await PixiController.getApplication(
      applicationSettings.index ?? 0,
      Object.assign(
        {
          autoStart: true,
          backgroundAlpha: 0,
          resolution: this.appResolution,
          backgroundColor: applicationSettings.backgroundColor ?? 0xffffff,
          webgl: {
            antialias: true,
          },
          webgpu: {
            antialias: true,
          },
        },
        applicationSettings,
      ),
    );
  }
}

export {PixiController};
