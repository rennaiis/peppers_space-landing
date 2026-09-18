import {Plugin} from "./Plugin";

class SwipePlugin extends Plugin {
  name = "swipe";

  constructor(
    props = {
      minSwipeLength: 25,
      swipeDesktopActive: true,
    },
  ) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    const {swipeDesktopActive, minSwipeLength} = props;
    this.isDesktop = swipeDesktopActive;
    this.minSwipeLength = minSwipeLength;
  }

  checkAction(action) {
    return action._data.swipe;
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
  }

  updateDataByEvent(event) {
    const clientX = event.clientX ?? event.changedTouches[0].clientX;
    const clientY = event.clientY ?? event.changedTouches[0].clientY;
    this.lastData = {clientX, clientY};
  }

  onTouchEnd(event) {
    const clientX = event.clientX ?? event.changedTouches[0].clientX;
    const clientY = event.clientY ?? event.changedTouches[0].clientY;

    if (!this.lastData) {
      this.updateDataByEvent(event);
      return;
    }

    const deltaX = clientX - this.lastData.clientX;
    const deltaY = this.lastData.clientY - clientY;

    const data = {deltaY, deltaX};

    const axis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
    const value = data[`delta${axis.toUpperCase()}`];
    const direction = Math.sign(data[`delta${axis.toUpperCase()}`]);

    if (Math.abs(value) > this.minSwipeLength) {
      this.updateActions({axis, direction});
    }

    this.lastData = null;
  }

  updateActions({axis, direction}) {
    this._actions.forEach(action => {
      action.active = false;
    });

    this._actions.forEach(action => {
      const {
        data: {swipe},
      } = action;
      action.active = swipe.axis === axis && swipe.direction === direction;
    });
  }
}

export {SwipePlugin};
