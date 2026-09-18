import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import CustomMenuItems from "./CustomMenuItems";
import styles from "./CustomMenu.module.scss";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {
  settingsAnimationBase,
  settingsAnimationSwitch,
} from "@/components/baseComponents/helpers/transition/animations";

export default function CustomMenu({customMenuItems, show, onClick}) {
  console.log(customMenuItems);
  return (
    <PE.nav
      className={styles.customMenu}
      animation={"siteCustomMenu"}
      settingsAnimationStates={settingsAnimationSwitch}
    >
      <PE.ul className={styles.customMenu__items} animation={"siteCustomMenuList"}>
        <CustomMenuItems items={customMenuItems} show={show} onClick={onClick} />
      </PE.ul>
    </PE.nav>
  );
}

CustomMenu.propTypes = {
  customMenuItems: PropTypes.array,
};
