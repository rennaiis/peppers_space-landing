import {Component} from "../../../core/Component";

class Matrix3Component extends Component {
  type = "matrix3";

  x = 0;

  y = 0;

  rotation = 0;

  scaleX = 1;

  scaleY = 1;

  skewX = 0;

  skewY = 0;

  pivotX = 0;

  pivotY = 0;

  constructor({x = 0, y = 0, scaleX = 1, scaleY = 1, skewX = 0, skewY = 0, rotation = 0, pivotX = 0, pivotY = 0}) {
    super(...arguments);

    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.skewX = skewX;
    this.skewY = skewY;
    this.pivotX = pivotX;
    this.pivotY = pivotY;
  }
}

export {Matrix3Component};
