import isEnable from "./isEnable";
import {TutorialNode} from "@PS/core";
import {getStageKey, STAGES} from "@/constants/tutorial/config";

export default {
  cls: TutorialNode,
  name: getStageKey(STAGES.exampleFirst),
  data: {settings: STAGES.exampleFirst, isEnable},
};
