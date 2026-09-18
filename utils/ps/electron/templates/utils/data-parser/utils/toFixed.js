function toFixed(v) {
  return `00000000000000000${v}`.substr(-6);
}

exports.toFixed = toFixed;
