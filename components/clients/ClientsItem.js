import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Clients.module.scss";
import {image} from "../../utils/ps/frontend/src/url/baseUrl";

export default function ClientsItem({className, img}) {
  return (
    <div className={classNames(styles.clients__item, className)}>
      <img src={img} className={classNames(styles.clients__itemImage)} />
    </div>
  );
}
ClientsItem.propTypes = {
  className: PropTypes.string,
};
