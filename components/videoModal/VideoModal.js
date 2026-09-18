import React, { useCallback, useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./VideoModal.module.scss";
import CustomButton from "../customButton/CustomButton";
import Player from "../baseComponents/gui/player/Player";
import { buy, closeButton } from "@/constants/copyright";
import CustomModal from "../baseComponents/gui/customModal/CustomModal";
import { baseConsumers } from "@/utils/ps/core";

export default function VideoModal({className, videoSrc,  isOpen, iframe}) {
  
  const close = useCallback(()=>{
      baseConsumers.modalClose({type: "videoModal"});
  },[])
  return (
    <CustomModal className={classNames(styles.videoModal, className)} onClickOutside={close}>
        <CustomButton className='customButton_close' onClick = {close} >
          <img src={closeButton} alt="" />
        </CustomButton>
         <Player
          play={isOpen}
          isActive={isOpen}
          video={videoSrc}
          iframe={iframe}
        />
    </CustomModal>
  );
}

VideoModal.propTypes = {
  className: PropTypes.string,
};
