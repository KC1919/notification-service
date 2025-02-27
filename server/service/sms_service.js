class SMSService {

    constructor() {
        this.smsQueue = [];
        this.isProcessing = false;
        this.startProcessing();
    }

    handleSMSEvent = async (message) => {
        try {
            this.smsQueue.push({
                content: {
                    'message': message
                }
            });

            console.log('Messages in SMS Queue:', this.smsQueue.length);
        } catch (error) {
            console.log('Error while handling sms event:', error);
        }
    }

    sendSMSNotification = async (smsData) => {
        try {

            await fetch(`http://localhost:${process.env.SMS_SERVICE_PORT}/api/v1/sms/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'data': smsData
                })
            });
        } catch (error) {
            throw new Error('Failed to handle sms notification.')
        }
    }

    checkSMSServiceHealth = async () => {
        try {
            const response = await fetch('http://localhost:3001/health', {
                method: 'GET'
            });

            if (response.status === 200) {
                const jsonResp = await response.json();
                console.log(jsonResp);
            }
            else {
                console.log('sms Service is down!!');

            }
        } catch (error) {
            console.log('Failed to check sms service health', error);
            console.log('sms Service is down!!');
        }
    }

    checkSMSQueue = async () => {
        try {
            if (this.smsQueue.length > 0) {
                if (this.isProcessing === false) {
                    await this.processSMSQueue();
                }
                else {
                    console.log('sms queue is already in process!!');
                }
            }
            else {
                console.log('Nothing to process, smsQueue empty!');

            }
        } catch (error) {
            console.log('Failed to check sms queue', error);
        }
    }

    processSMSQueue = async () => {
        try {
            this.isProcessing = true;

            const smsQueueCopy = [...this.smsQueue];
            this.smsQueue = [];

            smsQueueCopy.reverse();

            const eventsToProcess = smsQueueCopy.length;

            while (smsQueueCopy.length > 0) {
                const data = smsQueueCopy.pop();
                await this.sendSMSNotification(data);
            }

            this.isProcessing = false;

            console.log('SMS Events processed:', eventsToProcess);

        } catch (error) {
            console.log('Failed to process sms queue', error);
        }
    }

    startProcessing = async () => {
        try {
            setInterval(async () => {
                await this.checkSMSQueue();
            }, 0.5 * 60 * 1000);
        } catch (error) {
            console.log('Failed to start processing the sms queue');
        }
    }
}

export default SMSService;