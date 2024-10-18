import { guessContentType } from './guessContentType.js';

export function initGlobalListener() {
  const app = document.getElementById('app');
  if (!app) {
    return;
  }
  app.addEventListener('input', handleInputEvent);
}

function handleInputEvent(event) {
  if (!event.target || event.target.id !== 'userInput') {
    return;
  }
  const inputValue = event.target.value.trim();
  const inputType = guessContentType(inputValue);

  applyActiveStyle(inputType);
}

function applyActiveStyle(inputType) {
  const guessElement = document.getElementById('guess');
  if (!guessElement) {
    return;
  }

  const children = guessElement.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    // Add or remove 'active' class based on whether the child's class matches the inputType
    if (child.classList.contains(inputType)) {
      child.classList.add('active');
    } else {
      child.classList.remove('active');
    }
  }
}
