/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { User } from './model/user.model';
import { UserProfileService } from './user-profile.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        forwardRef(() => AuthModule),
        CloudinaryModule,
    ],
    providers: [UserService, UserProfileService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule { }
