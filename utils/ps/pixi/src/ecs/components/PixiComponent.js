import {Component} from "@/utils/ps/ecs/src/core/Component";

class PixiComponent extends Component {
  type = "pixiComponent";

  constructor({eventBus, pixiObject}) {
    super({eventBus});

    this.pixiObject = pixiObject;
    this.onChange();
  }
}

export {PixiComponent};
