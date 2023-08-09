import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";
import { RefreshTokenGuard } from "src/common/guards/refreshToken.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signin")
    async signin(@Body() data: { login: string; password: string }) {
        return await this.authService.signIn(data);
    }

    @Post("signup")
    async signup(
        @Body()
        data: {
            email: string;
            phone: string;
            firstname: string;
            lastname: string;
            date_of_birth: Date;
        }
    ) {
        return await this.authService.signUp(data);
    }

    @Post("verify")
    async verifyLogin(@Body() data: { code: string; email: string }) {
        return await this.authService.verifyCode(data);
    }

    @Post("forgot")
    async forgotPass(@Body() data: { email: string }) {
        return await this.authService.forgotPass(data.email);
    }

    @Post("update_pass")
    async updatePass(@Body() data: { email: string; password: string }) {
        return await this.authService.updatePass(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get()
    auth(@Req() req: Request) {
        return this.authService.auth(req.user["sub"]);
    }

    @UseGuards(RefreshTokenGuard)
    @Get("refresh")
    refreshTokens(@Req() req: Request) {
        const userId = req.user["sub"];
        const refreshToken = req.user["refreshToken"];
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @UseGuards(AccessTokenGuard)
    @Get("logout")
    logout(@Req() req: Request, @Res() res: Response) {
        this.authService.logout(req.user["sub"]);
        return res.json({ message: "Logout is successful", status: 200 });
    }
}
