import {LoadersManager} from "@/utils/ps/scene/src/loader/plugins/LoadersManager";
import {TextureLoader} from "./TextureLoader";
import {SceneLoader} from "./SceneLoader";
import {SpritesheetLoader} from "./SpritesheetLoader";

class PixiManager extends LoadersManager {
  getLoader(assetData) {
    switch (assetData.type) {
      case "texture":
        return TextureLoader;
      case "spritesheet":
        return SpritesheetLoader;
      case "scene":
        return SceneLoader;
    }
  }
}

const pixiManager = new PixiManager();

export {pixiManager, PixiManager};
