/**
 * Использование
 *
 * export default class Vitamin extends PIXI.Container {
 *   constructor() {
 *     this.clickability = new Clickability(this);
 *   }
 *
 *   onClick() {
 *    то что нужно сделать на клик
 *   }
 * }
 *
 */
export class Clickability {
  constructor(host) {
    this.host = host;

    this.host
      .on("pointerdown", this.onPointerDown, this)
      .on("pointermove", this.onPointerMove, this)
      .on("pointerup", this.onPointerUp, this)
      .on("pointerupoutside", this.onPointerUpOutside, this);
  }

  onPointerDown(e) {
    this.isDown = true;
    this.moved = false;
    this.dragStart = {x: e.global.x, y: e.global.y};
  }

  onPointerMove(e) {
    if (!this.isDown) return;
    const dx = e.global.x - this.dragStart.x;
    const dy = e.global.y - this.dragStart.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      this.moved = true;
    }
  }

  onPointerUp() {
    if (this.isDown && !this.moved) {
      this.clickHappened();
    }
    this.isDown = false;
  }

  onPointerUpOutside() {
    this.isDown = false;
  }

  clickHappened() {
    this.host.onClick?.();
  }

  reset() {
    this.isDown = false;
    this.moved = false;
    this.dragStart = {x: 0, y: 0};
  }
}
