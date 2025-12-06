import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Op } from 'sequelize';
import { Inventory } from '../inventory/entities/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
  ) { }

  async create(data: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productModel.findOne({
      where: {
        [Op.or]: [
          { shortName: data.shortName },
          { fullName: data.fullName }
        ]
      }
    });

    if (existingProduct) {
      throw new ConflictException('Product already exists');
    }

    return this.productModel.create(data as Product);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll({ include: [Inventory] });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt',] }
    });
    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id);
    return product.update(data);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await product.destroy();
  }
}
