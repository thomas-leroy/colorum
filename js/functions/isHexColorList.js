// Helper function to check if a string is a list of hex colors
export function isHexColorList(inputString) {
  const hexColorPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
  const colors = inputString.split(/[\s,]+/);
  return colors.every((color) => hexColorPattern.test(color));
}
