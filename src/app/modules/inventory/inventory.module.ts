import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Inventory, Product]), ConfigModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports:[InventoryService]
})
export class InventoryModule {}
