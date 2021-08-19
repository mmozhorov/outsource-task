export interface LoggerInterface {
    logServiceRequest: ( message: string ) => void
    logDBRequest: ( message: string ) => void
    logError: ( message: string ) => void
}

export const Logger = Symbol.for('Logger');