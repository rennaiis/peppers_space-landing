import {Loader} from "@/utils/ps/scene/src/loader/Loader";
import {AssetsManager} from "@/utils/ps/scene/src/loader/plugins/AssetsManager";
import {getIsDebug} from "@/utils/ps/core/src/versions/getIsDebug";
import {fpsMeter, FPSMeter} from "@/utils/ps/performance/src/fps-meter";
import {GameSpaceStore} from "../gameSpace/GameSpaceStore";

class SceneController {
  manifest;

  storage;

  eventBus;

  container;

  debug = getIsDebug();

  _size = {width: 0, height: 0};

  constructor({storage, eventBus} = {}) {
    this.update = this.update.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onManifestLoaded = this.onManifestLoaded.bind(this);
    this.onLoadingProgress = this.onLoadingProgress.bind(this);
    this.onDecreaseStepChange = this.onDecreaseStepChange.bind(this);
    this.onLoadingManifestProgress = this.onLoadingManifestProgress.bind(this);

    this.storage = storage;
    this.eventBus = eventBus;
  }

  init() {
    this.initFPSMeter();
  }

  initFPSMeter() {
    FPSMeter.listen(this.onDecreaseStepChange);
    fpsMeter.start();
  }

  onDecreaseStepChange(step) {}

  appendContainer(container) {
    this.container = container;
    this.eventBus.dispatchEvent({type: "scene-controller:append", data: {container}});
  }

  update() {}

  loadingSelect() {
    return Promise.all([this.preloadAssets(), this.preloadGameSpace()]);
  }

  preloadAssets() {
    return Loader.load(this.storage.preload, {
      onLoad: this.onLoad,
      onProgress: this.onLoadingProgress,
    });
  }

  async preloadGameSpace() {
    const {
      storage,
      storage: {gameSpace},
    } = this;

    if (gameSpace && gameSpace.name) {
      await GameSpaceStore.init();

      const gameStore = GameSpaceStore.get(gameSpace.name);
      gameStore.init(gameSpace);

      storage.gameStore = gameStore;
      storage.gameSpace = gameStore.gameSpace;
    }
  }

  onLoad() {
    this.eventBus.dispatchEvent({
      type: "scene-controller:loaded",
    });
  }

  loadManifestSelect() {
    return Loader.load(
      [
        {
          subtype: "base",
          type: "json",
          name: "settings",
          url: this.storage.manifestLink,
        },
      ],
      {
        onLoad: this.onManifestLoaded,
        onProgress: this.onLoadingManifestProgress,
      },
    );
  }

  onLoadingProgress({itemsLoaded, itemsTotal}) {
    this.eventBus.dispatchEvent({
      type: "scene-controller:loading-progress",
      data: {
        progress: itemsLoaded / itemsTotal,
        itemsLoaded,
        itemsTotal,
      },
    });
  }

  onLoadingManifestProgress({itemsLoaded, itemsTotal}) {
    this.eventBus.dispatchEvent({
      type: "scene-controller:loading-manifest-progress",
      data: {
        progress: itemsLoaded / itemsTotal,
        itemsLoaded,
        itemsTotal,
      },
    });
  }

  onManifestLoaded() {
    if (this.storage._data) return;
    this.storage.data = AssetsManager.getAssetFromLib("settings", "json");
  }
}

export {SceneController};
