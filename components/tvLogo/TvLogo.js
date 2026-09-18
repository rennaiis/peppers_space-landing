import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./TvLogo.module.scss";
import Picture from "../baseComponents/gui/picture/Picture";
import { safeHTML } from "@/utils/ps/frontend";

export default function TvLogo({logo, caption, className}) {
  return (
    <div className={classNames(styles.tvLogo, className)}>
      <Picture {...logo}/>
      <span>{safeHTML(caption)}</span>
    </div>
  );
}

TvLogo.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
