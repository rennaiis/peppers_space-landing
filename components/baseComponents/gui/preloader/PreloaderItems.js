import React from "react";
import PropTypes from "prop-types";
import styles from "./Preloader.module.scss";

export default function PreloaderItems({total}) {
  const items = [];
  while (items.length < total) {
    items.push(<p key={items.length} className={styles["preloader__item"]} />);
  }

  return items;
}

PreloaderItems.propType = {
  imgAttr: PropTypes.number,
};
