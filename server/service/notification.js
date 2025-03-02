import CustomError from '../utils/custom_error.js';
import EmailService from './email_service.js';
import SMSService from './sms_service.js';

const Email = new EmailService();
const SMS = new SMSService();

class NotificationService {
    constructor(parameters) {
    }

    handleEmailNotification = async ({ email, subject, body }) => {
        try {
            const response = await Email.handleEmailEvent({ email, subject, body });
            return response;
        } catch (error) {
            throw new CustomError(error.message, 500)
        }
    }

    handleSmsNotification = async ({ message, mobile }) => {
        try {
            const response = await SMS.handleSMSEvent({ message, mobile });
            return response;;
        } catch (error) {
            console.log(error);
            throw new CustomError('Failed to handle sms notification.\n' + error.message, 500)
        }
    }
}

export default NotificationService;