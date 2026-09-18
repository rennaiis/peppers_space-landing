import React, {useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {useModal} from "@/hooks/useModal";
import styles from "./CustomModal.module.scss";
import {motion} from "framer-motion";
import {
  getDefaultAnimationBackground,
  getDefaultAnimationContent,
} from "@/components/baseComponents/gui/customModal/utils/animations";
import {donePositionDefault, endPositionDefault, startPositionDefault} from "@/constants/modals";

export default function CustomModal({
  children,
  horizontalPosition = "center",
  verticalPosition = "middle",
  startPosition = startPositionDefault,
  donePosition = donePositionDefault,
  endPosition = endPositionDefault,
  className,
  contentClassName,
  isFullPage,
  onClickOutside,
}) {
  const [done, setDone] = useState(false);
  const {id, closeModal, timeout} = useModal();

  const close = useCallback(() => closeModal(id), [id]);

  const onAnimationComplete = () => setDone(true);

  const settingsAnimation = {
    initial: "enter",
    animate: "done",
    exit: "exit",
  };

  const animationBg = getDefaultAnimationBackground(timeout);

  const animationContent = getDefaultAnimationContent({
    startPosition,
    donePosition,
    endPosition,
    timeout,
    onAnimationComplete,
  });

  return (
    <div
      className={classNames(
        styles.customModal,
        {[styles.customModal_fullpage]: isFullPage},
        b(horizontalPosition),
        b(verticalPosition),
        className,
      )}
      key={id}
    >
      <motion.div
        {...settingsAnimation}
        variants={animationBg}
        className={styles.customModal__bg}
        onClick={onClickOutside}
      />

      <motion.div
        {...settingsAnimation}
        variants={animationContent}
        className={styles.customModal__block}
        onAnimationComplete={() => setDone(true)}
      >
        <div
          className={classNames(styles.customModal__content, contentClassName)}
          style={{
            pointerEvents: `${done ? "all" : "none"}`,
          }}
        >
          {typeof children === "function" ? children({id, close}) : children}
        </div>
      </motion.div>
    </div>
  );
}

function b(list) {
  if (!list) return list;
  if (typeof list === "string") list = list.split(" ");
  return list.map(mod => styles[`customModal_${mod}`]);
}

CustomModal.propTypes = {
  isFullPage: PropTypes.bool,
  horizontalPosition: PropTypes.oneOf(["left", "right", "center"]),
  verticalPosition: PropTypes.oneOf(["top", "bottom", "middle"]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onClickOutside: PropTypes.func,
  startPosition: PropTypes.object,
  donePosition: PropTypes.object,
  endPosition: PropTypes.object,
};
