import {getSearch} from "@/utils/ps/frontend/src/window/search";

function getIsDebug() {
  return process.env.NODE_ENV === "development" && getSearch().debug;
}

export {getIsDebug};
