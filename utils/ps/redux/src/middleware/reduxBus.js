import {baseProducer} from "@/utils/ps/core/src/events/Producer";

const reduxBus = () => next => action => {
  const result = next(action);

  const {type, ...data} = action;
  const {meta: {requestStatus} = {}} = data || {};

  if (requestStatus) baseProducer.send({topic: "redux", type, data});

  return result;
};

export {reduxBus};
