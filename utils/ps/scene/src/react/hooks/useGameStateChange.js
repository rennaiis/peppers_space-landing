import {useCallback} from "react";
import {useConsumerListener} from "./useConsumerListener";

function useGameStateChange(gameName, _onStateChange) {
  const onStateChange = useCallback(
    ({data: {name, state}}) => {
      if (name !== gameName) return;
      _onStateChange?.(state);
    },
    [_onStateChange],
  );

  useConsumerListener({topic: "game", type: "stateChanged", handler: onStateChange});
}

export {useGameStateChange};
