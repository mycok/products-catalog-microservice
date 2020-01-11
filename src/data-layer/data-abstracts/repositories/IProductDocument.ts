import mongoose from 'mongoose';

export interface IProductDocument extends mongoose.Document {
    id: string,
    ownerId: string,
    name: string,
    brand: {
        id: number,
        name: string,
    },
    createdAt: Date,
    updatedAt: Date,
    feedbackEmail: string,
    description: string,
    category: string,
    desc: [{
        lang: string,
        value: string,
    }],
    shipping: {
        dimensions: {
            height: number,
            width: number,
            length: number
        },
        weight: number
    },
    attrs: [{
        name: string,
        value: string
    }]
}
