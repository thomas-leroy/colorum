/**
 * Displays an image preview inside the specified container.
 *
 * @param {string} imageUrl - The URL of the image to be displayed in the preview.
 * @param {string} [containerId='imagePreview'] - The ID of the container where the image will be displayed. Defaults to 'imagePreview'.
 * @returns {void} - Returns nothing.
 */
export function displayImagePreview(imageUrl, containerId = "imagePreview") {
  // Get the container element where the image will be displayed
  const previewContainer = document.getElementById(containerId);

  // Check if the container exists
  if (!previewContainer) {
    return;
  }

  // Create a new image element and set its source
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.style.maxWidth = "100%"; // Ensure the image fits within the container

  // Clear any previous content and append the new image
  previewContainer.innerHTML = "";
  previewContainer.appendChild(imgElement);
}
