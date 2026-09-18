import {Node} from "../Node";
import {baseConsumers} from "../../consumers/consumers";

/**
 * сценарная нода для переключения состояний
 */
class ChainNode extends Node {
  onCreated() {
    baseConsumers.reduxAction({
      name: "initChain",
      payload: {
        chain: this.name,
        uuid: this.uuid,
      },
    });
  }

  onLaunched() {
    const {data, data: {resolveOnClose} = {}, name} = this;

    baseConsumers.reduxAction({
      name: "setChainState",
      payload: {
        chain: this.name,
        state: "active",
      },
    });

    if (!data.hasOwnProperty("resolveOnClose") || resolveOnClose) this.initResolveOnClose();
    super.onLaunched();
  }

  initResolveOnClose() {
    const {data: {resolveListeners} = {}, name} = this;
    const merged = [{topic: "chain", type: "closed", data: {name}}, ...(resolveListeners || [])];
    this.data = {...(this.data || {}), resolveListeners: merged};
  }
}

export {ChainNode};
