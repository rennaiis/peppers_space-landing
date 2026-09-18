import {camelCase} from "lodash";
import {baseProducer} from "@/utils/ps/core/src/events/Producer";

class EventController {
  constructor({producer = baseProducer} = {}) {
    this.producer = producer;
    this.consumer = producer.getConsumer();
  }

  subscribe({topic}) {
    return this.consumer.subscribe({
      topic: topic,
      callback: `onEvent`,
      context: this,
    });
  }

  onEvent(event) {
    const {topic, type} = event;
    this[camelCase(`${topic}-${type}Event`)]?.(event);
  }
}

export {EventController};
