import nodemailer from 'nodemailer';
import fileService from './file.service';

class MailService {

    transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: +process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        })
    }

    async sendChangePasswordCode(to: string, code: string): Promise<void> {
        const html = await fileService.readMail('forgot-password.html', {code: code});

        return this.sendMail(to, `Change password on - ${process.env.APP_NAME}`, html);
    }

    async sendMail(to: string, subject: string, html: string): Promise<void> {
        return this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html,
        })
    }

}

export default new MailService();