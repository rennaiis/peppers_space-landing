import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Form.module.scss";
import CustomButton from "../customButton/CustomButton";
import PS from "@PS";

const {safeHTML, image} = PS.frontend;

export default function FormDoc({className, index, title, onClose}) {
  return (
    <div className={classNames(styles.form__doc, className)}>
      <div className={classNames(styles.form__docBlock)}>
        <div className={classNames(styles.form__docBorder, styles.form__docBorder_right)} />
        <div className={classNames(styles.form__docBorder, styles.form__docBorder_full)} />
        <div className={classNames(styles.form__docBorder, styles.form__docBorder_bottom)} />
        <div className={classNames(styles.form__docContainer)}>
          <img src={image("form/doc.svg")} className={classNames(styles.form__docImage)} />
          <div className={classNames(styles.form__docIndex)}>{index + 1}</div>
        </div>
        <CustomButton icon={"buttons/close"} className={"customButton_close"} onClick={onClose} />
      </div>
      <div className={classNames(styles.form__docTitle)}>{safeHTML(title)}</div>
    </div>
  );
}
FormDoc.propTypes = {
  className: PropTypes.string,
};
