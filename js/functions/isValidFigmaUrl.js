export function isValidFigmaUrl(inputString) {
  const figmaUrlPattern = /^https:\/\/www\.figma\.com\/[\w]+\/[a-zA-Z0-9]+\/.+/;

  console.log(figmaUrlPattern.test(inputString));

  return figmaUrlPattern.test(inputString);
}
