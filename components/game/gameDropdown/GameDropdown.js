import {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameDropdown.module.scss";
import Scroll from "../../baseComponents/gui/scroll/Scroll";
import PS from "@PS";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationSwitch} from "@/components/baseComponents/helpers/transition/animations";

const {image} = PS.frontend;

export default function GameDropdown({className, list}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={classNames(styles.gameDropdown, className)}>
      <div className={classNames(styles.gameDropdown__header)} onClick={() => setIsOpen(v => !v)}>
        <div className={classNames(styles.gameDropdown__headerBlock)}>
          <PE.div
            key={`icon-${activeIndex}`}
            className={classNames(styles.gameDropdown__headerImg)}
            animation={"dropdownList"}
          >
            <img className={classNames(styles.gameDropdown__headerImgBlock)} src={list[activeIndex].img} />
          </PE.div>
          <PE.div
            key={`text-${activeIndex}`}
            className={classNames(styles.gameDropdown__headerText)}
            animation={"dropdownText"}
          >
            {list[activeIndex].text}
          </PE.div>
          <PE.div
            className={classNames(styles.gameDropdown__headerArrow)}
            animate={isOpen ? "show" : "hide"}
            animation={"dropdownArrow"}
            settingsAnimationStates={settingsAnimationSwitch}
          >
            <img className={classNames(styles.gameDropdown__headerArrowBlock)} src={image("game/arrow.png")} />
          </PE.div>
        </div>
      </div>
      {isOpen && (
        <PE.div className={classNames(styles.gameDropdown__list)} animation={"dropdownList"}>
          <div className={classNames(styles.gameDropdown__listContainer)}>
            <Scroll>
              <div className={classNames(styles.gameDropdown__listBlock)}>
                {list?.map(({img, text}, index) => (
                  <div
                    key={`gameDropdown__listItem-${index}`}
                    className={classNames(styles.gameDropdown__item)}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsOpen(v => !v);
                    }}
                  >
                    <div className={classNames(styles.gameDropdown__itemText)}>{text}</div>
                  </div>
                ))}
              </div>
            </Scroll>
          </div>
        </PE.div>
      )}
    </div>
  );
}
GameDropdown.propTypes = {
  className: PropTypes.string,
};
