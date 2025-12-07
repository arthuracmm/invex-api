import { Module } from '@nestjs/common';
import { MovimentationsService } from './movimentations.service';
import { MovimentationsController } from './movimentations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Movimentation } from './entities/movimentation.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [SequelizeModule.forFeature([Movimentation, User, Product]),
    ConfigModule,
    InventoryModule
  ],
  controllers: [MovimentationsController],
  providers: [MovimentationsService],
})
export class MovimentationsModule { }
