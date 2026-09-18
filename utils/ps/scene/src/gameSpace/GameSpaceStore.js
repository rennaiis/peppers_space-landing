import {cloneDeep} from "lodash";

export class GameSpaceStore {
  static _spaces = {};

  static _isInitialized = false;

  static get(name) {
    return (this._spaces[name] ??= new GameSpaceStore());
  }

  static async init() {
    if (this._isInitialized) return;

    const {default: onChange} = await import("on-change");
    global.onChange = onChange;

    this._isInitialized = true;
  }

  _listeners = new Set();

  constructor() {
    this.getSnapshot = this.getSnapshot.bind(this);
    this.getServerSnapshot = this.getServerSnapshot.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.reset = this.reset.bind(this);
  }

  initGameSpaceProxy(gameSpaceData) {
    this._gameSpace = onChange(gameSpaceData, () => {
      this._emit(cloneDeep(this._gameSpace));
    });
  }

  init(gameSpaceData) {
    if (!GameSpaceStore._isInitialized) return;

    this._savedGameSpace = gameSpaceData;
    this._trackedSpace = gameSpaceData;

    this.initGameSpaceProxy(cloneDeep(gameSpaceData));
  }

  get gameSpace() {
    return this._gameSpace;
  }

  getSnapshot() {
    return this._trackedSpace;
  }

  getServerSnapshot() {
    return this._trackedSpace;
  }

  subscribe(listener) {
    const {_listeners} = this;
    _listeners.add(listener);
    return () => _listeners.delete(listener);
  }

  reset() {
    const {_savedGameSpace} = this;
    this.initGameSpaceProxy(cloneDeep(_savedGameSpace));
    this._trackedSpace = cloneDeep(_savedGameSpace);
  }

  _emit(gameData) {
    this._trackedSpace = gameData;
    this._listeners.forEach(listener => listener());
  }
}
