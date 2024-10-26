import { extractColorsFromString } from "../functions/extractColorsFromString.js";

/**
 * Runs the color analysis on the provided input value and executes the callback with the result.
 *
 * @param {string} inputValue - The string from which colors will be extracted.
 * @param {function} callback - A callback function that will be called with the result of the color extraction.
 *                              If inputValue is empty, the callback is invoked with `null`.
 * @returns {void} - Returns nothing.
 */
function runAnalyze(inputValue, callback) {
  // Check if inputValue is falsy and invoke the callback with null if so
  if (!inputValue) {
    callback(null);
    return;
  }

  console.log("inputValue", inputValue);

  // Extract colors from the string and pass the result to the callback
  const colors = extractColorsFromString(inputValue);
  callback(colors);

  return;
}

export { runAnalyze };
