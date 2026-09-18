function by(arr, key) {
  return arr.reduce((res, info) => {
    res[info[key]] = info;
    return res;
  }, {});
}

function groupBy(arr, key) {
  return arr.reduce((res, item) => {
    const k = item[key];
    if (!res[k]) res[k] = [];
    res[k].push(item);
    return res;
  }, {});
}

export {by, groupBy};
