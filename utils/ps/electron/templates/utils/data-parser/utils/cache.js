const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const map = new Map();

process.on("exit", () => {
  console.log("on exit");
  saveCaches();
});
function saveCaches() {
  for (const c of map.values()) {
    c.saveCache();
  }
}

function clearCache() {
  for (const c of map.values()) {
    c.clearCache();
    c.saveCache();
  }
}

function initCache(dir) {
  let cache;
  if (!map.has(dir)) {
    const fileName = path.resolve(dir, "images.cache.json");
    try {
      const cacheString = fs.readFileSync(fileName);
      cache = JSON.parse(cacheString.toString());
    } catch (e) {}

    if (!cache) cache = {};

    function saveCache() {
      fs.writeFileSync(
        fileName,
        JSON.stringify(
          cache,
          (key, value) => {
            if (value instanceof Promise) {
              return undefined;
            }
            return value;
          },
          "\t",
        ),
      );
    }

    map.set(dir, makeCache(cache, saveCache, dir));
  }

  return map.get(dir);
}

function makeCache(cache, saveCache, dir) {
  function getCache(src) {
    return cache[src];
  }

  function setCache(src, promise) {
    cache[src] = promise
      .then(p => {
        cache[src] = p;
        return p;
      })
      .catch(err => {
        cache[src] = err.src ? err : false;
        console.error("ERROR!", src, err);
        return cache[src];
      });

    cache[src].then(saveCache);

    return cache[src];
  }

  function getFileName(ext, byteArray) {
    const hashSum = crypto.createHash("sha256");
    return `${hashSum.update(byteArray).digest("hex")}${ext}`;
  }

  function clearCache() {
    cache = {};
  }

  async function removeFromCache(url) {
    // const key = Object.keys(cache).find((itm) => cache[itm].src === url);
    // delete cache[key];

    const file = path.resolve(dir, cache[url].src);
    console.log("remove", url, file);
    // const dir = path.resolve(__dirname, "../../../public/data/images");
    await fs.promises.unlink(file).catch(() => {});
    delete cache[url];
  }

  async function validateCache(set) {
    const keys = Object.keys(cache);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (cache[key].src && !set.has(cache[key].src)) {
        await removeFromCache(key);
      }
    }
  }

  return {
    getCache,
    setCache,
    getFileName,
    validateCache,
    saveCache,
    clearCache,
  };
}

exports.initCache = initCache;
exports.saveCaches = saveCaches;
exports.clearCache = clearCache;
