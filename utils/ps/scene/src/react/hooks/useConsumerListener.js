import {useEffect} from "react";
import {baseProducer, eventSubscription} from "../../../../core/index";

function useConsumerListener({topic, type, handler, list}) {
  useEffect(() => {
    return eventSubscription({
      target: baseProducer.getConsumer(),
      actionAdd: "on",
      actionRemove: "off",
      postfix: "",
      callbacksBus: list?.length ? list.map(getCallbackBus) : [getCallbackBus({topic, type, handler})],
    });
  }, [handler, list]);
}

function getCallbackBus({topic, type, handler}) {
  return {event: `${topic}:${type}:created`, callback: handler};
}

export {useConsumerListener};
