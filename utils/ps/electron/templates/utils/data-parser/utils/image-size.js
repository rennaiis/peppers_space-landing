const path = require("path");
const Sharp = require("sharp");

async function getSize(src) {
  if (typeof src === "string" && !/\.(jpe?g|png|gif|svg)/.test(src)) {
    return {width: 0, height: 0};
  }
  const img = Sharp(src);

  return img.metadata();
}

// getSize(path.resolve("../../public/data/images/000001.jpeg"));

module.exports.getSize = getSize;
