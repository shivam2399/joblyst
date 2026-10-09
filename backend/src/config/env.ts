import dotenv from 'dotenv';

dotenv.config();

const env = {
    port: Number(process.env.PORT) || 5000,

    db: {
        host: process.env.DB_HOST  || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        name: process.env.DB_NAME || 'joblyst',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
    },

    jwtSecret: process.env.JWT_SERCRET || 'development-secret',

    mail: {
        host: process.env.MAIL_HOST || "smtp.gmail.com",
        port: Number(process.env.MAIL_PORT) || 587,
        user: process.env.MAIL_USER || "",
        password: process.env.MAIL_PASSWORD || "",
        from: process.env.MAIL_FROM || "",
    },
};

export default env;