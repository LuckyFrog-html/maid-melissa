import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async getUserOrders(userId: string) {
        const orders = await this.prisma.order.findMany({
                where: { userId },
                include: { hour: true },
            }),
            hours = orders.map((i) => i.hour);
        return { orders, hours };
    }
}
