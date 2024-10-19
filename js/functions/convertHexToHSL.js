/**
 * Converts a hexadecimal color to HSL format.
 *
 * @param {string} hex - The hex color code, can be in #RRGGBB or #RGB format.
 * @returns {string} The HSL equivalent of the input hex color.
 */
export function convertHexToHSL(hex) {
  // Remove the '#' if present
  hex = hex.replace(/^#/, '');

  // If the hex is in short format (#RGB), convert to long format (#RRGGBB)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((h) => h + h)
      .join('');
  }

  // Parse the R, G, B values from the hex string
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  // Find the maximum and minimum values between R, G, B
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calculate lightness
  let h,
    s,
    l = (max + min) / 2;

  // If the color is a shade of gray (no saturation)
  if (max === min) {
    h = s = 0; // Gray color, no hue or saturation
  } else {
    // Calculate hue and saturation based on chroma
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;
  }

  // Return the HSL color in string format
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
}
