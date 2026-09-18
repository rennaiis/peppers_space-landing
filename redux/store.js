import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import {reduxBus} from "@/utils/ps/redux/src/middleware/reduxBus";
import {logger} from "@/utils/ps/redux/src/middleware/logger";

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware => {
    let middleware = getDefaultMiddleware();
    const withBus = middleware.concat(reduxBus);
    if (process.env.NODE_ENV !== "development") return withBus;
    return withBus.concat(logger);
  },
});

// const _storage = storage("info");
// if (global.window && _storage.load()?.access_token) store.dispatch(requests.thunks.profile());

export default store;
