/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegistrationDto {
  @IsNotEmpty({ message: 'fullname is required' })
  @IsString({ message: 'fullname must be a string' })
  @MinLength(2, { message: 'fullname must be between 2 and 50 characters' })
  @MaxLength(50, { message: 'fullname must be between 2 and 50 characters' })
  fullname: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsString({ message: 'email must be string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  @MaxLength(100, { message: 'email must not exceed 100 characters' })
  email: string;

  @IsNotEmpty({ message: 'mobile is required' })
  @IsString({ message: 'mobile must be string' })
  @Matches(/^[6-9]\d{9}$/, {
    message: 'mobile is not valid format',
  })
  mobile: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @MaxLength(128, { message: 'password must not exceed 128 characters' })
  password: string;
}
