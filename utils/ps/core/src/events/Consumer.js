import {v4 as uuidv4} from "uuid";

class Consumer {
  uuid = uuidv4();

  eventBus;

  _producer;

  _clear = [];

  constructor({eventBus, producer}) {
    this._eventBus = eventBus;
    this._producer = producer;
  }

  onCall({callback, event, context, action}) {
    (context ?? this)[callback]?.(event, action);
  }

  on(type, callback, context, once) {
    this._eventBus.on(type, callback, context, once);
    this._clear.push({
      func: this.off,
      args: arguments,
      context: this,
    });
    return () => this.off(...arguments);
  }

  off(type, callback, context, once) {
    this._eventBus.off(type, callback, context, once);
  }

  subscribe({topic, callback, context}) {
    const clear = this._producer._subscribe({...arguments[0], consumer: this});
    this._clear.push({
      func: clear,
    });
    return clear;
  }

  unsubscribe({topic, callback, context}) {
    return this._producer._unsubscribe(arguments[0]);
  }

  destroy() {
    this._clear.forEach(({func, context, args}) => func.apply(context, args));
  }
}

export {Consumer};
