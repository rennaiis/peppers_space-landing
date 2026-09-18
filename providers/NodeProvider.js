import {states} from "@PS/redux";
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useStore} from "react-redux";
import {nodes} from "@/consumers/nodes";
import {baseProducer, nodesController} from "@PS/core";

nodesController.withPull = true;
nodesController.load(nodes);

const NodeContext = createContext({nodesController});
export const useNodeContext = () => useContext(NodeContext);

export default function ({children}) {
  const [currentNodeStatus, setCurrentNodeStatus] = useState(getNodeStatus(undefined));
  const currentNode = nodesController.getNodeByUUID(currentNodeStatus.split(":")[0]);

  const state = useStore().getState();

  const updateCurrentNode = useCallback(({data: {node} = {}}) => {
    setCurrentNodeStatus(getNodeStatus(node));
  }, []);

  useEffect(() => {
    nodesController.onCreated();
    return baseProducer.getConsumer().on("node:change:created", updateCurrentNode);
  }, []);

  useEffect(() => {
    nodesController.updateContext(state);
    nodesController.isEnable = process.env.APP_NODES_ENABLED;
    nodesController.isUpdate = state.requests.globalStatus.state !== states.IDLE;
    nodesController.applyPull();

    if (nodesController.isEnable) updateCurrentNode({data: {node: nodesController.currentNode}});
  }, [state]);

  return <NodeContext.Provider value={{nodesController, currentNode}}>{children}</NodeContext.Provider>;
}

function getNodeStatus(node) {
  return node ? node.uuid + ":" + node.reuseCounter : "";
}
