import { guessContentType } from './guessContentType.js';
import { applyActiveStyle } from '../functions/applyActiveStyle.js';
import * as analyze from './analyze.js';
import { debounce } from './debounce.js';
import { displayImagePreview } from '../functions/displayImagePreview.js';
import { extractDominantColors } from './imageColorAnalysis.js';

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
  const loader = document.getElementById('loading');
  loader.classList.remove('hidden');

  const reader = new FileReader();

  reader.onload = function (event) {
    const imgDataUrl = event.target.result;
    displayImagePreview(imgDataUrl);

    const img = document.querySelector('#imagePreview img');

    img.onload = () => {
      extractDominantColors(img, 15).then((dominantColors) => {
        console.log('Dominant Colors:', dominantColors);

        // Optionally, you can display the dominant colors in the DOM
        const analysisDiv = document.getElementById('analysis');

        // Clear the previous color squares
        analysisDiv.innerHTML = ''; // This removes all the previous child elements (color squares)

        dominantColors.forEach((color) => {
          const colorSquare = document.createElement('div');
          colorSquare.style.width = '50px';
          colorSquare.style.height = '50px';
          colorSquare.style.backgroundColor = color;
          colorSquare.style.display = 'inline-block';
          colorSquare.style.margin = '5px';
          analysisDiv.appendChild(colorSquare);
        });

        loader.classList.add('hidden');
      });
    };
  };

  reader.readAsDataURL(file); // Start reading the file data
}
