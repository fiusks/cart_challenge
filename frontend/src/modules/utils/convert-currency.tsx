export function convertCurrency(
  price: bigint,
  locale: string,
  currency: string,
) {
  return price.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}
