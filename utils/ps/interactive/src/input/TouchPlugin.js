import {Plugin} from "./Plugin";

const isPointer = false; // !!global.PointerEvent;
const [DOWN, UP, MOVE] = isPointer
  ? ["pointerdown", "pointerup", "pointermove"]
  : ["touchstart", "touchend", "touchmove"];

/** @param {PointerEvent|TouchEvent} event */
function getPosition(event) {
  return {
    x: event.pageX,
    y: event.pageY,
  };
}

class Touch {
  /**
   * Координаты начала касания
   * @type {{x: number, y: number}}
   */
  startPosition;

  /**
   * Текущие координаты касания
   * @type {{x: number, y: number}}
   */
  currentPosition;

  /**
   * Вектор направления от стартового к текущему положению
   * @type {{x: number, y: number}}
   */
  vector;

  /**
   * @param {PointerEvent|Touch} event
   */
  constructor(event) {
    this.startPosition = getPosition(event);
  }

  /**
   * @param {PointerEvent|Touch} event
   */
  update(event) {
    this.currentPosition = getPosition(event);
    this.vector = {
      x: this.currentPosition.x - this.startPosition.x,
      y: this.currentPosition.y - this.startPosition.y,
    };
  }
}

class TouchPlugin extends Plugin {
  name = "touch";

  /** @type {Map<number, Touch>} */
  touches = new Map();

  constructor(props = {}) {
    super(props);
    const [start, move, end] = isPointer
      ? [this.onPointerDown, this.onPointerMove, this.onPointerUp]
      : [this.onTouchStart, this.onTouchMove, this.onTouchEnd];
    this.start = start;
    this.move = move;
    this.end = end;

    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
    const {swipeDesktopActive} = props;
    this.isDesktop = swipeDesktopActive;
  }

  attach(target) {
    this.detach(target);

    setTouchAction(target, "none");
    const options = {passive: false};
    target.addEventListener(DOWN, this.onStart, options);
    global.addEventListener(UP, this.onEnd, options);
    global.addEventListener(MOVE, this.onMove, options);

    target.focus();
  }

  detach(target) {
    setTouchAction(target, "");
    target.removeEventListener(DOWN, this.onStart);
    global.removeEventListener(UP, this.onEnd);
    global.removeEventListener(MOVE, this.onMove);
  }

  /** @param {PointerEvent|TouchEvent} event */
  isValid(event) {
    return (
      this.isDesktop ||
      event.type.includes("touch") ||
      (event.type.includes("pointer") && event.pointerType === "touch")
    );
  }

  /** @param {PointerEvent} event */
  onPointerDown(event) {
    this.touches.set(event.pointerId, new Touch(event));
  }

  /** @param {PointerEvent} event */
  onPointerMove(event) {
    this.touches.get(event.pointerId)?.update(event);
  }

  /** @param {PointerEvent} event */
  onPointerUp(event) {
    this.touches.delete(event.pointerId);
  }

  /** @param {TouchEvent} event */
  onTouchStart(event) {
    Array.from(event.touches)
      .filter(touch => !this.touches.has(touch.identifier))
      .forEach(touch => {
        this.touches.set(touch.identifier, new Touch(touch));
      });
  }

  /** @param {TouchEvent} event */
  onTouchMove(event) {
    Array.from(event.touches).forEach(touch => {
      this.touches.get(touch.identifier)?.update(touch);
    });
  }

  /** @param {TouchEvent} event */
  onTouchEnd(event) {
    const exist = Array.from(event.touches).map(touch => touch.identifier);
    for (let key of this.touches.keys()) {
      if (exist.includes(key)) continue;
      this.touches.delete(key);
    }
  }

  /** @param {PointerEvent|TouchEvent} event */
  onStart(event) {
    if (!this.isValid(event)) return;
    this.start(event);
    this.onMove(event);
  }

  /** @param {PointerEvent|TouchEvent} event */
  onMove(event) {
    if (!this.isValid(event)) return;
    this.move(event);
    this.checkActions();
  }

  /** @param {PointerEvent|TouchEvent} event */
  onEnd(event) {
    if (!this.isValid(event)) return;
    this.end(event);
    this.checkActions();
  }

  checkActions() {
    // super.checkActions();
    const {innerWidth: w, innerHeight: h} = global;
    const touches = Array.from(this.touches.values());
    const iterator =
      this.touches.size > 0
        ? action => {
            const {zone, move} = action.data.touch;
            if (zone) {
              action.active = touches.some(touch => intersects(scale(zone, w, h), touch.currentPosition));
            } else if (move) {
              action.extraData = Array.from(touches.values())[0]?.vector;
              action.active = !!action.extraData;
            }
          }
        : action => {
            action.active = false;
          };
    for (let action of this._actions) {
      iterator(action);
    }
  }

  checkAction(action) {
    super.checkAction(action);
  }

  updateAction(action) {
    super.updateAction(action);
  }
}

function scale([x, y, w, h], sx, sy) {
  return [x * sx, y * sy, w * sx, h * sy];
}

function intersects([x, y, w, h], {x: px, y: py}) {
  return px >= x && px <= x + w && py >= y && py <= y + h;
}

function setTouchAction(target, value) {
  if (target === global) {
    target = global.document.documentElement;
  }
  target.style.touchAction = value;
}

export {Touch, TouchPlugin};
