import twilio from "twilio";
import { config } from "../config/config.js";

class SmsService {
    constructor() {
        this.client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
    }

    async sendSms(to, message) {
        await this.client.messages.create({
            from: config.TWILIO_PHONE_NUMBER,
            to,
            body: message
        })
    }
}

export const smsService = new SmsService()