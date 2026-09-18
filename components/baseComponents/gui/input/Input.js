import React from "react";
import classNames from "classnames";
import LabelInput from "../form/LabelInput";
import styles from "./Input.module.scss";

export default function Input({label, comp, ...rest}) {
  return (
    <LabelInput
      labelProps={{
        className: classNames(styles.input, comp, {
          [styles.input_error]: Object.values(rest?.error?.props?.errors[rest.name] || {}).length,
        }),
      }}
      label={label ? <div className={styles.input__name}>{label}</div> : null}
      className={styles.input__block}
      maxLength={`${rest.max ? rest.max : null}`}
      {...rest}
    />
  );
}
