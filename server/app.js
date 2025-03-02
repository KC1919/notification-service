import { config } from './config/index.js';
import express from 'express';
import notificationRouter from './routes/notification.js';
import errorHandler from './middleware/error_handler.js';

const app = express();

// initializing app with service configurations
app.config = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// initializing the notification router
app.use('/api/v1/notify', notificationRouter);

app.use(errorHandler);

export default app;