function playAnimationOnce(spine, name, trackIndex = 0, loop = false) {
  if (!checkForAnimation(spine, name)) return;

  return new Promise(resolve => {
    const entry = spine.state.setAnimation(trackIndex, name, loop);

    const handler = trackEntry => {
      if (trackEntry === entry) {
        spine.state.removeListener(listener);
        resolve();
      }
    };

    const listener = {
      complete: handler,
      end: handler,
    };

    spine.state.addListener(listener);
  });
}

function setToStartFrame(spine, name, trackIndex = 0, loop = false) {
  if (!checkForAnimation(spine, name)) return;

  const entry = spine.state.setAnimation(0, name, loop);
  entry.trackTime = 0;
  entry.timeScale = 0;
  spine.state.apply(spine.skeleton);
  spine.update(0);
}

function setToLastFrame(spine, name, trackIndex = 0, loop = false) {
  if (!checkForAnimation(spine, name)) return;

  const entry = spine.state.setAnimation(0, name, loop);
  const animation = spine.state.data.skeletonData.findAnimation(name);
  if (!animation) return;

  entry.trackTime = animation.duration;
  entry.timeScale = 0;
  spine.state.apply(spine.skeleton);
  spine.update(0);
}

function playLoopAnimation(spine, name, trackIndex = 0, onLoop) {
  const entry = spine.state.setAnimation(trackIndex, name, true);
  spine.update(0);

  if (onLoop) {
    const handler = trackEntry => {
      if (trackEntry === entry) {
        onLoop(trackEntry);
      }
    };

    spine.state.addListener({complete: handler});
  }

  return entry;
}

// дождаться окончания ближайшего цикла
function waitForCycleEnd(spine, entry) {
  return new Promise(resolve => {
    const handler = trackEntry => {
      if (trackEntry === entry) {
        spine.state.removeListener({complete: handler});
        resolve(trackEntry);
      }
    };

    spine.state.addListener({complete: handler});
  });
}

function checkForAnimation(spine, animationName) {
  if (!spine?.skeleton?.data) {
    _logError(`checkForAnimation[skeleton]: object '${spine?._storageType}', animationName '${animationName}'`, spine);
    return false;
  }

  const hasAnimation = spine.skeleton.data.animations.some(a => a.name === animationName);

  if (!hasAnimation)
    _logError(
      `checkForAnimation[hasAnimation]: object '${spine?._storageType}', animationName '${animationName}'`,
      spine,
    );

  return hasAnimation;
}

function isAnimationExists(spine, animationName) {
  return spine?.skeleton?.data?.animations.some(a => a.name === animationName);
}

function resetSpine(spine) {
  spine.state.clearTracks();
  spine.state.clearListeners();
  spine.skeleton.setToSetupPose();
}

function _logError() {
  return;
  console.log(...arguments);
}

export {
  resetSpine,
  checkForAnimation,
  waitForCycleEnd,
  playLoopAnimation,
  setToLastFrame,
  setToStartFrame,
  playAnimationOnce,
  isAnimationExists,
};
