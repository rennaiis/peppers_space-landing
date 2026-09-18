import React from "react";
import classNames from "classnames";
import GButton from "../gButton/GButton";
import styles from "./GameAuth.module.scss";
import PS from "@PS";

const {
  frontend: {image, safeHTML},
} = PS;

const GameAuth = React.forwardRef(function GameAuth({title, list, button, social, note, className}, ref) {
  return (
    <div className={classNames(styles.gameAuth, className)} ref={ref}>
      <img src={image("game/screen/bg.jpg")} className={classNames(styles.gameAuth__bg)} />
      <div className={classNames(styles.gameAuth__title)}>{safeHTML(title)}</div>
      <div className={classNames(styles.gameAuth__social)}>
        <div className={classNames(styles.gameAuth__socialTitle)}>{safeHTML(social)}</div>
        <div className={classNames(styles.gameAuth__socialButtons)}>
          {list?.map((item, index) => (
            <GButton key={`gameAuth__socialButton-${index}`} {...item} />
          ))}
        </div>
      </div>
      <div className={classNames(styles.gameAuth__footer)}>
        <GButton {...button} className={classNames(styles.gameAuth__button, button.className)} />
        <div className={classNames(styles.gameAuth__note)}>{safeHTML(note)}</div>
      </div>
    </div>
  );
});

export default GameAuth;
GameAuth.propTypes = {};
