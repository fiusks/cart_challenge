import { NotFoundException } from '@nestjs/common';
import { Cart, CartRepository } from '~/modules/cart/domain';
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

  public async findById(id: string): Promise<Cart> {
    const prismaCart = await this.prisma.cart.findUnique({
      where: { sessionId: id },
      include: PrismaCartRepository.include,
    });

    if (!prismaCart) throw new NotFoundException('Carrinho não encontrado');

    return Cart.create(prismaCart);
  }

  public async update(cart: Cart): Promise<Cart> {
    const prismaCart = await this.prisma.cart.update({
      where: { sessionId: cart.id.id },
      data: {
        items: { set: [...cart.items.map((cart) => cart.toJSON())] },
      },
      include: PrismaCartRepository.include,
    });

    return Cart.create(prismaCart);
  }

  public async delete(cart: Cart): Promise<void> {
    await this.prisma.cart.delete({
      where: { sessionId: cart.id.id },
    });
  }
}
