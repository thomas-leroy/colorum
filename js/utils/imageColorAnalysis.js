/**
 * Extracts the dominant colors from an image using the k-means clustering algorithm.
 *
 * @param {HTMLImageElement} img - The image element to process.
 * @param {number} numColors - The number of dominant colors to extract.
 * @returns {Promise<string[]>} A promise that resolves to an array of colors in hex format.
 */
export async function extractDominantColors(img, numColors = 15) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  const colors = [];
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    colors.push([r, g, b]);
  }

  const dominantColors = kMeans(colors, numColors);
  return dominantColors.map(rgbToHex);
}

/**
 * K-means clustering algorithm to group similar colors.
 *
 * @param {Array} data - An array of RGB colors.
 * @param {number} k - The number of clusters (dominant colors) to find.
 * @returns {Array} The centroids of the clusters, representing dominant colors.
 */
function kMeans(data, k) {
  // Initialize k random centroids
  let centroids = initializeCentroids(data, k); // Remplace const par let

  let clusters = [];
  let lastCentroids = [];

  // Run until convergence (when centroids stop changing)
  while (!arraysEqual(centroids, lastCentroids)) {
    // Assign each color to the nearest centroid
    clusters = assignToClusters(data, centroids);

    // Save the last centroids for comparison
    lastCentroids = centroids.slice(); // Copier les anciens centroids

    // Update centroids to be the average of each cluster
    centroids = updateCentroids(clusters); // Ici on réassigne centroids
  }

  return centroids;
}

/**
 * Initialize centroids by selecting k random colors.
 *
 * @param {Array} data - The array of RGB colors.
 * @param {number} k - The number of centroids to initialize.
 * @returns {Array} The initialized centroids.
 */
function initializeCentroids(data, k) {
  const centroids = [];
  const usedIndexes = new Set();

  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * data.length);
    if (!usedIndexes.has(randomIndex)) {
      centroids.push(data[randomIndex]);
      usedIndexes.add(randomIndex);
    }
  }

  return centroids;
}

/**
 * Assign each color to the nearest centroid.
 *
 * @param {Array} data - The array of RGB colors.
 * @param {Array} centroids - The current centroids.
 * @returns {Array} The clusters of colors, one cluster per centroid.
 */
function assignToClusters(data, centroids) {
  const clusters = Array.from({ length: centroids.length }, () => []);
  data.forEach((color) => {
    const closestIndex = getClosestCentroid(color, centroids);
    clusters[closestIndex].push(color);
  });

  return clusters;
}

/**
 * Get the index of the closest centroid to a given color.
 *
 * @param {Array} color - The RGB color to compare.
 * @param {Array} centroids - The current centroids.
 * @returns {number} The index of the closest centroid.
 */
function getClosestCentroid(color, centroids) {
  let minDistance = Infinity;
  let closestIndex = 0;

  centroids.forEach((centroid, index) => {
    const distance = euclideanDistance(color, centroid);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

/**
 * Update the centroids to be the average color of their respective clusters.
 *
 * @param {Array} clusters - The clusters of colors.
 * @returns {Array} The updated centroids.
 */
function updateCentroids(clusters) {
  return clusters.map((cluster) => {
    if (cluster.length === 0) return [0, 0, 0];
    const sum = cluster.reduce(
      (acc, color) => {
        return [acc[0] + color[0], acc[1] + color[1], acc[2] + color[2]];
      },
      [0, 0, 0]
    );
    return [
      sum[0] / cluster.length,
      sum[1] / cluster.length,
      sum[2] / cluster.length,
    ].map(Math.round);
  });
}

/**
 * Calculate the Euclidean distance between two RGB colors.
 *
 * @param {Array} color1 - The first RGB color.
 * @param {Array} color2 - The second RGB color.
 * @returns {number} The Euclidean distance between the two colors.
 */
function euclideanDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
  );
}

/**
 * Check if two arrays are equal.
 *
 * @param {Array} arr1 - The first array.
 * @param {Array} arr2 - The second array.
 * @returns {boolean} True if the arrays are equal, false otherwise.
 */
function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

/**
 * Convert an RGB color to a hexadecimal string.
 *
 * @param {Array} rgb - The RGB color array.
 * @returns {string} The hex representation of the color.
 */
function rgbToHex([r, g, b]) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}
