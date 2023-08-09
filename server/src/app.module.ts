import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { OrdersModule } from "./orders/orders.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule,
        AuthModule,
        OrdersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
