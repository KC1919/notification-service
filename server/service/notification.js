class NotificationService {
    constructor(parameters) { }

    static handleNotification = async (channel) => {
        try {
            if (channel === 'email') {
                await fetch('http://localhost:3000/api/v1/notify/email', {
                    method: "POST",
                    headers: {
                        "ContentType": "application/json"
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
                        "ContentType": "application/json"
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
    static handleEmailNotification = async () => {
        try {
            console.log("Hello from email notification!");

        } catch (error) {
            throw new Error('Failed to handle email notification.')
        }
    }

    static handleSmsNotification = async () => {
        try {
            console.log("Hello from sms notification!");
        } catch (error) {
            throw new Error('Failed to handle sms notification.')
        }
    }
}

export default NotificationService;