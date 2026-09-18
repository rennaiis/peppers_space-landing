import {CustomTickerListener} from "@PS/pixi/src/ticker/CustomTickerListener";

class CustomTicker extends PIXI.Ticker {
  add(fn, context, priority) {
    return this._addListener(new CustomTickerListener(fn, context, priority));
  }

  addOnce(fn, context, priority) {
    return this._addListener(new CustomTickerListener(fn, context, priority, true));
  }
}

export {CustomTicker};
