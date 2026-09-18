let map = [];
let codeLength = 0;
let stack = "";
const {document} = global;

function onClick(e) {
  stack = `${stack}${getCode(e)}`.substr(-codeLength);
  check();
}

function getCode(e) {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  // const a = Math.floor((Math.atan2(y, x) / Math.PI + 1.25) % 2 * 2);
  return ["l", "b", "t", "r"][+(x > y) * 2 + (x > -y)];
}

function check() {
  map.filter(itm => itm.code === stack.substr(-itm.code.length)).forEach(itm => itm.listener());
}

export function addOnscreenCodeListener(code, listener) {
  map.push({code, listener});
  codeLength = Math.max(codeLength, code.length);
  if (document && map.length === 1) {
    document.documentElement.addEventListener("click", onClick);
  }
  return () => {
    removeOnscreenCodeListener(code, listener);
  };
}
export function removeOnscreenCodeListener(code, listener) {
  map = map.filter(itm => !(itm.code === code && itm.listener === listener));
  codeLength = map.reduce((res, itm) => Math.max(res, itm.code.length), 0);
  if (document && map.length === 0) {
    document.documentElement.removeEventListener("click", onClick);
  }
}
