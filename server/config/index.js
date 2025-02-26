import dotenv from 'dotenv'
import { resolve } from 'path';

dotenv.config({ path: resolve('config/common/.env') });

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

dotenv.config({ path: resolve(`config/env/.env.${process.env.NODE_ENV}`) });

export const config = {
    mongodb: {
        'url': process.env.DB_URI
    },
    jwt: {
        'secret': process.env.JWT_SECRET_KEY
    },
    server: {
        'url': `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    }
}