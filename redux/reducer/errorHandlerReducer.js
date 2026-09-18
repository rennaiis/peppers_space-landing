import {shallowEqual} from "react-redux";
import {Builder} from "@PS/redux";

const builder = new Builder({
  name: "errorHandler",
  initialState: {
    errors: [],
  },
  reducers: {
    onShowError(state, {payload: error}) {
      const current = state.errors.find(one => one.uid === error.uid);
      current.showed = true;
    },
  },
});

function displayErrorFilter(error) {
  return error.code >= 400 && error.code <= 599;
}

builder
  .addMatcher(
    ({type}) => type.includes("rejected"),
    function (state, action) {
      addNewError(state, action);
      console.error(
        [
          `ErrorHandleBuilder: action ${action.type}`,
          `with data ${JSON.stringify(action.payload?.meta)}`,
          `with payload ${JSON.stringify(action?.payload)}`,
        ].reduce((str, val) => (str += val + "\n"), ""),
      );
    },
  )
  .createSelector(
    "displayedErrors",
    function (STATE) {
      return {
        displayErrors: STATE[builder.name].errors.filter(error => !error.showed).filter(displayErrorFilter),
      };
    },
    (prev, next) => {
      return shallowEqual(prev.displayErrors, next.displayErrors);
    },
  );

builder.create();

const errorHandlerReducer = builder.export();
export default errorHandlerReducer;
export const {useDisplayedErrors} = errorHandlerReducer.selectors;

function addNewError(state, action) {
  state.errors.push(DisplayError(action));
  action.uid = state.errors.length;
}

function DisplayError(action) {
  const actionType = action.type;
  const code = Number(action.payload?.code);
  const serverDebugLink = action.payload?.headers?.["x-debug-link"];
  const displayMessage = !code ? actionType : serverDebugLink;
  return {
    actionType,
    code,
    serverDebugLink,
    displayMessage,
  };
}
