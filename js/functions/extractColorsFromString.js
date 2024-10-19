import { convertHexToHSL } from '../functions/convertHexToHSL.js';

/**
 * Extracts all hex and HSL colors from a given string, and converts them to normalized HSL.
 *
 * @param {string} str - The input string containing potential color codes.
 * @returns {Object} An object mapping the found colors (hex or HSL) to their normalized HSL equivalent.
 */
export function extractColorsFromString(str) {
  const colors = {};

  // Regular expressions to match hex and HSL colors
  const hexRegex = /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g;
  const hslRegex = /hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/g;

  let match;

  // Extract hex colors and convert them to HSL
  while ((match = hexRegex.exec(str)) !== null) {
    const hexValue = match[0];
    colors[hexValue] = convertHexToHSL(hexValue);
  }

  // Extract HSL colors and normalize them
  while ((match = hslRegex.exec(str)) !== null) {
    const hslValue = match[0];
    colors[hslValue] = hslValue;
  }

  return colors;
}
