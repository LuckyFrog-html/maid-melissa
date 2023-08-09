import { Injectable } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common/exceptions";
import { User, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: { orders: true },
        });
    }

    async users(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        if (params) {
            const {
                skip = 0,
                take = 0,
                cursor = {} as Prisma.UserWhereUniqueInput,
                where = {} as Prisma.UserWhereInput,
                orderBy = {} as Prisma.UserOrderByWithRelationInput,
            } = params;

            return this.prisma.user.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
        } else {
            return this.prisma.user.findMany({});
        }
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const candidate = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (candidate) throw new BadRequestException("This user is already exist");

        return this.prisma.user.create({
            data: { ...data },
            include: {
                orders: true,
            },
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
