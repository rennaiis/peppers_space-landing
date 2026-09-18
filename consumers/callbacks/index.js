import {tutorialCallbacks} from "./types/tutorial";
import {modalsCallbacks} from "./types/modals";
import {customCallbacks} from "./types/custom";
import {mergeWithCheck} from "@PS/core";

export const callbacks = mergeWithCheck("callbacks", [modalsCallbacks, tutorialCallbacks, customCallbacks]);
