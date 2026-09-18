const Stream = require("stream").Transform;
const clients = {
  http: require("http"),
  https: require("https"),
};

function download(_src, functions = [], _console = console, redirects = 0) {
  if (redirects > 5) {
    return Promise.reject({success: false, message: "too many redirects"});
  }
  let src = _src;
  if (!/^[0-9a-z]+:/.test(src)) {
    src = `https://${src.replace(/^\/\//, "")}`;
  }
  let client;
  let ext;
  try {
    const url = new URL(src);
    client = url.protocol.replace(":", "");
    const arr = url.pathname.split(".");
    if (arr.length > 1) {
      ext = arr.pop();
    }
  } catch (e) {
    return Promise.reject({success: false, message: "url parse error"});
  }

  const props = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
    },
  };

  if (client === "https") {
    props.rejectUnauthorized = false;
  } else {
    client = "http";
  }

  const promise = new Promise((resolve, reject) => {
    const req = clients[client].request(src, props, onConnect);
    ["error", "timeout", "uncaughtException"].forEach(name => req.on(name, reject));
    req.end();

    function getRedirect(headers) {
      const loc = headers.location || headers.Location;
      if (/^([a-z0-9]+:)?\/\//.test(loc)) {
        return loc;
      }
      const [, host, dir, file] = /^((?:[a-z0-9]+:)?\/\/[^/]+)\/((?:[^/]+\/)*)([^/]*)$/.exec(src);
      if (loc.charAt(0) === "/") {
        return `${host}${loc}`;
      }
      return `${host}/${dir}${loc}`;
    }

    function onConnect(response, ...args) {
      const data = new Stream();

      response.on("data", chunk => data.push(chunk));
      response.on("error", () => reject(src));

      response.on("end", async () => {
        _console.log(`DOWNLOAD END ${src}`);
        if (response.statusCode >= 300 && response.statusCode < 400) {
          resolve(download(getRedirect(response.headers), [], _console, redirects + 1));
        } else {
          let _ext;
          try {
            const mime = response.headers["content-type"].split("/")[1];
            _ext = `.${mime === "x-wav" ? "wav" : mime.split(/[^a-z0-9]/i).shift()}`;
          } catch (e) {
            _ext = ext;
          }
          _ext = _ext.toLowerCase().replace("jpeg", "jpg");
          const byteArray = data.read();
          if (!byteArray) {
            reject({message: "empty byteArray"});
            return;
          } else if (_ext === ".html") {
            const htmlContent = byteArray.toString();
            const _arr = /document.location.href=\"(.+?)\"/.exec(htmlContent);
            if (_arr) {
              resolve(download(_arr[1], [], _console, redirects + 1));
              return;
            }
          }

          resolve({
            src,
            statusCode: response.statusCode,
            ext: _ext,
            byteArray: byteArray,
          });
        }
      });
    }
  });

  return functions.reduce((res, fn) => res.then(fn), promise);
}

module.exports = download;
