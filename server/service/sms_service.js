class SMSService {

    constructor() {
        this.smsQueue = [];
        this.isProcessing = false;
        this.isSMSServiceHealthy = false;
        this.startProcessing();
    }

    handleSMSEvent = async ({ message, mobile }) => {
        try {
            this.smsQueue.push({
                content: {
                    'message': message,
                    'mobile': mobile
                }
            });

            console.log('Messages in SMS Queue:', this.smsQueue.length);
        } catch (error) {
            console.log('Error while handling sms event:', error);
        }
    }

    sendSMSNotification = async (smsData) => {
        try {

            const response = await fetch(`http://localhost:${process.env.SMS_SERVICE_PORT}/api/v1/sms/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'data': smsData
                })
            });

            if (response.status === 200) {
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            console.log('Failed to handle sms notification.');
            return false;
        }
    }

    checkSMSServiceHealth = async () => {
        try {
            const response = await fetch(`http://localhost:${process.env.SMS_SERVICE_PORT}/health`, {
                method: 'GET'
            });

            if (response.status === 200) {
                const jsonResp = await response.json();
                console.log(jsonResp);
                return true;
            }
            else {
                console.log('SMS Service is down!!');
                return false;
            }
        } catch (error) {
            // console.log('Failed to check sms service health', error);
            console.log('SMS Service is down!!');
            return false;
        }
    }

    checkSMSQueue = async () => {
        try {
            // if queue has any requests in it
            if (this.smsQueue.length > 0) {
                if (this.isProcessing === false) {
                    await this.processSMSQueue();
                }
                else {
                    console.log('SMS queue is already in process!!');
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
            // if SMS service is up and running (healthy)
            if (this.isSMSServiceHealthy) {

                const smsQueueCopy = [...this.smsQueue];

                smsQueueCopy.reverse();

                let eventsToProcess = smsQueueCopy.length;

                // if no processing of previous sms requests is being done
                if (this.isProcessing === false) {

                    this.isProcessing = true;

                    while (smsQueueCopy.length > 0 && this.isSMSServiceHealthy) {
                        const data = smsQueueCopy[smsQueueCopy.length - 1];;
                        const result = await this.sendSMSNotification(data);
                        if (result === false) break;
                        smsQueueCopy.pop();
                    }

                    // if the service is down, stop the processing
                    if (this.isSMSServiceHealthy === false) {
                        this.isProcessing = false;
                    }

                    if (smsQueueCopy.length < eventsToProcess || smsQueueCopy.length == 0) {
                        this.isProcessing = false;

                        // reversing the array to pop the message requests from the start
                        this.smsQueue.reverse();

                        // calculate the number of sms requests processed
                        let counter = eventsToProcess - smsQueueCopy.length;
                        let copyCounter = counter;

                        // remove the messages processed from the queue
                        while (counter > 0) {
                            this.smsQueue.pop();
                            counter--;
                        }

                        // again reverse the array to maintain the order of message requests(to make it act like a queue)
                        this.smsQueue.reverse();

                        console.log('SMS Events processed:', copyCounter);
                    }
                }
            }

            else if (this.isSMSServiceHealthy === false) {
                this.isProcessing = false;
            }

        } catch (error) {
            console.log('Failed to process sms queue', error);
        }
    }

    startProcessing = async () => {
        try {
            // check every 30 secs, if the service is healthy and if the queue has any requests to be processed
            setInterval(async () => {
                const result = await this.checkSMSServiceHealth();
                this.isSMSServiceHealthy = result;
                await this.checkSMSQueue();
            }, 0.5 * 60 * 1000);
        } catch (error) {
            console.log('Failed to start processing the sms queue');
        }
    }
}

export default SMSService;