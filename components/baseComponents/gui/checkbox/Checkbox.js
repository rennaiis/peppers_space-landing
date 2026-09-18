import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import PS from "@PS";
import styles from "./Checkbox.module.scss";
import {image} from "@PS/frontend";

export default function Checkbox({text, compclass, mod, error, register, type = "checkbox", ...rest}) {
  return (
    <label
      className={classNames(styles.checkbox, compclass, {
        [styles[`checkbox_${mod}`]]: mod,
      })}
    >
      <input className={styles.checkbox__input} type={type} {...rest} ref={register} />
      <div className={styles.checkbox__box}>
        <div className={styles.checkbox__boxBlock} />
        <img src={image("form/done.svg")} className={styles.checkbox__boxImage} />
      </div>
      <div className={styles.checkbox__text}>{PS.frontend.safeHTML(text)}</div>
      <span className={styles.checkbox__error}>{error}</span>
    </label>
  );
}

Checkbox.propTypes = {
  text: PropTypes.string,
  compclass: PropTypes.string,
  mod: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.any,
  register: PropTypes.any,
};
