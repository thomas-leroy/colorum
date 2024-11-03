// Import the array of loading messages
import loadingMessages from "../helpers/loadingMessages.js";

let messageInterval = null; // Store interval ID to control timing in stop function

/**
 * Displays a random loading message in the #loading div,
 * changing every 1.5 to 3 seconds.
 */
export function startLoadingMessages() {
  const loadingElement = document.getElementById("loading");
  if (!loadingElement) {
    console.error('Loading element with id "loading" not found.');
    return;
  }

  // Function to display a random message
  const displayRandomMessage = () => {
    const randomMessage =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    loadingElement.textContent = randomMessage;
    loadingElement.classList.remove("hidden"); // Show the element
  };

  // Display the initial message
  displayRandomMessage();

  // Set interval to change the message every 1.5 to 3 seconds
  messageInterval = setInterval(
    () => {
      displayRandomMessage();
    },
    Math.random() * 1000 + 500
  ); // Random interval between 1.5s and 3s
}

// Export the interval variable for access in the stop function
export { messageInterval };
