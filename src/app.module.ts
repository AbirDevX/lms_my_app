/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { HashService } from './common/services/hash.service';

@Module({
  imports: [
    // ENV CONFIG
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // RATE LIMITING - NEW FORMAT for v6+
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'default',
            ttl: config.get<number>('THROTTLE_TTL', 60000), // Default: 60 seconds (milliseconds)
            limit: config.get<number>('THROTTLE_LIMIT', 10), // Default: 10 requests
          },
          {
            name: 'short',
            ttl: 1000,      // 1 second
            limit: 3,       // 3 requests
          },
          {
            name: 'medium',
            ttl: 10000,     // 10 seconds
            limit: 20,      // 20 requests
          },
          {
            name: 'long',
            ttl: 60000,     // 60 seconds
            limit: 100,     // 100 requests
          },
        ],
      }),
    }),
    // MYSQL CONFIG
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 3306),
          username: configService.get<string>('DB_USERNAME', 'root'),
          password: configService.get<string>('DB_PASSWORD', '123456'),
          database: configService.get<string>('DB_DATABASE', 'my_database'),
          // models: [User],
          autoLoadModels: true,
          synchronize: true,
          logging: console.log
        };
      },
    }),
    AuthModule,
    ProductModule,
    UserModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard, }, // authorized rate limiting
    AppService, HashService],
})
export class AppModule { }
