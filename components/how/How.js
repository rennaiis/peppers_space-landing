import React, {useEffect, useRef, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./How.module.scss";
import {HowController} from "@/controllers/main/physics/howController";
import axios from "axios";
import SectionAnchor from "../sectionAnchor/SectionAnchor";
import PS from "@PS";
const {safeHTML} = PS.frontend;

export default function How({className, title, hasBeenVisible, isVisible}) {
  const scene = useRef(null);
  const [howController, setHowController] = useState(null);

  useEffect(() => {
    if (!hasBeenVisible || howController) return;

    (async () => {
      const settings = await loadSettings(`howSettings.json`);
      const controller = new HowController({scene: scene.current, settings});
      await controller.init();

      setHowController(controller);
    })();

    return () => {
      if (!howController) return;
      howController.destroy();
    };
  }, [hasBeenVisible]);

  useEffect(() => {
    if (!howController) return;

    isVisible ? howController.resume() : howController.pause();
  }, [howController, isVisible]);

  return (
    <section className={classNames(styles.how, className)}>
      <SectionAnchor id={"how"} />
      <h2 className={classNames(styles.how__title)}>{safeHTML(title)}</h2>
      <div className={classNames(styles.how__image)} ref={scene}></div>
    </section>
  );
}
How.propTypes = {
  className: PropTypes.string,
};

async function loadSettings(url) {
  const response = await axios.get(url);
  return response.data;
}
