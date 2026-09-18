import {movieClipControls} from "./movieClipControls";

const plugins = {
  movieClipControls,
};

function registerPlugin(plugin, data) {
  if (plugins[plugin]) plugins[plugin](data);
  else throw new Error(`${plugin} is not defined`);
}

export {registerPlugin};
