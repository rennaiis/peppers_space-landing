import classNames from "classnames";
import gameScreenStyles from "../../../game/gameScreen/GameScreen.module.scss";
import gButtonStyles from "../../../game/gButton/GButton.module.scss";
import GButton from "../../../game/gButton/GButton";
import styles from "./Boosters.module.scss";
import PS from "@PS";
import {useBoostersControls} from "@/hooks/games/core/useBoostersControls";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";

const {
  frontend: {safeHTML},
} = PS;

export const Boosters = ({wrapperRef, list}) => {
  const {boosters, activeBooster, isAvailableClick, actions} = useBoostersControls({
    eventBus: wrapperRef.current?.eventBus,
    list,
  });

  const onBoosterClick = (count, name) => {
    if (!!count && isAvailableClick) {
      actions.toggle({boosterName: name, eventBus: wrapperRef.current?.eventBus});
    } else if (!isAvailableClick) return;
  };

  return (
    <PE.div
      className={classNames(gameScreenStyles.gameScreen__boosters, styles.boosters)}
      animation={"boostersAnimationItems"}
      settingsAnimationStates={settingsAnimationBase}
    >
      {Object.entries(boosters).map(([name, boosterData], index) => (
        <PE.div
          animation={"boostersAnimationItem"}
          key={`booster-${index}`}
          className={classNames(styles.boosters__item, {
            [styles.boosters__item_active]: activeBooster === name,
            [styles.boosters__item_disable]: !boosterData.count,
          })}
          data-tutor-id={`boosters:${name}`}
          onClick={() => onBoosterClick(boosterData, name)}
        >
          <GButton
            className={classNames(gameScreenStyles.gameScreen__booster, "gButton_booster")}
            key={`gameScreen__booster-${name}`}
            noBorder={true}
            {...boosterData}
          ></GButton>
        </PE.div>
      ))}
    </PE.div>
  );
};
