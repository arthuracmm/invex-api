import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from './entities/inventory.entity';
import { Product } from '../product/entities/product.entity';
import { Op } from 'sequelize';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory) private inventoryModel: typeof Inventory,
  ) { }

  async create(data: Partial<Inventory>): Promise<Inventory> {
    return this.inventoryModel.create(data as Inventory);
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.findAll({
      attributes: { exclude: ['productId', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: Product,
          attributes: ['id', 'shortName', 'fullName', 'unitMeasure'],
        },
      ],
    });
  }

  async findOne(id: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt',] }
    });
    if (!inventory) throw new NotFoundException('Inventory not found');
    return inventory;
  }

  async findByProductAndLocation(productId: string, location: string): Promise<Inventory[]> {
    return this.inventoryModel.findAll({
      where: {
        productId: productId,
        location: location
      },
      attributes: { exclude: ['productId', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: Product,
          attributes: ['id', 'shortName', 'fullName', 'unitMeasure'],
        },
      ],
    });
  }

  async update(
    productId: string,
    location: string,
    type: 'sum' | 'sub',
    data: Partial<Inventory>
  ): Promise<Inventory> {
    const inventory = await this.inventoryModel.findOne({
      where: { productId, location },
    });

    if (!inventory) {
      throw new NotFoundException(
        `Inventory not found for product ${productId} at location ${location}`,
      );
    }

    if (data.quantity !== undefined) {
      const current = await this.findQuantity(productId, location);

      const newQuantity =
        type === 'sum'
          ? current.quantity + data.quantity
          : current.quantity - data.quantity;

      if (newQuantity < 0) {
        throw new BadRequestException(
          `Quantity cannot be negative (attempted: ${newQuantity})`,
        );
      }

      data.quantity = newQuantity;
    }

    await inventory.update(data);
    if (inventory.quantity === 0) {
      this.remove(inventory.id)
    }
    return inventory;
  }

  async findQuantity(productId: string, location: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.findOne({
      where: {
        productId: productId,
        location: { [Op.iLike]: location.toLowerCase() },
      },
      attributes: ['quantity']
    });
    if (!inventory) throw new NotFoundException('Inventory not found');
    return inventory;
  }

  async remove(id: string): Promise<void> {
    const inventory = await this.findOne(id);
    await inventory.destroy();
  }
}
