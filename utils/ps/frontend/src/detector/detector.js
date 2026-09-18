import * as Bowser from "bowser";

function getBrowserData() {
  return global.navigator ? Bowser.getParser(global.navigator.userAgent) : null;
}

function isMac() {
  return !!browserData?.parsedResult.os.name.match(/macOS/);
}

function isMobile() {
  return !!browserData?.parsedResult.platform.type.match(/mobile/);
}

const browserData = getBrowserData();

export {getBrowserData, isMac, isMobile, browserData};
