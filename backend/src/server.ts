import app from './app';
import env from './config/env';
import sequelize from './config/database';

import './models';

import { startReminderJob } from './jobs/reminder.job';

const startServer = async () => {
    try{
        await sequelize.authenticate();
        console.log("Databse connected successfully");
        await sequelize.sync();
        console.log("Databse synchronized successfully");
        startReminderJob();
        app.listen(env.port, () => {
            console.log(`Joblyst API is running on port ${env.port}`);
        })
    } catch(error) {
        console.error("Unable to start Joblyst", error);
        process.exit(1);
    }
}

startServer();