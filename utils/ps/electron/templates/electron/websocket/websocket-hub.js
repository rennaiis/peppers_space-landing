const getId = (() => {
  let id = 0;
  return () => ++id;
})();

const path = require("path");
const {createServer: createHTTPServer} = require("http");
const {createServer: createHTTPSServer} = require("https");
const {readFileSync} = require("fs");
const {WebSocketServer} = require("ws");
const {
  argv: {port},
} = require("yargs")(process.argv);

const DEFAULT_PORT = 8000;
const PING = "ping\n";
const PONG = "pong\n";

function detectBrokenConnections(wss) {
  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping();
      ws.send(PING);
    });
  }, 20_000);
  return () => {
    clearInterval(interval);
  };
}

function initWebsocket(type, forcePort) {
  const isSecure = type === true || type === "wss";
  const {createServer, props} = isSecure
    ? {
        createServer: createHTTPSServer,
        props: {
          cert: readFileSync(path.resolve(__dirname, "./websocket-hub-cacert.pem")),
          key: readFileSync(path.resolve(__dirname, "./websocket-hub-privkey.pem")),
        },
      }
    : {
        createServer: createHTTPServer,
        props: {},
      };

  const server = createServer(props, (req, res) => {
    if (req.url === "/test") {
      res.writeHead(200);
      res.end("hello world\n");
    }
  });
  server.on("close", onServerClose);

  const roomsMap = new Map();
  const wss = new WebSocketServer({server});
  const unDetect = detectBrokenConnections(wss);
  wss.on("connection", onConnectionWS);
  wss.on("close", onServerClose);

  const P = forcePort || port || process.env.PORT || DEFAULT_PORT;
  console.log(isSecure ? "wss" : "ws", "port:", P);
  server.listen(P);

  /**
   * @param {string} name
   * @returns {Set}
   */
  function getRoom(name) {
    if (!roomsMap.has(name)) {
      roomsMap.set(name, new Map());
    }
    return roomsMap.get(name);
  }

  function onServerClose() {
    // принудительный перезапуск сервера
    console.log("ON SERVER CLOSE");
    server.off("close", onServerClose);
    wss.off("close", onServerClose);
    wss.off("connection", onConnectionWS);
    wss.terminate();
    server.close();
    unDetect();
    initWebsocket(type, forcePort);
  }
  function onConnectionWS(socket, message) {
    const [url, paramsString] = message.url.split("?");
    const params = new URLSearchParams(paramsString);
    const client = params.get("client") || getId();
    console.log("ON CONNECT: room", url, client, message.headers.origin);
    const room = getRoom(url);
    if (room.has(client)) {
      room.get(client).terminate();
    }
    room.set(client, socket);

    socket.on("error", e => {
      if (e.message === "This socket has been ended by the other party") {
        onEnd();
      }
    });
    socket.on("end", onEnd);
    socket.on("close", onEnd);
    socket.on("message", onData);
    socket.isAlive = true;
    socket.on("pong", heartbeat);

    function onEnd() {
      console.log("DISCONNECT", client);
      socket.off("end", onEnd);
      socket.off("close", onEnd);
      socket.off("message", onData);
      socket.off("pong", heartbeat);
      if (room.get(client) === socket) {
        room.delete(client);
      }
    }
    function onData(data) {
      const message = data.toString();
      if (/^pong[\r\n]*$/i.test(message)) return;
      room.forEach(s => {
        if (s !== socket) {
          s.send(message);
        }
      });
    }
  }

  function heartbeat() {
    this.isAlive = true;
  }
}

module.exports = initWebsocket;
