export class TimerPlugin {
  constructor(shouldCountFn) {
    /**
     * [example] ()=>controller.state === "playing"
     */
    this.shouldCountFn = shouldCountFn;
    this.elapsed = 0;
    this.lastTick = null;
    this.running = false;
    this.rafId = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTick = performance.now();
    this.loop();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.lastTick = null;
  }

  stopAndReset() {
    this.stop();
    this.reset();
  }

  reset() {
    this.elapsed = 0;
    this.lastTick = performance.now();
  }

  loop = () => {
    if (!this.running) return;

    const now = performance.now();
    if (this.shouldCountFn()) {
      this.elapsed += now - this.lastTick;
    }
    this.lastTick = now;

    this.rafId = requestAnimationFrame(this.loop);
  };

  getTimeSeconds() {
    return Math.floor(this.elapsed / 1000);
  }

  getTimeFormatted() {
    const totalSec = this.getTimeSeconds();
    const hours = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSec % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
}
