import { guessContentType } from './guessContentType.js';

export function initGlobalListener() {
  const app = document.getElementById('app');
  if (!app) {
    return;
  }

  let userInput = document.getElementById('userInput');
  if (userInput) {
    attachListeners(userInput);
    return;
  }

  const observer = new MutationObserver(() => {
    userInput = document.getElementById('userInput');
    if (userInput) {
      attachListeners(userInput);
      observer.disconnect();
    }
  });

  observer.observe(app, { childList: true, subtree: true });
}

function attachListeners(userInput) {
  userInput.addEventListener('input', handleInputEvent);
  userInput.addEventListener('paste', handlePasteEvent);
}

function handleInputEvent(event) {
  if (!event.target || event.target.id !== 'userInput') {
    return;
  }

  const inputValue = event.target.value.trim();
  const inputType = guessContentType(inputValue);
  applyActiveStyle(inputType);
}

function handlePasteEvent(event) {
  const clipboardData = event.clipboardData || window.clipboardData;
  if (!clipboardData) {
    return;
  }

  const textData = clipboardData.getData('Text');
  if (textData) {
    return;
  }

  const items = clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.indexOf('image') !== -1) {
      const file = item.getAsFile();
      if (file) {
        handleImageFile(file);
        applyActiveStyle('image');
      }
      return;
    }
  }
}

function applyActiveStyle(inputType) {
  const guessElement = document.getElementById('guess');
  if (!guessElement) {
    return;
  }

  const children = guessElement.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    child.classList.remove('active');

    if (child.classList.contains(inputType)) {
      child.classList.add('active');
    }
  }
}

function handleImageFile(file) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const imgDataUrl = event.target.result;
    displayImagePreview(imgDataUrl);
  };

  reader.readAsDataURL(file);
}

function displayImagePreview(imageUrl) {
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