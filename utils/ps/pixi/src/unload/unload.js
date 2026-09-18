import {getSearch} from "@/utils/ps/frontend/src/window/search";

const localDebug = false;
const isWarn = true;
const isLog = getSearch("debug") || localDebug;
const unloadCallbacks = ["kill", "unload", "destroy", "clear"];

/**
 * Выполняет функцию выгрузки данных
 * @param dataWrapper [pixiSceneController/factory.storage, etc]
 */
function destroyDataInWrapper({dataWrapper}) {
  if (!dataWrapper) return console.log("destroy: dataWrapper not found");

  for (let prop in dataWrapper) {
    const item = dataWrapper[prop];
    recursiveTryUnload(item, prop, dataWrapper);
  }
}

function recursiveTryUnload(item, prop, parentObject) {
  const isDestroyed = callUnloadAndDestroy(item);

  if (!item || item === window) return;

  if (
    /* isDestroyed
    ||*/ typeof item === "function" ||
    typeof item === "number" ||
    typeof item === "boolean" ||
    typeof item === "string" ||
    item instanceof HTMLElement ||
    isGsapTimeline(item)
  ) {
    delete parentObject[prop];
    return;
  }

  delete parentObject[prop];
  global.gsap && gsap.killTweensOf(item);

  if (typeof item !== "object") return warn("recursiveTryUnload: not processed", typeof item, item);

  for (let key in item) recursiveTryUnload(item[key], key, item);
}

function callUnloadAndDestroy(item) {
  let isDestroyed = false;
  unloadCallbacks.forEach(callbackName => {
    if (typeof item?.[callbackName] === "function") {
      logger(`call ${callbackName}`, item);
      try {
        item[callbackName]();
        isDestroyed = true;
      } catch (e) {
        warn(`recursiveTryUnload:${callbackName}, error in item: `, item, e);
      }
    }
  });
  return isDestroyed;
}

function pixiControllerUnload(pixiController) {
  if (!global.PIXI) return console.log("PIXI is not defined");
  if (!pixiController) return console.log("pixiController is not defined");

  pixiController.ticker.stop();
  clearTicker(PIXI.Ticker.shared);
  PIXI.utils.clearTextureCache();

  clearAnimator();
}

/**
 * example in PixiWrapper:
 onUnload() {
 pixiControllerUnload(this.controller);
 destroyDataInWrapper({dataWrapper: this});
 destroyDataInWrapper({dataWrapper: spritesFactory.storage});
 destroyDataInWrapper({dataWrapper: itemsFactory.storage});
 destroyDataInWrapper({dataWrapper: FPSMeter.listeners});
 PixiWrapper._instance = null;
 }
 **/

function clearAnimator() {
  if (!PIXI.animate?.Animator) return;
  const {
    animate: {Animator, AnimatorTimeline},
  } = PIXI;
  Animator._timelines.length = 0;
  AnimatorTimeline._pool.length = 0;
  globalThis.__PIXI_APP__ = null;
}

function clearTicker(ticker) {
  let listener = ticker._head.next;
  while (listener) {
    listener = listener.destroy(true);
  }
}

function logger() {
  if (!isLog) return;
  console.log(...arguments);
}

function warn() {
  if (!isWarn) return;
  console.warn(...arguments);
}

function isGsapTimeline(item) {
  return typeof item.fromTo === "function" && typeof item.vars === "object";
}

export {clearTicker, clearAnimator, pixiControllerUnload, destroyDataInWrapper};
