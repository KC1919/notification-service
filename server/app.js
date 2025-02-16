import './config/index.js';
import express from 'express';
import notificationRouter from './routes/notification.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/notify', notificationRouter);

// app.set('name', 'kunal')

export default app;