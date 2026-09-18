import {getIsDebug} from "@/utils/ps/core/src/versions/getIsDebug";

class ThreeScene extends THREE.Scene {
  debug = getIsDebug();

  _eventBus;

  constructor({eventBus, storage, fog}) {
    super();

    this._eventBus = eventBus;
    this._storage = storage;

    window.scene = this;

    if (fog) this.initFog(fog);
    this.init();
  }

  initFog(settings) {
    this.fog = new THREE.Fog(settings.color, settings.near, settings.far);
  }

  resize(width, height) {}

  init() {}

  update(delta) {}
}

export {ThreeScene};
