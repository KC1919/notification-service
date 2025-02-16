import mongoose from 'mongoose';
import { config } from '../../config/index.js';

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(config.mongodb.url);

        if (conn) {
            console.log('Database connected!');
            return conn;
        } else {
            console.log('Database connection failed!');
        }
    } catch (error) {
        console.error('Database connection failed!', error);
    }
}