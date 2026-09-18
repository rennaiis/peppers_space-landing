try {
  module.exports = require("sharp");
} catch (err) {
  const jimp = require("jimp");
  module.exports = byteArray => {
    const FORMATS = {
      ".png": jimp.MIME_PNG,
      ".jpg": jimp.MIME_JPEG,
      ".jpeg": jimp.MIME_JPEG,
      ".bmp": jimp.MIME_BMP,
      ".gif": jimp.MIME_GIF,
      ".tiff": jimp.MIME_TIFF,
    };
    let promise = read(jimp, byteArray, 5);
    let format;

    return {
      async metadata() {
        const {
          bitmap: {width, height},
        } = await promise;
        return {
          width,
          height,
        };
      },
      async stats() {
        const pic = await promise;
        return {
          isOpaque: !pic.hasAlpha(),
        };
      },
      resize(w = jimp.AUTO, h = jimp.AUTO) {
        promise = promise.then(pic => pic.resize(w, h));
        return this;
      },

      toFile(dir) {
        return promise.then(pic => {
          pic.write(dir);
        });
      },

      toFormat(_format) {
        format = FORMATS[_format] || FORMATS[`.${_format}`];
        return this;
      },

      toBuffer() {
        return promise.then(pic => {
          return new Promise((resolve, reject) => {
            pic.getBuffer(format, (err, buffer) => {
              if (err) reject(err);
              else resolve(buffer);
            });
          });
        });
      },
    };
  };

  module.exports.isUnsupported = type => {
    return /webp/i.test(type);
  };
}

async function read(Jimp, src, maxRetries, retries = 0) {
  try {
    return await Jimp.read(src);
  } catch (e) {
    if (retries >= maxRetries) {
      throw e;
    }

    return await read(Jimp, src, maxRetries, retries + 1);
  }
}
