/**
 * Helper function to check if a string is a valid CSV format.
 *
 * @param {string} inputString - The string to be validated as a CSV.
 * @returns {boolean} Returns `true` if the input string is a valid CSV, otherwise `false`.
 */
export function isValidCsv(inputString) {
  const lines = inputString.trim().split('\n');
  const isCsv = lines.every((line) => line.split(',').length > 1);
  return isCsv && lines.length > 1;
}
