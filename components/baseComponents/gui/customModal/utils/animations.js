export function getDefaultAnimationBackground({enter = 0, exit = 0} = {}) {
  return {
    enter: {
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: enter,
      },
    },
    done: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: exit * 0.5,
        delay: exit * 0.5,
      },
    },
  };
}

export function getDefaultAnimationContent({
  startPosition,
  donePosition,
  endPosition,
  timeout = {},
  onAnimationComplete,
}) {
  const {enter = 0, exit = 0} = timeout;
  return {
    enter: {
      ...startPosition,
      transition: {
        ease: "easeIn",
        duration: enter * 0.5,
        delay: enter * 0.5,
      },
      onAnimationComplete,
    },
    done: {...donePosition},
    exit: {
      ...endPosition,
      transition: {
        ease: "easeOut",
        duration: exit * 0.5,
      },
    },
  };
}
