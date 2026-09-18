function killTweensOf(target, props) {
  const tweens = gsap.getTweensOf(target, props);
  tweens.forEach(tween => {
    tween.parent?.kill();
    tween.kill();
  });
}

export {killTweensOf};
