import mongoose = require('mongoose');
import * as config from 'config';
import { logger } from '../../middleware/common/logger';


mongoose.Promise = global.Promise;

class MongooseAccess {
    static mongooseInstance: any;
    static mongooseConnection: mongoose.Connection;

    constructor() {
        MongooseAccess.connect();   
    }

    static connect(): mongoose.Connection {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);

        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }

        let connectionString = config.get('mongo.urlClient').toString();
        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection.once('open', () => {
            logger.info('connection to mongoDB is open!');
        });

        this.mongooseInstance = mongoose.connect(connectionString);

        this.mongooseConnection.on('connected', () => {
            logger.info(`mongoose default connection running at: ${connectionString}`);
        });
        this.mongooseConnection.on('error', (msg) => {
            logger.info(`mongoose default connection error: ${msg} `)
        });
        this.mongooseConnection.on('disconnected', () => {
            logger.info('mongoose default connection disconnected!');
        });
        this.mongooseConnection.on('reconnected', () => {
            logger.info('mongoose default connection has reconnected!');
        });

        // close the mongoose connection when the node process ends
        process.on('SIGINT', () => {
            this.mongooseConnection.close(() => {
                logger.info('mongoose default connection disconnected through app termination!');
            });
        });

        return this.mongooseInstance;
    }
}

MongooseAccess.connect();
export { MongooseAccess };
