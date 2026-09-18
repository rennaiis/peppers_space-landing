import React, {useEffect, useState} from "react";
import PreloaderItems from "./PreloaderItems";
import styles from "./Preloader.module.scss";
import {AnimatePresence} from "framer-motion";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";

export default function Preloader() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(false);
    // const timer = setTimeout(() => setIsActive(false), 300);
    // return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isActive) {
      document.body.classList.remove("_preloader");
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <PE.div
          className={styles["preloader"]}
          animation={"preloader"}
          animate={isActive ? "animate" : "initial"}
          settingsAnimationStates={settingsAnimationBase}
        >
          <div className={styles["preloader__block"]}>
            <PreloaderItems total={4} />
          </div>
        </PE.div>
      )}
    </AnimatePresence>
  );
}
