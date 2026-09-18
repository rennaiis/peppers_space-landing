import Buffer from "./buffer";
import SocketBase from "./SocketBase";
import {DELIMITER, EOL, ipcRenderer} from "./config";
import Utf8ArrayToStr from "./Utf8ArrayToStr";

export default class SocketServer extends SocketBase {
  buffer = {};

  constructor(host, port) {
    super(host, port);

    if (ipcRenderer) {
      ipcRenderer.on("server-data", this._onData);
      ipcRenderer.on("server-disconnect", this._onDisconnect);
      ipcRenderer.send("initServer", this.id, port, host);
      global.addEventListener("beforeunload", () => {
        ipcRenderer.send("server-disconnect");
      });
      ipcRenderer.send("server-connect");
      ipcRenderer.on("server-connection", (e, serverID, clientID) => {
        console.log(`>> server-connection: `, serverID, clientID);
      });
    }
  }

  /**
   * Отправка сообщений клиентам
   * @param {string} message - отправляемое сообщение
   * @param {string} target - id получателя
   * @param {boolean} target - true - отправить всем подключенным клиентам
   */
  send(message, target = true) {
    if (ipcRenderer) {
      ipcRenderer.send("submit", this.id, target, message + EOL);
    }
  }

  _onData = (e, id, data) => {
    if (!this.buffer[id]) {
      this.buffer[id] = new Buffer(DELIMITER);
    }

    this.buffer[id].add(Utf8ArrayToStr(data));
    this.checkBuffer(this.buffer[id], id);
  };

  _onDisconnect = (e, id) => {
    delete this.buffer[id];
  };

  destroy() {}
}
