import {LoadersManager} from "../LoadersManager";
import {JSONLoader} from "./JSONLoader";
import {SVGLoader} from "./SVGLoader";
import {VideoLoader} from "./VideoLoader";
import {FontLoader} from "./FontLoader";

class BaseManager extends LoadersManager {
  getLoader({type}) {
    switch (type) {
      case "json":
        return JSONLoader;
      case "svg":
        return SVGLoader;
      case "video":
        return VideoLoader;
      case "font":
        return FontLoader;
    }
  }
}

const baseManager = new BaseManager();
export {BaseManager, baseManager};
