// Helper function to check if a string is a list of HSL colors
export function isHslColorList(inputString) {
  const hslPattern = /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/i;
  const colors = inputString.split(/[\s,]+/);
  return colors.every((color) => hslPattern.test(color));
}
