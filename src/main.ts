/* eslint-disable prettier/prettier */
import { HttpException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/sequelize';
import helmet from 'helmet';
import { Sequelize } from 'sequelize';
import { AppModule } from './app.module';
import { CustomValidationResponse } from './interface/validation.interface';
import { flattenValidationErrors } from './utility/validation.utility';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: "*", credentials: true });
  // customized validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const customResponse: CustomValidationResponse = {
          success: false,
          message: 'Validation failed',
          data: flattenValidationErrors(errors),
          status_code: 422
        };

        return new HttpException(customResponse, 422);
      },
    }),
  );;

  // For default connection
  const sequelize = app.get<Sequelize>(getConnectionToken());
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log('Database connected successfully!');
    console.log(
      `Connected to: ${sequelize.config.database} on ${sequelize.config.host}:${sequelize.config.port}`,
    );
  } catch (error: unknown) {
    console.error('Database connection failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`YOUR SERVER IS STARED ON: http://localhost:${port}`);
};

bootstrap();
