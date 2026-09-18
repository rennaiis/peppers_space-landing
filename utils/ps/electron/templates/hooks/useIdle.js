import {useEffect, useCallback, useRef, useState} from "react";

export default function useIdle(fn, timeout) {
  useEffect(() => {
    if (!fn) return;
    let timeoutID;
    const dispatcher = global.document.documentElement;
    const events = ["mousedown", "mousemove", "mouseup"];
    events.forEach(e => dispatcher.addEventListener(e, action));
    action();

    function action() {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(fn, timeout);
    }

    return () => {
      clearTimeout(timeoutID);
      events.forEach(e => dispatcher.removeEventListener(e, action));
    };
  }, [fn, timeout]);
}

export function useIdleTimeout(timeout, defaultActive = false, listenEvents) {
  const [isActive, setIsActive] = useState(defaultActive);
  if (listenEvents.enter && listenEvents.exit) {
    listenEvents = listenEvents[isActive ? "exit" : "enter"];
  }
  const timeoutRef = useRef();
  const reset = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsActive(false);
  }, []);

  const dispatch = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(reset, timeout);
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (listenEvents) return addListeners(dispatch, listenEvents);
  }, [listenEvents]);

  useEffect(() => {
    if (defaultActive) {
      dispatch();
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return [isActive, dispatch, reset];
}

function addListeners(fn, listenEvents) {
  const events =
    typeof listenEvents === "string"
      ? listenEvents.split(",")
      : ["mousedown", "mousemove", "mouseup", "click", "wheel", "touchstart", "touchmove", "touchend", "user:activity"];
  const destroy = [
    ..._addListeners(
      global, //.document.documentElement,
      events,
    ),
  ];

  return () => {
    destroy.forEach(fn => fn());
  };

  function _addListeners(dispatcher, events) {
    return events.map(evt => {
      dispatcher.addEventListener(evt, fn);
      return () => dispatcher.removeEventListener(evt, fn);
    });
  }
}
