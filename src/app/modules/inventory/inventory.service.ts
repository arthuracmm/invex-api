import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from './entities/inventory.entity';
import { Product } from '../product/entities/product.entity';
import { Op, Sequelize } from 'sequelize';
import { NotificationsService } from '../notifications/notifications.service';
import { Movimentation } from '../movimentations/entities/movimentation.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory) private inventoryModel: typeof Inventory,
    @InjectModel(Movimentation) private movimentationModel: typeof Movimentation,
    @InjectModel(Product) private productModel: typeof Product,
    private notificationsService: NotificationsService,
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
          ? Number(current.quantity) + Number(data.quantity)
          : Number(current.quantity) - Number(data.quantity);

      if (newQuantity < 0) {
        throw new BadRequestException(
          `Quantity cannot be negative (attempted: ${newQuantity})`,
        );
      }

      if (type === 'sub') {
        const product = await this.productModel.findByPk(productId);
        if (product && newQuantity < product.quantMin) {
          const message = `${product.shortName}-${product.fullName} está com pouca quantidade`;
          await this.notificationsService.create({
            message: message,
            read: false,
          });
        }
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

  async dashboard(): Promise<{
    smaller: Inventory[];
    greater: Inventory[];
    totalQuantity: number;
    topEntry: any[];
    topOutput: any[];
  }> {
    const productTotals = await this.inventoryModel.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity'],
      ],
      group: ['productId', 'product.id'],
      include: [
        {
          model: Product,
          attributes: ['id', 'shortName', 'fullName'],
        },
      ],
      raw: true,
      nest: true,
    });

    const sortedTotals = productTotals.sort(
      (a: any, b: any) => a.totalQuantity - b.totalQuantity
    );

    const smaller = sortedTotals.slice(0, 5);
    const greater = sortedTotals.slice(-5).reverse();

    const totalQuantity = await this.inventoryModel.sum('quantity');

    const topEntry = await this.movimentationModel.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total'],
      ],
      where: { type: 'entry' },
      group: ['productId', 'product.id'],
      order: [[Sequelize.literal('"total"'), 'DESC']],
      limit: 5,
      include: [
        {
          model: Product,
          attributes: ['id', 'shortName', 'fullName'],
        },
      ],
    });

    const topOutput = await this.movimentationModel.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total'],
      ],
      where: { type: 'output' },
      group: ['productId', 'product.id'],
      order: [[Sequelize.literal('"total"'), 'DESC']],
      limit: 5,
      include: [
        {
          model: Product,
          attributes: ['id', 'shortName', 'fullName'],
        },
      ],
    });

    return {
      totalQuantity: totalQuantity ?? 0,
      smaller,
      greater,
      topEntry,
      topOutput,
    };
  }

}
