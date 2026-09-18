import {Scene} from "./Scene";
import {baseProducer} from "@PS/core";

class ScenesManager {
  scenes = {};

  updates = {};

  libs = new WeakMap();

  promises = {};

  constructor() {
    this.getLibsPromise = this.getLibsPromise.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onSetState = this.onSetState.bind(this);

    baseProducer.getConsumer().on("game:setState:created", this.onSetState);
  }

  onSetState({data: {name, state} = {}}) {
    const scene = this.scenes[name];
    if (!scene) return;
    scene._setState(state);
  }

  addStatePromise(name, state) {
    const key = `${name}_${state}`;

    if (this.promises[key]?.promise) return this.promises[key].promise;

    this.promises[key] = {};
    return (this.promises[key].promise = new Promise(resolve => (this.promises[key].resolve = resolve)));
  }

  onStateChange(sceneName, state) {
    const key = `${sceneName}_${state}`;
    baseProducer.send({topic: "game", type: "stateChanged", data: {name: sceneName, state}});
    this.promises[key]?.resolve();
  }

  add({
    name,

    states,
    ignoreNextStates,
    beforeInit,
    afterInit,
    onLoadPromiseInit,
    onProgress,
    getLibsPromise,
    getWrapperPromise,
    needsLoad = false,
  }) {
    //уже есть сцена
    if (this.scenes[name]) {
      this.updateScene(name, arguments[0]);
      if (needsLoad) this.scenes[name].load(name);
      return;
    }

    this.scenes[name] = new Scene({
      ...arguments[0],
      onStateChange: this.onStateChange,
      getLibsPromiseCache: this.getLibsPromise,
    });

    if (needsLoad) this.load(name);

    this.updateScene(name, this.updates[name]);
  }

  load(name) {
    return this.scenes[name].promise;
  }

  getLibsPromise(getLibsPromise) {
    const {libs} = this;
    if (!libs.has(getLibsPromise)) libs.set(getLibsPromise, getLibsPromise());

    return libs.get(getLibsPromise);
  }

  updateScene(name, data) {
    if (!data) return;
    const scene = this.scenes[name];
    if (scene) Object.entries(data).forEach(([key, value]) => (scene[key] = value));
    else this.updates[name] = {...this.updates[name], ...data};
  }
}

const scenesManager = new ScenesManager();

export {ScenesManager, scenesManager};
