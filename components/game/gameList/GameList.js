import React, {useRef} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameList.module.scss";
import GameListItem from "./GameListItem";
import Scroll from "../../baseComponents/gui/scroll/Scroll";
import GameTitle from "../gameTitle/GameTitle";
import GameMenu from "../gameMenu/GameMenu";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationWhileInView} from "@/components/baseComponents/helpers/transition/animations";

export default function GameList({className, title, list}) {
  const scrollRef = useRef(null);

  return (
    <div className={classNames(styles.gameList, className)}>
      <GameTitle title={title} className={classNames(styles.gameList__title)} />
      <PE.div
        className={classNames(styles.gameList__items)}
        ref={scrollRef}
        animation={"fadeSimple"}
        settingsAnimationStates={settingsAnimationWhileInView}
      >
        <Scroll>
          {list?.map((item, index) => (
            <GameListItem {...item} key={`GameListItem-${index}`} rootRef={scrollRef} />
          ))}
        </Scroll>
      </PE.div>
      <GameMenu className={classNames(styles.gameList__menu)} />
    </div>
  );
}
GameList.propTypes = {
  className: PropTypes.string,
};
