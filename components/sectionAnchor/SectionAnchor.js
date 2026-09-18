import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./SectionAnchor.module.scss";

export default function SectionAnchor({className, id}) {
  return <div className={classNames(styles.sectionAnchor, className)} id={id} />;
}
SectionAnchor.propTypes = {
  className: PropTypes.string,
};
