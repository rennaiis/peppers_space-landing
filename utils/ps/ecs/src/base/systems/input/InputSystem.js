import {InputController} from "@/utils/ps/interactive/src/input/InputController";
import {System} from "../../../core/System";

class InputSystem extends System {
  constructor(data) {
    super(data);
    const {target, inputSystem: {preset, plugins = []} = {}} = data;

    this.inputController = new InputController({
      eventBus: this.eventBus,
      target,
      basePlugins: plugins,
    });

    if (preset) this.addPreset(preset);
    else console.log("InputSystem preset not found");

    this.eventBus.addEventListener("action:active-change", this.onActionActiveChange.bind(this));
    this.eventBus.addEventListener("action:data-change", this.onActionDataChange.bind(this));
  }

  onActionActiveChange(e) {
    this.dispatchEvent("input:active-change", e);
  }

  onActionDataChange(e) {
    this.dispatchEvent("input:data-change", e);
  }

  addPreset(presetActions) {
    this.inputController.addPreset(presetActions);
  }
}

export {InputSystem};
