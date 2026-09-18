import {Plugin} from "./Plugin";

class TouchSegmentPlugin extends Plugin {
  name = "touchSegment";

  _touches = {};
  _targetRect = null;

  checkAction(action) {
    return !!action.data.touchSegment;
  }

  attach(target) {
    this.detach(target);

    this.target = target;

    target.addEventListener("touchstart", this.onTouchStart, {passive: true});
    target.addEventListener("touchend", this.onTouchEnd, {passive: true});
    target.addEventListener("touchcancel", this.onTouchEnd, {passive: true});
    window.addEventListener("touchend", this.onTouchEnd);
  }

  detach(target) {
    if (!target) return;

    this.target = null;
    this._targetRect = null;

    target.removeEventListener("touchstart", this.onTouchStart);
    target.removeEventListener("touchend", this.onTouchEnd);
    target.removeEventListener("touchcancel", this.onTouchEnd);
    window.removeEventListener("touchend", this.onTouchEnd);
  }

  onTouchStart = e => {
    const t = e.changedTouches[0];
    this._touches[t.identifier] = t;
    this.checkActions();
  };

  onTouchEnd = e => {
    const changed = e.changedTouches;

    for (let i = 0; i < changed.length; i++) {
      delete this._touches[changed[i].identifier];
    }

    this.checkActions();
  };

  checkActions() {
    const touches = Object.values(this._touches);

    const hasTouches = touches.length > 0;

    const rect = this.getRect();

    for (let i = 0; i < this._actions.length; i++) {
      const action = this._actions[i];

      if (!hasTouches) {
        action.active = false;
        continue;
      }

      action.active = this.isActive(action, touches, rect);
    }
  }

  isActive(action, touches, rect) {
    const {segmentX} = action.data.touchSegment;

    const left = segmentX[0] * rect.width;
    const right = segmentX[1] * rect.width;

    for (let i = 0; i < touches.length; i++) {
      if (this.isTouchInRange(touches[i], left, right, rect)) {
        return true;
      }
    }

    return false;
  }

  isTouchInRange(touch, left, right, rect) {
    const isWindow = this.target === window;

    const x = isWindow ? touch.clientX : (touch.globalX ?? touch.clientX) - rect.left;

    return x >= left && x <= right;
  }

  getRect() {
    const t = this.target;

    if (!t) return {left: 0, width: 0};

    const isWindow = t === window;

    if (isWindow) {
      return {
        left: 0,
        width: window.innerWidth,
      };
    }

    // кэшируем rect, чтобы не дергать layout каждый кадр без нужды
    if (!this._targetRect) {
      this._targetRect = t.getBoundingClientRect();
    }

    return this._targetRect;
  }
}

export {TouchSegmentPlugin};
