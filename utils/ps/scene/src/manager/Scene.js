import {getNextState} from "@/utils/ps/core/src/utils/getNextState";

class Scene {
  _state = null;

  _loadPromise = null;

  constructor({
    name,
    getLibsPromiseCache,
    ignoreNextStates,
    states,

    reducers = {},
    setState,
    onStateChange,
    defaultState = "loadManifest",

    beforeInit,
    afterInit,
    onLoadPromiseInit,
    onProgress,
    getLibsPromise,
    getWrapperPromise,
  }) {
    this.onProgressHandler = this.onProgressHandler.bind(this);

    this.name = name;
    this.reducers = reducers;
    this.setState = setState;
    this.states = states;
    this.state = defaultState;
    this.ignoreNextStates = ignoreNextStates;
    this.onStateChange = onStateChange;

    this.beforeInit = beforeInit;
    this.afterInit = afterInit;
    this.onLoadPromiseInit = onLoadPromiseInit;
    this.onProgress = onProgress;

    this.getLibsPromise = getLibsPromise;
    this.getLibsPromiseCache = getLibsPromiseCache;
    this.getWrapperPromise = getWrapperPromise;
  }

  _setState(state, ignoreUpdate) {
    if (this.state === state) return;
    this.state = state;

    if (!ignoreUpdate)
      if (this.setState) this.setState?.(state);
      else this.updateState(state);

    this.onStateChange?.(this.name, state);
  }

  get promise() {
    if (this._loadPromise) return this._loadPromise;

    this._loadPromise = this.load();

    this.onLoadPromiseInit?.(this);
  }

  set setState(setState) {
    if (this._otherSetState === setState) return;
    this._otherSetState = setState;
    setState?.(this.state);
  }

  get setState() {
    return this._otherSetState;
  }

  updateState(state) {
    if (!this.wrapper) return;

    const {wrapper, ignoreNextStates, reducers, states} = this;

    const eventData = {state, promise: null};
    wrapper.eventBus.dispatchEvent({type: "apply-state", data: eventData});
    const {promise: controllerPromise} = eventData;
    let ignorePromise = ignoreNextStates.indexOf(state) !== -1;

    this._setState(state, true);
    const nextState = () => this._setState(getNextState(states, state));
    if (typeof reducers[state] === "function") reducers[state](controllerPromise, nextState);

    if (!ignorePromise) controllerPromise.then(nextState);
  }

  async load() {
    const {getLibsPromise, getWrapperPromise} = this;

    await this.getLibsPromiseCache(getLibsPromise);

    const {default: WrapperClass} = await getWrapperPromise();
    const wrapper = WrapperClass.instance;

    this.wrapper = wrapper;

    wrapper.eventBus.addEventListener("scene-controller:loading-progress", this.onProgressHandler);

    this.beforeInit?.(this);

    await wrapper?.init();

    this.afterInit?.(this);

    this.updateState(this.state);
  }

  onProgressHandler(e) {
    this.onProgress?.(e);
  }

  get state() {
    return this._state;
  }

  set state(state) {
    if (this.state === state) return;

    this._state = state;
    if (process.env.NODE_ENV === "development") console.log(`%c${this.name}: %c${state}`, "color: red", "color: blue");
  }
}

export {Scene};
