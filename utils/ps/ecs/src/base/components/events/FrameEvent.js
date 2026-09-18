class FrameEvent {
  type = "unknown";

  data = null;

  completed = false;

  constructor({type, data}) {
    this.type = type ?? this.type;
    this.data = data ?? this.data;
  }
}

export {FrameEvent};
