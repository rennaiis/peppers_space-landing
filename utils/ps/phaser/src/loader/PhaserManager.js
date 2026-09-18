import {LoadersManager} from "@/utils/ps/scene/src/loader/plugins/LoadersManager";
import {TextureLoader} from "./TextureLoader";
import {SpritesheetLoader} from "./SpritesheetLoader";
import {AtlasLoader} from "./AtlasLoader";

class PhaserManager extends LoadersManager {
  getLoader(assetData) {
    switch (assetData.type) {
      case "texture": //image
        return TextureLoader;
      case "spritesheet":
        return SpritesheetLoader;
      case "atlas":
        return AtlasLoader;
    }
  }
}

const phaserManager = new PhaserManager();

export {PhaserManager, phaserManager};
