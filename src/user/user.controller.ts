/* eslint-disable prettier/prettier */
import { Controller, FileTypeValidator, Get, HttpCode, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import type { AuthenticatedRequest } from 'src/common/interface/validation.interface';
import { UserProfileService } from './user-profile.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userProfileService: UserProfileService,
  ) { };

  @Get("/profile")
  @HttpCode(200)
  @UseGuards(AuthGuard)
  getProfile(@Req() req: AuthenticatedRequest) {
    return this.userProfileService.getUserProfileInfo(req?.user?.sub);
  }

  @Post('/change-avatar')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }), // 1MB limit
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req?.user;
    return this.userProfileService.changeAvatar(file, user?.sub);
  }
}
