import React, {useCallback, useEffect, useRef, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./What.module.scss";
import WhatCard from "./WhatCard";
import Paper from "../paper/Paper";
import SectionAnchor from "../sectionAnchor/SectionAnchor";
import PS from "@PS";
import {AnimatePresence} from "framer-motion";

const {safeHTML} = PS.frontend;

const timeSwitch = 3 * 1000;

export default function What({className, title, list, isVisible}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const timer = useRef(null);

  const switchIndex = useCallback(() => {
    setActiveIndex(prev => {
      const max = list.length;
      if (prev < max - 1) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  }, [activeIndex, list]);

  const hoverItem = useCallback(
    (state, index) => {
      if (state === "enter") {
        setActiveIndex(index);
        stopInterval();
      } else {
        startInterval();
      }
    },
    [activeIndex, list],
  );

  const startInterval = () => {
    timer.current = setInterval(switchIndex, timeSwitch);
  };

  const stopInterval = () => {
    clearInterval(timer.current);
  };

  useEffect(() => {
    startInterval();
    return () => {
      stopInterval();
    };
  }, []);

  return (
    <section className={classNames(styles.what, className)}>
      <SectionAnchor id={"what"} />
      <div className={styles.what__background}>
        <Paper isVisible={isVisible} />
      </div>
      <div className={classNames(styles.what__content)}>
        <h2 className={classNames(styles.what__title)}>{safeHTML(title)}</h2>

        <div className={classNames(styles.what__list)}>
          {list?.map((item, index) => (
            <WhatCard
              key={`what__card-${index}`}
              isActive={activeIndex === index}
              hoverItem={hoverItem}
              index={index}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
What.propTypes = {
  className: PropTypes.string,
};
