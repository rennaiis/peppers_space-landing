import Help from "./help/Help";
import stylesHelp from "./help/Help.module.scss";
import styles from "./Tutorial.module.scss";
import {useCallback, useEffect, useRef} from "react";
import useComputeArea from "./utils/hooks/useComputeArea";
import dynamic from "next/dynamic";
import {useNodeContext} from "@/providers/NodeProvider";
import {motion, AnimatePresence} from "framer-motion";
import {baseProducer, TutorialNode} from "@PS/core";
import useHelpVisible from "./utils/hooks/isHelpVisible";
import {findFirstBySelectorsUnderClick} from "./utils/utils";
import Finger from "./help/finger/Finger";
import {fingerBounding} from "./help/finger/constants/finger";

const SvgBlurArea = dynamic(() => import("./svgBlurArea/SvgBlurArea"), {ssr: false});

export default function Tutorial({children}) {
  const {currentNode} = useNodeContext();
  const tutorialNode = currentNode instanceof TutorialNode && currentNode;
  const isAvailableTutorial = !!tutorialNode;
  const activeTutorialData = tutorialNode?.data?.settings || {};

  const ref = useRef();
  const nodeRef = useRef(null);

  const {area} = useComputeArea({
    ref,
    activeTutorialData,
    isAvailableTutorial,
    trigger: tutorialNode,
  });

  const isVisible = useHelpVisible(activeTutorialData);

  const key = `help-${tutorialNode?.name}-${!!Object.values(area)?.length}-${!!isVisible}`;

  const toNext = useCallback(
    e => {
      const {events, needTapToSelector, area: {selectors = []} = {}} = activeTutorialData || {};
      if (needTapToSelector) {
        const el = findFirstBySelectorsUnderClick(e, selectors);
        if (!el) return;
        el?.click?.();
      }
      if (events)
        events.forEach(({topic, type, data = {}}) => {
          baseProducer.send({topic, type, data});
        });
      tutorialNode?.resolve?.();
    },
    [tutorialNode],
  );

  useEffect(() => {
    return baseProducer.getConsumer().on("tutorial:next:created", toNext);
  }, [toNext]);

  return (
    <>
      {children}
      <div className={styles.tutorial}>
        <AnimatePresence mode={"wait"}>
          {isVisible && (
            <motion.div
              key={key}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.3}}
            >
              <Help ref={ref} {...activeTutorialData} area={area} onClick={toNext}>
                {activeTutorialData?.finger && (
                  <Finger
                    bounding={fingerBounding}
                    animationConfig={activeTutorialData.finger}
                    key={activeTutorialData.id}
                  />
                )}
              </Help>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode={"wait"}>
        {isAvailableTutorial && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: isAvailableTutorial ? 1 : 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className={stylesHelp.help__bg}
          >
            <div ref={nodeRef} className={stylesHelp.help__bg}>
              <SvgBlurArea {...(area || {})} activeTutorialData={activeTutorialData} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
