import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Result.module.scss";
import Picture from "../baseComponents/gui/picture/Picture";
import { safeHTML } from "@/utils/ps/frontend";

export default function Result({img, title, text, num, key, mod}) {
  return (
    <li className={classNames(styles.result, styles[`result_${mod}`])}>
      <div className={styles.result__image}>
        <Picture {...img}/>
      </div>
      <div className={styles.result__content}>
        <div className={styles.result__title}>
          <span > {safeHTML(title)} </span>
          {num ?
            <span className={styles.result__titleNum}>{safeHTML(num)}</span>
          : <></>}
        </div>
        <div className={styles.result__text}>{safeHTML(text)}</div>
      </div> 
    </li>
  );
}

Result.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
