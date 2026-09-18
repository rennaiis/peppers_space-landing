import {Component} from "@/utils/ps/ecs/src/core/Component";

class BodyComponent extends Component {
  _matterBody = null;

  set matterBody(matterBody) {
    this._matterBody = matterBody;
    this.onChange();
  }

  get matterBody() {
    return this._matterBody;
  }
}

export {BodyComponent};
