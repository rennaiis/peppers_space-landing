import React from "react";
import classNames from "classnames";
import styles from "./InnerPreloader.module.scss";

const InnerPreloader = ({isActive}) => {
  return (
    <div
      className={classNames(styles["innerPreloader"], {
        [styles["innerPreloader_active"]]: isActive,
      })}
    >
      <div className={styles["innerPreloader__spinner"]}></div>
    </div>
  );
};

export default InnerPreloader;
