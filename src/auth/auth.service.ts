/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/common/dto/user.dto';
import { HashService } from 'src/common/services/hash.service';
import { UserService } from 'src/user/user.service';
import { UserRegistrationDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly hashService: HashService
    ) { }

    async userSignUpService(payload: UserRegistrationDto) {
        try {
            const emailExist = await this.userService.findOneByEmail(payload?.email);
            if (emailExist) throw new HttpException("Email already taken by other.!", HttpStatus.BAD_REQUEST);
            const mobileExist = await this.userService.findOneByMobile(payload?.mobile);
            if (mobileExist) throw new HttpException("Mobile already taken by other.!", HttpStatus.BAD_REQUEST);

            const generatedUserName = payload.email?.split("@")[0];
            const hashPassword = await this.hashService.hash(payload?.password);

            const createdObj = {
                full_name: payload.fullname,
                username: generatedUserName,
                email: payload.email,
                mobile: payload.mobile,
                password: hashPassword,
                created_at: new Date(),
                updated_at: new Date()
            };

            const newData = await this.userService.create(createdObj);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const tokenPayload = { sub: newData?.id, created_at: newData?.created_at };
            const [accessToken, refreshToken] = await Promise.all([
                this.generateAccessToken(tokenPayload),
                this.generateRefreshToken(tokenPayload),
            ]);

            return {
                status: true,
                status_code: 201,
                message: "Sign Up Successfully",
                access_token: accessToken,
                refresh_token: refreshToken,
                data: new UserResponseDto(newData?.dataValues)
            };
        } catch (error: unknown) {
            const status = error instanceof HttpException ? error.getStatus() : 500;
            const message = error instanceof Error ? error.message : 'Registration failed';

            return {
                status: false,
                message: message,
                status_code: status,
            };
        }
    }

    // Generate Access Token (uses default JwtModule config)
    async generateAccessToken(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }

    // Generate Refresh Token (custom secret and expiry)
    async generateRefreshToken(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: '30d',
        });
    }

    // Verify Access Token (uses default config)
    async verifyAccessToken(token: string): Promise<any> {
        return await this.jwtService.verifyAsync(token);
    }

    // Verify Refresh Token (custom secret)
    async verifyRefreshToken(token: string): Promise<any> {
        return await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        });
    }
}
