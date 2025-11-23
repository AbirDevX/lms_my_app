/* eslint-disable prettier/prettier */
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bull';

@Injectable()
export class MailService {
    constructor(
        // private mailerService: MailerService,
        @InjectQueue('mail') private mailQueue: Queue
    ) { }

    async sendWelcomeEmail(userMail: string, userName: string) {
        await this.mailQueue.add("welcome_mail", {
            to: userMail,
            name: userName
        }, {
            attempts: 5,          // total retry attempts
            backoff: 60000        // delay between retries (in milliseconds)
        });
    }
}
