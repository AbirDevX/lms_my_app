/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor() { };

    @Get("/profile")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    getProfile(@Req() req: Request) {
        return "ok";
    }
}
