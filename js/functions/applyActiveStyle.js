/**
 * Apply "active" class to the right element from the guess div
 */
export function applyActiveStyle(inputType, guessDivId = 'guess') {
  const guessElement = document.getElementById(guessDivId);
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
