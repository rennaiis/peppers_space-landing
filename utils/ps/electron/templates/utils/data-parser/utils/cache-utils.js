const path = require("node:path");
const fs = require("node:fs/promises");
const {argv} = require("yargs")(process.argv);
const {initCache} = require("./cache");

function findMedia(content) {
  const list = new Set();
  // const reg = /images\/(.+?\.(?:jpe?g|png|gif|svg|mp[34]|wav|web[mp]|pdf))/ig;
  const reg = /images\/(.+?\.[a-z0-9]{3,4}\b)/gi;
  while (true) {
    const info = reg.exec(content);
    if (!info) break;
    list.add(info[1]);
  }

  return list;
}

async function findRequired(file) {
  const content = (await fs.readFile(file)).toString();
  return findMedia(content);
}

async function clear({dir}) {
  const [required, {validateCache}] = await Promise.all([
    findRequired(path.resolve(dir, "data.json")),
    initCache(path.resolve(dir, "images")),
  ]);

  await validateCache(required);
}

exports.clear = clear;

if (process.argv[1] === path.join(path.dirname(__filename), path.basename(__filename, path.extname(__filename)))) {
  // console.log(">>", );
  // console.log("is root");
  exports[argv._[2]]?.(argv);
}
