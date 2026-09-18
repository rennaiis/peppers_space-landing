import React, {useState} from "react";
import CustomMenu from "../customMenu/CustomMenu";
import CustomHeaderLogo from "./CustomHeaderLogo";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./CustomHeader.module.scss";
import {AnimatePresence} from "framer-motion";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationSwitch} from "@/components/baseComponents/helpers/transition/animations";
import { header, intro } from "@/constants/copyright";
import Icon from "../icon/Icon";
import { Link } from "react-scroll";

export default function CustomHeader({menuList, children, button}) {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <header className={classNames(styles.customHeader)}>
      <div className={styles.customHeader__block}>
        <CustomHeaderLogo/>
        <nav className={styles.customHeader__content}>
          {menuList.customMenuItems.map((item, index)=>(
            <Link to={item.link} key={index} duration={1500} className={styles.customHeader__link}>
              <span>{item.itemsText}</span>
            </Link>
          ))}
        </nav>
        <Icon name={header.spaceLogo.icon} className={styles.customHeader__spaceLogoImg}/>
        {children}
      </div>
    </header>
  );
}

CustomHeader.propTypes = {
  menuList: PropTypes.object,
};
