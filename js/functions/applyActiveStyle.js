/**
 * Apply the "active" class to the element with the specified inputType inside the guess div.
 *
 * @param {string} inputType - The class name of the element to apply the "active" class to.
 * @param {string} [guessDivId='guess'] - The ID of the parent element containing the children to modify. Default is 'guess'.
 * @returns {void} - Returns nothing.
 */
export function applyActiveStyle(inputType, guessDivId = "guess") {
  // Get the parent element
  const guessElement = document.getElementById(guessDivId);

  // Early return if the parent element is not found
  if (!guessElement) {
    return;
  }

  // Get all child elements of the parent element
  const children = Array.from(guessElement.children);

  // Loop through each child, remove 'active' class, and add it if the child has the inputType class
  children.forEach((child) => {
    child.classList.remove("active");

    if (child.classList.contains(inputType)) {
      child.classList.add("active");
    }
  });
}
