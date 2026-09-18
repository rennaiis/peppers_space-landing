import {Plugin} from "./Plugin";

class TapPlugin extends Plugin {
  name = "tap";

  isDesktop = true;

  constructor({tapMovementThreshold = 10} = {}) {
    super();

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.isDesktop = !("ontouchstart" in document.documentElement);
    this.tapMovementThreshold = tapMovementThreshold;
  }

  checkAction(action) {
    return action._data.tap;
  }

  addAction(action) {
    super.addAction(action);
  }

  attach(target) {
    this.detach(target);

    target.addEventListener("touchstart", this.onTouchStart);
    target.addEventListener("touchend", this.onTouchEnd);
    target.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchEnd);
    window.addEventListener("touchcancel", this.onTouchEnd);

    if (this.isDesktop) {
      target.addEventListener("mousedown", this.onTouchStart);
      target.addEventListener("mouseup", this.onTouchEnd);
      window.addEventListener("mouseup", this.onTouchEnd);
    }

    target.focus();
    return this;
  }

  onTouchMove(e) {
    e.preventDefault();
  }

  detach(target) {
    target.removeEventListener("touchstart", this.onTouchStart);
    target.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("touchcancel", this.onTouchEnd);

    if (this.isDesktop) {
      target.removeEventListener("mousedown", this.onTouchStart);
      target.removeEventListener("mouseup", this.onTouchEnd);
      window.removeEventListener("mouseup", this.onTouchEnd);
    }
  }

  onTouchStart(event) {
    this.updateDataByEvent(event);
    this.updateActions(false);
  }

  updateDataByEvent(event) {
    const clientX = event.clientX ?? event.changedTouches[0].clientX;
    const clientY = event.clientY ?? event.changedTouches[0].clientY;
    this.lastData = {clientX, clientY, date: performance.now()};
  }

  onTouchEnd(event) {
    const clientX = event.clientX ?? event.changedTouches[0].clientX;
    const clientY = event.clientY ?? event.changedTouches[0].clientY;

    if (!this.lastData) {
      this.updateDataByEvent(event);
      return;
    }

    const deltaX = this.lastData.clientX - clientX;
    const deltaY = this.lastData.clientY - clientY;

    const totalMovement = Math.abs(deltaX) + Math.abs(deltaY);
    const isFailedTap = totalMovement >= this.tapMovementThreshold;

    this.updateActions(true, isFailedTap);
    this.lastData = null;
  }

  updateActions(isEnd = true, isFail = false) {
    this._actions.forEach(action => {
      action.active = false;
    });

    this._actions.forEach(action => {
      const {
        data: {
          tap: {end, start, fail},
        },
      } = action;
      action.active = !!((isEnd && end) || (!isEnd && start)) || (isFail && fail);
    });
  }
}

export {TapPlugin};
