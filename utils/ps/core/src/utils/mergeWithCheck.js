function mergeWithCheck(type, modules) {
  const result = {};
  for (const mod of modules) {
    for (const key of Object.keys(mod)) {
      if (key in result) throw new Error(`[${type}] Метод объявлен дважды "${key}"`);
      result[key] = mod[key];
    }
  }
  return result;
}

export {mergeWithCheck};
