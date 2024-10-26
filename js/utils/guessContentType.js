import { isHexColorList } from "../functions/isHexColorList.js";
import { isHslColorList } from "../functions/isHslColorList.js";
import { isValidCsv } from "../functions/isValidCsv.js";
import { isValidFigmaUrl } from "../functions/isValidFigmaUrl.js";
import { isValidJson } from "../functions/isValidJson.js";

/**
 * Determines the content type of a given input string.
 *
 * @param {string} inputString - The input string to analyze.
 * @returns {string} The determined content type (e.g., 'figma', 'json', 'csv', 'hexColors', 'hslColors', 'unknown').
 */
export function guessContentType(inputString) {
  if (inputString.length === 0) {
    return;
  }

  if (isValidFigmaUrl(inputString)) {
    return "figma";
  }

  if (isValidJson(inputString)) {
    return "json";
  }

  if (isValidCsv(inputString)) {
    return "csv";
  }

  if (isHexColorList(inputString)) {
    return "hexColors";
  }

  if (isHslColorList(inputString)) {
    return "hslColors";
  }

  return "unknown";
}
