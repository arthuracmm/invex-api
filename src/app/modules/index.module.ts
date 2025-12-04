import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ProductModule
    ],
    exports: [
        AuthModule
    ],
})
export class IndexModule { }
