import {Component} from "@/utils/ps/ecs/src/core/Component";

class Particle extends Component {
  type = "particle";

  _shader;

  _config;

  gpuSystem;

  emitter = new THREE.Object3D();

  set shader(shader) {
    this._shader = shader;
    this.onChange();
  }

  get shader() {
    return this._shader;
  }

  set config(config) {
    this._config = config;
    this.onChange();
  }

  get config() {
    return this._config;
  }
}

export {Particle};
