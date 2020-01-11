import { IProductDocument } from '../data-abstracts/repositories/IProductDocument';

export class ProductModel {
    private _useModel: IProductDocument;

    constructor(iProductDocument: IProductDocument) {
        this._useModel = iProductDocument;
    }

    get id(): string {
        return (this._useModel.id).toString();
    }

    get shipping(): string {
        return JSON.stringify(this._useModel.shipping);
    }

    get desc(): any {
        return this._useModel.desc;
    }

    get name(): string {
        return this._useModel.name;
    }

    get category(): string {
        return this._useModel.category.toString();
    }

    get attrs(): any {
        return this._useModel.attrs;
    }

    get feedbackEmail(): string {
        return this._useModel.feedbackEmail;
    }

    get description(): string {
        return this._useModel.description.toString()
    }

    get creationDate(): Date {
        return new Date(this._useModel.createdAt);
    }

    get ownerId(): string {
        return (this._useModel.ownerId).toString();
    }

    getClientProductModel() {
        return Object.seal({
            id: this._useModel.id.toString(),
            name: this._useModel.name.toString(),
            category: this._useModel.category.toString(),
            desc: this._useModel.desc,
            shipping: this._useModel.shipping,
            feedbackEmail: this._useModel.feedbackEmail.toString(),
        });
    };
}
