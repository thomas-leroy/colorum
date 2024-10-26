import { applyActiveStyle } from "../functions/applyActiveStyle.js";
import { displayImagePreview } from "../functions/displayImagePreview.js";
import * as analyze from "../utils/analyze.js";
import { debounce } from "../utils/debounce.js";
import { guessContentType } from "../utils/guessContentType.js";
import { extractDominantColors } from "../utils/imageColorAnalysis.js";

/**
 * Initializes the global listener for the application.
 */
export function initGlobalListener() {
  const app = document.getElementById("app");
  if (!app) {
    return;
  }

  let userInput = document.getElementById("userInput");
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
    const userInput = document.getElementById("userInput");
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
  userInput.addEventListener("input", handleInputEvent);
  userInput.addEventListener("paste", handlePasteEvent);
}

const runAnalyzeDebounced = debounce(analyze.runAnalyze, 300);

/**
 * Handles the input event from the user.
 *
 * @param {Event} event - The input event.
 */
function handleInputEvent(event) {
  if (!event.target || event.target.id !== "userInput") {
    return;
  }

  const inputValue = event.target.value.trim();
  const inputType = guessContentType(inputValue);

  applyActiveStyle(inputType);

  runAnalyzeDebounced(inputValue, (result) => {
    const img = document.querySelector("#imagePreview");
    img.innerHTML = "";

    const resultDiv = document.getElementById("analysis");
    resultDiv.innerHTML = "";
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

  const textData = clipboardData.getData("Text");
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

    if (item.type.indexOf("image") === -1) {
      continue;
    }

    const file = item.getAsFile();

    if (!file) {
      return;
    }

    handleImageFile(file);
    applyActiveStyle("image");
    return;
  }
}

/**
 * Handles the processing of the image file and extracts dominant colors.
 *
 * @param {File} file - The image file to process.
 */
function handleImageFile(file) {
  // Show loading indicator
  const loader = document.getElementById("loading");
  loader.classList.remove("hidden");

  // Create a FileReader to read the image file
  const reader = new FileReader();

  // Define the load event for when the file has been read
  reader.onload = function (event) {
    const imgDataUrl = event.target.result;

    // Display the image preview in the DOM
    displayImagePreview(imgDataUrl);

    // Select the image element from the preview
    const img = document.querySelector("#imagePreview img");

    // Define what happens once the image is fully loaded
    img.onload = () => {
      // Extract dominant colors from the image
      extractDominantColors(img, 15).then((dominantColors) => {
        // Get the analysis div and clear previous content
        const analysisDiv = document.getElementById("analysis");
        analysisDiv.innerHTML = "";

        // Convert the dominant colors into a string format
        const dominantColorsString = dominantColors.join(", ");

        // Pass the string of colors to runAnalyze
        runAnalyzeDebounced(dominantColorsString, (result) => {
          displayColorSquares(analysisDiv, result);
        });

        // Hide the loading indicator
        loader.classList.add("hidden");
      });
    };
  };

  // Start reading the image file as a data URL
  reader.readAsDataURL(file);
}

/**
 * Displays color rectangles in the specified container.
 *
 * @param {HTMLElement} container - The container element to append color rectangles to.
 * @param {Array} colors - An array of enriched color objects, each containing hex, hsl, and name.
 */
function displayColorSquares(container, colors) {
  // Clear existing color rectangles if any
  container.innerHTML = "";

  // Iterate over each enriched color and create a rectangle for each
  colors.forEach((color) => {
    const colorRectangle = createColorSquare(color.hex, color.name, color.hsl);
    container.appendChild(colorRectangle);
  });
}

/**
 * Creates a color rectangle element with a label below it.
 *
 * @param {string} hex - The hex color code to display in the rectangle.
 * @param {string} name - The name of the color for the label.
 * @param {string} hsl - The HSL value of the color for tooltip.
 * @returns {HTMLElement} The created color rectangle element with label.
 */
function createColorSquare(hex, name, hsl) {
  // Main container for the color rectangle and label
  const colorContainer = document.createElement("div");
  colorContainer.style.display = "inline-block";
  colorContainer.style.textAlign = "center";
  colorContainer.style.margin = "5px";

  // Color rectangle
  const colorRectangle = document.createElement("div");
  colorRectangle.style.width = "80px"; // Adjust width for rectangle
  colorRectangle.style.height = "40px"; // Adjust height for rectangle
  colorRectangle.style.backgroundColor = hex;
  colorRectangle.style.borderRadius = "4px";
  colorRectangle.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  colorRectangle.title = `Name: ${name}\nHex: ${hex}\nHSL: ${hsl}`;

  // Label for the color name
  const colorLabel = document.createElement("div");
  colorLabel.innerText = name;
  colorLabel.style.fontSize = "12px"; // Basic text style

  // Append color rectangle and label to container
  colorContainer.appendChild(colorRectangle);
  colorContainer.appendChild(colorLabel);

  return colorContainer;
}
