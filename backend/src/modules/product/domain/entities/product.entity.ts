import { z } from 'zod';
import { BaseEntity, EntityId } from '~/modules/common/domain';
import { Price } from '../value-objects';

export class Product extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      name: z.string(),
      price: Price.validator.transform((props) => new Price(props)),
      imageUrl: z.string().url(),
    });
  }

  public static create(props: Product.CreateProps): Product {
    return new Product(Product.validator.parse(props));
  }

  public toCreateProps() {
    return {
      id: this.id.toJSON(),
      name: this.#name,
      price: this.#price.toCreateProps(),
      imageUrl: this.#imageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toJSON() {
    return {
      id: this.id.toJSON(),
      name: this.#name,
      price: this.#price.toJSON(),
      imageUrl: this.#imageUrl,
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

  public get imageUrl(): string {
    return this.#imageUrl;
  }

  readonly #name: string;
  readonly #price: Price;
  readonly #imageUrl: string;

  constructor(props: Product.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#name = props.name;
    this.#price = props.price;
    this.#imageUrl = props.imageUrl;
  }
}

export namespace Product {
  export type CreateProps = {
    id?: string;
    name: string;
    price: Price.CreateProps;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    name: string;
    price: Price;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    name: string;
    price: Price.JSON;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
