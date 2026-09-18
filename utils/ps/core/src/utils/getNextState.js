function getNextState(states, currentState) {
  let nextState = states[currentState]?.nextState ?? states[currentState]?.availableStates[0];
  if (!nextState) {
    const keys = Object.keys(states);
    nextState = keys[Math.min(keys.indexOf(currentState) + 1, keys.length - 1)];
  }
  return nextState;
}

function changeState(states, prevState, newState) {
  const {availableStates} = states[prevState];
  return availableStates.includes(newState) ? newState : prevState;
}

function getDefaultState(stateMachine) {
  return Object.entries(stateMachine)?.find(([, {isDefault}]) => isDefault)?.[0];
}

function reducer(state, action) {
  switch (action.type) {
    case "set-wrapper":
      return {...state, wrapper: action.payload};
    case "next-state":
      return {...state, state: getNextState(state.states, state.state)};
    case "change-state":
      return {...state, state: action.payload};
  }
}

export {getNextState, getDefaultState, changeState, reducer};
