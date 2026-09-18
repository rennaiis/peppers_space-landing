const {parseDocument} = require("./parse");
const {getDocs} = require("../apps");

const log = require("../utils/log")("INDEX");
const customConsole = {log};

process.on("uncaughtException", function (err) {
  console.log("uncaughtException", err);
});

async function main(APP, output, _console = customConsole, skipDone = false, skipCache) {
  const list = getDocs(APP);

  for (let i = 0; i < list.length; i++) {
    await parseDocument(list[i], output, _console, false, skipCache);
  }

  if (!skipDone) {
    _console.log("DONE");
  }
}

module.exports = main;
