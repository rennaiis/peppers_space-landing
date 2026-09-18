import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameToggle.module.scss";
import GButton from "../gButton/GButton";
import gButtonStyles from "../gButton/GButton.module.scss";
import {settingsAnimationSwitch} from "@/components/baseComponents/helpers/transition/animations";
import PE from "@/components/baseComponents/gui/pElement/PElement";

export default function GameToggle({className, onClick, tabs}) {
  const [activeIndex, setActiveIndex] = useState(0);

  function click(e) {
    setActiveIndex(e);
    if (onClick) {
      onClick(e);
    }
  }

  return (
    <div className={classNames(styles.gameToggle, className)}>
      <PE.div
        animation={"soundToggleModal"}
        settingsAnimationStates={settingsAnimationSwitch}
        className={classNames(styles.gameToggle__bg)}
        animate={activeIndex === 0 ? "show" : "hide"}
      />
      <div className={classNames(styles.gameToggle__block)}>
        <GButton
          className={classNames(styles.gameToggle__button, "gButton_toggle", {
            [gButtonStyles.gButton_toggleInactive]: activeIndex === 1,
          })}
          text={tabs[0].title}
          img={tabs[0].img}
          onClick={() => click(0)}
          noBorder={"true"}
        />
        <GButton
          className={classNames(styles.gameToggle__button, "gButton_toggle", {
            [gButtonStyles.gButton_toggleInactive]: activeIndex === 0,
          })}
          text={tabs[1].title}
          img={tabs[1].img}
          onClick={() => click(1)}
          noBorder={"true"}
        />
      </div>
    </div>
  );
}
GameToggle.propTypes = {
  className: PropTypes.string,
};
