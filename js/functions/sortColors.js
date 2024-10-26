/**
 * Sort colors based on the selected method: hue cycle, dark-to-light, or saturation emphasis.
 *
 * @param {Object} colors - Object with hex codes as keys and HSL strings as values.
 * @param {string} method - Sorting method: "hueCycle", "darkToLight", or "saturationEmphasis".
 * @returns {Object} - Sorted colors.
 */
export function sortColors(colors, method = 'darkToLight') {
  const parseHSL = (hslString) => {
    const [hue, saturation, lightness] = hslString
      .match(/\d+%?/g)
      .map((value, index) =>
        value.endsWith('%') ? parseInt(value, 10) / 100 : parseInt(value, 10)
      );
    return { hue, saturation, lightness };
  };

  const sortedEntries = Object.entries(colors).sort(([, hslA], [, hslB]) => {
    const { hue: hueA, saturation: satA, lightness: lightA } = parseHSL(hslA);
    const { hue: hueB, saturation: satB, lightness: lightB } = parseHSL(hslB);

    switch (method) {
      case 'hueCycle':
        return hueA - hueB || satA - satB || lightA - lightB;

      case 'darkToLight':
        return lightA - lightB || hueA - hueB || satA - satB;

      case 'saturationEmphasis':
        return satB - satA || hueA - hueB || lightA - lightB;

      default:
        throw new Error('Invalid sorting method specified.');
    }
  });

  return Object.fromEntries(sortedEntries);
}
