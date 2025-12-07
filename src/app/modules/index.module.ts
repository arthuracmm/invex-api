import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MovimentationsModule } from './movimentations/movimentations.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ProductModule,
        InventoryModule,
        NotificationsModule,
        MovimentationsModule,
    ],
    exports: [
        AuthModule
    ],
})
export class IndexModule { }
