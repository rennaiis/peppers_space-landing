/**
 * Использование
 *
 * export default class Vitamin extends PIXI.Container {
 *   constructor() {
 *     this.visibility = new Visibility(this, gameTimelineSpaceId);
 *     this.visibility.mode = Visibility.MODES.show; //показан
 *   }
 * }
 *
 *  get view() {
 *    return this;
 *  }
 *
 */

export class Visibility {
  static MODES = {
    show: "show",
    hide: "hide",
  };

  constructor(host, timelineSpaceId) {
    this._timelineSpaceId = timelineSpaceId;
    this.host = host;
    this._mode = null;
    this._tween = null;
  }

  set mode(mode) {
    if (this._mode === mode) return;
    this._mode = mode;

    const {view, _factoryUUID} = this.host;
    if (!view) return;

    this.stop();

    const actions = {
      [Visibility.MODES.show]: () => this.animate(1, `visShow:${_factoryUUID}`),
      [Visibility.MODES.hide]: () => this.animate(0, `visHide:${_factoryUUID}`),
    };

    actions[mode]?.();
  }

  animate(alpha, key) {
    return new Promise(res => {
      this._tween = gsap
        .to(this.host.view, {
          alpha,
          ease: "sine.inOut",
          duration: 0.1,
          onComplete: () => {
            this._tween?.delete(this._timelineSpaceId);
            this._tween = null;
            res();
          },
        })
        .save(this._timelineSpaceId, key);
    });
  }

  stop() {
    if (this._tween) {
      this._tween.kill();
      this._tween = null;
    }
  }

  reset({alpha = 1, mode = Visibility.MODES.show} = {}) {
    // убиваем всё живое
    this.stop();

    // сбрасываем состояние
    this._mode = mode;

    if (this.host?.view) {
      this.host.view.alpha = alpha;
    }
  }
}
