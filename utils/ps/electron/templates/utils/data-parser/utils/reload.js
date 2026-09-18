const http = require("http");

module.exports = reload;

function getAddress(remote) {
  const parse = /^(?:\\\\)?(\d+\.\d+\.\d+\.\d+|[-a-z0-9]+?)(\\|$)/.exec(remote);
  if (parse) return parse[1];

  if (/^[0-9a-z]+:\/\//.test(remote)) return remote;
  return "127.0.0.1";
}

async function reload(ip, port = 10000, _console) {
  await new Promise(resolve => {
    const address = getAddress(ip);
    const url = `http://${address}:${port}/reload-clear-cache`;
    _console.log("[RELOAD]", url);
    http
      .get(url, res => {
        const {statusCode} = res;

        if (!(statusCode >= 200 && statusCode < 300)) {
          _console.log("[ERROR]", `Request Failed.\nStatus Code: ${statusCode}`);
          // Consume response data to free up memory
          res.resume();
          resolve();
          return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            _console.log("[RELOAD]", rawData);
          } catch (e) {
            _console.log("[ERROR]", e.message);
          }
          resolve();
        });
      })
      .on("error", e => {
        _console.log(`[ERROR] Got error: ${e.message}`);
        resolve();
      });
  });
}
