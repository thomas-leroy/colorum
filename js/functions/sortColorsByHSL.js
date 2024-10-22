/**
 * Sorts an object of colors based on their HSL values (hue first, then saturation, then lightness),
 * and returns the sorted colors as an object.
 *
 * @param {Object} colors - The object containing color mappings where keys are hex color codes and values are HSL strings.
 * @returns {Object} - A sorted object with hex color codes as keys and HSL strings as values.
 */
export function sortColorsByHSL(colors) {
  // Parse the HSL string to extract hue, saturation, and lightness as numbers
  const parseHSL = (hslString) => {
    const [hue, saturation, lightness] = hslString
      .match(/\d+/g) // Extract numbers from the string
      .map(Number); // Convert them to integers

    return { hue, saturation, lightness };
  };

  // Sort colors based on their HSL values (hue first, then saturation, then lightness)
  const sortedEntries = Object.entries(colors).sort(([, hslA], [, hslB]) => {
    const {
      hue: hueA,
      saturation: saturationA,
      lightness: lightnessA,
    } = parseHSL(hslA);
    const {
      hue: hueB,
      saturation: saturationB,
      lightness: lightnessB,
    } = parseHSL(hslB);

    // Compare by hue first
    if (hueA !== hueB) return hueA - hueB;
    // If hue is the same, compare by saturation
    if (saturationA !== saturationB) return saturationA - saturationB;
    // If hue and saturation are the same, compare by lightness
    return lightnessA - lightnessB;
  });

  // Convert the sorted array back into an object
  return Object.fromEntries(sortedEntries);
}
