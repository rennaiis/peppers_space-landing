import {Component} from "@/utils/ps/ecs/src/core/Component";

class Body3d extends Component {
  /**
   * THREE.Object3D
   */
  body;

  onceUpdate;

  type = "body3d";

  constructor(data) {
    super(data);

    this.body = data.body3d?.object3d;
    this.onceUpdate = data.onceUpdate ?? false;
  }
}

export {Body3d};
