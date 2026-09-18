import {BaseLoader} from "@PS/scene";

/*
 *   {
 *     "subtype": "pixijs",
 *     "type": "scene",
 *     "cached": true,
 *     "name": "some_scene", // имя для получения из AssetsManager
 *     "path": "assets/scenes/", // путь к папке с ресурсами
 *     "spineData": {
 *       "json": "hero.json",
 *       "atlas": "hero.atlas",
 *     }
 *   }
 */

class SceneLoader extends BaseLoader {
  static sysName = "PixiSpineSceneLoader";

  /**
   * Загружает сцену с использованием pixi-spine.
   * @param {Object} settings Настройки загрузки сцены.
   */
  async load(settings) {
    const {path} = settings;
    const key = super.load(path);

    try {
      const spineAnimation = await this.loadSpineData(settings, key);
      this.onLoad(settings, spineAnimation, key);
    } catch (error) {
      this.onError(key, ...arguments);
    }
  }

  /**
   * Загружает данные Spine (JSON, атлас и изображения).
   * @param {Object} settings Настройки загрузки.
   * @returns {Promise<Spine>} Промис с объектом Spine.
   */
  async loadSpineData(settings, key) {
    const {path, spineData, name: sceneName} = settings;
    const {skeletons, atlas} = spineData;

    const basePath = this.manager.resolveURL(path, true);
    const currentPath = new URL(basePath, document.baseURI).href;

    const assetList = [];
    const atlasKey = `${sceneName}_atlas`;

    if (atlas && this.checkShouldLoad(atlasKey)) {
      assetList.push(atlasKey);
      PIXI.Assets.add({alias: atlasKey, src: currentPath + atlas});
    }

    skeletons.forEach(({name, jsonSrc, atlasSrc}) => {
      const jsonKey = `${sceneName}_${name}_skeleton`;

      if (this.checkShouldLoad(jsonKey)) {
        assetList.push(jsonKey);
        PIXI.Assets.add({alias: jsonKey, src: currentPath + jsonSrc});
      }

      const atlasKey = `${sceneName}_${name}_${name}`;
      if (atlasSrc && this.checkShouldLoad(atlasKey)) {
        assetList.push(atlasKey);
        PIXI.Assets.add({alias: atlasKey, src: currentPath + atlasSrc});
      }
    });

    const resources = await PIXI.Assets.load(assetList);

    const atlasResult = PIXI.Assets.get(atlasKey);

    if (!this.isValidAtlas(atlasResult)) {
      //при фейле записивыется в PIXI.Assets пустой TextureAtlas удалим его
      PIXI.Assets.unload(atlasKey);
      console.error(`Failed to load atlas ${atlasKey}`);
      throw Error(`Invalid atlas ${atlasKey}`);
    }

    const animations = {};

    skeletons.forEach(({name, atlasSrc}) => {
      animations[name] = () =>
        SPINE.Spine.from({
          skeleton: `${sceneName}_${name}_skeleton`,
          atlas: atlasSrc ? `${sceneName}_${name}_atlas` : `${sceneName}_atlas`,
        });
    });

    return {
      animations,
      resources,
      settings,
    };
  }

  checkShouldLoad(key) {
    return !PIXI.Assets.get(key);
  }

  isValidAtlas(loadedAtlas) {
    //при фейле записивыется в PIXI.Assets пустой TextureAtlas
    return loadedAtlas && loadedAtlas.regions.length > 0;
  }
}

export {SceneLoader};
