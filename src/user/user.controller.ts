/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor() { };

    @Get("/profile")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    getProfile() {
        return "ok";
    }
}
