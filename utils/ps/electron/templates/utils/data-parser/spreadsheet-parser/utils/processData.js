function processData(testKey, process) {
  function _do(list) {
    if (typeof list !== "object" || !list) {
      return list;
    }

    let l;
    if (Array.isArray(list)) {
      l = list.map(_do);
    } else {
      l = Object.keys(list).map(key => {
        const value = list[key];
        if (testKey(key, value)) {
          delete list[key];
          return process(list, key, value);
        } else {
          return _do(value);
        }
      });
    }

    return Promise.all(l);
  }
  return _do;
}

module.exports = processData;
