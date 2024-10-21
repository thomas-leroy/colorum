/**
 * Checks if a given string is a valid Figma URL.
 *
 * @param {string} inputString - The string to be validated as a Figma URL.
 * @returns {boolean} Returns `true` if the input string is a valid Figma URL, otherwise `false`.
 */
export function isValidFigmaUrl(inputString) {
  const figmaUrlPattern =
    /^https:\/\/www\.figma\.com\/(file|proto)\/[a-zA-Z0-9]+\/[^\s]+$/;

  return figmaUrlPattern.test(inputString);
}
