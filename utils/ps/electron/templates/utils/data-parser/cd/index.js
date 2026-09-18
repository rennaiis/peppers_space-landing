const {
  updateApp,
  deployApp,
  updateContent,
  deployContent,
  deployElectron,
  setTmpDir,
  startLog,
  getLog,
  checkApp,
} = require("./main");
const {clearCache} = require("../utils/cache");
const {getApp} = require("../apps");
const reload = require("../utils/reload");
const {zip} = require("./batches/unzip");

function getAppId(req) {
  const {app} = req.query;
  return (checkApp(app) && app) || false;
}

function updater(fn, allowNoApp) {
  return (req, res, next) => {
    const app = getAppId(req);
    if (app || allowNoApp) {
      const _console = startLog();
      fn(app, _console, req)
        .catch(err => {
          console.log("[ERROR]", err);
          _console.log(err);
        })
        .then(_console.done);
      res.json({
        success: true,
        data: {log: _console.id, href: `http://${req.headers.host}/api/log?id=${_console.id}`},
      });
    } else {
      res.json({success: false});
    }
    res.end();
  };
}

function initCD(server, appDir, contentDir, tmpDir) {
  setTmpDir(tmpDir);

  /** Загрузка приложения на админский комп и копирование на инсталляцию, если передан id приложения */
  server.use(
    "/api/update-app",
    updater(async (app, _console) => {
      await updateApp(appDir, _console);
      if (app) {
        await deployApp(app, appDir, _console);
      }
    }, true),
  );

  /** Копирование приложения с админского компа на инсталляцию */
  server.use(
    "/api/deploy-app",
    updater((app, _console) => deployApp(app, appDir, _console)),
  );

  /** Загрузка и копирование на инсталляцию контента */
  server.use(
    "/api/updater",
    updater(async (app, _console, req) => {
      const isClearCache = req.query.hasOwnProperty("clear_cache");
      if (isClearCache) clearCache();
      await updateContent(app, contentDir, _console, true, isClearCache);
      // await zip(`${contentDir}\\`, "", _console.stream);
      await deployContent(app, contentDir, _console);
    }),
  );

  /** Загрузка и копирование на инсталляцию электроновских скриптов */
  server.use(
    "/api/deploy-electron",
    updater(async (app, _console) => {
      await deployElectron(app, _console);
    }, true),
  );

  /** Перезагрузка инсталляций */
  server.use(
    "/api/reload",
    updater(async (app, _console) => {
      const apps = getApp(app);
      for (const app of apps) {
        await Promise.all(app.deploy.map(ip => reload(ip, 10000, _console)));
      }
    }, true),
  );

  server.get("/api/clear-content-cache", () => {
    clearCache();
  });

  /** Вывод лога */
  server.get("/api/log", (req, res, next) => {
    const {id} = req.query;
    getLog(id).pipe(res);
  });
}

module.exports = initCD;
