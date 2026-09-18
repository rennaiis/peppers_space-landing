import React from "react";
import {node} from "prop-types";
import classNames from "classnames";
import styles from "../customHeader/CustomHeader.module.scss";

export default function HeaderMenu({menu}) {
  return (
    <label htmlFor={"menu-burger"} className={classNames("header__wrapper", styles.customHeader__wrapper)}>
      <div className={classNames("header__content", styles.customHeader__content)}>{menu}</div>
    </label>
  );
}

HeaderMenu.propTypes = {
  menu: node,
};
