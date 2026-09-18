import {BaseWrapper} from "../../scene/src/wrappers/BaseWrapper";
import {State} from "../../scene/src/decorators/state/State";
import {CanvasResize} from "../../scene/src/decorators/resize/CanvasResize";
import {PixiController} from "./PixiController";

class PixiWrapper extends BaseWrapper {
  decorators = [State, CanvasResize];

  initController() {
    const {eventBus, storage} = this;

    return new PixiController({eventBus, storage});
  }
}

export {PixiWrapper};
