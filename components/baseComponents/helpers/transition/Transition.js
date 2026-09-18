import {STATES} from "@/components/baseComponents/helpers/transition/states";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {motion, AnimatePresence, useIsPresent} from "framer-motion";
import {animations} from "./animations";

export default function Transition({
  children,
  animation = "stub",
  keyId,
  customProps = {},
  as = motion.div,
  duration = 0.3,
  enterDuration,
  exitDuration,
  delay = 0,
  enterDelay,
  exitDelay,
  ease = "easeInOut",
  easeEnter,
  easeExit,
  switchMode,
  isVisible = true,
  onExitComplete,
  ...rest
}) {
  const tag = as;

  const enterTransition = {
    duration: enterDuration ?? duration,
    ease: easeEnter ?? ease,
    delay: enterDelay ?? delay,
  };

  const exitTransition = {
    duration: exitDuration ?? duration,
    ease: easeExit ?? ease,
    delay: exitDelay ?? delay,
  };

  const animationConfig = animations[animation];

  return (
    <AnimatePresence mode={switchMode ? "wait" : "sync"}>
      {isVisible && (
        <TransitionItem
          key={keyId}
          tag={tag}
          initial={animationConfig.initial}
          animate={{
            ...animationConfig.animate,
            transition: enterTransition,
          }}
          exit={{
            ...animationConfig.exit,
            transition: exitTransition,
          }}
          transition={{duration, ease, delay}}
          {...customProps}
          onExitComplete={onExitComplete}
          children={children}
          {...rest}
        />
      )}
    </AnimatePresence>
  );
}

function TransitionItem({tag: Tag, children, className, classStates, onExitComplete, ...rest}) {
  const isPresent = useIsPresent();
  const [state, setState] = useState(STATES.PREPARE);
  const customClass = className ? `${className}-` : "";

  useEffect(() => {
    if (!isPresent) {
      setState(STATES.EXIT);
      return;
    }
    requestAnimationFrame(() => setState(STATES.ENTER));
  }, [isPresent]);

  return (
    <Tag
      {...rest}
      onAnimationComplete={() => {
        if (isPresent) {
          setState(STATES.ENTERED);
        } else {
          setState(STATES.EXITED);
          onExitComplete?.();
        }
      }}
      className={classNames(
        {
          [classStates?.enter ?? `${customClass}enter`]: state === STATES.ENTER || state === STATES.PREPARE,
          [classStates?.enterDone ?? `${customClass}enter-done`]: state === STATES.ENTERED,
          [classStates?.enterActive ?? `${customClass}enter-active`]: state === STATES.ENTER,
          [classStates?.exit ?? `${customClass}exit`]: state === STATES.EXIT || state === STATES.EXITED,
          [classStates?.exitActive ?? `${customClass}exit-active`]: state === STATES.EXIT,
          [classStates?.exitDone ?? `${customClass}exit-done`]: state === STATES.EXITED,
        },
        rest.className,
        rest.ownClass,
      )}
    >
      {children}
    </Tag>
  );
}

Transition.propTypes = {
  children: PropTypes.node,
  animation: PropTypes.string,
  keyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  customProps: PropTypes.object,
  as: PropTypes.string,
  duration: PropTypes.number,
  enterDuration: PropTypes.number,
  exitDuration: PropTypes.number,
  delay: PropTypes.number,
  enterDelay: PropTypes.number,
  exitDelay: PropTypes.number,
  ease: PropTypes.string,
  switchMode: PropTypes.bool,
};

Transition.defaultProps = {
  animation: "opacity",
  duration: 0.3,
  delay: 0,
  ease: "easeInOut",
  as: "motion.div",
};
