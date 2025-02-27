class EmailService {

    constructor() {
        this.emailQueue = [];
        this.isProcessing = false;
        this.startProcessing();
    }

    handleEmailEvent = async ({ subject, body }) => {
        try {
            this.emailQueue.push({
                content: {
                    'subject': subject,
                    'body': body
                }
            });

            console.log('Messages in Email Queue:', this.emailQueue.length);
        } catch (error) {
            console.log('Error while handling email event:', error);
        }
    }

    sendEmailNotification = async (emailData) => {
        try {

            await fetch(`http://localhost:${process.env.EMAIL_SERVICE_PORT}/api/v1/email/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'data': emailData
                })
            });
        } catch (error) {
            throw new Error('Failed to handle email notification.')
        }
    }

    checkEmailServiceHealth = async () => {
        try {
            const response = await fetch('http://localhost:3001/health', {
                method: 'GET'
            });

            if (response.status === 200) {
                const jsonResp = await response.json();
                console.log(jsonResp);
            }
            else {
                console.log('Email Service is down!!');

            }
        } catch (error) {
            console.log('Failed to check email service health', error);
            console.log('Email Service is down!!');
        }
    }

    checkEmailQueue = async () => {
        try {
            if (this.emailQueue.length > 0) {
                if (this.isProcessing === false) {
                    await this.processEmailQueue();
                }
                else {
                    console.log('Email queue is already in process!!');
                }
            }
            else {
                console.log('Nothing to process, emailQueue empty!');

            }
        } catch (error) {
            console.log('Failed to check email queue', error);
        }
    }

    processEmailQueue = async () => {
        try {
            this.isProcessing = true;

            const emailQueueCopy = [...this.emailQueue];
            this.emailQueue = [];

            emailQueueCopy.reverse();

            const eventsToProcess = emailQueueCopy.length;

            while (emailQueueCopy.length > 0) {
                const data = emailQueueCopy.pop();
                await this.sendEmailNotification(data);
            }

            this.isProcessing = false;

            console.log('Email Events processed:', eventsToProcess);

        } catch (error) {
            console.log('Failed to process email queue', error);
        }
    }

    startProcessing = async () => {
        try {
            setInterval(async () => {
                await this.checkEmailQueue();
            }, 0.5 * 60 * 1000);
        } catch (error) {
            console.log('Failed to start processing the email queue');
        }
    }
}

export default EmailService;