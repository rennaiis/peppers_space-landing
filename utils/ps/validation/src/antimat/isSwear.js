import {containsMat} from "./antimat";
import {Filter} from "bad-words";
const f = new Filter();
export function isSwear(txt) {
  return f.isProfane(txt) || containsMat(txt);
}
