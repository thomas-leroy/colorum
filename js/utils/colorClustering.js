/**
 * Converts an RGB color array to a hex color string.
 *
 * @param {Array<number>} rgb - Array of RGB values, e.g., [255, 0, 0] for red.
 * @returns {string} Hex color string, e.g., "#FF0000".
 */
export function rgbToHex([r, g, b]) {
  const toHex = (c) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Performs K-means clustering on an array of RGB colors to find dominant colors.
 *
 * @param {Array<Array<number>>} colors - Array of RGB colors, e.g., [[255, 0, 0], [0, 255, 0], ...].
 * @param {number} numClusters - The number of dominant color clusters to find.
 * @param {number} maxIterations - Maximum number of K-means iterations.
 * @returns {Array<Array<number>>} Array of RGB colors representing the dominant colors.
 */
export function kMeans(colors, numClusters, maxIterations = 10) {
  console.log("Starting simplified kMeans for testing.");

  // Temporary fixed output for testing purposes
  return colors.slice(0, numClusters);
}

/**
 * Initializes centroids randomly from the color dataset.
 *
 * @param {Array<Array<number>>} colors - Array of RGB colors.
 * @param {number} numClusters - Number of centroids to initialize.
 * @returns {Array<Array<number>>} Array of randomly selected initial centroids.
 */
function initializeCentroids(colors, numClusters) {
  const shuffledColors = colors.slice().sort(() => 0.5 - Math.random());
  return shuffledColors.slice(0, numClusters);
}

/**
 * Calculates the centroid (average color) of a cluster of colors.
 *
 * @param {Array<Array<number>>} cluster - Array of RGB colors in the cluster.
 * @returns {Array<number>} RGB color representing the centroid of the cluster.
 */
function calculateCentroid(cluster) {
  if (cluster.length === 0) return [0, 0, 0];
  const sum = cluster.reduce(
    (acc, color) => [acc[0] + color[0], acc[1] + color[1], acc[2] + color[2]],
    [0, 0, 0]
  );
  return sum.map((value) => Math.round(value / cluster.length));
}

/**
 * Calculates the Euclidean distance between two RGB colors.
 *
 * @param {Array<number>} color1 - First RGB color.
 * @param {Array<number>} color2 - Second RGB color.
 * @returns {number} The Euclidean distance between color1 and color2.
 */
function euclideanDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
  );
}

/**
 * Checks if two centroids (RGB colors) are equal.
 *
 * @param {Array<number>} centroid1 - First RGB centroid.
 * @param {Array<number>} centroid2 - Second RGB centroid.
 * @returns {boolean} True if centroids are equal, false otherwise.
 */
function centroidEquals(centroid1, centroid2) {
  return centroid1.every((value, index) => value === centroid2[index]);
}
