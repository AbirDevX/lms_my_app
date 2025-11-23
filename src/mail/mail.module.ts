/* eslint-disable prettier/prettier */
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { MailQueueService } from './mail-queue/mail-queue.service';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com', // fallback for testing
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        requireTLS: process.env.SMTP_REQUIRE_TLS === 'true',
        auth: {
          user: process.env.SMTP_SENDER_MAIL,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: '"LMS" <noreply@jontyabir.com>',
      },
      template: {
        dir: path.join(__dirname, '../templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1', // or your Redis instance
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  providers: [MailService, MailQueueService],
  exports: [MailService, MailQueueService]
})
export class MailModule {
}
