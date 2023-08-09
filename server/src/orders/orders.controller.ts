import { Controller, Post, Get, Body, UseGuards, Req } from "@nestjs/common";
import { Request } from "express";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { HoursService } from "src/hours/hours.service";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
    constructor(
        private readonly hoursService: HoursService,
        private readonly ordersService: OrdersService
    ) {}

    @UseGuards(AccessTokenGuard)
    @Post()
    async orderHour(
        @Body()
        data: {
            dateStr: string;
            userId: string;
            hourId: string;
            address: string;
            allergy: string;
            frequency: string;
            cleaning: string;
        }
    ) {
        return await this.hoursService.orderHour(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get("user")
    async getUserOrders(@Req() req: Request) {
        return await this.ordersService.getUserOrders(req.user["sub"]);
    }
}
