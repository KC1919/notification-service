import { config } from './config/index.js';
import express from 'express';
import notificationRouter from './routes/notification.js';

const app = express();

// initializing app with service configurations
app.config = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/notify', notificationRouter);

// app.set('name', 'kunal')

export default app;