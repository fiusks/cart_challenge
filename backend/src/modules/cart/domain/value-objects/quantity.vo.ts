import { z } from 'zod';
export class Quantity {
  public static get validator() {
    return z.number().positive();
  }

  public static create(props: Quantity.CreateProps): Quantity {
    return new Quantity(Quantity.validator.parse(props));
  }

  increment(amount?: number): void {
    const incrementAmount = amount ?? 1;

    if (incrementAmount <= 0) {
      throw new Error('Quantidade de ser maior que zero');
    }

    this.#value += incrementAmount;
  }

  decrement(amount?: number): void {
    const decrementAmount = amount ?? 1;

    if (decrementAmount <= 0) {
      throw new Error('Quantidade de ser maior que zero');
    }

    if (this.value === 0 || this.value - decrementAmount < 0) {
      throw new Error('Quantidade negativa');
    }

    this.#value -= decrementAmount;
  }

  public toJSON(): Quantity.JSON {
    return this.#value;
  }

  public get value(): number {
    return this.#value;
  }

  #value: number;

  constructor(quantity: number) {
    this.#value = quantity;
  }
}
export namespace Quantity {
  export type CreateProps = number;

  export type JSON = number;
}
