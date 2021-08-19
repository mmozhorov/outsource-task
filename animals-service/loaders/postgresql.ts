import {Client} from 'pg';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { config } from 'dotenv';
import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from '../types/logger.types';
import { DBInterface } from '../types/db.types';

@injectable()
class PostgresDB implements DBInterface{
    private readonly client: Client;
    private readonly logger: any;

    constructor() {
        // @ts-ignore
        const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
        const dbOptions = {
            host: PG_HOST,
            port: Number( PG_PORT ),
            database: PG_DATABASE,
            user: PG_USERNAME,
            password: PG_PASSWORD,
            connectionTimeoutMillis: 5000
        };

        this.logger = serviceContainer.get<LoggerInterface>( Logger );
        // @ts-ignore
        this.client = new Client(dbOptions);
    }

    async connect() {
        try {
            this.logger.logDBRequest("Start connecting to DB");
            await this.client.connect();
            this.logger.logDBRequest("Connection to DB successfully finished");
        }
        catch ( err ){
            this.logger.logError( err.message || "DB connection error" + JSON.stringify( err ) );
            throw new Error( "Internal error happended" );
        }
    }

    async disconnect() {
        try {
            this.logger.logDBRequest("Start disconnecting from DB");
            await this.client.end();
            this.logger.logDBRequest("Disconnection from DB successfully finished");
        }
        catch  (err ) {
            this.logger.logError( err.message || "DB disconnection error" + JSON.stringify( err ) )
            throw new Error( "Internal error happended" );
        }
    }

    async query( queryStr: string, params: any[]) {
        try {
            this.logger.logDBRequest("DB query: " + queryStr );
            if( params )
                return await this.client.query( queryStr, params );
                
            return await this.client.query(queryStr);
        }
        catch ( err) {
            this.logger.logError( err.message || "DB query error" + JSON.stringify( err ) );
            throw new Error( "Internal error happended" );
        }
    }
}

export { PostgresDB };
