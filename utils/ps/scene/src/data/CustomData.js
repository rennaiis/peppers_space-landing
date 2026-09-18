/* eslint-disable */

class CustomData {
  manifestLink = "assets/settings.json";

  sceneData = {};

  set data(data) {
    this._data = data;
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    });
  }
}

const storage = new CustomData();

export {storage, CustomData};
