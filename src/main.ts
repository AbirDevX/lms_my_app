/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
}
bootstrap();
