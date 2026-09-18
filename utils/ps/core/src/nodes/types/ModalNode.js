import {Node} from "@/utils/ps/core/src/nodes/Node";

class ModalNode extends Node {
  onLaunched() {
    const {data, data: {resolveOnClose} = {}, name} = this;

    if (!data.hasOwnProperty("resolveOnClose") || resolveOnClose) this.initResolveOnClose();

    super.onLaunched();

    const modalContext = this.data?.getModalContext?.call(this, this.context) || {};
    this.producer.send({
      topic: "modal",
      type: "open",
      data: {...modalContext, nodeName: name},
    });
  }

  initResolveOnClose() {
    const {data: {resolveListeners} = {}, name} = this;

    const merged = [{topic: "modal", type: "closed", data: {name}}, ...(resolveListeners || [])];

    this.data = {...(this.data || {}), resolveListeners: merged};
  }
}

export {ModalNode};
