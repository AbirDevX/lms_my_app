/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }
}
