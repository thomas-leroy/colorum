export function displayImagePreview(imageUrl) {
  const previewContainer = document.getElementById('imagePreview');
  if (!previewContainer) {
    return;
  }

  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.style.maxWidth = '100%';

  previewContainer.innerHTML = '';
  previewContainer.appendChild(imgElement);
}
