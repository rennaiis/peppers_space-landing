import {BaseLoader} from "../BaseLoader";

/**
 * {
 *   subtype: "base",
 *   type: "png",
 *   name: "someName",
 *   path: "assets/tree/png/",
 *   fileName: "block_tree_head.png",
 * }
 */
class PNGLoader extends BaseLoader {
  load(settings) {
    const {path, fileName} = settings;
    const url = this.manager.resolveURL(`${path}${fileName}`);
    const key = super.load(url);

    this.loadPng(url).then(
      image => this.onLoad(settings, image, key),
      error => this.onError(key, error),
    );
  }

  loadPng(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }
}

export {PNGLoader};
