const path = require("path");
const fs = require("fs");
const {getApp} = require("../apps");
const download = require("../utils/download");
const reload = require("../utils/reload");
const {unzip} = require("./batches/unzip");
const xcopy = require("./batches/xcopy");
const parser = require("../spreadsheet-parser/main");
const {
  config: {dirs, builds, files},
} = require("../apps");

let tmpDir = path.resolve(__dirname, "archives");
let logDir;

function getUrlByType(type) {
  return `${builds}${files[type]}`;
}

function checkApp(app) {
  const _app = getApp(app);
  return !!(_app && _app.length);
}

function setTmpDir(dir) {
  tmpDir = dir;
  logDir = path.resolve(tmpDir, "log");
  fs.mkdir(logDir, {recursive: true}, () => {});
}

const getSaveName = (() => {
  return url => {
    const fileName = url.split("?").shift().split("/").pop();
    return path.resolve(tmpDir, fileName);
  };
})();

function getFileByType(type, _console) {
  return getFile(getUrlByType(type), _console);
}
async function getFile(url, _console) {
  const {byteArray} = await download(url, [], _console);

  const saveTo = getSaveName(url);
  await fs.promises.mkdir(path.dirname(saveTo), {recursive: true});
  await fs.promises.writeFile(saveTo, byteArray);

  const {dir} = await unzip(saveTo, "", _console.stream);
  return dir;
}

async function updateApp(dir, _console = console) {
  const appTmpDir = await getFileByType("app", _console);
  if (dir) {
    const out = path.join(appTmpDir, "out");
    _console.log(`UPDATE APP: ${dir} ${out}`);
    await xcopy("app", dir, [out], _console.stream);
    _console.log(`UPDATE APP COMPLETE: ${dir} ${out}`);
  }
}

async function deployElectron(appID, _console = console) {
  const tmpDir = await getFileByType("electron", _console);
  _console.log(`UPDATE ELECTRON: ${appID} ${tmpDir}`);
  await copyToApp(appID, path.join(tmpDir, "electron"), dirs.electron, _console);
  _console.log(`UPDATE ELECTRON COMPLETE: ${appID} ${tmpDir}`);
}

async function deployApp(appId, from, _console) {
  await copyToApp(appId, from, dirs.dist, _console);
}

async function copyToApp(appId, from, to, _console = console) {
  const apps = getApp(appId);
  for (const app of apps) {
    for (const ip of app.deploy) {
      const dst = getDst(ip);
      let _from = from;
      let _to = to;
      if (typeof from === "function") _from = from(app);
      if (typeof to === "function") _to = to(app);

      _console.log(`COPY TO APP: ${_from} ${dst} ${_to}`);
      if (dst.type === "ftp") {
        // await dataSync({...dst, local: _from}, _console);
      } else {
        await xcopy("exe", dst, [path.join(tmpDir, "base"), app.page], _console.stream);
        await xcopy("app", dst, [_from, _to, path.join(tmpDir, "base")], _console.stream);
        await reload(ip, 10000, _console);
      }
      _console.log(`COPY APP COMPLETE: ${dst}`);
    }
  }
}

function getDst(ip, dir = "") {
  if (typeof ip !== "string") return ip;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
    return `\\\\${ip}\\Content\\${dir}`;
  }

  return `${ip}\\${dir}`;
}

async function updateContent(appId, dir, _console, skipDone, skipCache) {
  await parser(appId, dir, _console, skipDone, skipCache);
}

async function deployContent(appId, from, _console) {
  await copyToApp(
    appId,
    app => path.join(from, app.doc),
    app => path.join(dirs.content, app.doc),
    _console,
  );
}

const unique = (() => {
  let i = 0;
  return () => `${new Date().getTime()}.${++i}.log`;
})();

function startLog() {
  const id = unique();
  const name = path.resolve(logDir, id);
  const stream = fs.createWriteStream(name);

  const log = (...args) => {
    stream.write(args.join(" ") + "\n");
  };

  return {
    id,
    name,
    stream,
    log,
    done() {
      log("DONE");
      stream.close();
    },
  };
}

function getLog(id) {
  const name = path.resolve(logDir, id);
  return fs.createReadStream(name);
}

module.exports = {
  getFile,
  getFileByType,
  checkApp,
  updateApp,
  deployApp,
  updateContent,
  deployContent,
  deployElectron,
  setTmpDir,
  startLog,
  getLog,
};
