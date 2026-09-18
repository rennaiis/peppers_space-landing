import React, {useContext, useEffect, useMemo, useLayoutEffect, useState} from "react";
import {useRouter} from "next/router";

let params = new Map();
let search;
if (global.location) {
  search = global.location.search;
  params = new URLSearchParams(search);
}

const debug = (params.get("debug") || "").split(",").reduce((res, key) => {
  res[key] = true;
  return res;
}, {});

export default function useDebug() {
  return useContext(DebugContext);
}

export function isDebug() {
  return params.has("debug") && !params.get("debug");
}

export function initUrl(url) {
  return `${url}${search}`;
}

const DebugContext = React.createContext(null);
export function DebugProvider({children}) {
  const _isDebug = isDebug();
  const {query} = useRouter();

  const [isDebugState, setIsDebugState] = useState(null);
  useLayoutEffect(() => {
    setIsDebugState({isDebug: _isDebug, debug});
  }, [_isDebug]);
  useEffect(() => {
    if (isDebugState?.isDebug) return;
    setIsDebugState(v => {
      const isDebug = query.hasOwnProperty("debug");
      if (v.isDebug === isDebug) return v;
      return {...v, isDebug};
    });
  }, [query, isDebugState]);
  useEffect(() => {
    const onKeyDown = e => {
      if (e.shiftKey && e.code === "KeyD") {
        setIsDebugState(v => ({...v, isDebug: !v.isDebug}));
      }
    };
    global.addEventListener("keydown", onKeyDown);
    return () => global.removeEventListener("keydown", onKeyDown);
  }, []);
  const value = useMemo(() => {
    return {
      isDebug: isDebugState?.isDebug,
      isDebugProp: (...rest) => rest.every(k => debug[k]),
      setIsDebug(value) {
        setIsDebugState(v => ({
          ...v,
          isDebug: value,
        }));
      },
      setIsDebugKey(key, value) {
        setIsDebugState(v => ({
          ...v,
          debug: {...v.debug, [key]: value},
        }));
      },
    };
  }, [isDebugState]);

  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
}
