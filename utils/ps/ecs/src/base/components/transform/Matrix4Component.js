import {Component} from "../../../core/Component";
import {Matrix4} from "@/utils/ps/math/src/Matrix4";
import {Quaternion} from "@/utils/ps/math/src/Quaternion";
import {Vector3} from "@/utils/ps/math/src/Vector3";
import {Euler} from "@/utils/ps/math/src/Euler";

class Matrix4Component extends Component {
  type = "matrix4";

  matrix = new Matrix4();

  _position = new Vector3();

  _quaternion = new Quaternion();

  _rotation = new Euler();

  _scale = new Vector3();

  constructor({eventBus, position, quaternion, scale}) {
    super({eventBus});

    if (position) this.matrix.compose(position, quaternion, scale);
  }

  decompose() {
    const result = {
      position: this._position,
      quaternion: this._quaternion,
      scale: this._scale,
      rotation: this._rotation,
    };
    this.matrix.decompose(result.position, result.quaternion, result.scale);
    result.rotation.setFromQuaternion(this._quaternion);
    return result;
  }

  updatePosition() {
    this.matrix.setPosition(this._position);
  }

  updateRotation() {
    this._quaternion.setFromEuler(this._rotation, true);
    this.matrix.makeRotationFromQuaternion(this._quaternion);
    this.updatePosition();
  }

  updateScale() {
    this.matrix.scale(this._scale);
  }

  setFromEuler(euler) {
    this._rotation.copy(euler);
    this._quaternion.setFromEuler(this._rotation, true);
  }

  compose() {
    this.matrix.compose(this._position, this._quaternion, this._scale);
  }

  updateQuaternion() {
    this.matrix.makeRotationFromQuaternion(this._quaternion);
    this.updatePosition();
  }

  get rotation() {
    return this.decompose().rotation;
  }

  get quaternion() {
    return this.decompose().quaternion;
  }

  get position() {
    return this.decompose().position;
  }

  get scale() {
    return this.decompose().scale;
  }

  set position(position) {
    this._position = position.copy(position);
    this.updatePosition();
  }
}

export {Matrix4Component};
