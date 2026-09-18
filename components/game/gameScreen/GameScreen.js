import React, {useRef} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameScreen.module.scss";
import {image} from "../../../utils/ps/frontend/src/url/baseUrl";
import {Boosters} from "../../games/ui/boosters/Boosters";
import {usePlatform} from "@/redux/reducer/platform";
import Container from "../../container/Container";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";

export default function GameScreen({className, boosters, timer = "3:00", children, hideCounters}) {
  const wrapperRef = useRef();
  const stateRef = useRef();

  const data = usePlatform();
  const bonusPoints = data.currentGame.score.bonusPoints;

  return (
    <Container>
      <div className={classNames(styles.gameScreen, className)}>
        <img src={image("game/screen/bg.jpg")} className={classNames(styles.gameScreen__bg)} />
        <div className={classNames(styles.gameScreen__game)}>
          {React.Children.map(children, child =>
            React.createElement(child.type, {
              ...child.props,
              wrapperRef,
              stateRef,
            }),
          )}
        </div>
        {!hideCounters && (
          <PE.div
            className={classNames(styles.gameScreen__counters)}
            settingsAnimationStates={settingsAnimationBase}
            animation={"gameScreenItems"}
          >
            <PE.div className={classNames(styles.gameScreen__counter)} animation={"gameScreenCounter"}>
              <img src={image("game/screen/counter.png")} className={classNames(styles.gameScreen__counterImg)} />
              <div className={classNames(styles.gameScreen__counterText)}>{bonusPoints}</div>
            </PE.div>
            <PE.div className={classNames(styles.gameScreen__time)} animation={"gameScreenTime"}>
              {timer}
            </PE.div>
          </PE.div>
        )}
        {boosters?.length && <Boosters wrapperRef={wrapperRef} stateRef={stateRef} list={boosters} />}
      </div>
    </Container>
  );
}
GameScreen.propTypes = {
  className: PropTypes.string,
};
