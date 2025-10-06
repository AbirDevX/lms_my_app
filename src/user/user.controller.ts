/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserProfileService } from './user-profile.service';

interface AuthenticatedRequest extends Request {
  user?: any;
}

@Controller('user')
export class UserController {
    constructor(private readonly userProfileService: UserProfileService) { };

    @Get("/profile")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    getProfile(@Req() req: AuthenticatedRequest) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        return this.userProfileService.getUserProfileInfo(req?.user?.sub);
    }
}
