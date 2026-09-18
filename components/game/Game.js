import React, {useState} from "react";
import * as PropTypes from "prop-types";
import GamePreloader from "./gamePreloader/GamePreloader";
import {useRouter} from "next/router";
import Container from "../container/Container";
import Transition from "../baseComponents/helpers/transition/Transition";
import {states} from "@/constants/platform/states";

export default function Game() {
  const router = useRouter();
  const [isPreloader, setIsPreloader] = useState(false);

  const path = router.pathname.slice(1).split("/");

  const state = path[0] === "games" ? "game" : path.length === 1 ? "main" : path.at(-1);

  const {
    components: {Component, props},
  } = states[state] ?? state.default;

  return (
    <>
      <Transition keyId={state} enterDuration={1.5} exitDuration={0.3} customProps={{className: "container"}}>
        <Container state={state} className={"container_game"} isBg={false}>
          <Component {...props} />
        </Container>
      </Transition>

      <Transition keyId={isPreloader} switchMode customProps={{className: "game-preloader"}} isVisible={isPreloader}>
        <GamePreloader setIsPreloader={setIsPreloader} />
      </Transition>
    </>
  );
}
Game.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
