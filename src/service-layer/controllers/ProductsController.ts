import { Get, JsonController, Post, Patch, Param, Delete, Body, UseBefore, Req, Res } from 'routing-controllers';
import { validateProductRequest } from '../../business-layer/validation/ProductValidationProcessor';
import { ICreateProductRequest } from '../request/IProductRequest';
import { IProductResponse } from '../responses/IProductResponse';
import { ProductDataAgent } from '../../data-layer/data-agents/ProductDataAgent';
import { ProductModel } from '../../data-layer/models/ProductModel';
import { CustomMiddleware } from '../../middleware/custom/index';
import { Request, Response } from 'express';
import { NotFoundError, BadRequestError } from '../../utils/CustomErrors';

@JsonController('/v1/products')
@UseBefore(CustomMiddleware)
export class ProductsController {
    private productDataAgent: ProductDataAgent;

    constructor() {
        this.productDataAgent = new ProductDataAgent();
    }

    private singleProductResponse(result: any, res: any, statusCode: any = 200):void {
        const productResult = new ProductModel(result);
            const newProductResult = Object.assign({ product: productResult.getClientProductModel() });
            return res.status(statusCode).send({
                success: true,
                product: <IProductResponse>(newProductResult)
            });
    }

    @Get('/list')
    async fetchAllProducts(@Req() req: Request, @Res() res: Response): Promise<any> {
        const products = await this.productDataAgent.list();
        return res.send({
            success: true,
            count: products.length,
            products: <[IProductResponse]>(products)
        });
    }

    @Post('/add')
    async createProduct(@Body({ required: true }) requestBody: ICreateProductRequest, @Req() req: Request, @Res() res: Response): Promise<any> {
        const validationErrors: any[] = await validateProductRequest(requestBody);

        if (validationErrors.length > 0) {
            throw new BadRequestError('post', 'validation failed', validationErrors.length, validationErrors);
        };

        const result = await this.productDataAgent.create(requestBody);

        if (result.id) {
            return this.singleProductResponse(result, res, 201);
        } else {
            throw new BadRequestError('post', result.message, result.errors);
        }
    }

    @Patch('/by-id/:productId')
    async updateProduct(@Param('productId') productId: string, @Body({ required: true }) updateBody: ICreateProductRequest, @Req() req: Request, @Res() res: Response): Promise<any> {
        const validationErrors: any[] = await validateProductRequest(updateBody, { skipMissingProperties: true });

        if (validationErrors.length > 0) {
            throw new BadRequestError('patch', 'validation failed', validationErrors.length, validationErrors);
        };

        const result = await this.productDataAgent.update(updateBody, productId);

        if (result.id) {
            return this.singleProductResponse(result, res);
        } else if (result.errors) {
            throw new BadRequestError('patch', result.message, result.errors);
        } else if (result.status) {
            throw new NotFoundError('patch', result.message);
        } else {
            throw new BadRequestError('patch', result.message);
        }
    }

    @Get('/by-id/:productId')
    async getById(@Param('productId') productId: string, @Req() req: Request, @Res() res: Response): Promise<any> {
        const result = await this.productDataAgent.getById(productId);
        if (result.status) throw new BadRequestError('get-by-id', result.message);

       return this.singleProductResponse(result, res);
    }

    @Delete('/by-id/:productId')
    async deleteById(@Param('productId') productId: string, @Req() req: Request, @Res() res: Response): Promise<any> {
        const result = await this.productDataAgent.deleteById(productId);
        if (result.status) throw new BadRequestError('delete-by-id', result.message);

        return res.status(204).send({
            success: true,
        });
    }
}
