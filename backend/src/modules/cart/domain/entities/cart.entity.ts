import { z } from 'zod';
import { differenceInHours } from 'date-fns';
import { BaseEntity, EntityId } from '~/modules/common/domain';
import { CartItem } from './cart-item.entity';
import { UnprocessableEntityException } from '@nestjs/common';

export class Cart extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      sessionId: z.string().uuid(),
      items: z.array(z.instanceof(CartItem)),
      total: z.bigint().default(BigInt(0)),
      enabled: z.boolean().optional().default(true),
    });
  }

  public static create(props: Cart.CreateProps): Cart {
    return new Cart(Cart.validator.parse(props));
  }

  public addItem(props: CartItem.CreateProps): void {
    const existingItem = this.#items.find(
      (item) => item.product.id.id === props.product.id,
    );

    if (existingItem) {
      existingItem.increaseQuantity(props.quantity);
    } else {
      const newCartItem = CartItem.create({
        product: props.product,
        quantity: props.quantity,
      });

      this.#items.push(newCartItem);
    }
  }

  public removeItem(props: CartItem.CreateProps) {
    const existingItem = this.#items.find(
      (item) => item.product.id.id === props.product.id,
    );

    if (!existingItem) {
      throw new UnprocessableEntityException('Produto não existe no carrinho');
    }

    existingItem.decreaseQuantity(props.quantity);

    if (existingItem.quantity.value <= 0) {
      this.#items = this.#items.filter(
        (item) => item.product.id.id !== props.product.id,
      );
    }
  }

  private calculateTotal(): bigint {
    return this.#items.reduce(
      (previousCart, currentCart) => previousCart + currentCart.getTotalPrice(),
      BigInt(0),
    );
  }

  public toCreateProps() {
    return {
      id: this.id.toJSON(),
      sessionId: this.#sessionId,
      item: this.#items.map((item) => item.toCreateProps()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toJSON(): Cart.JSON {
    return {
      id: this.id.toJSON(),
      sessionId: this.sessionId,
      items: this.#items.map((item) => item.toJSON()),
      enabled: this.#enabled,
      total: this.total.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public get sessionId() {
    return this.#sessionId;
  }

  public get items() {
    return this.#items;
  }

  public get total() {
    return this.calculateTotal();
  }

  public get enabled() {
    this.checkIfDisabled();
    return this.#enabled;
  }

  private checkIfDisabled() {
    if (differenceInHours(new Date(), this.createdAt) > 24) {
      this.#enabled = false;
    }
  }

  readonly #sessionId: string;
  #enabled: boolean;
  #items: CartItem[];

  constructor(props: Cart.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#sessionId = props.sessionId;
    this.#items = props.items;
    this.#enabled = props.enabled;
  }
}

export namespace Cart {
  export type CreateProps = {
    id?: string;
    sessionId: string;
    items: CartItem.CreateProps[];
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type Props = {
    id: EntityId;
    sessionId: string;
    items: CartItem[];
    enabled: boolean;
    total: bigint;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    sessionId: string;
    items: CartItem.JSON[];
    enabled: boolean;
    total: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
