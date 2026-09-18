// general
import * as core from "./core";
import * as redux from "./redux";
import * as frontend from "./frontend";

// other
import * as scene from "./scene";
import * as ecs from "./ecs";
import * as math from "./math";
import * as interactive from "./interactive";
import * as performance from "./performance";

import {load} from "./extensions";

const PS = {
  core,
  redux,
  frontend,
  scene,
  ecs,
  math,
  interactive,
  performance,
  load,
};

global.PS = PS;

export default PS;
