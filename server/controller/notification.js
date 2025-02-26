import NotificationService from '../service/notification.js';

class NotificationController {
    constructor(parameters) { }

    static handleNotification = async (req, res) => {
        try {
            const { channel } = req.params;
            NotificationService.handleNotification(channel);
            res.status(200).json({
                message: 'Email notification sent',
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

    static handleEmailNotification = (req, res) => {
        try {
            const { data } = req.body;
            NotificationService.handleEmailNotification(data?.content);
            res.status(200).json({
                message: 'SMS notification sent',
                status: 'success',
                success: true
            });
        } catch (error) {
            console.log("Failed to handle email notification", error);
        }
    }

    static handleSmsNotification = (req, res) => {
        try {
            const { data } = req.body;
            NotificationService.handleSmsNotification(data?.content);
        } catch (error) {
            console.log("Failed to handle sms notification", error);
        }
    }
}

export default NotificationController;