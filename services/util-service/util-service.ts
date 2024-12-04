export function formatCurrency(value: number): string {
  if (value >= 1e12) {
    // Trillion
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    // Billion
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    // Million
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    // Thousand
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    // Less than a thousand
    return `$${value.toFixed(2)}`;
  }
}
