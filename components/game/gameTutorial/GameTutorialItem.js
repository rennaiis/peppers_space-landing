import React from "react";
import classNames from "classnames";
import {safeHTML} from "@PS/frontend";
import {image} from "../../../utils/ps/frontend/src/url/baseUrl";
import styles from "./GameTutorial.module.scss";

const GameTutorialItem = React.forwardRef(function GameTutorialItem({img, text}, ref) {
  return (
    <div className={classNames(styles.gameTutorial__item)}>
      {img && (
        <div className={classNames(styles.gameTutorial__itemImage)}>
          <img src={img} className={classNames(styles.gameTutorial__itemImageImg)} />
        </div>
      )}
      {text && <p className={classNames(styles.gameTutorial__itemText)}>{safeHTML(text)}</p>}
    </div>
  );
});
export default GameTutorialItem;
GameTutorialItem.propTypes = {};
