import React from "react";
import classNames from "classnames";
import styles from "./GameList.module.scss";
import GButton from "../gButton/GButton.js";
import NumberFlow from "@number-flow/react";
import PS from "@PS";
import {safeHTML} from "@PS/frontend";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationWhileInView} from "@/components/baseComponents/helpers/transition/animations";

const {
  // react: {safeHTML},
  image,
} = PS.frontend;

const GameListItem = React.forwardRef(function GameListItem(
  {title, href, score, level, progress, max, rating, rootRef},
  ref,
) {
  return (
    <PE.div
      animation={"gameListItem"}
      settingsAnimationStates={settingsAnimationWhileInView}
      viewport={{
        amount: "some",
        once: true,
        root: rootRef.current,
      }}
      className={classNames(styles.gameList__item)}
    >
      <div className={classNames(styles.gameList__itemBg)}>
        <div className={styles.gameList__itemBgItem}>
          <img src={image("game/tasks/lines.png")} alt={"Фоновые линии"} />
        </div>
      </div>

      <div className={classNames(styles.gameList__itemContent)}>
        <div className={classNames(styles.gameList__itemBox)}>
          <PE.div className={classNames(styles.gameList__itemPerson)} animation={"gameListItemPerson"}>
            <div className={classNames(styles.gameList__itemPersonContainer)}>
              <img src={image("game/tasks/shadow.png")} className={classNames(styles.gameList__itemPersonShadow)} />
              <img
                src={image("game/tasks/person.png")}
                alt={"Персонаж"}
                className={classNames(styles.gameList__itemPersonBlock)}
              />
            </div>
          </PE.div>
        </div>

        <div className={classNames(styles.gameList__itemWrapper)}>
          <PE.h3 className={classNames(styles.gameList__itemTitle)} animation={"gameListItemTitle"}>
            {safeHTML(title)}
          </PE.h3>

          <PE.div className={classNames(styles.gameList__itemScore)} animation={"gameListItemScore"}>
            <img
              className={classNames(styles.gameList__itemScoreBgImg)}
              src={image("game/tasks/bgScore.png")}
              alt={"Фон"}
            />
            <div className={classNames(styles.gameList__itemScoreImg)}>
              <img
                src={image("game/list/star.svg")}
                alt={"Звезда"}
                className={classNames(styles.gameList__itemScoreImgBlock)}
              />
            </div>
            <div className={classNames(styles.gameList__itemScoreText)}>
              <NumberFlow value={score} trend={0} format={{useGrouping: false}} />
            </div>
          </PE.div>

          <PE.div className={classNames(styles.gameList__itemLevel)} animation={"gameListItemLevel"}>
            <p className={classNames(styles.gameList__itemLevelText)}>{level}</p>
            <div className={classNames(styles.gameList__itemLevelCount)}>
              <NumberFlow value={progress} trend={0} format={{useGrouping: false}} />
              <span
                className={classNames(styles.gameList__itemLevelCount, styles.gameList__itemLevelCount_max)}
              >{`/${max}`}</span>
            </div>
            <div className={classNames(styles.gameList__itemLevelProgressBlock)}>
              <div className={classNames(styles.gameList__itemLevelProgressLine)}>
                <div
                  className={classNames(styles.gameList__itemLevelProgressLineCurrent)}
                  style={{width: `${(progress * 100) / max}%`}}
                />
              </div>
              <div className={classNames(styles.gameList__itemLevelProgressStarBox)}>
                <div
                  className={classNames(styles.gameList__itemLevelProgressStar)}
                  style={{left: `${(progress * 100) / max}%`}}
                >
                  <div className={classNames(styles.gameList__itemLevelProgressStarImg)}>
                    <img src={image("game/tasks/levelStar.png")} alt={"Звезда"} />
                  </div>
                  <div className={classNames(styles.gameList__itemLevelProgressStarBeam)} />
                </div>
              </div>
            </div>
          </PE.div>

          <PE.div className={classNames(styles.gameList__itemButtons)} animation={"gameListItemButtons"}>
            <GButton
              className={classNames(styles.gameList__itemButtonScore, "gButton_itemScore")}
              borderImg={image("game/buttons/games/border.png")}
              img={image("game/buttons/games/trophy.svg")}
              glare={image("game/buttons/games/lines.png")}
              glareMask={image("game/buttons/games/mask.png")}
              onClick={() => {}}
            />
            <GButton
              className={classNames(styles.gameList__itemButtonPlay, "gButton_itemPlay")}
              text={"Играть"}
              tag={"a"}
              href={href}
            />
          </PE.div>
        </div>
      </div>
    </PE.div>
  );
});
export default GameListItem;
GameListItem.propTypes = {};
