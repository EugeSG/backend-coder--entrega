import nodemailer from "nodemailer";
import { config } from "../config/config.js";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.MAIL_HOST,
            port: config.MAIL_PORT,
            auth: {
                user: config.MAIL_USER,
                pass: config.MAIL_PASS
            }
        });
    }

    getMessage (userName) {
        const message =  `<h1>Hola ${userName}.</h1>
        <p style="font-size: 16px">Te damos la bienvenida a nuestro eCommerce</p>
        
        <p style="font-size: 16px">Si tienes alguna pregunta, no dudes en contactarnos.</p>
    
        <p style="font-size: 16px">Saludos,</p>
        <p style="font-size: 16px">eCommerce de CoderHouse</p>` 

        return message;
       
    } 

    async sendEmail (to, subject, userName) {
        
        const message = this.getMessage(userName);
        const mail =  await this.transporter.sendMail({
            from: config.MAIL_USER,
            to,
            subject,
            html: message
        })
    }
}
export const mailService = new MailService()