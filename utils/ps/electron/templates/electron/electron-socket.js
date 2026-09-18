const net = require("net");
const {ipcMain: ipc} = require("electron");
const {WebSocketServer} = require("ws");

const servers = {};
const sClients = {};
const clients = {buffer: {}};
/**
 * client ID - идентификатор клиента сервера
 * @type {number}
 */
let cid = 0;

ipc.on("initClient", (e, id, port, host) => {
  let tryConnectDestroy;
  let client;
  let buffer = clients.buffer[id] || "";
  let isConnected = false;
  if (!clients[id]) {
    client = new net.Socket();
    client.on("data", onClientData);
    clients[id] = {
      _send: msg => {
        buffer += msg;
        submit();
      },
    };
    client.on("connect", onClientConnected);
    tryConnect();
  }

  function tryConnect() {
    const _DESTROY = 3;
    let state = 0;
    let tryConnectTimeout;
    if (tryConnectDestroy) {
      tryConnectDestroy();
      tryConnectDestroy = undefined;
    }
    client.on("close", onClientError);
    client.on("error", onClientError);
    client.connect(port, host);

    function onClientError(e) {
      if (state !== _DESTROY) {
        isConnected = false;
        state = _DESTROY;
        tryConnectTimeout = setTimeout(tryConnect, 1000);
      }
    }

    tryConnectDestroy = () => {
      clearTimeout(tryConnectTimeout);
      client.off("close", onClientError);
      client.off("error", onClientError);
      tryConnectDestroy = undefined;
    };
  }

  function onClientData(data) {
    log(`CLIENT ${host}:${port} on data >`, data.toString().trim(), "<");
    e.sender.send("client-data", id, data);
  }
  function onClientConnected() {
    log("onClientConnected");
    e.sender.send("client-connected", id);
    isConnected = true;
    submit();
  }

  function submit() {
    if (buffer && isConnected) {
      log("submit", buffer.toString().trim());
      client.write(buffer);
      buffer = "";
    }
  }
});

ipc.on("sendClient", (e, id, data) => {
  log("send client", id, !!clients[id], data.toString().trim());
  if (clients[id]) {
    clients[id]._send(data);
  } else {
    clients.buffer[id] = (clients.buffer[id] || "") + data;
  }
});

let isServerConnected = false;
let serverBuffer = [];
ipc.on("initServer", (e, id, port, host) => {
  if (!servers[id]) {
    sClients[id] = {};
    log(id, port, host);
    const server = net.createServer();
    server.listen(port, host);
    server.on("connection", onConnectionSocket);
    servers[id] = server;
    if (global.httpServer) {
      const wss = new WebSocketServer({server: global.httpServer, path: "/ws"});
      wss.on("connection", onConnectionWS);
    }
  }

  function onConnectionSocket(socket) {
    onConnection(socket, false);
  }
  function onConnectionWS(socket) {
    onConnection(socket, true);
  }
  function onConnection(socket, isWS) {
    cid += 1;
    sClients[id][cid] = {
      socket,
      write: isWS ? (...rest) => socket.send(...rest) : (...rest) => socket.write(...rest),
    };
    const connectionID = cid;
    log("on connection", cid);
    e.sender.send("server-connection", id, connectionID);
    const onData = data => {
      log(`SERVER ${host}:${port} on data`, data.toString());
      serverBuffer.push([e.sender, "server-data", connectionID, data]);
      serverSend();
    };

    socket.on(isWS ? "message" : "data", onData);

    socket.on("error", e => {
      if (e.message === "This socket has been ended by the other party") {
        onEnd();
      }
    });
    socket.on("end", onEnd);
    function onEnd() {
      delete sClients[id][cid];
      e.sender.send("server-disconnect", connectionID);
    }
  }
});

ipc.on("server-connect", (e, id) => {
  isServerConnected = true;
  serverSend();
});
ipc.on("server-disconnect", (e, id) => {
  isServerConnected = false;
});

function serverSend() {
  if (isServerConnected) {
    while (serverBuffer.length) {
      const t = serverBuffer.shift();
      t.shift().send(...t);
    }
  }
}

ipc.on("submit", (e, id, cid, msg) => {
  // log("submit", id, !!sClients[id], trim(msg));
  const clients = sClients[id];
  if (cid === true) {
    Object.values(clients).forEach(itm => {
      try {
        itm.write(msg);
      } catch (err) {}
    });
  } else if (clients[cid]) {
    clients[cid].write(msg);
  }
});

function trim(msg) {
  if (msg.length > 24) {
    return `${msg.substr(0, 12)}...${msg.substr(-12)}`;
  }
  return msg;
}

function log(...args) {
  // console.log(new Date().toUTCString(), ...args);
}
