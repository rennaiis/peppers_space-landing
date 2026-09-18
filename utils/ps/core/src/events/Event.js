class Event {
  type = "unknown";

  data = null;

  topic = null;

  parentTopic = null;

  constructor({type, data, topic, eventBus, lifeTime}) {
    this.type = type ?? this.type;
    this.data ??= data;
    this.topic ??= topic;
    this.eventBus = eventBus;

    if (lifeTime) this.timeout = setTimeout(this.onTimeout.bind(this), lifeTime);

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this.createdAt = this.updatedAt = performance.now();
  }

  onTimeout() {
    this.resolve("timeout");
  }

  update(data) {
    this.data = data;
    this.updatedAt = performance.now();
    this.parentTopic?.onUpdateEvent(this);
  }

  get fullType() {
    return `${this.topic}:${this.type}`;
  }

  destroy() {
    this.eventBus = null;
    this.parentTopic = null;

    clearTimeout(this.timeout);
  }
}

export {Event};
