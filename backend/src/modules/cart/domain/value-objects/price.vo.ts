export class Price {
  constructor(private amount: bigint) {
    if (amount < 0) {
      throw new Error('O preço não pode ser negativo');
    }
  }

  getValue(): bigint {
    return this.amount;
  }
}
