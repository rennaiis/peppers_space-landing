import PHASER from "phaser";

global.PHASER = PHASER;
console.log("PHASER>>", PHASER);

// src
export {PhaserController} from "./src/PhaserController";
export {PhaserWrapper} from "./src/PhaserWrapper";

// loader
export {PhaserManager, phaserManager} from "./src/loader/PhaserManager";
export {AtlasLoader} from "./src/loader/AtlasLoader";
export {SpritesheetLoader as PhaserSpritesheetLoader} from "./src/loader/SpritesheetLoader";
export {TextureLoader as PhaserTextureLoader} from "./src/loader/TextureLoader";
