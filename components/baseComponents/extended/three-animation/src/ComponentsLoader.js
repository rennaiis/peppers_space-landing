import Loader from "../../../utils/scene/loader/Loader";
import {threeManager} from "../../../utils/scene/loader/plugins/threejs/ThreeManager";
import AssetsManager from "../../../utils/scene/loader/plugins/AssetsManager";

Loader.registerManager(threeManager, "threejs");

export class ComponentsLoader {
  async load(preload) {
    const filtered = preload.filter(item => !AssetsManager.isAssetIsRegistered(item.name, item.type));
    return Loader.load(filtered);
  }
}

const loader = new ComponentsLoader();

export default loader;
