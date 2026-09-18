const {app, BrowserWindow, screen, ipcMain: ipc, nativeTheme, shell} = require("electron");
const fs = require("fs");

const path = require("path");
const url = require("url");
const argv = require("yargs")(process.argv).argv;
require("./electron-socket");
require("./console");

const {width = 1920, height = 1080, offsetX = 0, offsetY = 0} = argv;

app.allowRendererProcessReuse = true;
app.commandLine.appendSwitch("remote-debugging-port", "8315");

if (argv.socket) {
  const [host, port] = argv.socket.split(":");
  require("./websocket/websocket-hub")(false, +port);
}

const windows = [];

function openDevTools() {
  windows.forEach(({webContents}) => {
    webContents.openDevTools({mode: "undocked", activate: true});
  });
}

function disableSecure() {
  const {protocol} = require("electron");
  protocol.registerSchemesAsPrivileged([
    {
      scheme: "http",
      privileges: {
        bypassCSP: true,
        secure: true,
        supportFetchAPI: true,
        corsEnabled: true,
      },
    },
  ]);
}

function initServer(router) {
  return new Promise(resolve => {
    const express = require("express");
    const server = express();
    const httpServer = require("http").createServer(server);
    // server.use(require("cors")());
    // server.use(express.json());

    if (router) {
      server.use(router);
    }

    const staticDir = argv.application || path.resolve(__dirname, "../out");
    server.use(appendHTML(staticDir));
    //TODO extensions в `express.static` игнорирует файлы, в названии которых есть точка
    server.use(express.static(staticDir));

    if (argv.proxy) {
      const proxyProps = argv.proxy.split("|");
      if (proxyProps.length === 1) proxyProps.unshift("/api");
      const [proxyP, proxyU] = proxyProps;
      server.use(
        proxyP,
        require("express-http-proxy")(proxyU, {
          proxyReqPathResolver: req => `${proxyP}${req.url}`,
        }),
      );
    }

    if (argv.data) {
      server.use("/content", express.static(argv.data));
      // query.data = `/content/${path.basename(argv.data)}`
    }
    const _port = argv.port || 10_000;
    global.httpServer = httpServer;
    connect(_port);

    function connect(p) {
      httpServer.listen(p, err => {
        if (err) {
          console.error(err);
          connect(p + 1);
          return;
        }
        console.log(`listen: http://localhost:${p}`);
        resolve({port: p, server: httpServer});
      });
    }
  });
}

async function createWindow(argv) {
  if (argv.server && argv.window === false) {
    return initServer();
  }

  const displays = screen.getAllDisplays();

  const display = argv.display
    ? displays[Math.max(0, Math.min(displays.length - 1, argv.display - 1))]
    : screen.getPrimaryDisplay();

  const _window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "electron-preload.js"), // use a preload script
    },
    webSecurity: argv.webview,
    backgroundColor: "#000000",
    // width: 1920,
    // height: 1080,
    x: display.bounds.x,
    y: display.bounds.y,
    fullscreen: argv.fullscreen !== undefined ? argv.fullscreen : true,
    resizable: argv.resizable !== undefined ? argv.resizable : true,
    frame: false,
  });
  windows.push(_window);

  let URL;
  const pathname = argv.hasOwnProperty("app") ? `${argv.app}` : "";
  const query = {
    __static: __dirname,
    offsetX,
    offsetY,
    width,
    height,
  };
  for (const [key, value] of new url.URLSearchParams(argv.queryParams)) {
    query[key] = value;
  }
  // if (argv.data) {
  // query.data = argv.data;
  // }
  if (argv.clearCache) {
    _window.webContents.session.clearCache().then(() => {});
  }
  if (argv.debug) {
    query.debug = argv.debug;
  }

  if (argv.localhost) {
    // Open the DevTools.
    _window.webContents.on("will-prevent-unload", function (event, url) {
      event.preventDefault();
    });
    _window.webContents.on("did-navigate-in-page", function (event) {
      event.preventDefault();
    });
    URL =
      argv.url ||
      url.format({
        protocol: "http:",
        hostname: "localhost",
        port: argv.port || 3000,
        pathname: pathname || "/",
        query,
      });
  } else if (argv.server) {
    const router = require("express")
      .Router()
      .get("/command", (req, res) => {
        windows.forEach(({webContents}) => webContents.send("command", req.query));
        res.status(200).send(`Command ${JSON.stringify(req.query)}`);
      })
      .get("/restart", (req, res) => {
        res.status(200).send("<h2>Инсталляция перезагружается</h2>");
        process.exit(100);
      })
      .get("/reload", (req, res) => {
        windows.forEach(_window => _window.reload());
        res.status(200).send("<h2>Страница на инсталляции перезагружена</h2>");
      })
      .get("/reload-clear-cache", (req, res) => {
        return Promise.all(
          windows.map(({webContents}) => {
            webContents.session.clearCache().then(() => {
              _window.reload();
            });
          }),
        ).then(() => {
          res.status(200).send("<h2>Страница перезагружена с очисткой кэша</h2>").end();
        });
      });

    if (argv.admin) {
      router.get("/admin", (req, res) => {
        // res.redirect(302, argv.admin);
        shell.openExternal(argv.admin);
        res.json({
          success: true,
          command: `start ${argv.admin}`,
        });
      });
    }
    const $serverPromise = initServer(router);
    URL = $serverPromise.then(({port: p}) =>
      url.format({
        protocol: "http:",
        hostname: "localhost",
        port: p,
        pathname,
        slashes: true,
        query,
      }),
    );
  } else if (argv.link) {
    URL = argv.link;
    /*_window.webContents.on("will-prevent-unload", function (event, url) {
      event.preventDefault();
    });
    _window.webContents.on("did-navigate-in-page", function (event) {
      event.preventDefault();
    });
    URL = url.format({
      protocol: "https:",
      hostname: argv.link,
      pathname: "",
      query
    });*/
  } else {
    URL = url.format({
      pathname: path.join(__dirname, "dist", pathname),
      protocol: "file:",
      slashes: true,
      query,
    });
  }

  if (!argv.showCursor) {
    _window.webContents.on("dom-ready", () => {
      _window.webContents.executeJavaScript(
        `(function() {
          const css = '._hide-cursor, ._hide-cursor button, ._hide-cursor * { cursor: none; }';
          const head = document.head || document.getElementsByTagName('head')[0];
          const style = document.createElement('style');
          style.type = 'text/css';
          style.appendChild(document.createTextNode(css));
          head.appendChild(style);

          const dispatcher = document.documentElement;
          const listener = (e) => {
            if (e.code === "KeyC" && e.ctrlKey && e.altKey) {
              dispatcher.classList.toggle("_hide-cursor");
            }
          };
          dispatcher.addEventListener("keydown", listener);
          document.documentElement.classList.add("_hide-cursor");
        })();`,
      );
    });
  }
  // if (argv.debug && argv.server) {
  //   var primus = require("primus").createServer(function connection(spark) {}, {
  //     port: 8080,
  //   });
  //   primus.save(__dirname + "/primus.js");
  //   primus.on("connection", function (spark) {
  //     spark.on("data", function received(data) {
  //       primus.forEach(function (anotherSpark, id, connections) {
  //         if (anotherSpark === spark) return;
  //         anotherSpark.write(data);
  //       });
  //     });
  //   });
  // }

  _window.on("close_event", function () {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  _window.on("closed", function () {
    // osk.kill();
    const i = windows.indexOf(_window);
    if (i >= 0) {
      windows.splice(i, 1);
    }
  });
  const onReadyToShow = () => {
    _window.off("ready-to-show", onReadyToShow);
    // _window.show();
    if (argv.devTools) {
      // setTimeout(openDevTools, 1000);
      openDevTools();
    }
  };
  _window.on("ready-to-show", onReadyToShow);

  await _window.loadURL(await URL);
  return _window;
  // _window.webContents.executeJavaScript("alert('" + URL + "')");

  /* var osk = execFile(path.join(__dirname, 'osk/osk.exe'),
    function(error, stdout, stderr) {
      if (error) {
        console.error(error);
        return;
      }
    }); */
}

function log(...args) {
  const d = new Date();
  console.log(d.toLocaleString(), ...args);
  if (argv.isLogToFile) {
    const txt = `${d.toLocaleString()}\n${args.map(v => JSON.stringify(v, null, "  ")).join("\n-----------------\n")}`;
    fs.appendFile(path.resolve(__dirname, `log/${d.getFullYear()}-${d.getMonth()}-${d.getDate()}.log`), txt, () => {});
  }
}

function initIPC() {
  /* const dir = argv.debug ? "app" : "resources/app/dist";

  ipc.on("get-file", (event, data) => {
    fs.readdir(`${dir}/${data.folderName}`, function (err, files) {
      mainWindow.webContents.send("return-file", {
        file: err ? null : files[0],
      });
    });
  });
  ipc.on("close_event", () => {
    app.quit();
  });
  ipc.on("write_to", (event, data) => {
    fs.writeFileSync(`${dir}/${data.path}`, data.content);
  });
  ipc.on("append_to", (event, data) => {
    fs.appendFileSync(`${dir}/${data.path}`, data.content);
  }); */

  ipc.on("devTools", openDevTools);
  ipc.on("error", (e, msg) => {
    log(msg);
  });
  ipc.on("notify", (e, msg) => {
    require("./notify").sendNotify(msg);
    log(null, msg);
  });
  ipc.on("log", log);

  function log(e, ...args) {
    fs.appendFile(getName(), `${timestamp()} ${args.map(v => stringify(v)).join(" ") + "\n"}`, () => {});

    function toFixed(val) {
      return `0${val}`.substr(-2);
    }

    function getName() {
      const d = new Date();
      return path.join(__dirname, `logs/${d.getFullYear()}.${toFixed(d.getMonth() + 1)}.${toFixed(d.getDate())}.log`);
    }

    function stringify(v) {
      if (v instanceof Error) {
        return `${v.message} \n${v.stack}`;
      }
      return JSON.stringify(v);
    }

    function timestamp() {
      return new Date().toISOString();
    }
  }
}

function initTUIO(address, {webContents}) {
  if (address) {
    require("./tuio")(address, info => webContents.send("tuio", info));
  }
}

function initWatch() {
  if (!argv.watch) return;
  const reload = debounce(() => {
    windows.forEach(_window => _window.reload());
    // _window.loadURL(
    //   url.format({ pathname: __dirname, protocol: "file:", slashes: true })
    // );
    // setTimeout(() => {
    //   _window.loadURL(URL);
    // }, 1500);
  }, 5_000);
  fs.watch(__dirname, {recursive: true, persistent: false}, onChange);
  if (argv.data) {
    fs.watch(path.dirname(argv.data), {recursive: true, persistent: false}, onChange);
  }

  function onChange(eventType, filename) {
    log("on change", filename);
    // styles/cache.txt, default.ini
    if (/\.(css|js|json|html|svg|png|jpe?g)$/.test(filename)) {
      reload();
    }
  }
}

function onReady() {
  let promise = createWindow(argv);
  promise.then(window => {
    initIPC();
    initTUIO(argv.tuio, window);
    initWatch();
  });

  if (argv.app2) {
    promise = promise.then(
      /**
       * @param {BrowserWindow} window
       * @returns {Promise<unknown>}
       */
      window => {
        const link = new URL(window.getURL());
        link.pathname = "/" + argv.app2;
        return createWindow({
          ...argv,
          server: false,
          app: argv.app2,
          tuio: false,
          display: 2,
          queryParams: false,
          link: link.toString(),
        }).then(window => {
          // ipc.on("video", (e, msg) => window.webContents.send("video", msg));
        });
      },
    );
  }
  return promise;
}

app.on("ready", onReady);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (windows.length === 0) {
    onReady().catch(console.error);
  }
});

nativeTheme.themeSource = "light";

function debounce(cb, duration) {
  let timeout;
  let _clearTimeout = clearTimeout;
  let _setTimeout = setTimeout;

  if (!duration) {
    _clearTimeout = cancelAnimationFrame;
    _setTimeout = requestAnimationFrame;
  }

  return function debounced(...args) {
    _clearTimeout(timeout);
    timeout = _setTimeout(() => cb.apply(this, args), duration);
  };
}

function appendHTML(dir) {
  return function (req, res, next) {
    const directory = req.path.split("/");
    const file = directory.pop().split(".");
    const ext = file.length > 1 ? file.pop() : "";

    if (/^\d*$/.test(ext)) {
      const file = `${dir}${req.path}.html`;
      fs.stat(file, err => {
        if (!err) {
          req.url = req.url.replace(req.path, `${req.path}.html`);
        }
        next();
      });
    } else {
      next();
    }
  };
}
