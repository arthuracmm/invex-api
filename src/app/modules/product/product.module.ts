import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Inventory } from '../inventory/entities/inventory.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, Inventory]), ConfigModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
