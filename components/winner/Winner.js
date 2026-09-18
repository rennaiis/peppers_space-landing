import React, { useState } from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Winner.module.scss";
import { pauseButton } from "@/constants/copyright";
import CustomButton from "../customButton/CustomButton";
import Picture from "../baseComponents/gui/picture/Picture";
import { baseConsumers } from "@/utils/ps/core";

export default function Winner(props) {
  const { name, prize, icon, img, surname, video, isActive} = props;
  
  return (
    <div className={classNames(styles.winner, isActive ? styles[`winner_isActive`] : '')}>
        <div className={styles.winner__portrait}>
          <div className={styles.winner__image}>
            <Picture {...img} />
          </div>
          <CustomButton className={classNames(styles.winner__watch, 
          "customButton_winnerWatch")} 
            onClick={()=>baseConsumers.modalOpen({type: "videoModal",props:{...props, iframe:video}})}
            img={pauseButton} text={"Смотреть видео"}
          />
        </div>
        <div className={styles.winner__name}>{name}</div>
        <div className={styles.winner__surname}>{surname}</div>
        <div className={styles.winner__prize}>
          <div className={styles.winner__icon}> 
            <Picture {...icon} />
          </div>
          <span>{prize}</span>
        </div>
        
        
    </div>
  );
}

Winner.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
