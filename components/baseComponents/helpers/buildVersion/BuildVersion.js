import React from "react";
import styles from "./BuildVersion.module.scss";

export default function BuildVersion() {
  return process.env.BUILD_ID && <div className={styles.buildVersion}>{`v. ${process.env.BUILD_ID}`}</div>;
}
