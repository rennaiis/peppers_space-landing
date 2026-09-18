import {BaseWrapper} from "@/utils/ps/scene/src/wrappers/BaseWrapper";
import {PhaserController} from "./PhaserController";

class PhaserWrapper extends BaseWrapper {
  initController() {
    const {eventBus, storage} = this;

    return new PhaserController({eventBus, storage});
  }
}

export {PhaserWrapper};
