function fix(v, l = 2) {
  return `000${v}`.substr(-l);
}

function toLocaleString(d) {
  const D = [fix(d.getDate()), fix(d.getMonth() + 1), d.getFullYear()].join(".");
  const T = [d.getHours(), d.getMinutes(), d.getSeconds()].map(v => fix(v)).join(":");
  const MS = fix(d.getMilliseconds(), 3);
  return `${D} ${T}.${MS}`;
}

function timestamp() {
  const d = new Date();
  return d.getTime();
}

function timestampToLocaleString() {
  const d = new Date();
  return `${toLocaleString(d)}.${fix(d.getMilliseconds())}`;
}

exports.timestamp = timestamp;
exports.timestampToLocaleString = timestampToLocaleString;
