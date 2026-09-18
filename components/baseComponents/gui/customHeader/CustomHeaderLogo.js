import React from "react";
import {image} from "../../../../utils/ps/frontend/src/url/baseUrl";
import styles from "./CustomHeader.module.scss";
import { header } from "@/constants/copyright";
import Icon from "../icon/Icon";

export default function CustomHeaderLogo({}) {
  return (
    <div className={styles.customHeader__logo}>
      <a href={header.logo.href} target="_blank">
        <Icon name={header.logo.icon} className={styles.customHeader__logoImg} />
      </a>
      
    </div>
  );
}
