import app from '../app.js';
import EmailService from './email_service.js';
import SMSService from './sms_service.js';

const Email = new EmailService();
const SMS = new SMSService();

class NotificationService {
    constructor(parameters) {
    }

    handleNotification = async (channel) => {
        try {
            if (channel === 'email') {
                this.handleEmailNotification();
            }

            else if (channel === 'sms') {
                this.handleSmsNotification();
            }
        } catch (error) {
            console.log(error);
            throw new Error('Failed to handle notification.')
        }
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