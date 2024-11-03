import { kMeans, rgbToHex } from "../utils/colorClustering.js";

/**
 * Web Worker to process color clustering on pixel data without using canvas.
 * Listens for incoming pixel data and clusters the dominant colors.
 *
 * @param {MessageEvent} event - The event containing pixel data and color count.
 * @property {Array<number>} event.data.pixels - The flat array of pixel data (RGBA values).
 * @property {number} event.data.numColors - The number of dominant colors to extract.
 */
self.onmessage = function (event) {
  console.log("Worker received pixel data for clustering.");
  const { pixels, numColors } = event.data;

  // Group pixel data into RGB tuples
  const colors = [];
  for (let i = 0; i < pixels.length; i += 500) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    colors.push([r, g, b]);
  }

  try {
    // Apply k-means clustering to find dominant colors
    const dominantColors = kMeans(colors, numColors);

    // Convert RGB colors to hex
    const hexColors = dominantColors.map(rgbToHex);
    self.postMessage(hexColors);
  } catch (error) {
    console.error("Error during color clustering in Worker:", error);
    self.postMessage([]); // Return an empty array on error
  }
};
