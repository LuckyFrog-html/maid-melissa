import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import path from "path";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendCode(
        email: string,
        code: string,
        firstname: string,
        lastname: string
    ) {
        await this.mailerService.sendMail({
            to: email,
            subject:
                "Welcome to Maid Melissa Service! Here is your verification code",
            template: process.cwd() + "/templates/code",
            context: {
                code,
                firstname,
                lastname,
            },
        });
    }
}
