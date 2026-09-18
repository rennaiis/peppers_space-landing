import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameMenu.module.scss";
import GButton from "../gButton/GButton";
import Link from "next/link";
import menu from "@/constants/games/core/navigation/menu";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";

export default function GameMenu({className}) {
  return (
    <PE.div
      className={classNames(styles.gameMenu, className)}
      animation={"gameMenuItemsList"}
      settingsAnimationStates={settingsAnimationBase}
    >
      {menu?.map((item, index) => (
        <GButton
          tag={Link}
          href={item.href}
          {...item}
          key={`GButton-menu-${index}`}
          animationText={"gameMenuItemsItemText"}
        />
      ))}
    </PE.div>
  );
}
GameMenu.propTypes = {
  className: PropTypes.string,
};
