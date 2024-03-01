export function convertDecimetersToInch(value: number): string {
  if (value === 0) return `0 '`;

  let footValue = value / 3.048;

  let footDecimalPart = footValue - Math.floor(footValue);

  let inches = Math.floor(footDecimalPart * 12) + "";
  if (inches.length === 1) inches = "0" + inches;

  return `${Math.floor(footValue)}' ${inches}" `;
}

export function convertHectogramToLibs(value: number): string {
  let symbol = "lbs";
  if (value === 0) return `0 ${symbol}`;

  let convertValue = (value * 0.2204622622).toFixed(1);
  return `${convertValue} ${symbol}`;
}
