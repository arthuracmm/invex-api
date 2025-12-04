import { Module } from '@nestjs/common';
import { StockEntryService } from './stock-entry.service';
import { StockEntryController } from './stock-entry.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockEntry } from './entities/stock-entry.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([StockEntry, Inventory]), ConfigModule],
  controllers: [StockEntryController],
  providers: [StockEntryService],
})
export class StockEntryModule { }
