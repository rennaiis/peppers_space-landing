// api
export {addHeaders, get, post, put, send} from "./src/api/api";
export {ApiError} from "./src/api/ApiError";

//data
export {copy} from "./src/data/copy";
export {by, groupBy} from "./src/data/array";
// export {convert} from "./src/data/markdown";

// detector
export {getBrowserData, isMac, isMobile, browserData} from "./src/detector/detector";

// dom
export {getEventPosition} from "./src/dom/getEventPosition";
export {getOffset} from "./src/dom/getOffset";

// form
export {objToFormData} from "./src/form/helpers";

// hooks
export {useLoadNote} from "./src/hooks/load/useLoadNote";
export {useErudaHack, useErudaParam} from "./src/hooks/eruda/useErudaHack";
export {useTimeout} from "./src/hooks/timeout/useTimeout";

// promise
export {promiseWithResolvers} from "./src/promise/promiseWithResolvers";

// react
export {applyRef, combineRefs, clearRefTimeout} from "./src/react/applyRef";
export {safeHTML} from "./src/react/safeHTML";
export {
  imageLoader,
  videoLoader,
  audioLoader,
  fileLoaderPreload,
  useFileLoader,
  useFileLoaderMap,
  getLoadedFile,
} from "./src/react/loaders";

// sharing
export {getShareLinks, initLink, extendLink} from "./src/sharing/sharing";

// string
export {capitalize, pluralize, interpolateString, timeToString, msToTime, msToHHMMSS, time} from "./src/string/string";

// style
export {parseComplexStyleProperty, joinComplexStyleProperty} from "./src/style/parseComplexStyleProperty";

// url
export {baseUrl, image, cdn, sounds} from "./src/url/baseUrl";
export {setUrlParam, findGetParameter} from "./src/url/findGetParameter";

// window
export {URL} from "./src/window/url";
export {isAdded} from "./src/window/isAdded";
export {getSearch} from "./src/window/search";
export {onBrowserVisibleChange} from "./src/window/visibility";
export {visibilityParameters} from "./src/window/visibilityParameters";
export {popupPromise, popup} from "./src/window/window";

// mod
export {combineModifiers} from "./src/modifiers/combineModifiers";

//timer
export {Timer} from "./src/timer/TimerWrapper";
export {wait} from "./src/timer/wait";
