import { isValidCsv } from '../functions/isValidCsv.js';
import { isHexColorList } from '../functions/isHexColorList.js';
import { isValidJson } from '../functions/isValidJson.js';
import { isHslColorList } from '../functions/isHslColorList.js';
import { isValidFigmaUrl } from '../functions/isValidFigmaUrl.js';

export function guessContentType(inputString) {
  if (inputString.length === 0) {
    return;
  }

  if (isValidFigmaUrl(inputString)) {
    return 'figma';
  }

  if (isValidJson(inputString)) {
    return 'json';
  }

  if (isValidCsv(inputString)) {
    return 'csv';
  }

  if (isHexColorList(inputString)) {
    return 'hexColors';
  }

  if (isHslColorList(inputString)) {
    return 'hslColors';
  }

  return 'unknown';
}
