import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./CustomProgress.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function CustomProgress(props) {
  const {
    value = 0.5,
    progressChanged,
    onChangeStarted,
    onChangeEnded,
    isVertical,
    hasDot,
    overrideClasses,
    onSeekStart,
    onSeekEnd,
  } = props;
  const lineRef = useRef();

  const [pointerdown, setPointerdown] = useState(false);

  const clearPointerdownState = () => {
    setPointerdown(false);
    onChangeEnded && onChangeEnded();
  };

  const changeVal = e => calculateValue(e, lineRef, isVertical, progressChanged);

  const onPointerMove = useCallback(e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    changeVal(e);
  }, []);

  const onPointerDown = useCallback(e => {
    window.addEventListener("pointermove", onPointerMove, {capture: true});
    window.addEventListener("pointerup", onPointerUp, {capture: true});

    onSeekStart?.();
    changeVal(e);
  }, []);

  const onPointerUp = useCallback(() => {
    window.removeEventListener("pointermove", onPointerMove, {capture: true});
    window.removeEventListener("pointerup", onPointerUp, {capture: true});

    onSeekEnd?.();
  }, []);

  useEffect(() => {
    lineRef.current.addEventListener("pointerdown", onPointerDown, {capture: true});

    window.addEventListener("pointerup", clearPointerdownState);
    return () => {
      window.removeEventListener("pointerup", clearPointerdownState);
    };
  }, []);

  return (
    <div
      className={classNames(styles.customProgress, overrideClasses, {
        [`${styles.customProgress_vertical}`]: isVertical,
      })}
      role={"button"}
      tabIndex={"0"}
    >
      <div className={classNames(styles.customProgress__line)} ref={lineRef} role={"button"} tabIndex={"0"}>
        <div
          className={classNames(styles.customProgress__lineInner)}
          style={isVertical ? {height: `${value * 100}%`} : {width: `${value * 100}%`}}
        />
        {hasDot && (
          <div
            className={classNames(styles.customProgress__linePoint)}
            style={isVertical ? {bottom: `${value * 100}%`} : {left: `${value * 100}%`}}
          >
            <div className={classNames(styles.customProgress__linePointBlock)} />
          </div>
        )}
      </div>
    </div>
  );
}

function calculateValue({pageX, pageY, touches}, line, isVertical, progressChanged) {
  const x = touches ? touches[0].pageX : pageX;
  const y = touches ? touches[0].pageY : pageY;
  let val;
  const rect = line.current.getBoundingClientRect();

  if (isVertical) {
    val = 1 - (y - rect.y) / rect.height;
  } else {
    val = (x - rect.x) / rect.width;
  }

  if (progressChanged) progressChanged(Math.min(Math.max(val, 0), 1));
}

CustomProgress.propTypes = {
  /**
   * Значение прогресса (0-1)
   */
  value: PropTypes.number,
  /**
   * Метод, который вызывается когда действие пользователя поменяло значение прогресса
   */
  progressChanged: PropTypes.func,
  /**
   * Метод, который вызывается когда пользователь начал пепретаскивать прогресс
   */
  onChangeStarted: PropTypes.func,
  /**
   * Метод, который вызывается когда пользователь закончил пепретаскивать прогресс
   */
  onChangeEnded: PropTypes.func,
  /**
   * Вертикальный прогресс
   */
  isVertical: PropTypes.bool,
  /**
   * Наличие точки в конце линии
   */
  hasDot: PropTypes.bool,
  /**
   * Классы для перегрузки стандартных
   */
  overrideClasses: PropTypes.string,
};

CustomProgress.displayName = "CustomProgress";
