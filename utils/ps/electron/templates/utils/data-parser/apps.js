const {project_id: pid} = require("./package.json");

const EVERY = "every";
const HOST = `https://${pid}.dev.page-view.ru`;
const NODE_HOST = `https://node-${pid}.dev.page-view.ru`;
const ADMIN = `${global.CMS_HOST ?? HOST}/admin`;
const API = `${global.API_HOST ?? NODE_HOST}/api`;

// const SOCKET = "wss://ws-hub.dev.peppers-studio.ru/";
// const SOCKET_ROOM = `${pid}/${require("os").hostname()}`;

const docs = [
  {
    id: "main",
    cms: {
      content: `${API}/data-report`,
      url: ADMIN,
    },
  },
];

const apps = [
  {
    updateAvailable: true, // {content: 1, app: 1}
    doc: "main",
    deploy: [],
    page: "",
    name: "",
    design: "",
    number: "",
    search: {data: false, app: false}, //`${API}/data-report/index`}
  },
];

const config = {
  builds: `${HOST}/builds/`, // откуда качать билды
  files: {
    base: "build-win-unpacked.zip",
    electron: "build-electron.zip",
    app: "build.zip",
  },
  dirs: {
    content: "content", // "app/win-unpacked/resources/app/dist/data/"
    dist: "out", // "app/win-unpacked/resources/app/dist/"
    electron: "win-unpacked\\resources\\app",
  },
};

function getDocs(id) {
  if (!id || id === EVERY) return docs;

  const list = id.split(",");
  return docs.filter(itm => list.includes(itm.id));
}

function getApp(id) {
  return !id || id === EVERY ? apps : apps.filter(itm => itm.doc === id);
}

function getList() {
  return apps.map(app => ({
    app,
    content: app.doc ? getDocs(app.doc)[0] : false,
  }));
}

exports.EVERY = EVERY;
exports.docs = docs;
exports.apps = apps;
exports.config = config;
exports.getList = getList;
exports.getDocs = getDocs;
exports.getApp = getApp;
exports.HOST = HOST;
exports.API = API;
exports.NODE_HOST = NODE_HOST;
