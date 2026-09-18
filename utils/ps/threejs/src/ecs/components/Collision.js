import {Component} from "@/utils/ps/ecs/src/core/Component";

class Collision extends Component {
  group = "unknown";

  type = "threeCollision";

  constructor(data) {
    super(data);
    this.group = data.group;
  }
}

export {Collision};
