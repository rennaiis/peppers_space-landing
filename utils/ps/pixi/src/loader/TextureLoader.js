import {BaseLoader} from "@/utils/ps/scene/src/loader/plugins/BaseLoader";

/**
 *   {
 *     "subtype": "pixijs",
 *     "type": "texture",
 *     "name": "texture", // Имя для получения из AssetsManager
 *     "path": "assets/textures/", // Путь к папке с ассетами
 *     "fileName": "texture.png" // Имя файла ассета
 *   }
 */
class TextureLoader extends BaseLoader {
  static sysName = "PixiTextureLoader";

  async load(settings) {
    const {path, fileName, name} = settings;
    const url = this.manager.resolveURL(`${path}${fileName}`);
    const key = super.load(url);

    try {
      // Загружаем текстуру с помощью PIXI.Assets
      const result = await PIXI.Assets.load([
        {
          name,
          src: PIXI.path.toAbsolute(url, document.URL.substr(0, document.URL.lastIndexOf("/"))),
        },
      ]);
      const [texture] = Object.values(result);

      // Передаём загруженную текстуру в обработчик успешной загрузки
      this.onLoad(settings, texture, key);
    } catch (error) {
      // Обрабатываем ошибку загрузки
      this.onError(key, ...arguments);
    }
  }
}

export {TextureLoader};
