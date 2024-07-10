import { z } from 'zod';
export class Quantity {
  public static get validator() {
    return z.number().positive();
  }

  public static create(props: Quantity.CreateProps): Quantity {
    return new Quantity(Quantity.validator.parse(props));
  }

  private validatePositiveQuantity(value: number): void {
    if (value <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }
  }

  increment(value: number): void {
    this.validatePositiveQuantity(value);

    this.#value += value;
  }

  decrement(value: number): void {
    this.validatePositiveQuantity(value);

    if (this.value === 0 || this.value - value < 0) {
      throw new Error('Quantidade não pode ser negativa');
    }

    this.#value -= value;
  }

  public toCreateProps(): Quantity.CreateProps {
    return this.#value;
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
