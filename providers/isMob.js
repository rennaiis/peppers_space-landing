import React, {useContext, useEffect, useMemo, useState} from "react";
import {NOT_MOB} from "@/constants/adaptive-settings.js";

const Context = React.createContext({isMob: false});

export default function useIsMob() {
  return useContext(Context);
}

export function IsMobContext({children}) {
  const [isMob, setIsMob] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMob(global.innerWidth <= NOT_MOB);
    };
    handleResize();
    global.addEventListener("resize", handleResize);
    return () => {
      global.removeEventListener("resize", handleResize);
    };
  }, []);

  return <Context.Provider value={useMemo(() => ({isMob}), [isMob])}>{children}</Context.Provider>;
}
