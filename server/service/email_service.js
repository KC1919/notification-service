class EmailService {

    constructor() {
        this.emailQueue = [];
        this.isProcessing = false;
        this.isEmailServiceHealthy = false;
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

            const response = await fetch(`http://localhost:${process.env.EMAIL_SERVICE_PORT}/api/v1/email/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'data': emailData
                })
            });

            if (response.status === 200) {
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            console.log('Failed to handle email notification.')
            return false;
        }
    }

    checkEmailServiceHealth = async () => {
        try {
            const response = await fetch(`http://localhost:${process.env.EMAIL_SERVICE_PORT}/health`, {
                method: 'GET'
            });

            if (response.status === 200) {
                const jsonResp = await response.json();
                console.log(jsonResp);
                return true;
            }
            else {
                console.log('Email Service is down!!');
                return false;
            }
        } catch (error) {
            // console.log('Failed to check email service health', error);
            console.log('Email Service is down!!');
            return false;
        }
    }

    checkEmailQueue = async () => {
        try {
            if (this.emailQueue.length > 0) {
                if (this.isProcessing === false) {
                    await this.processEmailQueue();
                }
                else if (this.isProcessing && this.isEmailServiceHealthy) {
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
            console.log("Email health:", this.isEmailServiceHealthy);

            // if the email service up and running (healthy)
            if (this.isEmailServiceHealthy) {

                const emailQueueCopy = [...this.emailQueue];

                emailQueueCopy.reverse();

                const eventsToProcess = emailQueueCopy.length;

                if(this.isProcessing===false){

                    this.isProcessing = true;
    
                    while (emailQueueCopy.length > 0 && this.isEmailServiceHealthy) {
                        const data = emailQueueCopy[emailQueueCopy.length - 1];
                        const result = await this.sendEmailNotification(data);
                        if (result === false) break;
    
                        emailQueueCopy.pop();
                        console.log("Popped");
                    }
    
                    if (this.isEmailServiceHealthy === false) {
                        this.isProcessing = false;
                    }
    
                    if (emailQueueCopy.length < eventsToProcess || emailQueueCopy.length == 0) {
                        this.isProcessing = false;
    
                        this.emailQueue.reverse();
    
                        let counter = eventsToProcess - emailQueueCopy.length;
                        let copyCounter = counter;
                        console.log("IN there to clean");
    
    
                        while (counter > 0) {
                            console.log("Popped from original queue");
    
                            this.emailQueue.pop();
                            counter--;
                        }
    
                        this.emailQueue.reverse();
    
                        console.log('Email Events processed:', copyCounter);
                    }
                }
            }

            else if (this.isEmailServiceHealthy === false) {
                this.isProcessing = false;
            }

        } catch (error) {
            console.log('Failed to process email queue', error);
        }
    }

    startProcessing = async () => {
        try {
            setInterval(async () => {
                const result = await this.checkEmailServiceHealth();
                this.isEmailServiceHealthy = result;
                await this.checkEmailQueue();
            }, 0.5 * 60 * 1000);
        } catch (error) {
            console.log('Failed to start processing the email queue');
        }
    }
}

export default EmailService;