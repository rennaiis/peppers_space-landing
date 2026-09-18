import {useRef, useEffect} from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import styles from "../Help.module.scss";
import {eventSubscription} from "@PS/core";

const FingerSvg = dynamic(() => import("./finger.svg"), {ssr: false});
const ArrowSvg = dynamic(() => import("./arrow.svg"), {ssr: false});

export default function Finger({
  bounding = {width: 60, height: 70, pivot: {x: 200, y: 100}},
  animationConfig = {
    icon: "finger",
    type: "tap", // "tap" | "swipe"
    swipe: {x: 100, y: 0, duration: 0.6, repeat: -1, yoyo: true},
    tap: {y: 10, duration: 0.3, repeat: -1, yoyo: true},
    rotation: 0,
  },
}) {
  const fingerRef = useRef(null);
  const animTl = useRef(null);

  useEffect(() => {
    const el = fingerRef.current;
    if (!el) return;

    gsap.set(el, {
      width: bounding.width,
      height: bounding.height,
      x: -bounding.pivot.x,
      y: -bounding.pivot.y,
      rotation: animationConfig.rotation || 0,
      transformOrigin: `${bounding.pivot.x}px ${bounding.pivot.y}px`,
    });

    const tl = gsap.timeline({repeat: -1, yoyo: true});
    animTl.current = tl;

    if (animationConfig.type === "tap") {
      tl.to(el, {...animationConfig.tap, ease: "power1.inOut"});
    } else if (animationConfig.type === "swipe") {
      tl.to(el, {...animationConfig.swipe, ease: "power1.inOut"});
    }

    return () => tl.kill();
  }, [bounding, animationConfig]);

  useEffect(() => {
    const callbacksBus = [
      {
        event: "tutorial:finger-hide",
        callback() {
          const el = fingerRef.current;
          if (!el) return;

          if (animTl.current) {
            animTl.current.kill();
            animTl.current.clear();
            animTl.current = null;
          }

          gsap.to(el, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
          });
        },
      },
    ];

    const unsubscribe = eventSubscription({callbacksBus});

    return () => {
      unsubscribe?.();

      if (animTl.current) {
        animTl.current.kill();
        animTl.current.clear();
        animTl.current = null;
      }
    };
  }, []);

  const Svg =
    {
      finger: FingerSvg,
      arrow: ArrowSvg,
    }[animationConfig.icon] || FingerSvg;

  return (
    <div className={styles.help__fingerArea}>
      <div className={styles.help__finger} ref={fingerRef} style={{position: "absolute"}}>
        <Svg />
      </div>
    </div>
  );
}
