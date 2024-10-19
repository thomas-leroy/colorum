import { guessContentType } from './guessContentType.js';
import { applyActiveStyle } from '../functions/applyActiveStyle.js';
import * as analyze from './analyze.js';
import { debounce } from './debounce.js';

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

const runAnalyzeDebounced = debounce(analyze.runAnalyze, 300);
function handleInputEvent(event) {
  if (!event.target || event.target.id !== 'userInput') {
    return;
  }

  const inputValue = event.target.value.trim();
  const inputType = guessContentType(inputValue);

  applyActiveStyle(inputType);

  runAnalyzeDebounced(inputValue, (result) => {
    const resultDiv = document.getElementById('analysis');

    resultDiv.innerHTML = '';

    // Iterate over the color data
    Object.entries(result).forEach(([color, normalizedHSL]) => {
      // Create a new div element to represent the color
      const colorSquare = document.createElement('div');

      // Set the style of the div to display it as a color square
      colorSquare.style.width = '50px';
      colorSquare.style.height = '50px';
      colorSquare.style.backgroundColor = normalizedHSL; // Use the HSL value for the background
      colorSquare.style.margin = '5px';
      colorSquare.style.display = 'inline-block'; // Display them inline

      // Add a tooltip to show the original and normalized color
      colorSquare.title = `Original: ${color}\nNormalized: ${normalizedHSL}`;

      // Append the square to the #analysis div
      resultDiv.appendChild(colorSquare);
    });
  });
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

function handleImageFile(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
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
