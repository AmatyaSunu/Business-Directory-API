import dotenv from 'dotenv'
dotenv.config();

module.exports = {
    mailer: {
        driver: process.env.MAIL_DRIVER || '',
        host: process.env.MAIL_HOST || '',
        port: process.env.MAIL_PORT || '',
        username: process.env.MAIL_USERNAME || '',
        password: process.env.MAIL_PASSWORD || '',
    }
};