import http from 'http';
import { config } from 'dotenv';

import { serviceContainer } from './config/inversify.config';
import { DBInterface, DB } from "./types/db.types";
import { LoggerInterface, Logger } from "./types/logger.types";
import app from './routers';

(async function main() {
    try{
        const DBInstance = serviceContainer.get<DBInterface>(DB);
        const loggerInstance = serviceContainer.get<LoggerInterface>(Logger);

        await DBInstance.connect();
        console.log("Successfully connected to db!");

        // @ts-ignore
        const { APP_PORT } = config().parsed;
        const server = http.createServer(app);

        server.listen(APP_PORT, function () {
            console.info(`Server is running on ${APP_PORT} port!`);

            process.on('uncaughtException', function ( err: Error ) {
                loggerInstance.logError(
                    `Error type: ${ err.name }\nError message: ${ err.message }\nError trace: ${ err.stack }`
                );
            });

            process.on('unhandledRejection', function ( reasonAny: any, p: Promise<any> ) {
                loggerInstance.logError(
                    `Error type: Promise unhandled\nReject message: ${ reasonAny }\n`
                );
            });
        })
    }
    catch (error) {
        console.error(error);
    }
}());