import {Component} from "@PS/ecs";

export class Particle extends Component {
  _particleConfig;

  type = "particle";

  constructor(data) {
    super(data);

    this.particleConfig = data.particleConfig;
  }

  set particleConfig(data) {
    this._particleConfig = data;
    this.onChange();
  }

  get particleConfig() {
    return this._particleConfig;
  }
}
