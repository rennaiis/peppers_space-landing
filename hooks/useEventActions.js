import {useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import store from "@/redux/store";
import {callbacks} from "consumers/callbacks";
import {baseProducer} from "@PS/core";
import {reducersActions, reducersThunks} from "@/redux/reducer/rootReducer";
import {analyticsCallbacks} from "../consumers/analytics/callbacks";

function useEventActions() {
  const dispatch = useDispatch();

  const initialized = useMemo(() => {
    //Отработает раньше, чем дочерние useEffect
    createNamedListener("redux:action:created", reducersActions, {dispatch});
    createNamedListener("redux:thunk:created", reducersThunks, {dispatch});
    createNamedListener("callbacks:call:created", callbacks);
    createNamedListener("analytic:send:created", analyticsCallbacks);
    return true;
  }, []);

  return {initialized};
}

function createNamedListener(eventName, callbacks, {dispatch} = {}) {
  baseProducer.getConsumer().on(eventName, (event = {}) => {
    const {data: {name, payload} = {}} = event;
    if (!name) return;

    const fn = callbacks?.[name];
    if (typeof fn !== "function") return;

    (async function () {
      const result = await (dispatch ? dispatch(fn(payload)) : fn(payload, store.getState()));
      event.resolve(result);
    })();
  });
}

export {useEventActions};
