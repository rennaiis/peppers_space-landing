import {postprocessingList} from "../plugins/postprocessing/list";

class Manager {
  static version = process.env.NEXT_PUBLIC_BUILD_DATE ?? 1;

  static LOADING_STATES = {
    loading: 0,
    loaded: 1,
    failed: 2,
  };

  itemsTotal = 0;

  itemsLoaded = 0;

  isLoading = false;

  promise;

  _retryCount = 100;

  _loadingList = {};

  _loadedList = [];

  _loaders = {};

  _loadResolve;

  _abortController;

  constructor({onLoad, onStart, onProgress, onError} = {}) {
    this.onStart = onStart;
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;

    this.promise = new Promise(resolve => (this._loadResolve = resolve));
  }

  get abortController() {
    if (!this._abortController) {
      this._abortController = new AbortController();
    }
    return this._abortController;
  }

  addLoader(Cls, loader) {
    if (Cls.sysName) this._loaders[Cls.sysName] = loader;
  }

  getHandler() {
    return null;
  }

  getLoader(Cls) {
    return Cls?.sysName ? this._loaders[Cls.sysName] : null;
  }

  itemStart(url, key) {
    if (key !== undefined) this._loadingList[key] = Manager.LOADING_STATES.loading;

    if (!this.isLoading && typeof this.onStart === "function") {
      this.onStart(this.getStatusData());
    }

    this.isLoading = true;
  }

  itemEnd(settings, resource, loader, key) {
    if (!resource || key === undefined) return;

    this._loadingList[key] = Manager.LOADING_STATES.loaded;

    const itemsLoaded = Object.values(this._loadingList).reduce((a, b) => {
      if (b === Manager.LOADING_STATES.loaded) return a + 1;
      return a;
    }, 0);
    const itemsTotal = Object.values(this._loadingList).filter(
      value => value === Manager.LOADING_STATES.loading || value === Manager.LOADING_STATES.loaded,
    ).length;

    this._loadedList.push({settings, resource, loader});

    if (typeof this.onProgress === "function") this.onProgress({itemsLoaded, itemsTotal});

    if (itemsTotal === itemsLoaded) {
      this._loadedList.forEach(data => {
        postprocessingList.forEach(postprocessing => {
          if (postprocessing.check(data)) postprocessing.apply(data);
        });
      });

      this.isLoading = false;

      if (typeof this.onLoad === "function") this.onLoad({data: this.getStatusData(), settings, resource});

      this._loadingList = {};

      this._loadResolve();
    }
  }

  resolveURL(url, ignoreVersion) {
    ignoreVersion = ignoreVersion || url.includes("?version=");
    const isAddPrefix =
      url.indexOf(process.env.ASSETS_PREFIX) !== 0 && process.env.ASSETS_PREFIX && !url.includes("blob");
    return `${isAddPrefix ? process.env.ASSETS_PREFIX : ""}${url}${ignoreVersion ? "" : `?version=${Manager.version}`}`;
  }

  itemError(loader, key, ...args) {
    if (!loader.load) return;

    if (this._retryCount-- > 0) {
      setTimeout(() => {
        this._loadingList[key] = Manager.LOADING_STATES.failed;
        loader.load(...args);
      }, 100);
      return;
    } else this._loadingList[key] = Manager.LOADING_STATES.failed;

    if (typeof this.onError === "function") this.onError();
  }

  getStatusData() {
    return {itemsLoaded: this.itemsLoaded, itemsTotal: this.itemsTotal};
  }
}

export {Manager};
