import { z } from 'zod';
import { BaseEntity, EntityId } from '~/modules/common/domain';
import { CartItem } from './cart-item.entity';
import { UnprocessableEntityException } from '@nestjs/common';
import { addHours } from 'date-fns';

export class Cart extends BaseEntity {
  public static get validator() {
    return BaseEntity.baseValidator.extend({
      sessionId: z.string().uuid(),
      items: z.array(
        CartItem.validator.transform((item) => new CartItem(item)),
      ),
      total: z.bigint().default(BigInt(0)),
      itemsSum: z.number().default(0),
    });
  }

  public static create(props: Cart.CreateProps): Cart {
    return new Cart(Cart.validator.parse(props));
  }

  public addItem(props: CartItem.CreateProps): CartItem {
    const existingItem = this.#items.find(
      (item) => item.product.id.id === props.product.id,
    );

    if (existingItem) {
      existingItem.increaseQuantity(props.quantity);
      return existingItem;
    }

    const newCartItem = CartItem.create({
      product: props.product,
      quantity: props.quantity,
    });

    this.#items.push(newCartItem);
    return newCartItem;
  }

  public removeItem(props: CartItem.CreateProps): CartItem {
    const existingItem = this.#items.find(
      (item) => item.product.id.id === props.product.id,
    );

    if (!existingItem) {
      throw new UnprocessableEntityException('Produto não existe no carrinho');
    }

    existingItem.decreaseQuantity(props.quantity);

    if (existingItem.quantity.value < 0) {
      throw new UnprocessableEntityException(
        'Quantidade não pode ser menor do que zero',
      );
    }

    return existingItem;
  }

  private calculateTotal(): bigint {
    return this.#items.reduce(
      (previousCart, currentCart) => previousCart + currentCart.getTotalPrice(),
      BigInt(0),
    );
  }

  private sumItems(): number {
    return this.#items.reduce(
      (previousCart, currentCart) => previousCart + currentCart.quantity.value,
      0,
    );
  }

  public dateToExclude(): Date {
    return addHours(this.updatedAt, 24);
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
      total: this.total.toString(),
      itemsSum: this.sumItems(),
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

  public get itemsSum() {
    return this.itemsSum();
  }

  readonly #sessionId: string;
  #items: CartItem[];

  constructor(props: Cart.Props) {
    super(props.id, props.createdAt, props.updatedAt);
    this.#sessionId = props.sessionId;
    this.#items = props.items;
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
    total: bigint;
    itemsSum: number;
    createdAt: Date;
    updatedAt: Date;
  };

  export type JSON = {
    id: EntityId.JSON;
    sessionId: string;
    items: CartItem.JSON[];
    total: string;
    itemsSum: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
