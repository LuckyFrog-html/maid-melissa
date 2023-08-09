import { Controller, Get, UseGuards } from "@nestjs/common";
import { HoursService } from "./hours.service";
import { AccessTokenGuard } from "src/common/guards/accessToken.guard";

@Controller("hours")
export class HoursController {
    constructor(private hoursService: HoursService) {}

    @Get()
    async fillTable() {
        return await this.hoursService.fillTable();
    }

    @Get("free")
    async getAllFree() {
        return await this.hoursService.hours({ where: { ordered: false } });
    }
}
