import EventEmitter from "eventemitter3";

class EventDispatcher extends EventEmitter {
  addEventListener(type, listener) {
    return this.on(...arguments);
  }

  removeEventListener(type, listener) {
    return this.off(...arguments);
  }

  dispatchEvent(event) {
    return this.emit(event.type, event);
  }
}

export {EventDispatcher};
