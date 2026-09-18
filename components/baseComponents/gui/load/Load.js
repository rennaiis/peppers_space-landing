import React from "react";
import classNames from "classnames";
import styles from "./Load.module.scss";

export default function Load(props) {
  const {
    isSpin,
    isSpin2,
    isPoints,
    isPoints2,
    isPoints3,
    isPoints4,
    isHalf,
    isPulse,
    isCube,
    isCube2,
    text,
    className,
  } = props;
  return (
    <>
      <div
        className={classNames(styles.load, className, {
          [styles.load_spin]: isSpin,
          [styles.load_spin2]: isSpin2,
          [styles.load_points]: isPoints,
          [styles.load_points2]: isPoints2,
          [styles.load_points3]: isPoints3,
          [styles.load_points4]: isPoints4,
          [styles.load_half]: isHalf,
          [styles.load_pulse]: isPulse,
          [styles.load_cube]: isCube,
          [styles.load_cube2]: isCube2,
          [styles.load_text]: text,
        })}
        style={{"--text": text}}
      >
        {text && text}
        {text && <span className={styles.load__inner}>{text}</span>}
      </div>
    </>
  );
}
