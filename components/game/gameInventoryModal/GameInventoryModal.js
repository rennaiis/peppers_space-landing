import {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameInventoryModal.module.scss";
import GButton from "../gButton/GButton";
import GameFeature from "../gameFeature/GameFeature";
import CustomModal from "@/components/baseComponents/gui/customModal/CustomModal";
import {useModal} from "@/hooks/useModal";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"; // Базовые стили Swiper

import PS from "@PS";
const {safeHTML, image} = PS.frontend;

const states = {
  1: "ХЛАМ",
  2: "обычный",
  3: "редкий",
  4: "магический",
};

export default function GameInventoryModal({className, img, title, lvl, state, list, score}) {
  const {id, closeModal} = useModal();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <CustomModal className={classNames(styles.infoModal, "custom-modal_inventory")}>
      <div className={classNames(styles.gameInventoryModal, className)}>
        <img className={classNames(styles.gameInventoryModal__bg)} src={image("game/inv/modal/bg.png")} />
        <div className={classNames(styles.gameInventoryModal__border)}>
          <div className={classNames(styles.gameInventoryModal__borderItem, styles.gameInventoryModal__borderItem_top)}>
            <img
              src={image("game/inv/modal/border.png")}
              className={classNames(
                styles.gameInventoryModal__borderItemBlock,
                styles.gameInventoryModal__borderItemBlock_top,
              )}
            />
          </div>
          <div
            className={classNames(styles.gameInventoryModal__borderItem, styles.gameInventoryModal__borderItem_middle)}
          >
            <img
              src={image("game/inv/modal/border.png")}
              className={classNames(
                styles.gameInventoryModal__borderItemBlock,
                styles.gameInventoryModal__borderItemBlock_middle,
              )}
            />
          </div>
          <div
            className={classNames(styles.gameInventoryModal__borderItem, styles.gameInventoryModal__borderItem_bottom)}
          >
            <img
              src={image("game/inv/modal/border.png")}
              className={classNames(
                styles.gameInventoryModal__borderItemBlock,
                styles.gameInventoryModal__borderItemBlock_bottom,
              )}
            />
          </div>
        </div>
        <div className={classNames(styles.gameInventoryModal__block)}>
          <div className={classNames(styles.gameInventoryModal__about)}>
            <img className={classNames(styles.gameInventoryModal__image)} src={img} />
            <div className={classNames(styles.gameInventoryModal__info)}>
              <div className={classNames(styles.gameInventoryModal__title)}>{safeHTML(title)}</div>
              <div className={classNames(styles.gameInventoryModal__lvl)}>{safeHTML(lvl)}</div>
            </div>
            <div
              className={classNames(styles.gameInventoryModal__state, {
                [styles[`gameInventoryModal__state_${state}`]]: state,
              })}
            >
              {safeHTML(states[state])}
            </div>
            <GameFeature score={score} />
          </div>
          <div
            className={classNames(styles.gameInventoryModal__carousel, {
              [styles.gameInventoryModal__carousel_start]: activeSlide === 0,
              [styles.gameInventoryModal__carousel_end]: activeSlide >= list.length - 4,
            })}
          >
            <Swiper slidesPerView={"auto"} onSlideChange={({realIndex}) => setActiveSlide(realIndex)}>
              {list?.map((item, index) => (
                <SwiperSlide key={`item-${index}`}>
                  <div
                    key={`GameInventoryModalItem-${index}`}
                    className={classNames(styles.gameInventoryModal__item, {
                      [styles.gameInventoryModal__item_odd]: index % 2 === 0,
                    })}
                  >
                    <div className={classNames(styles.gameInventoryModal__itemBlock)}>
                      <img
                        src={image(`game/inv/border${item.lvl ? `${item.lvl === lvl ? "2" : "1"}` : "3"}.png`)}
                        className={classNames(styles.gameInventoryModal__itemBorder)}
                      />
                      {item.lvl && <img src={item.img} className={classNames(styles.gameInventoryModal__itemImage)} />}
                      {item.lvl && <div className={classNames(styles.gameInventoryModal__itemCounter)}>{item.lvl}</div>}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <GButton className={classNames("gButton_inventory", styles.gameInventoryModal__button)} text={"ВЫБРАТЬ"} />
          <GButton
            className={classNames("gButton_close", styles.gameInventoryModal__close)}
            img={image("game/buttons/close.png")}
            onClick={() => closeModal(id)}
          />
        </div>
      </div>
    </CustomModal>
  );
}
GameInventoryModal.propTypes = {
  className: PropTypes.string,
};
