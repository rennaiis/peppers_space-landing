import {ThreeWrapper} from "@/utils/ps/threejs/src/ThreeWrapper";
import {Data} from "@/utils/ps/examples/data/Data";

export default class CustomThreeWrapper extends ThreeWrapper {
  storage = new Data();

  static get instance() {
    if (!this._instance) this._instance = new CustomThreeWrapper();

    return this._instance;
  }

  static _instance = null;
}
