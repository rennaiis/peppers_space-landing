import ThreeController from "../../../../../utils/scene/containers/ThreeController";
import {EventDispatcher} from "../../../../../utils/scene/events/EventDispatcher";
import {CustomData} from "../../../../../utils/scene/data/CustomData";
import ThreeResize from "../../../../../utils/scene/decorators/resize/ThreeResize";
import AssetsManager from "../../../../../utils/scene/loader/plugins/AssetsManager";

export default class AnimationController extends ThreeController {
  static _instances = {};

  static cache = {};

  static cacheObject(object, name) {
    if (!this.cache[name]) this.cache[name] = [];

    this.cache[name].push(object);
  }

  static fromCache(name) {
    if (this.cache[name]?.length) return this.cache[name].splice(0, 1)[0];
  }

  static getInstance(uuid) {
    if (!this._instances[uuid]) this.createInstance(uuid);

    return this._instances[uuid];
  }

  static postprocessing = {};

  static createInstance(uuid) {
    this._instances[uuid] = new AnimationController();
  }

  paused = true;

  constructor() {
    super({
      renderer: {
        options: {antialias: true, logarithmicDepthBuffer: true, alpha: true},
        backgroundAlpha: 0,
      },
      eventBus: global.sharedEventBus ?? new EventDispatcher(),
      storage: global.sharedStorage ?? new CustomData(),
    });

    this.AssetsManager = AssetsManager;
    this.init();

    new ThreeResize({controller: this, eventBus: this.eventBus});
  }

  clear() {
    this.currentScene.clear();
  }

  unload(uuid) {
    if (this._uuid !== uuid) return;

    this.paused = true;
    this.clear();
  }

  render() {
    if (!this.paused) super.render();
  }

  updateData({container, data, settings: {size, children}, onInit, uuid}) {
    this.clear();

    this.paused = false;

    this._uuid = uuid;

    this.initChildren(children, data);

    this.size = size;

    this.appendContainer(container);

    onInit?.call(null, {
      controller: this,
    });
  }

  initModel({modelName, modelType}) {
    const model = AssetsManager.getAssetFromLib(modelName, modelType);
    this.currentScene.add(model);
  }

  initCurrentCamera({cameraName}) {
    this.cameras.current = this.currentCamera = this.currentScene.getObjectByName(cameraName);
  }

  initChildren(children, data) {
    children.forEach(childData => {
      const {type} = childData;
      const creator = this[`init${type.charAt(0).toUpperCase()}${type.slice(1)}`];
      if (typeof creator === "function") creator.call(this, childData, data);
    });
  }

  applyTransform(clip, transform) {
    if (!transform) return;

    ["position", "scale", "rotation"].forEach(prop => {
      if (!transform[prop]) return;
      clip[prop].copyFrom(transform[prop]);
    });
  }
}
