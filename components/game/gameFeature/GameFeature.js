import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameFeature.module.scss";
import PS from "@PS";
const {image} = PS.frontend;

const title = {
  at: "Атака",
  hp: "Здоровье",
  cl: "Шанс. блок.",
  ev: "Уклонение",
  ka: "Крит. атаки",
  vamp: "Вампиризм",
  reg: "Регенерация",
  pr: "Броня",
  accuracy: "Точность",
  chance: "Крит. шанс",
};
export default function GameFeature({className, score, comp}) {
  return (
    <div className={classNames(styles.gameFeature, className)}>
      {Object.entries(score).map(([key, value]) => (
        <div key={`GameFeatureItem-${key}`} className={classNames(styles.gameFeature__item)}>
          <img
            src={image(`game/score/bg${comp ? "3" : `${value.add ? "2" : "1"}`}.png`)}
            className={classNames(styles.gameFeature__itemBg)}
          />
          <div className={classNames(styles.gameFeature__itemImage)}>
            <img src={image(`game/score/${key}.png`)} className={classNames(styles.gameFeature__itemImageBlock)} />
          </div>
          <div className={classNames(styles.gameFeature__itemInfo)}>
            <div className={classNames(styles.gameFeature__itemTitle)}>{title[key]}</div>
            <div className={classNames(styles.gameFeature__itemScore)}>
              <div className={classNames(styles.gameFeature__itemScoreMain)}>{value.score}</div>
              {value.add && !comp && (
                <div className={classNames(styles.gameFeature__itemScoreAdd)}>{"+" + value.add}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
GameFeature.propTypes = {
  className: PropTypes.string,
};
