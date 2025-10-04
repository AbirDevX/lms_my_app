/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ProductModule } from './product/product.module';
import { User } from './user/model/user.model';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // env config
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // mysql config
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
          models: [User],
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
  providers: [AppService],
})
export class AppModule { }
