// Helper function to check if a string is a valid CSV
export function isValidCsv(inputString) {
  const lines = inputString.split('\n');
  const isCsv = lines.every((line) => line.split(',').length > 1);
  return isCsv && lines.length > 1;
}
