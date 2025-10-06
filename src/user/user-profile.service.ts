/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserResponseDto } from 'src/common/dto/user.dto';
import { User } from './model/user.model';

@Injectable()
export class UserProfileService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) { }

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
}