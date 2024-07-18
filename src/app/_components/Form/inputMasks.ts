export const moneyMask = (value: number): number => {
  if (value !== undefined) {
    const formattedValue = value
      .toFixed(2)
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1.$2");
    return parseFloat(formattedValue);
  }

  return 0;
};
