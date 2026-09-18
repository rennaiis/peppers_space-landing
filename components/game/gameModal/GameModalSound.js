import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameModal.module.scss";
import GButton from "../gButton/GButton";
import {settingsAnimationSwitch} from "@/components/baseComponents/helpers/transition/animations";
import PE from "@/components/baseComponents/gui/pElement/PElement";

export default function GameModalSound({className, img, images, state}) {
  const [isOn, setIsOn] = useState(state ? state : false);
  return (
    <div className={classNames(styles.gameModal__sound, className)}>
      <div className={classNames(styles.gameModal__soundImage)}>
        <img
          src={img ? img : `${isOn ? images[0].img : images[1].img}`}
          className={classNames(styles.gameModal__soundImageImg)}
        />
      </div>
      {itemToggle()}
    </div>
  );

  function itemToggle() {
    return (
      <div className={classNames(styles.gameModal__soundToggle, {[styles.gameModal__soundToggle_off]: !isOn})}>
        <div className={classNames(styles.gameModal__soundToggleBlock)}>
          <GButton
            className={classNames(styles.gameModal__soundItemButton, "gButton_modalSound gButton_modalSoundOff")}
            noBorder={true}
            text={"выкл"}
            onClick={() => setIsOn(false)}
          />
          <GButton
            className={classNames(styles.gameModal__soundItemButton, "gButton_modalSound gButton_modalSoundOn")}
            noBorder={true}
            text={"вкл"}
            onClick={() => setIsOn(true)}
          />
        </div>
        <div className={classNames(styles.gameModal__soundToggleLine)}>
          <PE.div
            animate={isOn ? "show" : "hide"}
            settingsAnimationStates={settingsAnimationSwitch}
            animation={"soundToggleModal"}
            className={classNames(styles.gameModal__soundToggleLineBlock)}
            // style={{transform: `translateX(${!isOn ? "0" : "100"}%)`}}
          />
        </div>
      </div>
    );
  }
}
GameModalSound.propTypes = {
  className: PropTypes.string,
};
