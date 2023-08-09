import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { HoursService } from "./hours.service";
import { HoursController } from "./hours.controller";

@Module({
    controllers: [HoursController],
    providers: [HoursService, PrismaService],
    exports: [HoursService],
})
export class HoursModule {}
