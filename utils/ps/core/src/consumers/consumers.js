import {baseProducer} from "../events/Producer";

function reduxThunk(data) {
  const {name, payload} = data;
  return baseProducer.send({
    topic: "redux",
    type: "thunk",
    data: {
      ...data,
      name,
      payload,
    },
  });
}

function reduxAction(data) {
  const {name, payload} = data;
  baseProducer.send({
    topic: "redux",
    type: "action",
    data: {
      ...data,
      name,
      payload,
    },
  });
}

function callback(data) {
  const {name} = data;

  baseProducer.send({
    topic: "callbacks",
    type: "call",
    data: {
      ...data,
      name,
    },
  });
}

function analytics(data) {
  const {name, payload} = data;

  baseProducer.send({
    topic: "analytic",
    type: "send",
    data: {
      ...data,
      name,
      payload,
    },
  });
}

function modalOpen(data) {
  const {type = "infoModal", props = {}} = data;

  baseProducer.send({
    topic: "modal",
    type: "open",
    data: {
      ...data,
      type,
      props,
    },
  });
}

function modalClose(data) {
  const {id, type} = data;
  baseProducer.send({
    topic: "modal",
    type: "close",
    data,
  });
}

function setGameState(data) {
  baseProducer.send({topic: "game", type: "setState", data});
}

const baseConsumers = {reduxThunk, reduxAction, callback, analytics, modalOpen, modalClose, setGameState};
export {baseConsumers};
