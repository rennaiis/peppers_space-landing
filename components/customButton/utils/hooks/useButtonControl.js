import {useEffect, useRef, useState} from "react";
import buildSendData from "../../utils/buildSendData";
import {baseProducer} from "@PS/core";
import {useRewriteButtonEvents} from "@/components/customButton/utils/hooks/useRewriteButtonEvents";

export function useButtonControl({
                                   onClick: click,
                                   timeout = 0,
                                   preventDefault,
                                   stopPropagation,
                                   events: _events,
                                   eventsData,
                                 }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const timeoutRef = useRef();
  const events = useRewriteButtonEvents(_events);

  const onClick = e => {
    if (isDisabled) return;

    preventDefault && e?.preventDefault?.();
    stopPropagation && e?.stopPropagation?.();

    if (events && events.length)
      events.forEach(({topic, type, data = {}}) => {
        const sendData = buildSendData(eventsData, data);
        baseProducer.send({topic, type, data: sendData});
      });

    click?.(e);

    if (e?.currentTarget?.type === "submit")
      // не блокируем, чтобы всплыло в форму
      return;

    if (typeof timeout === "number") {

      if (e.currentTarget) e.currentTarget.disabled = true;
      setIsDisabled(true);
      timeoutRef.current = setTimeout(() => {
        if (e.currentTarget) e.currentTarget.disabled = false;
        setIsDisabled(false);
        timeoutRef.current = null;
      }, timeout);
    }
  };

  useEffect(() => () => typeof timeoutRef.current === "number" && clearTimeout(timeoutRef.current), []);

  return {onClick, isDisabled};
}
