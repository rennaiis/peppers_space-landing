import {useEffect} from "react";
import {scenesManager} from "@/utils/ps/scene/src/manager/ScenesManager";

function useStateReducer(name, reducers = {}, ignoreNextStates = [], setState, state) {
  useEffect(() => {
    scenesManager.updateScene(name, {
      state,
      reducers,
      setState,
    });

    const scene = scenesManager.scenes[name];
    if (!scene) return;

    scene.updateState(state);
  }, [state]);
}

export {useStateReducer};
