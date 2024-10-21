/**
 * Helper function to check if a string contains a valid list of HSL color codes.
 *
 * @param {string} inputString - The input string that may contain a list of HSL color codes.
 * @returns {boolean} Returns `true` if all values in the input string are valid HSL colors, otherwise `false`.
 */
export function isHslColorList(inputString) {
  const hslPattern = /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/i;

  // Split the input string by spaces or commas
  const colors = inputString.trim().split(/[\s,]+/);

  // Check if every color in the list matches the HSL color pattern
  return colors.every((color) => hslPattern.test(color));
}
