import useOnscreenCodeListener from "../hooks/useOnscreenCodeListener";
import {useEffect} from "react";

function openDevTools() {
  global.ipcRenderer?.send("devTools");
}

export default function useDevTools() {
  useOnscreenCodeListener("rrrlllrltrrrlllrlt", openDevTools);
  useEffect(() => {
    if (!global.ipcRenderer) return;
    const dispatcher = global;
    const onKeyDown = e => {
      if (e.key === "F5") {
        e.preventDefault();
        global.location.reload();
      }
    };
    dispatcher.addEventListener("keydown", onKeyDown);
    return () => {
      dispatcher.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
