import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from "../types/logger.types";

const loggerInstance = serviceContainer.get<LoggerInterface>(Logger);

export const serviceLogger = ( target: any, key: string, descriptor: any ) => {
    const originalFn = descriptor.value;

    descriptor.value = function ( ...args: any[] ) {
        loggerInstance.logServiceRequest(
            `Called method of ${ target.constructor.name } - ${ key } with arguments: ${ JSON.stringify( args ) }`
        );

        return originalFn.apply( this, args );
    }
}

export const routerErrorLog = ( method: string, args: any, error: any ): any => {
    loggerInstance.logError(
        `Method ${ method }  with ${ JSON.stringify(args) } args threw next error: ${ error.toString() }`
    );
    return  error;
}