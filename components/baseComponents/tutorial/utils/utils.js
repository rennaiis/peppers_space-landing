export function getBoundingBox(domElements) {
  return domElements.reduce(
    (acc, domElement) => {
      const {top, left, right, bottom} = domElement.getBoundingClientRect();

      return {
        top: Math.min(top, acc.top),
        left: Math.min(left, acc.left),
        right: Math.max(right, acc.right),
        bottom: Math.max(bottom, acc.bottom),
      };
    },
    {top: Infinity, left: Infinity, right: -Infinity, bottom: -Infinity},
  );
}

export function findFirstBySelectorsUnderClick(e, selectors) {
  const stack = document.elementsFromPoint(e.clientX, e.clientY);

  for (const sel of selectors) {
    const found = stack.map(el => el?.closest?.(sel)).find(Boolean);

    if (found) return found;
  }

  return null;
}
