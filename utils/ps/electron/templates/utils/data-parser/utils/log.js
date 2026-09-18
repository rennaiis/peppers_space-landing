function log(prefix) {
  return (...args) => {
    console.log(timestamp(), prefix, ...args);
  };
}

function timestamp() {
  return new Date().toISOString();
}

module.exports = log;

/*
const logs = ((url) => {
  const getIndex = (() => {
    let index = 0;
    return () => ++index; // eslint-disable-line no-plusplus
  })();

  const baseDir = path.resolve(__dirname, "..");
  const relativePath = url;
  const dir = path.resolve(baseDir, relativePath);
  const info = {
    regExp: new RegExp(`^/${relativePath}/\\d+\\.\\d+\\.\\d+/\\d+_\\d+\\.txt$`),
    create() {
      const dir = `${relativePath}/${day()}`;
      fs.mkdirSync(dir, { recursive: true });
      return `${dir}/${Date.now()}_${getIndex()}.txt`;
    },
    resolve(p) {
      return path.join(baseDir, p);
    },
  };

  fs.promises.mkdir(dir, { recursive: true }).catch(Console.error);

  return info;
})("logs");*/
