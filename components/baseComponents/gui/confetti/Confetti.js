import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import styles from "./Confetti.module.scss";

const Confetti = React.forwardRef(function Confetti(
  {autoRepeat, particleCount, ticks = 200, startVelocity, origin},
  ref,
) {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.5, {
      startVelocity: 15,
      spread: 360,
      ticks: 300,
      zIndex: 0,
      particleCount: 50,
      origin: {
        x: randomInRange(0.3, 0.5),
        y: Math.random() * 0.3 + 0.2,
      },
    });

    makeShot(0.5, {
      startVelocity: 15,
      spread: 360,
      ticks: 300,
      zIndex: 0,
      particleCount: 50,
      origin: {
        x: randomInRange(0.5, 0.7),
        y: Math.random() * 0.3 + 0.2,
      },
    });
  }, []);

  const [count, setCount] = useState(autoRepeat);

  useEffect(() => {
    if (count > 0) {
      fire();
      setTimeout(() => {
        setCount(prevState => prevState - 1);
      }, 250);
    }
  }, [count]);

  return (
    <div className={styles.confetti}>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        particleCount={particleCount}
        colors={["#26ccff", "#a25afd"]}
        className={styles.confetti__canvas}
      />
    </div>
  );
});

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default Confetti;
Confetti.propTypes = {};
