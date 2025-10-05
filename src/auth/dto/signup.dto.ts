// src/auth/dto/user-registration.dto.ts
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UserRegistrationDto {
  @IsInt({ message: 'user_id must be integer' })
  @IsNotEmpty({ message: 'user_id is required' })
  user_id: number;

  @IsString({ message: 'username must be string' })
  @IsNotEmpty({ message: 'username is required' })
  @MinLength(3, {
    message:
      'username must be 3-30 chars. Allowed: letters, numbers, dot, underscore, @',
  })
  @MaxLength(30, {
    message:
      'username must be 3-30 chars. Allowed: letters, numbers, dot, underscore, @',
  })
  @Matches(/^[a-zA-Z0-9@_.]+$/, {
    message:
      'username must be 3-30 chars. Allowed: letters, numbers, dot, underscore, @',
  })
  @Transform(({ value }: { value: string }) => value?.trim())
  username: string;

  @IsString({ message: 'fullname must be a string' })
  @IsNotEmpty({ message: 'fullname is required' })
  @MinLength(3, { message: 'fullname must be between 3 and 50 characters' })
  @MaxLength(50, { message: 'fullname must be between 3 and 50 characters' })
  @Transform(({ value }: { value: string }) => value?.trim())
  fullname: string;

  @IsString({ message: 'email must be string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email is required' })
  @Transform(({ value }: { value: string }) => value?.toLowerCase()?.trim())
  email: string;

  @IsString({ message: 'mobile must be string' })
  @IsNotEmpty({ message: 'mobile is required' })
  @Matches(/^[6-9]\d{9}$/, {
    message: 'mobile is not valid format',
  })
  @Transform(({ value }: { value: string }) => value?.trim())
  mobile: string;
}
