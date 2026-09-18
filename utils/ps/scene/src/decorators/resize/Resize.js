import {BaseDecorator} from "../BaseDecorator";

class Resize extends BaseDecorator {
  constructor() {
    super();

    this.resize = this.resize.bind(this);

    window.addEventListener("resize", this.resize);
  }

  resize() {}
}

export {Resize};
