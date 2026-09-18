class LocalTimeline {
  static statuses = {
    playing: "playing",
    paused: "paused",
  };

  _spaces = {};

  constructor() {
    if (LocalTimeline.instance) return LocalTimeline.instance;
    LocalTimeline.instance = this;

    this.register();
  }

  get spaces() {
    return this._spaces;
  }

  register() {
    const Animation = gsap.core.Animation;

    const self = this;

    Animation.prototype.save = function (namespace, id) {
      self.add(namespace, this);
      ["string", "number"].includes(typeof id) && (this.tweenId = id);
      return this;
    };

    Animation.prototype.delete = function (namespace, toKill = true) {
      self.delete(namespace, this, toKill);
      return this;
    };
  }

  createSpace(namespace) {
    this.spaces[namespace] = {
      arr: [],
      status: LocalTimeline.statuses.playing,
    };
  }

  setStatus(namespace, status) {
    this.spaces[namespace].status = status;
  }

  clear(namespace, toKill = true) {
    const tweens = this.getTweensByNamespace(namespace);

    toKill && tweens.forEach(tween => this.killTween(tween));

    this.spaces[namespace].arr = [];

    this.setStatus(namespace, LocalTimeline.statuses.playing);
  }

  add(namespace, tween) {
    const currentStatus = this.getStatusByNamespace(namespace);

    tween[{playing: "resume", paused: "pause"}[currentStatus]]?.();

    const tweens = this.getTweensByNamespace(namespace);

    tweens.push(tween);
  }

  delete(namespace, tween, toKill) {
    const tweens = this.getTweensByNamespace(namespace);

    toKill && this.killTween(tween);

    this.spaces[namespace].arr = tweens.filter(insideSpaceTween => insideSpaceTween !== tween);
  }

  isExist(namespace, id) {
    const tweens = this.getTweensByNamespace(namespace);

    return tweens.some(tween => tween.tweenId === id);
  }

  discontinue(namespace, id, toKill = true, toComplete = false) {
    const tweens = this.getTweensByNamespace(namespace);

    const necessaryTween = tweens.find(tween => tween.tweenId === id);

    if (!necessaryTween) return;

    toComplete && necessaryTween.progress(1);
    toKill && this.killTween(necessaryTween);

    this.spaces[namespace].arr = tweens.filter(insideSpaceTween => insideSpaceTween !== necessaryTween);
  }

  pause(namespace) {
    const tweens = this.getTweensByNamespace(namespace);

    tweens.forEach(tween => tween.pause());

    this.setStatus(namespace, LocalTimeline.statuses.paused);
  }

  play(namespace) {
    const tweens = this.getTweensByNamespace(namespace);

    tweens.forEach(tween => tween.resume());

    this.setStatus(namespace, LocalTimeline.statuses.playing);
  }

  killTween(tween) {
    if (tween.isKilled) {
      console.warn(tween, "Twin that is killed cannot be killed.");
      return;
    }

    if (tween.paused()) tween.resume();

    tween.kill();
    tween.isKilled = true;
  }

  kill(namespace) {
    const tweens = this.getTweensByNamespace(namespace);
    tweens.forEach(tween => tween.kill());
    this.delete(namespace);
  }

  getTweensByNamespace(namespace) {
    if (!this.spaces[namespace]) this.createSpace(namespace);
    return this.spaces[namespace]?.arr;
  }

  getStatusByNamespace(namespace) {
    return this.spaces[namespace]?.status;
  }
}

export {LocalTimeline};
