import app from '../app.js';

class NotificationService {
    constructor(parameters) { }

    static emailQueue = [];

    static handleNotification = async (channel) => {
        try {
            if (channel === 'email') {

                // this.emailQueue.push({
                //     data: {
                //         content: "Hello from email."
                //     }
                // });

                await fetch(`${app.config.server.url}/api/v1/notify/email`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        data: {
                            content: "Hello from email."
                        }
                    })
                });

                // await fetch(`http://localhost:3001/email`, {
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
    static handleEmailNotification = async (emailData) => {
        try {
            console.log(emailData);
            return
        } catch (error) {
            throw new Error('Failed to handle email notification.')
        }
    }

    static handleEmailEvent = async () => {
        try {
            return
        } catch (error) {
            throw new Error('Failed to handle email notification.')
        }
    }

    static handleSmsNotification = async (smsData) => {
        try {
            console.log(smsData);
            return;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to handle sms notification.')
        }
    }
}

export default NotificationService;