import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameFeatureModal.module.scss";
import GButton from "../gButton/GButton";
import gButtonStyles from "../gButton/GButton.module.scss";
import GameFeature from "../gameFeature/GameFeature";
import CustomModal from "@/components/baseComponents/gui/customModal/CustomModal";
import {useModal} from "@/hooks/useModal";
import PS from "@PS";
const {safeHTML, image} = PS.frontend;

export default function GameFeatureModal({className, score}) {
  const {id, closeModal} = useModal();

  return (
    <CustomModal className={classNames(styles.gameFeatureModal, "custom-modal_inventory")}>
      <div className={classNames(styles.gameFeatureModal, className)}>
        <img className={classNames(styles.gameFeatureModal__bg)} src={image("game/feature/bg.png")} />
        <div className={classNames(styles.gameFeatureModal__border)}>
          <div className={classNames(styles.gameFeatureModal__borderItem, styles.gameFeatureModal__borderItem_top)}>
            <img
              src={image("game/feature/border.png")}
              className={classNames(
                styles.gameFeatureModal__borderItemBlock,
                styles.gameFeatureModal__borderItemBlock_top,
              )}
            />
          </div>
          <div className={classNames(styles.gameFeatureModal__borderItem, styles.gameFeatureModal__borderItem_middle)}>
            <img
              src={image("game/feature/border.png")}
              className={classNames(
                styles.gameFeatureModal__borderItemBlock,
                styles.gameFeatureModal__borderItemBlock_middle,
              )}
            />
          </div>
          <div className={classNames(styles.gameFeatureModal__borderItem, styles.gameFeatureModal__borderItem_bottom)}>
            <img
              src={image("game/feature/border.png")}
              className={classNames(
                styles.gameFeatureModal__borderItemBlock,
                styles.gameFeatureModal__borderItemBlock_bottom,
              )}
            />
          </div>
        </div>
        <div className={classNames(styles.gameFeatureModal__block)}>
          <div className={classNames(styles.gameFeatureModal__title)}>{safeHTML("характеристики")}</div>
          <GameFeature score={score} comp={true} />
          <GButton
            className={classNames("gButton_close", styles.gameFeatureModal__close)}
            img={image("game/buttons/close.png")}
            onClick={() => closeModal(id)}
          />
        </div>
      </div>
    </CustomModal>
  );
}
GameFeatureModal.propTypes = {
  className: PropTypes.string,
};
