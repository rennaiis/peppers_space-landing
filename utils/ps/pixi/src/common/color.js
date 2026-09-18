function hexToPixiColor(hex) {
  return parseInt(hex.replace(/^#/, ""), 16);
}

export {hexToPixiColor};
