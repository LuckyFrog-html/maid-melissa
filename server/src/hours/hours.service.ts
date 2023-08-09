import { Injectable } from "@nestjs/common";
import { Hour, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HoursService {
    constructor(private prisma: PrismaService) {}

    async fillTable() {
        const data = [
            [
                ["08:59", "11:01"],
                ["14:30", "17:00"],
            ],
            [
                ["10:15", "11:45"],
                ["16:00", "19:00"],
            ],
            [
                ["09:50", "11:30"],
                ["16:15", "18:20"],
            ],
            [
                ["13:00", "16:00"],
                ["20:00", "22:00"],
            ],
            [["09:00", "12:15"]],
            [
                ["11:00", "13:45"],
                ["18:30", "20:30"],
            ],
            [
                ["11:25", "14:30"],
                ["16:15", "19:00"],
            ],
        ];

        for (let i = 0; i < data.length; i++) {
            const info = data[i];

            for (let j = 0; j < info.length; j++) {
                await this.prisma.hour.create({
                    data: {
                        day: i + 1,
                        start_time: info[j][0],
                        end_time: info[j][1],
                        ordered: false,
                    },
                });
            }
        }

        return { status: "success" };
    }

    async hour(
        hourWhereUniqueInput: Prisma.HourWhereUniqueInput
    ): Promise<Hour | null> {
        return this.prisma.hour.findUnique({
            where: hourWhereUniqueInput,
            include: { order: true },
        });
    }

    async hours(params?: { where?: Prisma.HourWhereInput }): Promise<Hour[]> {
        if (params) {
            const { where = {} as Prisma.HourWhereInput } = params;

            return this.prisma.hour.findMany({
                where,
            });
        } else {
            return this.prisma.hour.findMany({});
        }
    }

    async orderHour(data: {
        dateStr: string;
        userId: string;
        hourId: string;
        address: string;
        allergy: string;
        frequency: string;
        cleaning: string;
    }) {
        const order = await this.prisma.order.create({
            data: {
                dateStr: data.dateStr,
                address: data.address,
                allergy: data.allergy,
                cleaning: data.cleaning,
                frequency: data.frequency,
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
                hour: {
                    connect: {
                        id: data.hourId,
                    },
                },
            },
        });

        await this.prisma.hour.update({
            where: { id: order.hourId },
            data: {
                ordered: true,
            },
        });

        return { status: "success", orderId: order.id };
    }
}
