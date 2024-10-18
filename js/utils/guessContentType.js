import { isValidCsv } from '../functions/isValidCsv.js';
import { isHexColorList } from '../functions/isHexColorList.js';
import { isValidJson } from '../functions/isValidJson.js';
import { isHslColorList } from '../functions/isHslColorList.js';

export function guessContentType(inputString) {
  // Check if it's a valid JSON
  if (isValidJson(inputString)) {
    return 'json';
  }

  // Check if it's a valid CSV
  if (isValidCsv(inputString)) {
    return 'csv';
  }

  // Check if it's a list of hex colors
  if (isHexColorList(inputString)) {
    return 'hexColors';
  }

  // Check if it's a list of HSL colors
  if (isHslColorList(inputString)) {
    return 'hslColors';
  }

  // Return null if no type matches
  return null;
}
