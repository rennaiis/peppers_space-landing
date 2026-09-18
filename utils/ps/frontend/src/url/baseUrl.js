/**
 * @param {string} url
 * @param {string} base
 * @returns {string}
 */
function baseUrl(url, base = process.env.assetPrefix ?? "") {
  if (URL.canParse(url)) return url;
  if (base.endsWith("/") && url.startsWith("/")) {
    base = base.substring(0, base.length - 1);
  }
  return `${base}${url}`;
}

function image(url) {
  return baseUrl(`/images/${url}`);
}

function cdn(url) {
  return baseUrl(url, process.env.cdn ?? "");
}

function sounds(url) {
  return baseUrl(`/sounds/${url}`);
}

export {baseUrl, image, cdn, sounds};
