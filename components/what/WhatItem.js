import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./What.module.scss";
import PS from "@PS";
import PE from "@/components/baseComponents/gui/pElement/PElement";
const {safeHTML} = PS.frontend;
export default function WhatItem({className, cardIndex, index, text, bg, bgM, img}) {
  return (
    <PE.div
      animation={"siteWhatItem"}
      className={classNames(styles.what__item, className, [styles[`what__item_${cardIndex + 1}${index + 1}`]])}
      style={{
        [`--what-item-bg`]: bg,
        [`--what-item-bg-m`]: bgM ?? bg,
      }}
    >
      <div className={classNames(styles.what__itemText)}>{safeHTML(text)}</div>
    </PE.div>
  );
}
WhatItem.propTypes = {
  className: PropTypes.string,
};
