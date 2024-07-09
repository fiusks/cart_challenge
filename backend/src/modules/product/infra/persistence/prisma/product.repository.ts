import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '~/modules/common/infra';
import { Product, ProductRepository } from '~/modules/product/domain';

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string): Promise<Product> {
    const prismaProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!prismaProduct) throw new NotFoundException('Produto não encontrado');

    return Product.create(prismaProduct);
  }
}
