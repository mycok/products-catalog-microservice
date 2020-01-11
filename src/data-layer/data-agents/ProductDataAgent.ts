import { IProductDocument } from '../data-abstracts/repositories/IProductDocument';
import { ProductRepo } from '../data-abstracts/repositories/ProductRepository';

export class ProductDataAgent {
    constructor() { }

    async create(product: any): Promise<any> {
        const productData = <IProductDocument>(product);

        const newProduct = await ProductRepo.create(productData);
        if (newProduct.errors) {
            return { message: 'db validation errors', errors: newProduct.errors };
        };

        return newProduct;
    }

    async update(product: any, productId: string): Promise<any> {
        const productData = <IProductDocument>(product);
        const retrievedProduct = await ProductRepo.findById({ _id: productId }, 'ownerId name');

        if (!retrievedProduct) {
            return { message: `product ${productData.name} doesn't exist`, status: 'not-found' };
        }

        if (productData.ownerId && retrievedProduct.ownerId !== productData.ownerId) {
            return { message: 'you are not authorized to perform this action since you are not the owner of this product' };
        };

        if (productData.name && productData.name === retrievedProduct.name) {
            return { message: `product called ${productData.name} already exists`};
        }

        const updatedProduct = await ProductRepo.findByIdAndUpdate({ _id: productId }, productData, { new: true, omitUndefined: true, runValidators: true });
        if (updatedProduct.errors) {
            return { message: 'db validation errors', errors: updatedProduct.errors };
        };

        return updatedProduct;
    }

    async list(): Promise<any> {
        const products = await ProductRepo.find().select('id name category desc shipping feedbackEmail');

        return products;
    }

    async getById(productId: string): Promise<any> {
        const product = await ProductRepo.findById({ _id: productId });
        if (!product) return { message: `product with id ${productId} doesn't exist`, status: 'not-found' };

        return product;
    }

    async deleteById(productId: string): Promise<any> {
        const product = await ProductRepo.findByIdAndDelete({ _id: productId });
        if (!product) return { message: `product with id ${productId} doesn't exist`, status: 'not-found' };

        return product;
    }
}


