import {getIsDebug} from "../versions/getIsDebug";

function getLogger(type) {
  return getIsDebug() ? console[type] : () => {};
}

export {getLogger};
