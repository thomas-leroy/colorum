/**
 * Converts a hexadecimal color to HSL (Hue, Saturation, Lightness) format.
 *
 * @param {string} hex - The hex color code, which can be in #RRGGBB or #RGB format.
 * @returns {string} The HSL equivalent of the input hex color.
 */
export function convertHexToHSL(hex) {
  // Remove the '#' if present
  hex = hex.replace(/^#/, '');

  // Convert short hex format (#RGB) to long format (#RRGGBB)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((h) => h + h)
      .join('');
  }

  // Parse the R, G, B values from the hex string and normalize them (0-1 range)
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  // Find the maximum and minimum values between R, G, B
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Initialize hue, saturation, and lightness
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  // If the color is not a shade of gray (it has saturation)
  if (max !== min) {
    const delta = max - min;

    // Calculate saturation
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // Calculate hue based on which color component is dominant
    if (max === r) {
      h = (g - b) / delta + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else if (max === b) {
      h = (r - g) / delta + 4;
    }

    h *= 60; // Convert to degrees
  }

  // Return the HSL color in string format, rounding values for better readability
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
}
