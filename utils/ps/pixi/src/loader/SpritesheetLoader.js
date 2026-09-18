import {BaseLoader} from "@/utils/ps/scene/src/loader/plugins/BaseLoader";

/**
 * Пример:
 * {
 *   "subtype": "pixijs",
 *   "type": "spritesheet",
 *   "name": "confetti",          // ключ в библиотеке AssetsManager
 *   "path": "assets/textures/",  // путь к папке
 *   "fileName": "confetti.json"  // JSON атласа (Pixi формат)
 * }
 */

class SpritesheetLoader extends BaseLoader {
  static sysName = "PixiSpritesheetLoader";

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

      const [spritesheet] = Object.values(result);
      await spritesheet.parse();

      this.onLoad(settings, spritesheet, key);
    } catch (error) {
      // Обрабатываем ошибку загрузки
      this.onError(key, ...arguments);
    }
  }
}

export {SpritesheetLoader};
