import { guessContentType } from './guessContentType.js';

export function initGlobalListener() {
  const app = document.getElementById('app');
  if (!app) {
    return;
  }
  app.addEventListener('input', handleInputEvent);
}

/**
 * This function call the guessContentType user input changes
 */
function handleInputEvent(event) {
  if (!event.target || event.target.id !== 'userInput') {
    return;
  }
  const inputValue = event.target.value.trim();
  const inputType = guessContentType(inputValue);

  applyActiveStyle(inputType);
}

/**
 * This function apply "active" class to guessed type on UI
 */
function applyActiveStyle(inputType) {
  const guessElement = document.getElementById('guess');
  if (!guessElement) {
    return;
  }

  const children = guessElement.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    child.classList.remove('active');

    // Add or remove 'active' class based on whether the child's class matches the inputType
    if (child.classList.contains(inputType)) {
      child.classList.add('active');
    }
  }
}
