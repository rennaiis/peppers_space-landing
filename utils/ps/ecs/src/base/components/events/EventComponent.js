import {Component} from "../../../core/Component";

class EventComponent extends Component {
  /** @type {string} */
  type;

  /** @type {*} */
  info;

  /**
   * @param data
   * @param {string} data.type
   * @param {*?} data.info
   */
  constructor(data) {
    super(data);
    this.type = data.type;
    this.data = data.data;
  }
}

export {EventComponent};
