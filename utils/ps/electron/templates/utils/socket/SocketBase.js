const ANY = "_any";

export default class SocketBase {
  listeners = {};

  constructor(host, port) {
    this.id = `${host}:${port}`;
  }

  onAnyMessage(listener) {
    this.on(ANY, listener);
  }

  on(command, listener) {
    if (!this.listeners[command]) {
      this.listeners[command] = [];
    }
    this.listeners[command].push({fn: listener});

    return () => this.off(command, listener);
  }

  off(command, listener) {
    this.listeners[command] = this.listeners[command]?.filter(({fn}) => fn !== listener);
  }

  /**
   *
   * @param {Buffer} buffer
   * @param {string=} id
   */
  checkBuffer(buffer, id) {
    while (buffer.hasMessage()) {
      const {command, params} = buffer.readMessage();
      this.trigger(command, params, {id});
    }
  }

  trigger(command, params, props) {
    const listeners = (this.listeners[command] || []).concat(this.listeners[ANY] || []);
    listeners.forEach(({fn}) => fn({command, params, props}));
  }

  destroy() {
    this.listeners = undefined;
  }
}
