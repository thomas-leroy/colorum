import { extractColorsFromString } from '../functions/extractColorsFromString.js';

function runAnalyze(inputValue, callback) {
  if (!inputValue) {
    callback(null);
    return;
  }

  callback(extractColorsFromString(inputValue));

  return;
}

export { runAnalyze };
