const LOAD_MANIFEST = "loadManifest";
const LOADING = "loading";
const LOAD_COMPLETE = "loadComplete";
const INITIALIZATION = "initialization";
const INITIALIZATION_COMPLETE = "initializationComplete";
const INITIALIZATION_LEVEL = "initializationLevel";
const SHOWING = "showing";
const SHOWING_COMPLETE = "showingComplete";
const PLAYING = "playing";
const PAUSED = "paused";
const LOSING = "losing";
const WINNING = "winning";
const LOSE = "lose";
const WIN = "win";

const states = {
  [LOAD_MANIFEST]: {availableStates: [LOADING], nextState: LOADING},
  [LOADING]: {availableStates: [LOAD_COMPLETE], nextState: LOAD_COMPLETE},
  [LOAD_COMPLETE]: {availableStates: [INITIALIZATION], nextState: INITIALIZATION},
  [INITIALIZATION]: {availableStates: [INITIALIZATION_COMPLETE], nextState: INITIALIZATION_COMPLETE},
  [INITIALIZATION_COMPLETE]: {availableStates: [INITIALIZATION_LEVEL, LOSE], nextState: INITIALIZATION_LEVEL},
  [INITIALIZATION_LEVEL]: {availableStates: [SHOWING], nextState: SHOWING},
  [SHOWING]: {availableStates: [SHOWING_COMPLETE], nextState: SHOWING_COMPLETE},
  [SHOWING_COMPLETE]: {availableStates: [PLAYING], nextState: PLAYING},
  [PLAYING]: {availableStates: [LOSING, WINNING, PAUSED]},
  [PAUSED]: {availableStates: [PLAYING], nextState: PLAYING},
  [LOSING]: {availableStates: [LOSE], nextState: LOSE},
  [WINNING]: {availableStates: [WIN], nextState: WIN},
  [LOSE]: {availableStates: [INITIALIZATION_LEVEL], nextState: INITIALIZATION_LEVEL},
  [WIN]: {availableStates: [INITIALIZATION_LEVEL], nextState: INITIALIZATION_LEVEL},
};

const ignoreNextStates = [PLAYING, PAUSED, LOSE, WIN];
const activeStates = [INITIALIZATION_LEVEL, SHOWING, SHOWING_COMPLETE, PLAYING, LOSING, WINNING];

export {
  WIN,
  LOSE,
  WINNING,
  LOSING,
  PLAYING,
  SHOWING_COMPLETE,
  SHOWING,
  INITIALIZATION_LEVEL,
  INITIALIZATION_COMPLETE,
  INITIALIZATION,
  LOAD_COMPLETE,
  LOADING,
  PAUSED,
  LOAD_MANIFEST,
  states,
  ignoreNextStates,
  activeStates,
};
