import React, {useRef} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./What.module.scss";
import WhatItem from "./WhatItem";
import useIsMob from "../../providers/isMob";
import PS from "@PS";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationCard} from "@/components/baseComponents/helpers/transition/animations";
import {AnimatePresence} from "framer-motion";

const {safeHTML} = PS.frontend;
export default function WhatCard({className, index, title, items, isActive, onClick, hoverItem}) {
  const cardRef = useRef();
  const {isMob} = useIsMob();

  return (
    <PE.div
      animate={isActive ? "on" : "off"}
      animation={"siteWhatCard"}
      settingsAnimationStates={settingsAnimationCard}
      className={classNames(styles.what__card, className, [styles[`what__card_${index + 1}`]])}
      ref={cardRef}
      onMouseEnter={() => {
        !isMob && hoverItem("enter", index);
      }}
      onMouseLeave={() => {
        !isMob && hoverItem("leave", index);
      }}
      onTouchStart={() => {
        isMob && hoverItem("enter", index);
      }}
      onTouchEnd={() => {
        isMob && hoverItem("leave", index);
      }}
    >
      <div className={classNames(styles.what__cardInfo)}>
        <PE.h3 animation={"siteWhatCardTitle"} className={classNames(styles.what__cardTitle)}>
          {safeHTML(title)}
        </PE.h3>
        <PE.div animation={"siteWhatCardIndex"} className={classNames(styles.what__cardIndex)}>
          {index + 1}
        </PE.div>
      </div>
      <PE.div
        animation={"siteWhatCard"}
        className={classNames(styles.what__cardAbout, [styles[`what__cardAbout_${index + 1}`]])}
      >
        <AnimatePresence mode={"sync"}>
          {items?.map((item, i) => (
            <WhatItem key={`what__item-${index}-${i}`} cardIndex={index} index={i} {...item} />
          ))}
        </AnimatePresence>
      </PE.div>
    </PE.div>
  );
}
WhatCard.propTypes = {
  className: PropTypes.string,
};
