import React, {useState} from "react";
import classNames from "classnames";
import GButton from "../gButton/GButton";
import styles from "./GameCreate.module.scss";
import GameCreateColors from "./GameCreateColors";
import GameCreateCarousel from "./GameCreateCarousel";
import GameCreateName from "./GameCreateName";
import PS from "@PS";

const {
  frontend: {image, safeHTML},
} = PS;

const GameCreate = React.forwardRef(function GameCreate(
  {title, list, name, names, color, colors, button, className},
  ref,
) {
  const [nameIndex, setNameIndex] = useState(0);

  return (
    <div className={classNames(styles.gameCreate, className)} ref={ref}>
      <img src={image("game/screen/bg.jpg")} className={classNames(styles.gameCreate__bg)} />
      <div className={classNames(styles.gameCreate__title)}>{safeHTML(title)}</div>

      <GameCreateCarousel list={list} />

      <GameCreateName name={name} names={names} />

      <GameCreateColors color={color} colors={colors} />

      <div className={classNames(styles.gameCreate__footer)}>
        <GButton {...button} className={classNames(styles.gameCreate__button, button.className)} />
      </div>
    </div>
  );
});

export default GameCreate;
GameCreate.propTypes = {};
