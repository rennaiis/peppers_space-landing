import {isArray, isString} from "lodash";

function combineModifiers(prefix, modifier) {
  const modifiers = isArray(modifier) ? modifier : [modifier];
  return modifiers.reduce((acc, modifier) => {
    if (isString(modifier) && !!modifier) acc.push(`${prefix}_${modifier}`);
    return acc;
  }, []);
}

export {combineModifiers};
