import { Cart, CartItem, CartRepository } from '~/modules/cart/domain';
import { PrismaService } from '~/modules/common/infra';

export class PrismaCartRepository implements CartRepository {
  public static readonly include = {
    items: {
      include: { product: true },
    },
  };
  constructor(private readonly prisma: PrismaService) {}

  public async create(cart: Cart): Promise<Cart> {
    const prismaCart = await this.prisma.cart.create({
      data: {
        id: cart.id.id,
        sessionId: cart.sessionId,
        items: {
          createMany: {
            data: cart.items.map((cart) => {
              return {
                productId: cart.product.id.id,
                quantity: cart.quantity.value,
              };
            }),
          },
        },
      },
      include: PrismaCartRepository.include,
    });

    return Cart.create(prismaCart);
  }

  public async findById(id: string): Promise<Cart | null> {
    const prismaCart = await this.prisma.cart.findUnique({
      where: { sessionId: id },
      include: PrismaCartRepository.include,
    });

    if (!prismaCart) return null;

    return Cart.create(prismaCart);
  }

  async addCartItem(sessionId: string, cartItem: CartItem): Promise<Cart> {
    const updatedCart = await this.prisma.cart.update({
      where: {
        sessionId,
      },
      data: {
        items: {
          upsert: {
            where: {
              id: cartItem.id.id,
            },
            create: {
              id: cartItem.id.id,
              productId: cartItem.product.id.id,
              quantity: cartItem.quantity.value,
            },
            update: {
              quantity: cartItem.quantity.value,
            },
          },
        },
      },
      include: PrismaCartRepository.include,
    });

    return Cart.create(updatedCart);
  }

  async removeCartItem(sessionId: string, cartItem: CartItem): Promise<Cart> {
    const updatedCart = await this.prisma.cart.update({
      where: { sessionId, items: { some: { id: cartItem.id.id } } },
      data: {
        items: {
          update: {
            where: { id: cartItem.id.id },
            data: { quantity: cartItem.quantity.value },
          },
        },
      },
      include: PrismaCartRepository.include,
    });

    return Cart.create(updatedCart);
  }

  async deleteCartItem(sessionId: string, cartItemId: string): Promise<Cart> {
    const updatedCart = await this.prisma.cart.update({
      where: { sessionId, items: { some: { id: cartItemId } } },
      data: {
        items: {
          deleteMany: { id: cartItemId },
        },
      },
      include: PrismaCartRepository.include,
    });

    return Cart.create(updatedCart);
  }

  public async update(cart: Cart): Promise<Cart> {
    const prismaCart = await this.prisma.cart.update({
      where: { sessionId: cart.sessionId },
      data: {
        items: { set: [...cart.items.map((cart) => cart.toCreateProps())] },
      },
      include: PrismaCartRepository.include,
    });

    return Cart.create(prismaCart);
  }

  public async delete(cart: Cart): Promise<void> {
    await this.prisma.cart.delete({
      where: { sessionId: cart.sessionId },
    });
  }
}
