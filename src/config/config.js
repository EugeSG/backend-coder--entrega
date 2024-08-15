import dotenv from "dotenv";

dotenv.config();

export const config = {
    PERSISTENCE: process.env.PERSISTENCE || "mongo",
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,

    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT
};