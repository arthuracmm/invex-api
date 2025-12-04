import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { StockEntryModule } from './stock-entry/stock-entry.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ProductModule,
        InventoryModule,
        StockEntryModule
    ],
    exports: [
        AuthModule
    ],
})
export class IndexModule { }
