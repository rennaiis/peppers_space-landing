const {contextBridge, ipcRenderer} = require("electron");

function addEventListener(...args) {
  ipcRenderer.on(...args);
  return () => {
    ipcRenderer.off(...args);
  };
}
function removeEventListener(...args) {
  return ipcRenderer.off(...args);
}
function send(...args) {
  return ipcRenderer.send(...args);
}

contextBridge.exposeInMainWorld("ipcRenderer", {
  on: addEventListener,
  addEventListener,
  off: removeEventListener,
  removeEventListener,
  send,
  notify,
  log,
});

function log(...args) {
  send("log", ...args);
  /**/
}

function notify(message) {
  send("notify", message);
  // sendNotify(message);
}
