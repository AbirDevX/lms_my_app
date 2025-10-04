/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post("/sign-up")
    async signUp() {
        try {
            const userList = await this.userService.findAll();
            return userList
        } catch (error: unknown) {
            return {
                success: false,
                message: error instanceof Error && error.message || 'Registration failed',
                error: process.env.NODE_ENV === 'development' ? (error instanceof Error && error.stack) : undefined,
            };
        }
    }
}
