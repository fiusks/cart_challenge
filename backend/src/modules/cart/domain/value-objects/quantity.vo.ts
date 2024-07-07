export class Quantity {
  constructor(private value: number) {
    if (value < 1) {
      throw new Error('A quantidade deve ser maior ou igual a 1');
    }
  }

  getValue(): number {
    return this.value;
  }

  increment(amount?: number): void {
    const incrementAmount = amount ?? 1;

    if (incrementAmount <= 0) {
      throw new Error('Quantidade de ser maior que zero');
    }

    this.value += incrementAmount;
  }

  decrement(amount?: number): void {
    const decrementAmount = amount ?? 1;

    if (decrementAmount <= 0) {
      throw new Error('Quantidade de ser maior que zero');
    }

    if (this.value === 0 || this.value - decrementAmount < 0) {
      throw new Error('Quantidade negativa');
    }

    this.value -= decrementAmount;
  }
}
