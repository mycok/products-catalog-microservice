import { Model, model } from 'mongoose';
import { MongooseAccess } from '../../adaptors/MongoAccess';
import { IProductDocument } from './IProductDocument';
import { ProductSchema } from './ProductSchema';

export type ProductModel = Model<IProductDocument>;
export const ProductRepo: ProductModel = MongooseAccess.mongooseConnection.model<IProductDocument>('Product', ProductSchema);
