const {spawn} = require("child_process");

async function process(bat, args, logStream) {
  return new Promise(resolve => {
    const process = spawn(bat, args, {shell: true, windowsHide: true});
    let out = "";

    if (logStream) {
      process.stdout.pipe(logStream, {end: false});
      process.stderr.pipe(logStream, {end: false});
    } else {
      process.stdout.on("data", data => {
        out += data;
      });
    }

    process.on("exit", (...args) => {
      resolve({out, process});
    });
  });
}

module.exports = process;
