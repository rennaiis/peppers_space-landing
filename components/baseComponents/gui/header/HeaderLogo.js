import React from "react";
import {node} from "prop-types";
import styles from "../customHeader/CustomHeader.module.scss";
import classNames from "classnames";

export default function HeaderLogo({logo}) {
  return (
    <div className={classNames("header__logo", styles.customHeader__logo)}>
      <a href={"#/"}>{logo}</a>
    </div>
  );
}

HeaderLogo.propTypes = {
  logo: node,
};
