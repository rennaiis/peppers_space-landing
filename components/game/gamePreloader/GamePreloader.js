import React, {useState, useEffect} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GamePreloader.module.scss";
import {image} from "../../../utils/ps/frontend/src/url/baseUrl";

export default function GamePreloader({className, setIsPreloader}) {
  const [count, setCount] = useState(0);
  const maskMin = 20;
  const maskMax = 65;
  const maskStep = (maskMax - maskMin) / 100;
  const leftMax = 140;
  const [maskCount, setMaskCount] = useState(maskMin);
  const [maskLeft, setMaskLeft] = useState(-1 * leftMax);
  const [direction, setDirection] = useState(1);
  const dur = 50;

  useEffect(() => {
    if (count === 100) {
      const timeout = setTimeout(() => {
        setIsPreloader(false);
      }, 100);
      return () => clearTimeout(timeout);
      return;
    }
    const t = setTimeout(() => {
      setCount(count < 100 ? count + 1 : count);
    }, dur);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    if (count === 100) return;

    let rafId;

    const tick = () => {
      setMaskLeft(prev => {
        let next = prev + direction * 0.5;
        if (next >= leftMax) {
          setDirection(-1);
          return leftMax;
        }
        if (next <= -leftMax) {
          setDirection(1);
          return -leftMax;
        }
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [count, direction]);

  useEffect(() => {
    if (count === 100) return;
    setMaskCount(maskMin + count * maskStep);
  }, [count]);

  return (
    <div className={classNames(styles.gamePreloader, className)}>
      <img className={classNames(styles.gamePreloader__bg)} src={image("game/preloader/bg.jpg")} />
      <div className={classNames(styles.gamePreloader__block)}>
        <div className={classNames(styles.gamePreloader__text, styles.gamePreloader__text_back)}>
          {count
            .toString()
            .split("")
            ?.map((item, index) => (
              <img
                src={image(`game/preloader/${item}.svg`)}
                className={classNames(styles.gamePreloader__textItem)}
                key={`item-${index}`}
              />
            ))}
          <img
            src={image(`game/preloader/p.svg`)}
            className={classNames(styles.gamePreloader__textItem, styles.gamePreloader__textItem_right)}
          />
        </div>
        <div
          className={classNames(styles.gamePreloader__text, styles.gamePreloader__text_front)}
          style={{
            "-webkitMask": `url(${image("game/preloader/mask.png")})`,
            "-webkitMaskPosition": `${maskLeft}px ${maskCount}%`,
          }}
        >
          {count
            .toString()
            .split("")
            ?.map((item, index) => (
              <img
                src={image(`game/preloader/${item}-p.svg`)}
                className={classNames(styles.gamePreloader__textItem)}
                key={`item-${index}-p`}
              />
            ))}
          <img
            src={image(`game/preloader/p-p.svg`)}
            className={classNames(styles.gamePreloader__textItem, styles.gamePreloader__textItem_right)}
          />
        </div>
      </div>
    </div>
  );
}
GamePreloader.propTypes = {
  className: PropTypes.string,
};
