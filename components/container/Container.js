import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Container.module.scss";

export default function Container({className, children, state, isBg}) {
  return (
    <div
      className={classNames(styles.container, className, {
        [styles[`container_${state}`]]: state,
      })}
    >
      {isBg && <div className={classNames(styles.container__bg)} />}
      <div className={classNames(styles.container__block)}>{children}</div>
    </div>
  );
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
