import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { HoursModule } from "src/hours/hours.module";
import { OrdersService } from "./orders.service";

@Module({
    imports: [HoursModule],
    controllers: [OrdersController],
    providers: [PrismaService, OrdersService],
})
export class OrdersModule {}
