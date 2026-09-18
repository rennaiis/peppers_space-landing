import PIXI from "./src/pixi-global";

console.log("PIXI>>", PIXI);

// animate
export {movieClipControls} from "./src/animate/plugins/movieClipControls";
export {registerPlugin} from "./src/animate/plugins/registerPlugin";
export {deepPlay, deepStop} from "./src/animate/deepToggle";
export {setFramerate} from "./src/animate/movieClip";
// export {VisibilityBehavior} from "./src/animate/VisibilityBehavior";

// common
export {hexToPixiColor} from "./src/common/color";
export {traverse} from "./src/common/traverse";

export {CustomTicker} from "./src/ticker/CustomTicker";

// spine
export {
  resetSpine,
  checkForAnimation,
  waitForCycleEnd,
  playLoopAnimation,
  setToLastFrame,
  setToStartFrame,
  playAnimationOnce,
} from "./src/spine/animation";
export {getSlotSize, getSpineSize} from "./src/spine/size";

// unload
export {clearTicker, clearAnimator, pixiControllerUnload, destroyDataInWrapper} from "./src/unload/unload";

// src
export {PixiController} from "./src/PixiController";
export {PixiWrapper} from "./src/PixiWrapper";

// loader
export {PixiManager, pixiManager} from "./src/loader/PixiManager";
export {SceneLoader} from "./src/loader/SceneLoader";
export {TextureLoader as PixiTextureLoader} from "./src/loader/TextureLoader";
export {SpritesheetLoader as PixiSpritesheetLoader} from "./src/loader/SpritesheetLoader";

// render
export {renderContainerToImage} from "./src/render/render";

// utils
export {clonePIXIObject, boundsToContainer} from "./src/utils/utils";

// ecs
export {PixiComponent} from "./src/ecs/components/PixiComponent";
export {PixiRenderSystem} from "./src/ecs/systems/PixiRenderSystem";
export {PixiDebug} from "./src/ecs/components/PixiDebug";
export {PixiSatDebugSystem} from "./src/ecs/systems/PixiSatDebugSystem";
export {add} from "./src/ecs/effects/add";

// factory
export {Base} from "./src/factory/assets/Base";
export {Container} from "./src/factory/assets/Container";
export {Sprite} from "./src/factory/assets/Sprite";
export {TilingSprite} from "./src/factory/assets/TilingSprite";
export {Spritesheet} from "./src/factory/assets/Spritesheet";
