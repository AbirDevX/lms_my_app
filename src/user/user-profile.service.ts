/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserResponseDto } from 'src/common/dto/user.dto';
import { User } from './model/user.model';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    async getUserProfileInfo(userId: number) {
        try {
            const dbData = await this.userModel.findByPk(userId);
            if (!dbData) throw new BadRequestException("Data not found.!");

            return {
                status: true,
                status_code: 200,
                message: "Profile Detail Fetched Successfully",
                data: new UserResponseDto(dbData)
            };
        } catch (error: unknown) {
            const status = error instanceof HttpException ? error.getStatus() : 500;
            const message = error instanceof Error ? error.message : 'Registration failed';

            throw new HttpException({ status: false, message: message, status_code: status }, status);
        }
    }

    async changeAvatar(file: Express.Multer.File, userId: number) {
        try {
            const result = await this.cloudinaryService.uploadFile(file, userId);

            return {
                status: true,
                status_code: 200,
                message: "Change Avatar Successfully",
                data: {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    url: result.secure_url,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    public_id: result.public_id
                }
            };
        } catch (error: unknown) {
            const status = error instanceof HttpException ? error.getStatus() : 500;
            const message = error instanceof Error ? error.message : 'Registration failed';

            throw new HttpException({ status: false, message: message, status_code: status }, status);
        }
    }
}