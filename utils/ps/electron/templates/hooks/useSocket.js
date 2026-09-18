import {createContext, useContext, useEffect, useRef} from "react";
import {useData} from "../redux/reducer/data";
import SocketServer from "../utils/socket/SocketServer";
import SocketClient from "../utils/socket/SocketClient";

/**
 * @param isServer
 * @param socket
 * @param socketSearchKey
 * @param listeners
 * @returns {React.MutableRefObject<SocketServer|SocketClient>}
 */
export function useSocket({isServer, socket, socketSearchKey = "socket", listeners = []} = {}) {
  const ref = useRef(null);
  const {search} = useData();
  // const dispatch = useDispatch();
  let _socket = socket;
  if (!_socket) {
    _socket = search[socketSearchKey] || "127.0.0.1:3000";
  }

  useEffect(() => {
    const [host, port] = _socket.split(":");
    const $socket = new (isServer ? SocketServer : SocketClient)(host, +port, _socket);
    ref.current = $socket;

    $socket.on("ping", () => $socket.send("pong"));

    // $socket.on("setlock", ({params}) => dispatch(goLocked(params === "1")));

    $socket.on("_any", ({command}) => {
      if (!/^(p[io]ng|progress)$/.test(command)) {
        global.document.documentElement.dispatchEvent(new Event("action"));
      }
    });

    return () => {
      $socket.destroy();
    };
  }, [isServer, _socket]);

  useSocketListener(ref, listeners);

  return ref;
}
export function useSocketListener(_socket, listeners) {
  useEffect(() => {
    let rm = [];
    let timeout;
    function init() {
      const socket = _socket.current;
      if (!socket) {
        timeout = setTimeout(init, 1000);
      } else {
        rm = listeners.map(([event, listener]) => {
          socket.on(event, listener);
          return () => {
            socket.off(event, listener);
          };
        });
      }
    }
    init();

    return () => {
      clearTimeout(timeout);
      rm.forEach(fn => fn?.());
      rm.length = 0;
    };
  }, [_socket, listeners]);
}

export const SocketContext = createContext({});
export function useSocketContext() {
  return useContext(SocketContext);
}
