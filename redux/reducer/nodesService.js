import {Builder} from "@PS/redux";
import {baseProducer} from "@PS/core";

const ChainStates = {
  enter: "enter",
  active: "active",
  exit: "exit",
};

const builder = new Builder({
  name: "nodesService",
  initialState: {
    notifications: {
      // conditionalModal: false
    },
    chains: {
      // chainName: {
      //   state: "idle",
      //   data: {},
      // }
    },
  },
  reducers: {
    setNotificationFlag(state, {payload: {flag, value}}) {
      state.notifications[flag] = value;
    },
    initChain(state, {payload: {chain: name, uuid}}) {
      state.chains[name] = {
        state: ChainStates.enter,
        uuid,
        data: {},
      };
    },
    setChainState(state, {payload: {chain: name, state: nextState}}) {
      state.chains[name].state = nextState;
    },
    closeChain(state, {payload: {chain}}) {
      state.chains[chain].state = ChainStates.exit;
      baseProducer.send({
        topic: "chain",
        type: "closed",
        data: {name: chain},
      });
    },
    setChainData(state, {payload: {chain: name, data}}) {
      state.chains[name].data = data;
    },
  },
}).createSelector("chain", function (STATE, chainName) {
  const chain = STATE[nodesService.name].chains[chainName] || {};
  const isActive = !!chain?.state && ![ChainStates.enter, ChainStates.exit].includes(chain?.state);
  return {
    ...chain,
    isActive,
  };
});

//custom
// ...

const nodesService = builder.create().export();

export const {useChain} = nodesService.selectors;

export default nodesService;
