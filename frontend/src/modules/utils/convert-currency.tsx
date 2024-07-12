export function convertCurrency(
  price: bigint | string,
  locale: string,
  currency: string,
) {
  return price.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}
