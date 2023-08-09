import { BadRequestException, ForbiddenException, NotFoundException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { MailService } from "src/mail/mail.service";
import { User } from "@prisma/client";

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailService: MailService
    ) {}

    async signUp(data: {
        email: string;
        phone: string;
        firstname: string;
        lastname: string;
        date_of_birth: Date;
    }): Promise<{ message: string }> {
        let candidate: User = await this.usersService.user({ email: data.email });

        if (!candidate) {
            candidate = await this.usersService.user({ phone: data.phone });
        }

        if (candidate) {
            throw new BadRequestException("User already exists");
        }

        const code = Math.floor(99999 + Math.random() * 900000).toString(),
            hashedCode = await this.hashData(code);

        this.mailService.sendCode(data.email, code, data.firstname, data.lastname);

        const newUser = await this.usersService.createUser({
            isVerified: false,
            verification: hashedCode,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            date_of_birth: data.date_of_birth,
            phone: data.phone,
        });

        return { message: `Code has been sent on ${newUser.email}` };
    }

    async verifyCode(data: { email: string; code: string }) {
        const candidate = await this.usersService.user({ email: data.email });

        if (!candidate) throw new NotFoundException("User does not exist");

        const codeMatches = await bcrypt.compare(data.code, candidate.verification);

        if (!codeMatches) throw new BadRequestException("Code is incorrect");

        await this.usersService.updateUser({
            where: { email: candidate.email },
            data: { isVerified: true },
        });

        return { message: "success" };
    }

    async signIn(data: { login: string; password: string }) {
        let candidate: User;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (emailRegex.test(data.login)) {
            candidate = await this.usersService.user({ email: data.login });
        } else {
            candidate = await this.usersService.user({ phone: data.login });
        }

        if (!candidate) throw new BadRequestException("User does not exist");

        const passwordMatches = await bcrypt.compare(
            data.password,
            candidate.password
        );

        const { password, jwt_refresh, verification, ...user } = candidate;

        if (!passwordMatches) throw new BadRequestException("Password is incorrect");

        const tokens = await this.getTokens(String(user.id));
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return { tokens, resUser: user };
    }

    async forgotPass(email: string) {
        const candidate = await this.usersService.user({ email });

        if (!candidate) throw new BadRequestException("User does not exist");

        const code = Math.floor(99999 + Math.random() * 900000).toString(),
            hashedCode = await this.hashData(code);

        this.mailService.sendCode(
            email,
            code,
            candidate.firstname,
            candidate.lastname
        );

        this.usersService.updateUser({
            where: { email },
            data: { verification: hashedCode },
        });

        return { status: `Code has been sent on ${email}` };
    }

    async updatePass(data: { email: string; password: string }) {
        const candidate = await this.usersService.user({ email: data.email });

        if (!candidate) throw new BadRequestException("User does not exist");

        const hashedPass = await this.hashData(data.password);

        await this.usersService.updateUser({
            where: { email: candidate.email },
            data: { password: hashedPass },
        });

        return { status: "success" };
    }

    async auth(userId: string) {
        const candidate = await this.usersService.user({
            id: userId,
        });

        if (!candidate) throw new BadRequestException("User does not exist");

        const { password, jwt_refresh, verification, ...user } = candidate;

        return user;
    }

    async logout(userId: string) {
        const candidate = await this.usersService.user({
            id: userId,
        });

        if (candidate) throw new BadRequestException("User does not exist");

        this.usersService.updateUser({
            where: { id: userId },
            data: { jwt_refresh: null },
        });
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.user({ id: userId });
        if (!user || !user.jwt_refresh)
            throw new ForbiddenException("Access Denied");

        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            user.jwt_refresh
        );

        if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");

        const tokens = await this.getTokens(String(user.id));
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async hashData(data: string): Promise<string> {
        return await bcrypt.hash(data, 10);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.updateUser({
            where: { id: userId },
            data: { jwt_refresh: hashedRefreshToken },
        });
    }

    async getTokens(userId: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                },
                {
                    secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
                    expiresIn: "15m",
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                },
                {
                    secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
                    expiresIn: "7d",
                }
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
