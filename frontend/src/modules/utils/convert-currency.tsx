export function convertCurrency(price: bigint, currency: string) {
  return price.toLocaleString(currency, {
    style: 'currency',
    currency: 'BRL',
  });
}
