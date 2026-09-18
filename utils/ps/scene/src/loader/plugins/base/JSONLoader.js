import {BaseLoader} from "../BaseLoader";

/**
 * {
 *       subtype: "base",
 *       type: "json",
 *       name: "someName", - name for getting from AssetsManager
 *       url: "/data/data.json"
 * }
 */
class JSONLoader extends BaseLoader {
  load(settings) {
    const url = this.manager.resolveURL(settings.url);
    const key = super.load(url);

    return loadJSON(url).then(
      data => this.onLoad(settings, data, key),
      error => this.onError(key, ...arguments),
    );
  }
}

export {JSONLoader};

function loadJSON(path) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE)
        if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
        else reject(xhr);
    };
    xhr.open("GET", path, true);
    xhr.send();
  });
}
