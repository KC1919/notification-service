import NotificationService from '../service/notification.js';

const NotiService = new NotificationService();

class NotificationController {
    constructor(parameters) { }
    
    static handleEmailNotification = async (req, res) => {
        try {
            const { subject, body } = req.body;
            const response = await NotiService.handleEmailNotification(subject, body);
            res.status(200).json({
                message: 'Email notification sent',
                status: 'success',
                success: true
            });
        } catch (error) {
            console.log("Failed to handle email notification", error);
        }
    }

    static handleSmsNotification = async (req, res) => {
        try {
            const { message } = req.body;
            const response = await NotiService.handleSmsNotification(message);
            res.status(200).json({
                message: 'SMS notification sent',
                status: 'success',
                success: true
            });
        } catch (error) {
            console.log("Failed to handle sms notification", error);
        }
    }
}

export default NotificationController;