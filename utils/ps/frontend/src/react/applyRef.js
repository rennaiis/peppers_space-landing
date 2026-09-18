function applyRef(ref, node) {
  if (!ref) return;

  if (typeof ref === "function") {
    ref(node);
  } else if (typeof ref === "object") {
    ref.current = node;
  }
}

function combineRefs(refs) {
  return node => refs.forEach(ref => applyRef(ref, node));
}

function clearRefTimeout(ref) {
  if (ref?.current === "number") {
    clearTimeout(ref.current);
    ref.current = null;
    return;
  }

  if (ref?.current === "object") {
    if (Array.isArray(ref.current))
      ref?.current?.forEach((value, index) => {
        if (typeof value === "number") {
          clearTimeout(ref.current);
          ref.current[index] = null;
        }
      });
    else
      for (const key in ref?.current) {
        const value = ref?.current?.[key];
        if (typeof value === "number") {
          clearTimeout(ref.current);
          ref.current[key] = null;
        }
      }
  }
}

export {applyRef, combineRefs, clearRefTimeout};
