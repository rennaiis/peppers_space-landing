const URL = require("node:url");
const processData = require("./utils/processData");
const download = require("../utils/download");

async function downloadAPI(url) {
  return download(url).then(({byteArray}) => {
    return JSON.parse(byteArray.toString());
  });
}

async function parseApi(url, _console, loader) {
  const info = await downloadAPI(url);
  const href = URL.parse(url);

  await processData(
    (key, value) =>
      key === "src" ||
      (typeof value === "string" && /<img [^>]*src=['"]https?:\/\//.test(value)) ||
      (typeof value === "string" && /\/uploads\//.test(value)),
    async (list, key, value) => {
      if (key === "src") {
        list[key] = (await loader(value)).src;
      } else if (/(<(?:img|video|audio|source)[^>]+src=")(.+?)(")/i.test(value)) {
        const regExp = /(<(?:img|video|audio|source)[^>]+src=")(.+?)(")/gi;
        const promises = [];
        while (true) {
          const info = regExp.exec(value);
          if (!info) break;
          promises.push(loader(info[2]).catch(() => info[2]));
        }

        await Promise.all(promises).then(response => {
          regExp.lastIndex = 0;
          list[key] = value.replace(regExp, ($0, $1, $2, $3) => `${$1}${response.shift().src}${$3}`);
        });
      } else {
        const v = await loader(href.resolve(value));
        list[key] = v?.src || v;
      }
      return list;
    },
  )(info);

  return info;
}

module.exports = parseApi;
