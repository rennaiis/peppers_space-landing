import React from "react";
import * as PropTypes from "prop-types";
import styles from "./CustomMenu.module.scss";
import classNames from "classnames";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";
import { Link } from "react-scroll";

export default function CustomMenuItem(props) {
  const show = props.show;
  return (
    <Link to={props.link} smooth={true}>
      <PE.li
        animation={"siteCustomMenuItem"}
        className={classNames(styles.customMenu__item, {
          [styles[`customMenu__item_${props?.index + 1}`]]: props?.index + 1,
        })}
        {...props.attr}
        onClick={props.onClick}
      >
        <span className={styles.customMenu__itemLink}>
          {props.text}
        </span>
      </PE.li>
    </Link>
  );
}

CustomMenuItem.propTypes = {
  className: PropTypes.string,
  attr: PropTypes.object,
  href: PropTypes.string,
  text: PropTypes.string,
};
