import NotificationService from '../service/notification.js';
import { successResponse } from '../utils/api_response.js';

const NotiService = new NotificationService();

class NotificationController {
    constructor(parameters) { }

    static handleEmailNotification = async (req, res, next) => {
        try {
            const { email, subject, body } = req.body;

            const response = await NotiService.handleEmailNotification({ email, subject, body });
            successResponse(res, 200, 'Email notification sent successfully!', response);
        } catch (error) {
            console.log("Failed to handle email notification", error);
            next(error);
        }
    }

    static handleSmsNotification = async (req, res, next) => {
        try {
            const { message, mobile } = req.body;
            const response = await NotiService.handleSmsNotification({ message, mobile });
            successResponse(res, 200, 'SMS notification sent successfully!', response);
        } catch (error) {
            console.log("Failed to handle sms notification", error);
            next(error);
        }
    }
}

export default NotificationController;