function deep(target, mcFunc, iterateFunc) {
  const {MovieClip} = global.PIXI.animate;
  if (target instanceof MovieClip && target.mode === MovieClip.INDEPENDENT) {
    target[mcFunc]();
  }
  if (target?.children) {
    target.children.forEach(iterateFunc);
  }
}

function deepPlay(target) {
  deep(target, "play", deepPlay);
}

function deepStop(target) {
  deep(target, "stop", deepStop);
}

export {deepPlay, deepStop};
