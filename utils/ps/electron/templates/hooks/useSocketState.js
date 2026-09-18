import {useSocketContext, useSocketListener} from "./useSocket";
import {useEffect, useMemo, useRef, useState} from "react";
import {getId} from "../../../core/src/utils/getId";

let currentId;
export default function useSocketState(page, ...props) {
  const {current: socket} = useSocketContext();
  const componentId = useRef();

  useEffect(() => {
    componentId.current = getId();
    currentId = componentId.current;
  }, []);

  useEffect(() => {
    if (componentId.current !== currentId || !socket) return;
    socket.send(["change", page, ...props].join(" "));
  }, [page, ...props]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useSocketStateListener() {
  const [state, setState] = useState([]);
  const _socket = useSocketContext();
  const listeners = useMemo(
    () => [
      [
        "change",
        event => {
          setState(event.params.split(" "));
        },
      ],
    ],
    [],
  );
  useSocketListener(_socket, listeners);

  return state;
}
