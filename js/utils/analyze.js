import { colorNameList } from "color-name-list";
import nearestColor from "nearest-color";
import { extractColorsFromString } from "../functions/extractColorsFromString.js";
import { sortColors } from "../functions/sortColors.js";

// Create a dictionary of colors based on the color-name-list
const colorsDB = colorNameList.reduce((acc, { name, hex }) => {
  acc[name] = hex;
  return acc;
}, {});

// Create a function to find the nearest color name
const findNearestColor = nearestColor.from(colorsDB);

/**
 * Runs color analysis on the provided input, sorts colors, and adds a name to each color.
 * Executes the callback with the enriched color data.
 *
 * @param {string} inputValue - The string from which colors will be extracted.
 * @param {function} callback - A callback function that will be called with the enriched color data.
 *                              If inputValue is empty, the callback is invoked with `null`.
 * @returns {void} - Returns nothing.
 */
function runAnalyze(inputValue, callback) {
  // Return null if inputValue is empty
  if (!inputValue) {
    callback(null);
    return;
  }

  // Extract colors from the string
  const colors = extractColorsFromString(inputValue);

  // Sort colors by HSL values
  const sortedColors = sortColors(colors);

  // Enrich each color with a name
  const enrichedColors = Object.entries(sortedColors).map(([hex, hsl]) => {
    const closestColor = findNearestColor(hex); // Get the closest color name
    return {
      hex,
      hsl,
      name: closestColor ? closestColor.name : "Unknown", // Add color name or 'Unknown' if not found
    };
  });

  console.log("Enriched Colors:", enrichedColors); // Log enriched colors

  // Pass the enriched colors to the callback
  callback(enrichedColors);
}

export { runAnalyze };
