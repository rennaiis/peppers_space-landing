/**
 * TODO
 * * Не запускать процесс обновления/выгрузки, пока не закончился предыдущий
 * * логирование
 */

const fs = require("fs");
const path = require("path");
const url = require("url");

const express = require("express");
const {argv} = require("yargs")(process.argv);

const server = express();

const staticDir = path.resolve(__dirname, "static");
const appDir = path.resolve(staticDir, "app");
const contentDir = path.resolve(staticDir, "content");
const tmpDir = path.resolve(staticDir, "tmp");

function getEnvValue(name) {
  return argv[name] || process.env[name.toUpperCase()];
}

/** Авторизация */
(() => {
  const user = getEnvValue("user");
  const pass = getEnvValue("pass");
  if (user && pass) {
    server.use(
      require("express-basic-auth")({
        users: {[user]: pass},
        challenge: true,
      }),
    );
  }
})();
/** Добавление .html к введенному адресу */
server.use(appendHTML(appDir));
/** Загрузка и сохранение CMS_HOST и API_HOST */
(() => {
  const host = getEnvValue("host");
  if (!host) return;
  global.CMS_HOST = global.API_HOST = host;
  server.use("/", (req, res, next) => {
    res.cookie("CMS_HOST", global.CMS_HOST);
    res.cookie("API_HOST", global.API_HOST);
    next();
  });
})();
require("../cd/index")(server, appDir, contentDir, tmpDir);

//TODO extensions в `express.static` игнорирует файлы, в названии которых есть точка
server.use(express.static(appDir));
server.use("/content", express.static(contentDir));
server.use(_404);

const _port = argv.port || 80;
connect(_port);

function connect(p) {
  server.listen(p, err => {
    if (err) {
      console.error(err);
      connect(p + 1);
    } else {
      const _url = url.format({
        protocol: "http:",
        hostname: "localhost",
        port: p,
        pathname: "/",
        slashes: true,
      });
      console.log("start listen", _url);
    }
  });
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

function _404(req, res) {
  if (req.path === "/") {
    res.redirect("/install");
    return;
  }
  res.status(404);
  if (req.accepts("html")) {
    res.send("404. Not found");
  } else if (req.accepts("json")) {
    res.json({error: "Not found"});
  } else {
    res.type("txt").send("Not found");
  }
}
