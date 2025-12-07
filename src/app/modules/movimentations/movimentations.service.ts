import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movimentation } from './entities/movimentation.entity';
import { InventoryService } from '../inventory/inventory.service';
import { CreateMovimentationDto } from './dto/create-movimentation.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { promises } from 'dns';

@Injectable()
export class MovimentationsService {
  constructor(
    @InjectModel(Movimentation) private movimentationModel: typeof Movimentation,
    private readonly inventoryService: InventoryService
  ) { }

  async createEntry(data: CreateMovimentationDto): Promise<Movimentation> {
    const inventories = await this.inventoryService.findByProductAndLocation(
      data.productId,
      data.location
    );

    if (!inventories || inventories.length === 0) {
      await this.inventoryService.create({
        productId: data.productId,
        location: data.location,
        quantity: 0,
      });
    }

    await this.inventoryService.update(
      data.productId,
      data.location,
      'sum',
      { quantity: data.quantity }
    );

    return this.movimentationModel.create(data as Movimentation);
  }

  async createOutput(data: CreateMovimentationDto): Promise<Movimentation> {
    await this.inventoryService.update(
      data.productId,
      data.location,
      'sub',
      { quantity: data.quantity }
    );

    return this.movimentationModel.create(data as Movimentation);
  }

  async findAllByType(
    type: string,
    pagination: {
      page: number;
      pageSize: number;
    }
  ): Promise<{ data: Movimentation[]; total: number; page: number; pageSize: number }> {

    const offset = (pagination.page - 1) * pagination.pageSize;
    const limit = pagination.pageSize;

    const { rows, count } = await this.movimentationModel.findAndCountAll({
      where: {
        type: type
      },
      limit,
      offset,
      attributes: { exclude: ['userId', 'productId', 'updatedAt'] },
      include: [
        {
          model: User,
          attributes: ['fullName'],
        },
        {
          model: Product,
          attributes: ['shortName', 'fullName', 'unitMeasure'],
        },
      ],
      order: [['createdAt', 'DESC']]
    });

    return {
      total: count,
      page: pagination.page,
      pageSize: pagination.pageSize,
      data: rows
    };
  }


}
