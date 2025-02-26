import app from '../app.js';

class NotificationService {
    constructor(parameters) {
        this.emailQueue = [];
        this.isProcessing = false;
        this.startProcessing();
    }

    handleNotification = async (channel) => {
        try {
            if (channel === 'email') {

                this.emailQueue.push({
                    data: {
                        content: "Hello from email."
                    }
                });

                console.log('Messages in Queue:', this.emailQueue.length);


                // await fetch(`${app.config.server.url}/api/v1/notify/email`, {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify({
                //         data: {
                //             content: "Hello from email."
                //         }
                //     })
                // });

                // emit email event

                // em.emit('sendEmail', JSON.stringify({ data: "Heloo send email event" }));
            }


            else if (channel === 'sms') {
                await fetch(`${app.config.server.url}/api/v1/notify/sms`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        data: {
                            content: "Hello from sms."
                        }
                    })
                })
            }
        } catch (error) {
            console.log(error);
            throw new Error('Failed to handle notification.')
        }
    }

    handleEmailNotification = async (emailData) => {
        try {
            console.log(emailData);
            return
        } catch (error) {
            throw new Error('Failed to handle email notification.')
        }
    }

    handleEmailEvent = async (emailData) => {
        try {

            await fetch(`http://localhost:3001/email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: {
                        content: emailData
                    }
                })
            });
        } catch (error) {
            throw new Error('Failed to handle email notification.')
        }
    }

    handleSmsNotification = async (smsData) => {
        try {
            console.log(smsData);
            return;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to handle sms notification.')
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
            else{
                console.log('Nothing to process, emailQueue empty!');
                
            }
        } catch (error) {
            console.log('Failed to check email queue', error);
        }
    }

    processEmailQueue = async () => {
        try {
            const emailQueueCopy = [...this.emailQueue];
            this.emailQueue = [];

            emailQueueCopy.reverse();

            this.isProcessing = true;

            const eventsToProcess = emailQueueCopy.length;

            while (emailQueueCopy.length > 0) {
                const data = emailQueueCopy.pop();
                await this.handleEmailEvent(data);
            }

            this.isProcessing = false;

            console.log('Events processed:', eventsToProcess);

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

export default NotificationService;