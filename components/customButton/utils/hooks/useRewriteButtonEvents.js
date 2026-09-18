import {isType, useModal} from "@/hooks/useModal";
import {useEffect, useState} from "react";

export function useRewriteButtonEvents(_events) {
  const [events, setEvents] = useState(_events);
  const {id: modalId} = useModal();

  //передача modalId для закрытия модального окна с id: "current"
  function onModalClose(event = {}) {
    const {data} = event;

    const isCloseCurrent = isType(data?.id ?? data ?? "current", "current");
    return isCloseCurrent ? {...event, data: {id: modalId}} : event;
  }

  function rewriteRules() {
    if (!_events || !_events.length) return;

    const rewriteEvents = _events.map(event => {
      const {topic, type} = event;
      return (
        {
          "modal:close": () => onModalClose(event),
        }[`${topic}:${type}`]?.() || event
      );
    });
    setEvents(rewriteEvents);
  }

  useEffect(() => {
    rewriteRules();
  }, [_events]);

  return events;
}
