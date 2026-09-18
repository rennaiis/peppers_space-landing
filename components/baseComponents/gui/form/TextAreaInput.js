import React from "react";
import classNames from "classnames";
import LabelInput from "./LabelInput";

export default function TextAreaInput({label, comp, ...rest}) {
  return (
    <LabelInput
      type="checkbox"
      as="textarea"
      labelProps={{
        className: classNames(
          "input",
          comp,
          Object.values(rest?.error?.props?.errors[rest.name] || {}).length ? "input__error" : "",
        ),
      }}
      className="input__block"
      {...rest}
    />
  );
}
