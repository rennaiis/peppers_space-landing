const path = require("path");
const process = require("../process");
const stringify = require("../stringify");

function unzip(archive, unzipTo, logStream) {
  unzipTo = unzipTo || archive.replace(/\.[^.]+$/, "");
  return process(`"${path.resolve(__dirname, "unzip.bat")}"`, [stringify(archive), stringify(unzipTo)], logStream).then(
    data => {
      data.dir = unzipTo;
      return data;
    },
  );
}
function zip(directory, archive, logStream) {
  if (!archive) {
    let dir = path.dirname(directory);
    let name = path.basename(directory);
    if (!name || name === "*") {
      name = path.basename(dir);
      dir = path.dirname(directory);
    }
    name += ".zip";
    archive = path.join(dir, name);
  }
  return process(
    `"${path.resolve(__dirname, "zip.bat")}"`,
    [stringify(directory + "*"), stringify(archive)],
    logStream,
  ).then(data => {
    data.archive = archive;
    return data;
  });
}

module.exports = {
  unzip,
  zip,
};
