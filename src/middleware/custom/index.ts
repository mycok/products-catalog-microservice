import { ExpressMiddlewareInterface } from 'routing-controllers';

export class CustomMiddleware implements ExpressMiddlewareInterface {
    constructor() {}
    use(request: any, response: any, next?: (err?: any) => any): any {
        next();
    }
}
