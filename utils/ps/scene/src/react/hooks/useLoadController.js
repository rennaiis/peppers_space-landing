import {useEffect} from "react";
import {scenesManager} from "@/utils/ps/scene/src/manager/ScenesManager";
import {ignoreNextStates as ignoreStates, states as stateMachine} from "../../constants/stateMachine";

function useLoadController({
  states = stateMachine,
  ignoreNextStates = ignoreStates,

  name = "unknown",
  beforeInit,
  afterInit,
  onLoadPromiseInit,
  onProgress,
  needsLoad = true,
  getLibsPromise = Promise.resolve(),
  getWrapperPromise = Promise.resolve({default: null}),
} = {}) {
  useEffect(() => {
    scenesManager.add({
      needsLoad,
      name,
      states,
      ignoreNextStates,

      getLibsPromise,
      getWrapperPromise,

      onLoadPromiseInit,
      onProgress,
      beforeInit,
      afterInit,
    });

    return () => {
      scenesManager.updateScene(name, {
        onLoadPromiseInit: null,
        onProgress: null,
        beforeInit: null,
        afterInit: null,
      });
    };
  }, []);
}

export {useLoadController};
