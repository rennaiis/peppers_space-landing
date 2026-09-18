export default function onLogs(message) {
  global.window.ipcRenderer?.send("write-log", message);
}

export function log(...message) {
  console.log(new Date().toISOString(), ...message);
}
