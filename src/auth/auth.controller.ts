/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRegistrationDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Throttle({ default: { limit: 20, ttl: 60000 } })
    @Post("/sign-up")
    @HttpCode(201)
    async signUp(@Body() payload: UserRegistrationDto) {
        return this.authService.userSignUpService(payload);
    }

    @Throttle({ default: { limit: 20, ttl: 60000 } })
    @Post("/sign-in")
    @HttpCode(200)
    async signIn(@Body() payload: UserLoginDto) {
        return this.authService.userSignInService(payload);
    }
}
