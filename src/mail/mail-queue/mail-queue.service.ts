/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull'; // Type-only import

interface WelcomeMailPayload {
    to: string;
    name: string;
}

@Processor('mail')
export class MailQueueService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    @Process('welcome_mail')
    async handleWelcomeEmail(job: Job<WelcomeMailPayload>) {
        try {
            const { to, name } = job.data;

            await this.mailerService.sendMail({
                to,
                subject: 'Welcome to OurApp - Please Verify Your Email',
                template: 'welcome',
                context: {
                    name,
                    confirmation_url: 'http://localhost:8080'
                }
            });
            console.log(`Welcome email sent to ${to} Successfully`);
        } catch (error) {
            console.log(error);
        }
    }
}
