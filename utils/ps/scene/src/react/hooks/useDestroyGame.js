import {useEffect} from "react";

function useDestroyGame({wrapper, onDestroyed}) {
  useEffect(
    () => () => {
      if (wrapper) {
        wrapper.destroy?.();
        onDestroyed?.();
      }
    },
    [wrapper],
  );
}

export {useDestroyGame};
