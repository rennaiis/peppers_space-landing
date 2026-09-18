const path = require("path");
const fs = require("fs").promises;
const {timestamp} = require("../utils/timestamp");
const customConsole = require("./utils/customConsole");
const parse = require("./parse-spreadsheet");
const parseApi = require("./parse-api");
const doTypograf = require("./utils/doTypograf");
const processData = require("./utils/processData");

const loadImage = require("./images");

function isImage(cell) {
  const arr = /=\(*image\("(.*)"\)|^(https?:\/\/.+|^\/uploads\/[^"]+)\)*/i.exec(cell);
  return (arr && (arr[1] || arr[2])) || false;
}

async function parseDocument(doc, dirSaveTo, _console = customConsole, find, skipCache) {
  const {gid: id, id: app, cms} = doc;
  _console.log("START", id);
  const saveToApp = path.resolve(dirSaveTo, app);
  const imagesDir = path.resolve(saveToApp, "images");
  if (!find) {
    await fs.mkdir(imagesDir, {recursive: true});
  }
  try {
    let info = {};
    if (!cms?.content) {
      const {title, list, config} = await parse(id, _console, find);
      if (!find) {
        await loadImages(getImage(imagesDir, "images", _console, skipCache))({list, config});
        await doTypograf({list, config});
      }
      info = {title, list, config};
    } else {
      info = await parseApi(cms.content, _console, getImage(imagesDir, "images", _console, skipCache));
    }
    if (!find) {
      _console.log("WRITE", id);
      await fs.writeFile(`${saveToApp}/data.json`, JSON.stringify({...info, timestamp: timestamp()}));
    }
  } catch (e) {
    _console.log("ERROR", e);
  }
  _console.log("END", id);
}

function loadImages(loader) {
  return processData(
    k => k.charAt(0) === "$",
    (list, key, value) => {
      return parseImage(list, key.substr(1), value);
    },
  );

  async function parseImage(list, key, value) {
    if (Array.isArray(value)) {
      list[key] = await Promise.all(value.map(loader));
    } else {
      list[key] = await loader(value);
    }
  }
}

const getImage = (() => {
  const MAX_WORKERS = 5;
  const workers = [];
  const stack = [];
  return (saveTo, dir, _console, skipCache) => {
    return _href => {
      const href = isImage(_href);
      if (!href) {
        return Promise.resolve("");
      }

      const itm = {href, saveTo, dir};
      itm.promise = new Promise((resolve, reject) => {
        itm.resolve = resolve;
        itm.reject = reject;
      });
      stack.push(itm);
      _check(_console, skipCache);
      return itm.promise;
    };
  };

  function _check(_console, skipCache) {
    if (stack.length > 0 && workers.length < MAX_WORKERS) {
      const itm = stack.shift();
      let isResolved = false;
      const promise = loadImage(itm.href, itm.saveTo, _console, {skipCache})
        // .then(itm.resolve, itm.reject)
        .then(
          info => {
            itm.resolve({
              ...info,
              src: `${itm.dir}/${info.src}`,
            });
          },
          () => {
            itm.resolve({success: false});
          },
        )
        .then(err => {
          isResolved = true;
          workers.splice(workers.indexOf(promise), 1);
          _check(_console, skipCache);
          return {success: false};
        });
      if (!isResolved) {
        workers.push(promise);
      }
    }
  }
})();

function initImg(src) {
  return [initProtocol, initGoogleDrive].reduce((s, fn) => fn(s), src);
}

function initProtocol(src) {
  if (!/^https?:\/\//.test(src)) {
    return `https://${src}`;
  }
  return src;
}

function initGoogleDrive(src) {
  return src.replace(
    /https:\/\/drive\.google\.com\/file\/d\/(.+)\/view/,
    "https://drive.google.com/uc?id=$1&export=download",
  );
}

function initSB(src) {
  return src.replace("https://sb.peppers-studio.ru", "http://sb.peppers-studio.ru");
}

exports.parseDocument = parseDocument;
