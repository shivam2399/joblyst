import dotenv from 'dotenv';

dotenv.config();

const env = {
    port: Number(process.env.PORT) || 3000,

    db: {
        host: process.env.DB_HOST  || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        name: process.env.DB_NAME || 'joblyst',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
    },

    jwtSecret: process.env.JWT_SERCRET || 'development-secret',
};

export default env;