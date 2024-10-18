// Helper function to check if a string is valid JSON
export function isValidJson(inputString) {
  try {
    JSON.parse(inputString);
    return true;
  } catch {
    return false;
  }
}
