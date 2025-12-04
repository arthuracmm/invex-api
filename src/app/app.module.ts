import { Module } from '@nestjs/common';
import { IndexModule } from './modules/index.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './config/database.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSequelizeConfig,
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    IndexModule,
  ]
})
export class AppModule { }
