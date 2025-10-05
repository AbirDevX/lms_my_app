/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Throttle({ default: { limit: 2, ttl: 60000 } })
    @Post("/sign-up")
    async signUp(@Body() payload: UserRegistrationDto) {
        return this.authService.userSignUpService(payload);
    }
}
