class NotificationService {
    constructor(parameters) { }

    static handleNotification = async (channel) => {
        try {
            if (channel === 'email') {
                await fetch('http://localhost:3000/api/v1/notify/email', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        data: {
                            content: "Hello from email."
                        }
                    })
                })
            }
            else if (channel === 'sms') {
                await fetch('http://localhost:3000/api/v1/notify/sms', {
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
            throw new Error('Failed to handle notification.')
        }
    }
    static handleEmailNotification = async (emailData) => {
        try {
            console.log(emailData);
        } catch (error) {
            throw new Error('Failed to handle email notification.')
        }
    }

    static handleSmsNotification = async (smsData) => {
        try {
            console.log(smsData);
        } catch (error) {
            throw new Error('Failed to handle sms notification.')
        }
    }
}

export default NotificationService;