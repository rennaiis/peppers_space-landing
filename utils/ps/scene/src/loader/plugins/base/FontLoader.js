import {BaseLoader} from "../BaseLoader";

/**
 * Font loader config example:
 * {
 *    subtype: "base",
 *    type: "font",
 *    name: "ContentFont",
 *    url: "/fonts/ds-dots-medium.ttf"
 * }
 */
class FontLoader extends BaseLoader {
  load(settings) {
    const url = this.manager.resolveURL(settings.url, true);
    const key = super.load(url);

    return this.loadFont(url, settings.name)
      .then(font => this.onLoad(settings, font, key))
      .catch(error => this.onError(key, ...arguments));
  }

  loadFont(url, fontName) {
    return new Promise((resolve, reject) => {
      const font = new FontFace(fontName, `url(${url})`);
      document.fonts.add(font);
      font.load().then(resolve).catch(reject);
    });
  }
}

export {FontLoader};
