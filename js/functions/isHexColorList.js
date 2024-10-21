/**
 * Helper function to check if a string contains a valid list of hexadecimal color codes.
 *
 * @param {string} inputString - The input string that may contain a list of hex color codes.
 * @returns {boolean} Returns `true` if all values in the input string are valid hex colors, otherwise `false`.
 */
export function isHexColorList(inputString) {
  const hexColorPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

  // Split the input string by spaces or commas
  const colors = inputString.trim().split(/[\s,]+/);

  // Check if every color in the list matches the hex color pattern
  return colors.every((color) => hexColorPattern.test(color));
}
