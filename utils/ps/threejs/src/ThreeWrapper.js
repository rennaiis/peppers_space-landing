import {BaseWrapper} from "@/utils/ps/scene/src/wrappers/BaseWrapper";
import {State} from "@/utils/ps/scene/src/decorators/state/State";
import {ThreeResize} from "./decorators/resize/ThreeResize";
import {ThreeController} from "./ThreeController";

class ThreeWrapper extends BaseWrapper {
  decorators = [State, ThreeResize];

  initController() {
    const {eventBus, storage} = this;

    return new ThreeController({eventBus, storage});
  }
}

export {ThreeWrapper};
