import {FactoryStorage} from "./FactoryStorage";
import {performanceAnalysis} from "@/utils/ps/performance/src/Performance";
import {isFunction} from "lodash";

class Factory {
  storage = {};

  defaultProperties = {};

  config = {};

  constructor({defaultProperties, config} = {}) {
    this.defaultProperties = defaultProperties ?? {};
    this.config = config ?? {};
    performanceAnalysis.connect("factory", this);
  }

  getItemByType(type, data) {}

  createItem(type, _data = {}) {
    const data = {...this.defaultProperties, ..._data};

    const {
      defaultProperties,
      defaultProperties: {args = []},
      config,
    } = this;
    let item;

    if (config[type]) {
      const {Cls, baseSettings = {}} = config[type];

      item = new Cls({baseSettings, defaultProperties, extraSettings: data.extraData});
      item.create();
    } else {
      if (data.Cls) item = new data.Cls(...[...args, ...data.args]);
      else item = this.getItemByType(type, data);

      if (!item) throw new Error(`No item created`);
    }

    this.onCreateItem(type, item);

    return item;
  }

  onCreateItem(type, item) {
    const storage = this.getStorage(type);
    storage.onCreateItem(type, item);
  }

  getItem(type, data) {
    const {config} = this;

    const storage = this.getStorage(type);
    let item = storage.pop();

    if (!item) item = this.createItem(type, data);
    else if (config[type]) {
      item.updateExtraSettings(data.extraData);
      item.prepare();
    }

    return item;
  }

  prepareItems(type, count) {
    const items = [];
    let i = count || 1;
    while (i--) {
      items.push(this.getItem(type));
    }
    items.forEach(item => this.pushItem(item));
  }

  resetStorageItems(type) {
    return this.getStorage(type).resetItems();
  }

  pushItem(item, type) {
    type = type || item._storageType || "unknown";
    const storage = this.getStorage(type);
    isFunction(item.reset) && item.reset();
    storage.push(item);
  }

  getStorage(type) {
    if (this.storage[type]) return this.storage[type];

    this.storage[type] = new FactoryStorage({type});

    return this.storage[type];
  }

  getItemById(id) {
    return Object.values(this.storage).find(storage => storage.getItemById(id));
  }

  clear() {
    Object.entries(this.storage).forEach(([type, storage]) => {
      storage.clear();
      delete this.storage;
    });
  }
}

export {Factory};
