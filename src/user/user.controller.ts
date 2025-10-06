/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserProfileService } from './user-profile.service';

@Controller('user')
export class UserController {
    constructor(private readonly userProfileService: UserProfileService) { };

    @Get("/profile")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    getProfile(@Req() req: Request) {
        return this.userProfileService.getUserProfileInfo(req?.user?.sub);
    }
}
