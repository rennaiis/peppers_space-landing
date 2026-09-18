import {LoadersManager} from "@/utils/ps/scene/src/loader/plugins/LoadersManager";
import {SoundLoader} from "./SoundLoader";

class HowlerManager extends LoadersManager {
  getLoader(assetData) {
    switch (assetData.type) {
      case "sound":
        return SoundLoader;
    }
  }
}

const howlerManager = new HowlerManager();

export {HowlerManager, howlerManager};
