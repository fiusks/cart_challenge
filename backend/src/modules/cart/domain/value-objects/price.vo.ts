import { z } from 'zod';

export class Price {
  public static get validator() {
    return z.bigint().positive();
  }

  public static create(props: Price.CreateProps): Price {
    return new Price(Price.validator.parse(props));
  }

  public toJSON(): Price.JSON {
    return this.#value.toString();
  }

  public get value(): bigint {
    return this.#value;
  }

  readonly #value: bigint;

  constructor(price: bigint) {
    this.#value = price;
  }
}

export namespace Price {
  export type CreateProps = bigint;

  export type JSON = string;
}
