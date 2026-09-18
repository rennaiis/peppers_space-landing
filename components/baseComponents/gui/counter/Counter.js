import React, {useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import classNames from "classnames";
import styles from "./Counter.module.scss";

const Counter = React.forwardRef(function Counter({gameTimer, setGameTimer, mod, state, setState}, ref) {
  useEffect(() => {
    if (state !== "countdown") return;

    if (gameTimer - 1 < 0 && state === "countdown") {
      setState("playing");
      return;
    }

    const t = setTimeout(() => setGameTimer(gameTimer - 1), 700);
    return () => clearTimeout(t);
  }, [state, setState, gameTimer, setGameTimer]);

  return (
    <AnimatePresence mode="wait">
      {state === "countdown" && !!gameTimer && (
        <motion.div
          key={gameTimer}
          className={classNames(styles.counter, {
            [styles["counter_" + mod]]: mod,
          })}
          initial={{opacity: 0, scale: 1.2}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.8}}
          transition={{duration: 0.4, ease: "easeInOut"}}
        >
          <div className={styles.counter__text}>{gameTimer}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Counter;
