import React, {useEffect, useRef, useState} from "react";
import {ignoreNextStates, states} from "../../../../controllers/games/pixi/platform/constants/states";
import {infinityLevel} from "../../../../controllers/games/pixi/platform/constants/game-platform-levels";
import {useLoadController} from "@/utils/scene/react/hooks/useLoadController";
import {basePixiImports} from "@/utils/scene/utils/import/import-pixi";
import useStateReducer from "@/utils/scene/react/hooks/useStateReducer";
import {getNextState} from "@/utils/scene/utils/state/state";
import {useContent} from "@/redux/reducer/content";
import {useGameReturnResources} from "@/hooks/useGameReturnResources";
import useGameLog from "@/hooks/useGameLog";
import {useGameControls} from "@/hooks/useGameControls";
import {useGamesModal} from "@/hooks/useGamesModal";
import Counter from "@/components/baseComponents/gui/counter/Counter";
import {GameWrapper} from "@/components/gameWrapper/GameWrapper";
import styles from "./Platformer.module.scss";

const defaultGameData = {lifes: 1, points: 0, coins: 0, targetCoins: 100, levelData: infinityLevel};

const Platformer = React.forwardRef(function Platformer({callbacks}, ref) {
  const {state: appState, gameDifficulty} = useContent();
  const isWeb = true;
  const gameRef = useRef();

  const [state, setState] = useState("loadingManifest");
  const [wrapper, setWrapper] = useState();
  const [gameTimer, setGameTimer] = useState(3);
  const [gameData, setGameData] = useState(defaultGameData);

  const logs = useGameLog(wrapper?.eventBus);

  const {win} = useGameControls({wrapper, isInfinity: true, gameType: "runner", logs, gameData, callbacks});

  const {openPauseModal, isPending} = useGamesModal({
    game: "runner",
    loseCallback: win,
    setGameState: setState,
    callbacks,
  });

  const gameOver = () => {
    win();
    setGameData(defaultGameData);
  };

  useLoadController({
    getLibsPromise: basePixiImports,
    getWrapperPromise: () => import(`@/controllers/games/pixi/platform/Wrapper`),
    beforeInit: ({wrapper}) => setWrapper(wrapper),
    afterInit: ({wrapper, wrapper: {eventBus}}) => {
      wrapper.appendContainer(gameRef.current);
      wrapper.setDifficulty(gameDifficulty);
      wrapper.setTargetCoins(gameData.targetCoins);

      wrapper.controller.levelData = gameData.levelData;

      eventBus.addEventListener("game-over", ({data: {isWin}}) => {
        setState(isWin ? "win" : "lose");
      });

      eventBus.addEventListener("gameData:update", ({points, coins}) => {
        const updatedData = [
          {key: "points", value: points},
          {key: "coins", value: coins},
        ].reduce((acc, field) => {
          return typeof field.value === "number" ? {...acc, [field.key]: field.value} : acc;
        }, {});

        setGameData(prev => ({...prev, ...updatedData}));
      });
    },
  });

  useStateReducer(
    {
      showing() {
        // const nextCallback = () => setState(getNextState(states, state));
        // gamesTutorial[appState] ? rulesModalCallback(nextCallback) : nextCallback();
        setState(getNextState(states, state));
      },
      paused: openPauseModal,
      lose: gameOver,
      win: gameOver,
    },
    ignoreNextStates,
    state => setState(getNextState(states, state)),
    state,
    wrapper,
  );

  useEffect(() => () => wrapper && wrapper.reset(true), [wrapper]);

  useGameReturnResources({wrapper, gameName: "Runner", callbacks});

  return (
    <GameWrapper>
      <div className={styles.platformer}>
        <div className={styles.platformer__wrapper} ref={gameRef} />
      </div>
      <Counter gameTimer={gameTimer} setGameTimer={setGameTimer} state={state} setState={setState} mod={"platform"} />
    </GameWrapper>
  );
});

export default Platformer;
