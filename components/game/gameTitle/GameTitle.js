import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameTitle.module.scss";
import {image, safeHTML} from "@PS/frontend";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";
import PE from "@/components/baseComponents/gui/pElement/PElement";

export default function GameTitle({className, img, title}) {
  return (
    <PE.h2
      className={classNames(styles.gameTitle, className)}
      animation={"fadeClipCenter"}
      settingsAnimationStates={settingsAnimationBase}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      key={title}
    >
      <img
        className={classNames(styles.gameTitle__bg)}
        src={img ? img : image("game/inv/title.png")}
        alt={"Фон заголовка"}
      />
      <span className={classNames(styles.gameTitle__text)}>{safeHTML(title)}</span>
    </PE.h2>
  );
}
GameTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
