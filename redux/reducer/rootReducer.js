import {combineReducers} from "@reduxjs/toolkit";
import requests from "./requests";
import errorHandlerReducer from "./errorHandlerReducer";
import nodesService from "./nodesService";
import {mergeWithCheck} from "@PS/core";

const reducers = [requests, errorHandlerReducer, nodesService];

const rootReducer = combineReducers(
  reducers.reduce((acc, slice) => {
    acc[slice.name] = slice.reducer;
    return acc;
  }, {}),
);

const getReducersCallbacks = type => mergeWithCheck(type, reducers.map(r => r[type]).filter(Boolean));

export const reducersActions = getReducersCallbacks("actions");
export const reducersThunks = getReducersCallbacks("thunks");
export default rootReducer;
