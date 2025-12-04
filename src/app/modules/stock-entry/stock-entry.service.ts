import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StockEntry } from './entities/stock-entry.entity';

@Injectable()
export class StockEntryService {
  constructor(
    @InjectModel(StockEntry) private stockEntryModel: typeof StockEntry,
  ) { }

  async create(data: Partial<StockEntry>): Promise<StockEntry> {
    return this.stockEntryModel.create(data as StockEntry);
  }

  async findAll(): Promise<StockEntry[]> {
    return this.stockEntryModel.findAll();
  }

  async findOne(id: string): Promise<StockEntry> {
    const stockEntry = await this.stockEntryModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt',] }
    });
    if (!stockEntry) throw new NotFoundException('stockEntry not found');
    return stockEntry;
  }

  async update(id: string, data: Partial<StockEntry>): Promise<StockEntry> {
    const stockEntry = await this.findOne(id);
    return stockEntry.update(data);
  }

  async remove(id: string): Promise<void> {
    const stockEntry = await this.findOne(id);
    await stockEntry.destroy();
  }
}
