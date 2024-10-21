/**
 * Helper function to check if a string is valid JSON.
 *
 * @param {string} inputString - The string to be validated as JSON.
 * @returns {boolean} Returns `true` if the input string is valid JSON, otherwise `false`.
 */
export function isValidJson(inputString) {
  try {
    JSON.parse(inputString);
    return true;
  } catch {
    return false;
  }
}
