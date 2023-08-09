import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";
import { MailModule } from "src/mail/mail.module";

@Module({
    providers: [UsersService, PrismaService],
    exports: [UsersService],
})
export class UsersModule {}
