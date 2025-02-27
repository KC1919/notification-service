import EmailService from './email_service.js';
import SMSService from './sms_service.js';

const Email = new EmailService();
const SMS = new SMSService();

class NotificationService {
    constructor(parameters) {
    }

    handleEmailNotification = async ({ subject, body }) => {
        try {
            const response = await Email.handleEmailEvent({ subject, body });
            return;
        } catch (error) {
            throw new Error('Failed to handle email notification.')
        }
    }

    handleSmsNotification = async (message) => {
        try {
            const response = await SMS.handleSMSEvent(message);
            return;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to handle sms notification.')
        }
    }
}

export default NotificationService;