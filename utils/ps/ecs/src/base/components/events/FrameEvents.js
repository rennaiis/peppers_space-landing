import {Component} from "../../../core/Component";
import {FrameEvent} from "./FrameEvent";

class FrameEvents extends Component {
  list = [];

  add(event) {
    this.list.push(new FrameEvent(event));
  }

  get() {
    return this.list.find(({completed}) => !completed);
  }
}

export {FrameEvents};
