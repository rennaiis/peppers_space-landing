import {BaseLoader} from "@/utils/ps/scene/src/loader/plugins/BaseLoader";
import {eventSubscription, ON_OFF_MODE} from "@/utils/ps/core/src/events/subscription";

class SpritesheetLoader extends BaseLoader {
  static sysName = "PhaserSpritesheetLoader";

  async load(settings) {
    const {
      manager,
      data: {scene},
    } = this;
    const {path, fileName, name, options} = settings;

    const url = manager.resolveURL(`${path}${fileName}`);
    const key = super.load(url);

    const self = this;

    const clear = eventSubscription({
      target: scene.load,
      callbacksBus: [
        {
          event: "complete",
          callback({textureManager: {list}}) {
            if (list.hasOwnProperty(name)) {
              clear();
              self.onLoad(settings, list[name], key);
            }
          },
        },
        {
          event: "loaderror",
          callback(error) {
            if (error.key === name) {
              clear();
              self.onError(key, settings);
            }
          },
        },
      ],
      ...ON_OFF_MODE,
    });

    scene.load.spritesheet(name, url, options).start();
  }
}

export {SpritesheetLoader};
