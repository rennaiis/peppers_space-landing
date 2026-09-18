import {YandexMap} from "./YandexMap";

class YandexMapManager {
  static _instance = null;

  constructor() {
    if (!YandexMapManager._instance) {
      YandexMapManager._instance = this;
      this.maps = {};
    }
    return YandexMapManager._instance;
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new YandexMapManager();
    }
    return this._instance;
  }

  getMap(name) {
    if (!this.maps[name]) {
      this.maps[name] = new YandexMap();
    }
    return this.maps[name];
  }

  removeMap(name) {
    if (this.maps[name]) {
      this.maps[name].map = null;
      this.maps[name].container = null;
      delete this.maps[name];
    }
  }

  clearAllMaps() {
    Object.keys(this.maps).forEach(name => {
      this.removeMap(name);
    });
  }
}

export default YandexMapManager.instance;

// const yandexMap = YandexMapManager.getMap("example");
// yandexMap.create({
//   mapKey,
//   settings: {
//     location: {
//       center: [150, 60.8],
//       zoom: 8
//     },
//     zoomRange: {
//       min: 8,
//       max: 18
//     }
//   },
//   limitBounds: true,
//   featuresLayerProps: {
//     source: 'example',
//     zIndex: 1800
//   }
// });

export {YandexMapManager};
