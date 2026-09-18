import React, {cloneElement, createElement, Fragment, isValidElement} from "react";
import {Controller} from "react-hook-form";
import InputMask from "react-input-mask";
import * as PropTypes from "prop-types";
import PS from "@PS";

const {combineRefs} = PS.frontend;

const Input = React.forwardRef(
  ({as = "input", children, register, control, error, name, rules, errorData, ...rest}, ref) => {
    const inputProps = register ? (rules ? register(name, rules) : register(name)) : {};

    const props = {
      name,
      ...inputProps,
      ...rest,
      ref: combineRefs([ref, inputProps.ref]),
      onChange(e) {
        inputProps?.onChange?.(e);
        rest?.onChange?.(e);
      },
    };

    let element;

    if (props.mask) element = InputWithMask(name, control, {...props, errorData});
    else if (isValidElement(as)) element = cloneElement(as, {...props, errorData});
    else element = createElement(as, props);

    return (
      <Fragment>
        {element}
        {children}
        {error ? <span className="input__error">{error}</span> : null}
      </Fragment>
    );
  },
);

function InputWithMask(
  name,
  control,
  {
    rules,
    defaultValue,
    mask,
    alwaysShowMask,
    formatChars,
    onChange: onInputChange,
    className,
    type,
    onBlur,
    errorData,
    ...etc
  },
) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue || mask.replace(/9/gi, "_")}
      render={({field: {onChange, value}}) => (
        <InputMask
          mask={mask}
          alwaysShowMask={alwaysShowMask}
          value={value}
          type={type}
          formatChars={formatChars}
          onBlur={e => {
            onBlur?.(e);
          }}
          onChange={e => {
            onChange(e);
            onInputChange?.(e);
          }}
        >
          {inputProps => <input {...inputProps} {...etc} className={className} />}
        </InputMask>
      )}
    />
  );
}

export default Input;

Input.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType, PropTypes.element]),
  children: PropTypes.node,
  register: PropTypes.func,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
};
