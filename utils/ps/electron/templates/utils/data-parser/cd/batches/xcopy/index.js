const path = require("path");
const process = require("../process");
const stringify = require("../stringify");

async function xcopy(type, to, from, logStream) {
  return process(
    `"${path.resolve(__dirname, `copy-${type}.bat`)}"`,
    [stringify(to), ...from.map(v => stringify(v))],
    logStream,
  );
}

module.exports = xcopy;
