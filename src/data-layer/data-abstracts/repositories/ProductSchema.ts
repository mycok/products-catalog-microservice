import { Schema } from 'mongoose';

/**
 * MongooseSchema
 * @type {'mongoose'.Schema}
 * @private
 */

 let ProductSchema: Schema = new Schema ({
     name: {
         type: String,
         required: true,
         trim: true,
         index: {unique: true, dropDups: true}
     },
     ownerId: {
         type: String,
         required: true
     },
     feedbackEmail: {
         type: String,
        required: true
     },
     description: {
         type: String,
         required: true
     },
     category: {
         type: String,
         required: true
     },
     brand: {
         id: Number,
         name: String,
     },
     desc: [{
         lang: String,
         value: String,
     }],
     shipping: {
         diamensions: {
             height: Number,
             length: Number,
             width: Number
         },
         weight: Number
     },
     attrs: [{
        _id: false,
        name: String,
        value: String,
     }]
}, { timestamps: true });

export { ProductSchema };
