import { BaseEntity, EntityId } from '~/modules/common/domain';
import { Quantity } from '../value-objects';
import { Product } from '~/modules/product/domain';

export class CartItem extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      product: Product.validator.transform((props) => new Product(props)),
      quantity: Quantity.validator.transform((props) => new Quantity(props)),
    });
  }

  public static create(props: CartItem.CreateProps): CartItem {
    return new CartItem(CartItem.validator.parse(props));
  }

  public increaseQuantity(quantity?: number): void {
    const itemQtd = quantity ?? 1;
    this.#quantity.increment(itemQtd);
  }

  public decreaseQuantity(quantity?: number): void {
    const itemQtd = quantity ?? 1;

    this.#quantity.decrement(itemQtd);
  }

  public getTotalPrice(): bigint {
    return BigInt(this.#quantity.value) * this.product.price.value;
  }

  public toCreateProps() {
    return {
      id: this.id.toJSON(),
      product: this.#product.toCreateProps(),
      quantity: this.#quantity.toCreateProps(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toJSON() {
    return {
      id: this.id.toJSON(),
      product: this.#product.toJSON(),
      quantity: this.#quantity.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public get product(): Product {
    return this.#product;
  }

  public get quantity(): Quantity {
    return this.#quantity;
  }

  #product: Product;
  #quantity: Quantity;

  constructor(props: CartItem.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#product = props.product;
    this.#quantity = props.quantity;
  }
}

export namespace CartItem {
  export type CreateProps = {
    id?: string;
    product: Product.CreateProps;
    quantity: Quantity.CreateProps;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    product: Product;
    quantity: Quantity;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    product: Product.JSON;
    quantity: Quantity.JSON;
    createdAt: Date;
    updatedAt: Date;
  };
}
