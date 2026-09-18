import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./People.module.scss";
import {image} from "../../utils/ps/frontend/src/url/baseUrl";

export default function People({className}) {
  return (
    <div className={classNames(styles.people, className)} id="people">
      <img src={image(`stub1.png`)} className={classNames(styles.people__image)} />
    </div>
  );
}
People.propTypes = {
  className: PropTypes.string,
};
