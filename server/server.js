import app from './app.js';
import { connectDb } from './loader/db/mongo.js';

const startServer = async () => {
    try {
        // connect to mongodb
        app.mongodb = await connectDb(app.config.mongodb.url);

        // start express server
        app.listen(process.env.SERVER_PORT || 3000, () => {
            console.log('Server listening on port: ', process.env.SERVER_PORT);
        });
    } catch (error) {
        console.log("Failed to start server", error);
    }
}

startServer();


