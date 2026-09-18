import exampleFirst from "./exampleFirst";
import exampleSecond from "./exampleSecond";
import isEnable from "./../isEnable";
import {GROUPS} from "@/constants/tutorial/config";
import {TutorialNode} from "@PS/core";

export default {
  cls: TutorialNode,
  name: GROUPS.example,
  data: {isEnable},
  children: [exampleFirst, exampleSecond],
};
