import { z } from 'zod';
export class Quantity {
  public static get validator() {
    return z.number().positive();
  }

  public static create(props: Quantity.CreateProps): Quantity {
    return new Quantity(Quantity.validator.parse(props));
  }

  increment(amount: number): void {
    if (amount <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }

    this.#value += amount;
  }

  decrement(amount: number): void {
    if (amount <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }

    if (this.value === 0 || this.value - amount < 0) {
      throw new Error('Quantidade não pode ser negativa');
    }

    this.#value -= amount;
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
