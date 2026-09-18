import {useCallback, useEffect, useRef, useState} from "react";

/**
 *   const [time] = useTimer(everyDayTask?.timer?.seconds_remaining * 1000, null, {paused: false});
 */
export default function useTimer(total = 10_000, onTimeout, settings = {}) {
  const [time, _setTime] = useState(total);
  const [paused, setPaused] = useState(settings.paused ?? true);
  const startTimestampRef = useRef(null);
  const elapsedRef = useRef(0);

  const setTime = useCallback(time => _setTime(Math.floor(time / 1000) * 1000), []);

  useEffect(() => {
    if (!paused) startTimestampRef.current = performance.now();
  }, []);

  const pause = useCallback(() => {
    setPaused(true);
    if (startTimestampRef.current !== null) {
      elapsedRef.current += performance.now() - startTimestampRef.current;
      startTimestampRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setPaused(false);
    startTimestampRef.current = performance.now();
  }, []);

  const start = useCallback(() => {
    setPaused(false);
    setTime(total);
    startTimestampRef.current = performance.now();
    elapsedRef.current = 0;
  }, [total]);

  const reset = useCallback(() => {
    setPaused(true);
    setTime(total);
    startTimestampRef.current = null;
    elapsedRef.current = 0;
  }, [total]);

  useEffect(() => {
    let animationFrameID;

    const updateTimer = () => {
      if (!paused && startTimestampRef.current !== null) {
        const elapsed = performance.now() - startTimestampRef.current + elapsedRef.current;
        const remainingTime = Math.max(total - elapsed, 0);

        setTime(remainingTime);

        if (remainingTime <= 0) {
          setPaused(true);
          startTimestampRef.current = null;
          elapsedRef.current = 0;
          if (typeof onTimeout === "function") {
            onTimeout();
          }
        } else {
          animationFrameID = requestAnimationFrame(updateTimer);
        }
      }
    };

    if (!paused) {
      animationFrameID = requestAnimationFrame(updateTimer);
    }

    return () => cancelAnimationFrame(animationFrameID);
  }, [paused, total, onTimeout]);

  return [time, {pause, resume, start, reset, timeToString: () => timeToString(time)}];
}

function timeToString(time) {
  const secondsTotal = Math.floor(time / 1000);
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
