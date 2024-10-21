import { applyActiveStyle } from '../functions/applyActiveStyle.js';
import { displayImagePreview } from '../functions/displayImagePreview.js';
import * as analyze from './analyze.js';
import { debounce } from './debounce.js';
import { guessContentType } from './guessContentType.js';
import { extractDominantColors } from './imageColorAnalysis.js';

/**
 * Initializes the global listener for the application.
 */
export function initGlobalListener() {
  const app = document.getElementById('app');
  if (!app) {
    return;
  }

  let userInput = document.getElementById('userInput');
  if (userInput) {
    attachListeners(userInput);
  } else {
    observeInputElement(app);
  }
}

/**
 * Observes for the creation of the #userInput element in the DOM.
 *
 * @param {HTMLElement} app - The app container element.
 */
function observeInputElement(app) {
  const observer = new MutationObserver(() => {
    const userInput = document.getElementById('userInput');
    if (userInput) {
      attachListeners(userInput);
      observer.disconnect();
    }
  });

  observer.observe(app, { childList: true, subtree: true });
}

/**
 * Attaches event listeners to the input element.
 *
 * @param {HTMLElement} userInput - The user input element.
 */
function attachListeners(userInput) {
  userInput.addEventListener('input', handleInputEvent);
  userInput.addEventListener('paste', handlePasteEvent);
}

const runAnalyzeDebounced = debounce(analyze.runAnalyze, 300);

/**
 * Handles the input event from the user.
 *
 * @param {Event} event - The input event.
 */
function handleInputEvent(event) {
  if (!event.target || event.target.id !== 'userInput') {
    return;
  }

  const inputValue = event.target.value.trim();
  const inputType = guessContentType(inputValue);

  applyActiveStyle(inputType);

  runAnalyzeDebounced(inputValue, (result) => {
    // Select the image element from the preview
    const img = document.querySelector('#imagePreview');
    img.innerHTML = '';

    const resultDiv = document.getElementById('analysis');
    resultDiv.innerHTML = '';
    displayColorSquares(resultDiv, result);
  });
}

/**
 * Handles the paste event from the user.
 *
 * @param {ClipboardEvent} event - The paste event.
 */
function handlePasteEvent(event) {
  const clipboardData = event.clipboardData || window.clipboardData;
  if (!clipboardData) {
    return;
  }

  const textData = clipboardData.getData('Text');
  if (textData) {
    return;
  }

  handlePastedImages(clipboardData);
}

/**
 * Handles pasted images from the clipboard.
 *
 * @param {DataTransfer} clipboardData - The clipboard data object.
 */
function handlePastedImages(clipboardData) {
  const items = clipboardData.items;

  if (!items.length) {
    return;
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.type.indexOf('image') === -1) {
      continue;
    }

    const file = item.getAsFile();

    if (!file) {
      return;
    }

    handleImageFile(file);
    applyActiveStyle('image');
    return;
  }
}

/**
 * Handles the processing of the image file and displays dominant colors.
 *
 * @param {File} file - The image file to process.
 */
function handleImageFile(file) {
  // Show loading indicator
  const loader = document.getElementById('loading');
  loader.classList.remove('hidden');

  // Create a FileReader to read the image file
  const reader = new FileReader();

  // Define the load event for when the file has been read
  reader.onload = function (event) {
    const imgDataUrl = event.target.result;

    // Display the image preview in the DOM
    displayImagePreview(imgDataUrl);

    // Select the image element from the preview
    const img = document.querySelector('#imagePreview img');

    // Define what happens once the image is fully loaded
    img.onload = () => {
      // Extract dominant colors from the image
      extractDominantColors(img, 15).then((dominantColors) => {
        // Get the analysis div and clear previous content
        const analysisDiv = document.getElementById('analysis');
        analysisDiv.innerHTML = '';

        // Display the dominant colors as squares
        displayColorSquares(analysisDiv, dominantColors);

        // Hide the loading indicator
        loader.classList.add('hidden');
      });
    };
  };

  // Start reading the image file as a data URL
  reader.readAsDataURL(file);
}

/**
 * Displays color squares in the specified container.
 *
 * @param {HTMLElement} container - The container element to append color squares to.
 * @param {Object} colors - The object containing color mappings or an array of colors.
 */
function displayColorSquares(container, colors) {
  Object.entries(colors).forEach(([color, normalizedHSL]) => {
    const colorSquare = createColorSquare(normalizedHSL, color);
    container.appendChild(colorSquare);
  });
}

/**
 * Creates a color square element.
 *
 * @param {string} color - The color to display in the square.
 * @param {string} [title] - Optional title for the square (for tooltips).
 * @returns {HTMLElement} The created color square element.
 */
function createColorSquare(color, title = '') {
  const colorSquare = document.createElement('div');
  colorSquare.style.width = '50px';
  colorSquare.style.height = '50px';
  colorSquare.style.backgroundColor = color;
  colorSquare.style.margin = '5px';
  colorSquare.style.display = 'inline-block';

  if (title) {
    colorSquare.title = `Original: ${title}\nNormalized: ${color}`;
  }

  return colorSquare;
}
