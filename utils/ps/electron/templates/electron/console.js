const {
  console,
  console: {log},
} = global;

function toFixed(int, l) {
  return `000000000000${int}`.substr(-l);
}

function time() {
  const d = new Date();
  return `${d.toLocaleString()}.${toFixed(d.getMilliseconds(), 3)}`;
}

console.log = (...rest) => {
  log(time(), ...rest);
};
