/**
 * @param hexColor "#030012"
 * @returns {number} 0x030012
 */
function hexToHexadec(hexColor) {
  const hexWithoutHash = hexColor.replace("#", "");
  const colorWith0x = "0x" + hexWithoutHash;
  return Number(colorWith0x);
}

export {hexToHexadec};
