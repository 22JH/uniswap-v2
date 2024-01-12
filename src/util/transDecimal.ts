import Decimal from "decimal.js";

export const transDivideDecimal = (inputValue: number, outputValue: number) => {
  if (!inputValue || !outputValue) return 0;
  const result = new Decimal(inputValue).dividedBy(new Decimal(outputValue));
  return result.toDecimalPlaces(10).toString();
};

export const transMultiplyDecimal = (
  inputValue: number,
  outputValue: number
) => {
  if (!inputValue || !outputValue) return 0;
  const result = new Decimal(inputValue).times(new Decimal(outputValue));
  return result.toDecimalPlaces(10).toString();
};
