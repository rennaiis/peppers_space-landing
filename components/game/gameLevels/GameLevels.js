import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameLevels.module.scss";
import {image} from "../../../utils/ps/frontend/src/url/baseUrl";
import GameToggle from "../gameToggle/GameToggle";
import Scroll from "../../baseComponents/gui/scroll/Scroll";

export default function GameLevels({className, tabs, counters}) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className={classNames(styles.gameLevels, className)}>
      <GameToggle tabs={tabs} className={classNames(styles.gameLevels__toggle)} onClick={e => setActiveIndex(e)} />
      <div className={classNames(styles.gameLevels__items)}>
        <Scroll>
          <div className={classNames(styles.gameLevels__itemsBlock)}>
            {tabs[activeIndex].list?.map(({img, isActive, inactive}, index) => (
              <div
                className={classNames(styles.gameLevels__item, {
                  [styles.gameLevels__item_inactive]: inactive,
                  [styles.gameLevels__item_active]: isActive,
                })}
                key={`gameLevels__item-button-${index}`}
              >
                <img
                  src={inactive ? image("game/levels/lock.svg") : img}
                  className={classNames(styles.gameLevels__itemImg)}
                />
                <div className={classNames(styles.gameLevels__itemTitle)}>{`${index + 1} уровень`}</div>
              </div>
            ))}
          </div>
        </Scroll>
      </div>
    </div>
  );
}
GameLevels.propTypes = {
  className: PropTypes.string,
};
