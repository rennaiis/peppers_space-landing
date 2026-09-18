import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./MapBase.module.scss";
import {safeHTML} from "@PS/frontend";

export default function MapBasePoint({style, position, name, onClick}) {
  return (
    <div
      className={classNames(styles.mapBase__point, {
        [`map-base__point_${position}`]: position !== undefined,
      })}
      style={style}
      onClick={onClick}
    >
      <div className={classNames(styles.mapBase__pointCircle)}>
        <div className={classNames(styles.mapBase__pointCircleBlock)} />
      </div>
      {name && <div className={classNames(styles.mapBase__pointTitle)}>{safeHTML(name)}</div>}
    </div>
  );
}
MapBasePoint.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
