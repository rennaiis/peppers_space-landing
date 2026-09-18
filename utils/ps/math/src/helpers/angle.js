function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function normalizeDegrees(value) {
  value = value % 360;

  if (value < 0) value += 360;

  return value;
}

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

export {toRad, degreesToRadians, normalizeDegrees};
