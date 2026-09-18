import {useEffect, useState} from "react";
import {Timer} from "@PS/frontend";

export default function useTimerWrapper(uuid) {
  const timer = Timer.getTimer(uuid);
  const [time, setTime] = useState(timer?.time || 0);

  useEffect(() => {
    const callback = time => setTime(time);
    timer?.subscribe(callback);

    return () => timer?.unsubscribe(callback);
  }, [uuid]);

  return {timer, time};
}
