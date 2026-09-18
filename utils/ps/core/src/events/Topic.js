import {v4 as uuidv4} from "uuid";

class Topic extends Array {
  uuid = uuidv4();

  name = "base";

  subscribers = {};

  constructor({name, eventBus} = {}) {
    super();
    this.name = name ?? this.name;
    this.eventBus = eventBus;
  }

  push(event) {
    const {eventBus} = this;
    event.parentTopic = this;

    this.callSubscribers(event);

    event.promise.then(() => this.remove(event));

    eventBus.emit(`${this.name}:${event.type}:created`, event);

    return super.push(event);
  }

  clear() {
    this.length = 0;
  }

  remove(event) {
    const index = this.indexOf(event);
    if (index === -1) return;
    this.splice(index, 1);
  }

  callSubscribers(event, action = "created") {
    Object.values(this.subscribers).forEach(({consumer, callbacks}) =>
      Object.entries(callbacks).forEach(([key, context]) => {
        const [callback, type] = key.split(this.separator);
        if (type && event.type !== type) return;
        consumer.onCall({callback, event, context, action});
      }),
    );
  }

  onUpdateEvent(event) {
    this.callSubscribers(event, "updated");
    this.eventBus.emit(`${this.name}:${event.type}:updated`, event);
  }

  subscribe({consumer, type, callback, context}) {
    if (!this.subscribers[consumer.uuid])
      this.subscribers[consumer.uuid] = {
        consumer,
        callbacks: {},
      };

    const key = this.getKey(arguments[0]);

    if (this.subscribers[consumer.uuid].callbacks[key]) return;

    this.subscribers[consumer.uuid].callbacks[key] = context;
  }

  unsubscribe({consumer, type, callback}) {
    const key = this.getKey(arguments[0]);
    if (!this.subscribers[consumer.uuid]?.callbacks[key]) return;

    delete this.subscribers[consumer.uuid].callbacks[key];

    if (!Object.keys(this.subscribers[consumer.uuid].callbacks).length) delete this.subscribers[consumer.uuid];
  }

  getKey({callback, type = ""}) {
    return `${callback}${this.separator}${type}`;
  }

  get separator() {
    return "-c:";
  }
}

export {Topic};
