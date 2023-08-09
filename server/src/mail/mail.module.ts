import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Global, Module } from "@nestjs/common";
import { MailService } from "./mail.service";

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    service: "Gmail",
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "maidmelissa276@gmail.com",
                        pass: "hpkjjwovqmogiiki",
                    },
                    tls: { rejectUnauthorized: false },
                },
                defaults: {
                    from: "Maid Melissa <maidmelissa276@gmail.com>",
                },
                template: {
                    dir:
                        __dirname.split("/").slice(0, -2).join("/") +
                        "/templates",
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
