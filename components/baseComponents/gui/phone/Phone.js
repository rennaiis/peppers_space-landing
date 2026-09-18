import React from "react";
import LabelInput from "../form/LabelInput";
import classNames from "classnames";
import inputStyles from "../input/Input.module.scss";
import {checkPhone} from "@/constants/form";

const Phone = React.forwardRef(function Phone(
  {
    label,
    className,
    autoComplete = "tel",
    alwaysShowMask = true,
    rules = {...checkPhone()},
    mask = "+7 (999) 999-99-99",
    ...rest
  },
  ref,
) {
  return (
    <LabelInput
      mask={mask}
      rules={rules}
      autoComplete={autoComplete}
      alwaysShowMask={true}
      labelProps={{
        className: classNames(inputStyles.input, {
          className: className,
          [inputStyles.input_error]: rest?.error?.props?.errors[rest.name] || {}.length,
        }),
      }}
      label={label ? <div className={inputStyles.input__name}>{label}</div> : null}
      className={inputStyles.input__block}
      maxLength={`${rest.max ? rest.max : null}`}
      {...rest}
    />
  );
});

export default Phone;
Phone.propTypes = {};
