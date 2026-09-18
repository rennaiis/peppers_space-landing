import EventEmitter from "eventemitter3";
import {Topic} from "./Topic";
import {Consumer} from "./Consumer";
import {Event} from "./Event";

class Producer {
  topics = {};

  eventBus = global.__sharedEventEmitter ?? (global.__sharedEventEmitter = new EventEmitter());

  async send({type, data, topic = "base"}) {
    const {eventBus} = this;

    const event = new Event({...arguments[0], eventBus});

    this.getTopic(topic).push(event);

    return event.promise;
  }

  getConsumer(ConsumerClass = Consumer) {
    return new ConsumerClass({
      producer: this,
      eventBus: this.eventBus,
    });
  }

  getTopic(topic) {
    return this.topics[topic] ?? (this.topics[topic] = new Topic({name: topic, eventBus: this.eventBus}));
  }

  _subscribe({consumer, topic, callback, context}) {
    this.getTopic(topic).subscribe(arguments[0]);
    return () => this._unsubscribe({...arguments[0]});
  }

  _unsubscribe({topic, callback, context}) {
    this.getTopic(topic).unsubscribe(arguments[0]);
  }
}

export {Producer};

export const baseProducer = new Producer();
