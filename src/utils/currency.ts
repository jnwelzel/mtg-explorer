export const getCurrencySymbol = (currency: string): string => {
  switch (currency) {
    case "usd":
      return "$";
    case "eur":
      return "€";
    case "tix":
      return "Tix ";
    default:
      return currency.toUpperCase(); // Fallback to uppercase currency code
  }
};
