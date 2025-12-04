import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User} from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([User]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
