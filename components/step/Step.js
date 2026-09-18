import React, { useEffect, useRef } from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Step.module.scss";
import Picture from "../baseComponents/gui/picture/Picture";
import { safeHTML } from "@/utils/ps/frontend";
import { useInView } from "framer-motion";

export default function Step({img, number, text, line, trackMod}) {
  const firstRef = useRef(null);
  const isInView = useInView(firstRef, {once: true})
  
  return (
    <li className = {classNames(styles.step, styles[`step_${number}`], 
      {[styles.step_animated]: isInView} 
    )} ref={firstRef}>
        <div className={classNames(styles.step__line, styles[`step__line_${trackMod}`])}>
          <img src={line} alt="" />
        </div>
        <div className={styles.step__image}>
            <Picture {...img}/>
        </div>
        <div className={styles.step__content}>
          <div className={styles.step__number}>{number}.</div>
          <div className={styles.step__text}>{safeHTML(text)}</div>
        </div>
    </li>
  );
}


