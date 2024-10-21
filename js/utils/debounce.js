/**
 * Creates a debounced function that delays the execution of the given function until after the specified delay.
 *
 * @param {function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay execution.
 * @returns {function} Returns a new debounced function.
 */
export function debounce(func, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
