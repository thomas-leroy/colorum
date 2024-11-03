// Import the interval variable from startLoadingMessages.js
import { messageInterval } from "./startLoadingMessage.js";

/**
 * Stops displaying loading messages and hides the #loading div.
 * Clears the interval and hides the loading element.
 */
export function stopLoadingMessages() {
  const loadingElement = document.getElementById("loading");
  if (!loadingElement) {
    console.error('Loading element with id "loading" not found.');
    return;
  }

  // Clear the interval to stop message updates
  clearInterval(messageInterval);

  // Hide the loading element and clear its content
  loadingElement.classList.add("hidden");
  loadingElement.textContent = ""; // Optionally clear the text content
}
