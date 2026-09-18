export class Timer {
  _time = 0;

  _listeners = [];

  static timers = {};
  static _count = 0;

  static addTimer({duration, onTimeout} = {}) {
    const timer = new Timer({duration, onTimeout});
    Timer.timers[++Timer._count] = timer;
    return Timer._count;
  }

  static getTimer(uuid) {
    return Timer.timers[uuid];
  }

  static removeTimer(uuid) {
    const timer = Timer.timers[uuid];
    timer?.destroy();
    delete Timer.timers[uuid];
  }

  /**
   *
   * @param onTimeout
   * @param duration in ms
   * @param delta
   */
  constructor({onTimeout, duration = 0, delta = 1000} = {}) {
    //delta= 1ceк
    this.time = this.duration = duration;
    this._delta = duration ? Math.min(duration, delta) : delta;
    this._onTimeout = onTimeout;
    this._interval = setInterval(this.update, this._delta);
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = Math.max(0, value);

    this._listeners.forEach(listener => listener(this.time));
  }

  subscribe(listener) {
    const {_listeners} = this;
    if (typeof listener === "function" && !_listeners.includes(listener)) {
      _listeners.push(listener);
      listener(this.time);
    }
  }

  unsubscribe(listener) {
    const {_listeners} = this;
    if (_listeners.includes(listener) && _listeners.length) _listeners.splice(_listeners.indexOf(listener), 1);
  }

  update = () => {
    const {_delta, _onTimeout} = this;

    this.time -= _delta;

    if (!this.time) _onTimeout?.call(null);
  };

  start() {
    this._paused = false;
  }

  pause() {
    this._paused = true;
  }

  destroy() {
    clearInterval(this._interval);
  }
}
