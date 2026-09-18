import {LoadersManager} from "@/utils/ps/scene/src/loader/plugins/LoadersManager";
import {GLTFLoader} from "./GLTFLoader";
import {TextureLoader} from "./TextureLoader";
import {ThreeParser} from "./ThreeParser";
import {postprocessingList} from "@/utils/ps/scene/src/loader/plugins/postprocessing/list";

postprocessingList.push(ThreeParser);

class ThreeManager extends LoadersManager {
  getLoader(assetData) {
    switch (assetData.type) {
      case "gltf":
        return GLTFLoader;
      case "texture":
        return TextureLoader;
    }
  }
}

const threeManager = new ThreeManager();

export {ThreeManager, threeManager};
