import NotificationService from '../service/notification.js';

const NotiService = new NotificationService();

class NotificationController {
    constructor(parameters) { }

    static handleNotification = async (req, res) => {
        try {
            const { channel } = req.params;
            await NotiService.handleNotification(channel);
            res.status(200).json({
                message: 'Notification sent',
                status: 'success',
                success: true
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to handle notification',
                status: 'fail',
                success: false,
                error: error.message
            });
        }
    }

    static handleEmailNotification = async (req, res) => {
        try {
            const { data } = req.body;
            await NotiService.handleEmailNotification(data?.content);
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
            const { data } = req.body;
            await NotiService.handleSmsNotification(data?.content);
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