import React, {useState} from "react";
import classNames from "classnames";
import GButton from "../gButton/GButton";
import styles from "./GameCreate.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import PS from "@PS";

const {
  frontend: {image, safeHTML},
} = PS;

const GameCreateName = React.forwardRef(function GameCreateName({name, names, className}, ref) {
  const [nameIndex, setNameIndex] = useState(0);

  return (
    <div className={classNames(styles.gameCreate__name)}>
      <div className={classNames(styles.gameCreate__nameTitle)}>{safeHTML(name)}</div>
      <div className={classNames(styles.gameCreate__nameBlock)}>
        <div className={classNames(styles.gameCreate__nameBlockText)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`name-${nameIndex}`}
              initial={{opacity: 0, x: "2vw"}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: "2vw"}}
              transition={{duration: 0.3, transitionTimingFunction: "easeInOut"}}
              className={classNames(styles.gameCreate__nameBlockTextItem)}
              dangerouslySetInnerHTML={{__html: safeHTML(names[nameIndex])}}
            />
          </AnimatePresence>
        </div>
        <GButton
          img={image("game/buttons/gen.svg")}
          className={classNames(styles.gameCreate__nameButton, "gButton_gen gButton_transparent")}
          onClick={() => setNameIndex(nameIndex + 1 === 4 ? 0 : nameIndex + 1)}
        />
      </div>
    </div>
  );
});

export default GameCreateName;
GameCreateName.propTypes = {};
