import express from 'express';
import NotificationController from '../controller/notification.js';
const router = express.Router();


router
    .post('/email', NotificationController.handleEmailNotification)
    .post('/sms', NotificationController.handleSmsNotification)

export default router;