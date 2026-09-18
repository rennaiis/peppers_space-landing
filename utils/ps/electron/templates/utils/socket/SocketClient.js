import {EOL, DELIMITER, ipcRenderer} from "./config";
import Utf8ArrayToStr from "./Utf8ArrayToStr";
import Buffer from "./buffer";
import SocketBase from "./SocketBase";

function connect(...args) {
  let info = main();
  let timeout;
  function main() {
    const [url, onData, onOpen] = args;
    const ws = new global.WebSocket(url);
    const stack = [];

    ws.onopen = () => {
      // console.log("on open");
      onOpen?.();
      ws.send(stack.join(EOL));
      stack.length = 0;
    };
    ws.onmessage = ({data}) => {
      onData(data);
    };

    ws.onclose = event => {
      if (event.wasClean) {
        console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        console.warn("[close] Соединение прервано");
      }
      reconnect();
    };
    ws.onerror = error => {
      console.error(`Socket [error]`, error);
    };

    const destroy = () => {
      ws.onopen = ws.onmessage = ws.onclose = ws.onerror = null;
      ws.close();
    };
    const send = data => {
      if (ws.readyState) {
        ws.send(data);
      } else {
        stack.push(data);
      }
    };

    return {destroy, send};
  }

  function reconnect() {
    destroy();
    timeout = setTimeout(() => {
      info = main();
    }, 1000);
  }

  function destroy() {
    clearTimeout(timeout);
    info?.destroy();
    info = undefined;
  }

  return {
    destroy,
    send(...rest) {
      info?.send(...rest);
    },
  };
}

export default class SocketClient extends SocketBase {
  listeners = {};

  constructor(host, port, url) {
    super(host, port);

    this.buffer = new Buffer(DELIMITER);
    if (/^wss?:\/\//.test(url)) {
      const {send, destroy} = connect(url, data => {
        this._onData(null, null, data);
      });
      this._send = send;
      this._destroy = destroy;
    } else if (ipcRenderer) {
      ipcRenderer.send("initClient", this.id, port, host);
      ipcRenderer.on("client-data", this._onData);
    }
  }

  _onData = (e, id, data) => {
    const msg = typeof data === "string" ? data : Utf8ArrayToStr(data);
    this.buffer.add(msg);
    this.checkBuffer(this.buffer);
  };

  /**
   * Отправка сообщений на сервер
   * @param {string} message
   */
  send(...message) {
    const m = message.join(EOL) + EOL;
    if (this._send) {
      this._send(m);
    } else if (ipcRenderer) {
      ipcRenderer.send("sendClient", this.id, m);
    }
  }

  destroy() {
    // console.log("socket destroy");
    this._destroy();
    super.destroy();
  }
}
