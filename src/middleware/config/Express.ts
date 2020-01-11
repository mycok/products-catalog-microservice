import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as health from 'express-ping';
import * as helmet from 'helmet';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Request, Response } from 'express';
import { Container } from 'typedi';

export class ExpressConfig {
    app: express.Express;
    constructor() {
        this.app = express();
        this.middlewareSetup();
        this.controllersSetup();
    }

    private middlewareSetup() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(health.ping());
        this.app.use(helmet());
        this.app.use(this.clientErrorHandler);
    }

    private controllersSetup() {
        const controllersPath = path.resolve('dist', 'service-layer/controllers');
        useContainer(Container);
        useExpressServer(this.app, {
            controllers: [controllersPath + '/*.js'],
            cors: true,
            classTransformer: true,
        });
    }

    private clientErrorHandler(err: any, req: Request, res: Response, next: Function): void {
        if (err.hasOwnProperty('thrown')) {
            res.status(err["status"]).send({ error: err.message });
        }
    }
}
