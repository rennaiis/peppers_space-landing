const fs = require("fs");

const Sharp = require("./imagesProcessSharpLike");
const {initCache} = require("../utils/cache");
const download = require("../utils/download");

module.exports = async function (src, dst, _console = console, {resize, skipCache} = {}) {
  const {getCache, setCache, getFileName} = initCache(dst);
  let itm = skipCache ? false : getCache(src);
  if (itm && !itm.source) {
    itm.source = src;
  }
  if (!itm || /\.html$/.test(itm.src || itm) || itm.success === false) {
    _console.log("download", src);
    itm = setCache(src, downloadAndSave(src, dst, getFileName, _console, resize));
  }

  return await itm;
};

async function downloadAndSave(src, dir, getFileName, _console, resize) {
  if (/lh3\.googleusercontent\.com\/proxy\//.test(src)) {
    throw {success: false};
  }

  const {ext, byteArray, statusCode} = await download(
    src,
    [
      data => {
        const {ext, byteArray} = data;
        if (ext === ".html") {
          if (/wikipedia\.org/.test(src)) {
            const htmlContent = byteArray.toString();
            const ogImage = /property="og:image"\s+content="([^"]+)"/.exec(htmlContent);
            if (ogImage) {
              return download(ogImage[1]);
            }
          }
        }
        return data;
      },
    ],
    _console,
  );

  return await new Promise(async (resolve, reject) => {
    const justSave = () => {
      const fileName = getFileName(ext, byteArray);

      fs.promises.writeFile(`${dir}/${fileName}`, byteArray).then(() => {
        if (statusCode < 300) {
          resolve({src: fileName, source: src});
        } else {
          reject({src: fileName, source: src, success: false});
        }
      });
    };

    try {
      switch (true) {
        case /png|jpe?g|webp/i.test(ext) && !(Sharp.isUnsupported && Sharp.isUnsupported(ext)):
          resolve({...(await processImage(ext, byteArray, resize, getFileName, dir)), source: src});
          break;
        default:
          justSave();
          break;
      }
    } catch (e) {
      justSave();
    }
  });
}

async function processImage(ext, byteArray, resize, getFileName, dir) {
  let sharp = Sharp(byteArray);
  let [{width, height}, {isOpaque}] = await Promise.all([sharp.metadata(), sharp.stats()]);
  const format = isOpaque ? ext.replace(/jpeg|png|gif/i, "jpg") : ext;
  /*
  if (resize !== false) {
    const [w, h] = resize || [1920, 1080];
    if (width > w || height > h) {
      const aspect = height / width;
      const s = Math.min(w / width, h / height);
      width = Math.round(width * s);
      height = Math.round(width * aspect);
      sharp = sharp.resize(width);
    }
  }
  */

  return sharp
    .toFormat(format.substr(1))
    .toBuffer()
    .then(async byteArray => {
      const fileName = getFileName(format || ext, byteArray);
      await fs.promises.writeFile(`${dir}/${fileName}`, byteArray);
      return fileName;
    })
    .then(fileName => {
      return {src: fileName, width, height};
    });
}
