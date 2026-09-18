import {Component} from "@/utils/ps/ecs/src/core/Component";

class Mixer extends Component {
  /**
   * THREE.AnimationMixer
   */
  mixer;

  animations = {};

  type = "mixer";

  constructor(data) {
    super(data);

    this.mixer = data.mixer;
  }
}

export {Mixer};
