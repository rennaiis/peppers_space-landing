import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {PaperController} from "@/controllers/main/pepper/paperController";
import styles from "./Paper.module.scss";

export default function Paper({className, children, isVisible}) {
  const canvasRef = React.createRef();
  const [paperController, setPaperController] = React.useState(null);

  useEffect(() => {
    const controller = new PaperController(canvasRef.current);
    setPaperController(controller);

    return () => {
      if (!paperController) return;
      paperController.destroy();
    };
  }, []);

  useEffect(() => {
    if (!paperController) return;

    isVisible ? paperController.resume() : paperController.pause();
  }, [isVisible, paperController]);

  return (
    <div className={classNames(styles.paper, className)}>
      <canvas className={styles.paper__canvas} ref={canvasRef} />
      <img src={"/images/paper/c_word.svg"} id={"c_word"} style={{display: "none"}} />
      <img src={"/images/paper/bibble.png"} id={"bibble"} style={{display: "none"}} />
    </div>
  );
}

Paper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
