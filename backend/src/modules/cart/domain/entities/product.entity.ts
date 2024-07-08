import { z } from 'zod';
import { BaseEntity, EntityId } from '~/common/domain';
import { Price } from '../value-objects';

export class Product extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      name: z.string(),
      price: Price.validator.transform((props) => new Price(props)),
    });
  }

  public static create(props: Product.CreateProps): Product {
    return new Product(Product.validator.parse(props));
  }

  public toJSON() {
    return {
      id: this.id.toJSON(),
      name: this.name,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public get name(): string {
    return this.#name;
  }

  public get price(): Price {
    return this.#price;
  }

  readonly #name: string;
  readonly #price: Price;

  constructor(props: Product.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#price = props.price;
  }
}

export namespace Product {
  export type CreateProps = {
    id?: string;
    name: string;
    price: Price.CreateProps;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    name: string;
    price: Price;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    name: string;
    price: Price.JSON;
    createdAt: Date;
    updatedAt: Date;
  };
}
