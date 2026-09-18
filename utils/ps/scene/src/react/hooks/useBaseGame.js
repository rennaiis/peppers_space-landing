import {useCallback, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useDestroyGame} from "./useDestroyGame";
import {useStateReducer} from "./useStateReducer";
import {LOAD_MANIFEST} from "../../constants/stateMachine";
import {getNextState} from "../../../../core";
import {ignoreNextStates as ignoreNextStatesDefault, states as statesDefault} from "../../constants/stateMachine";
import {scenesManager} from "../../manager/ScenesManager";

function useBaseGame({
  name = "unknown",
  reducers = {},
  onDestroyed,
  ignoreNextStates = ignoreNextStatesDefault,
  states = statesDefault,
} = {}) {
  const [wrapper, setWrapper] = useState();
  const [state, setState] = useState(scenesManager.scenes[name]?.state || LOAD_MANIFEST);
  const containerRef = useRef();

  const setNextState = useCallback(() => setState(getNextState(states, state)), [setState]);
  const dispatch = useDispatch();

  const isLoading = states[state].isLoading;

  useStateReducer(name, reducers, ignoreNextStates, setState, state, wrapper);
  useDestroyGame({
    wrapper,
    onDestroyed,
  });

  return {
    states,
    containerRef,
    dispatch,
    wrapper,
    setWrapper,
    state,
    setState,
    setNextState,
    isLoading,
  };
}

export {useBaseGame};
