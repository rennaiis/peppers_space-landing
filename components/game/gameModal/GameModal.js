import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameModal.module.scss";
import GButton from "../gButton/GButton";
import GameModalSound from "./GameModalSound";
import {useModal} from "../../../hooks/useModal";
import CustomModal from "../../baseComponents/gui/customModal/CustomModal";
import PS from "@PS";
const {image} = PS.frontend;

export default function GameModal({className, title, stars, sound, buttons}) {
  const {closeModal, id} = useModal();
  return (
    <CustomModal animation={"fade scale"}>
      <div className={classNames(styles.gameModal, className)}>
        <img className={classNames(styles.gameModal__bg)} src={image("game/modal/bg.png")} />
        <div className={classNames(styles.gameModal__border)}>
          <div className={classNames(styles.gameModal__borderItem, styles.gameModal__borderItem_top)}>
            <img
              src={image("game/modal/border.png")}
              className={classNames(styles.gameModal__borderItemBlock, styles.gameModal__borderItemBlock_top)}
            />
          </div>
          <div className={classNames(styles.gameModal__borderItem, styles.gameModal__borderItem_middle)}>
            <img
              src={image("game/modal/border.png")}
              className={classNames(styles.gameModal__borderItemBlock, styles.gameModal__borderItemBlock_middle)}
            />
          </div>
          <div className={classNames(styles.gameModal__borderItem, styles.gameModal__borderItem_bottom)}>
            <img
              src={image("game/modal/border.png")}
              className={classNames(styles.gameModal__borderItemBlock, styles.gameModal__borderItemBlock_bottom)}
            />
          </div>
        </div>
        <div className={classNames(styles.gameModal__block)}>
          <div className={classNames(styles.gameModal__title)}>{title}</div>
          <div className={classNames(styles.gameModal__stars)}>
            <div className={classNames(styles.gameModal__starsImg)}>
              <img src={image("game/modal/star.png")} className={classNames(styles.gameModal__starsImgBlock)} />
            </div>
            <div className={classNames(styles.gameModal__starsText)}>{stars}</div>
          </div>
          {sound && (
            <div className={classNames(styles.gameModal__sounds)}>
              {sound?.map((item, index) => (
                <GameModalSound key={`GameModalSound-${index}`} {...item} />
              ))}
            </div>
          )}
          <div className={classNames(styles.gameModal__buttons)}>
            {buttons?.map((item, index) => (
              <GButton
                key={`gameModal__button-${index}`}
                {...item}
                className={classNames(styles.gameModal__button, "gButton_modal", item.className)}
                noBg={true}
                onClick={() => closeModal(id)}
              />
            ))}
          </div>
          <GButton
            className={classNames("gButton_close", styles.gameModal__close)}
            img={image("game/buttons/close.png")}
            onClick={() => closeModal(id)}
          />
        </div>
      </div>
    </CustomModal>
  );
}
GameModal.propTypes = {
  className: PropTypes.string,
};
