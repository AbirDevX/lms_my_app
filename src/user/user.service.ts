/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes, Op } from 'sequelize';
import { User } from './model/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }
    async findOneByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ where: { email: email } });
    }

    async findOneByEmailOrMobileOrUsername(query: string): Promise<User | null> {
        return this.userModel.findOne({ where: { [Op.or]: [{ email: query }, { mobile: query }, { username: query }] } });
    }

    async findOneByMobile(mobile: string): Promise<User | null> {
        return this.userModel.findOne({ where: { mobile: mobile } });
    }

    async create(payload: Partial<User>): Promise<User> {
        return this.userModel.create(payload as CreationAttributes<User>);
    }
    async updateByPk(payload: any, id: number): Promise<any> {
        return this.userModel.update(payload, { where: { id } });
    }
}
