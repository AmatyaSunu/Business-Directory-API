/**
 * schema for businesses
 */

import mongoose from 'mongoose';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const SCHEMA = mongoose.Schema;
const OBJECT_ID = SCHEMA.Types.ObjectId;

let businessSchema = new SCHEMA(
    {
    status: {type: Boolean, default: true},
    contactName: {type: String, required: true},
    businessName: {type: String, required: true, unique: true, text: true},
    email: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    category: {type: OBJECT_ID, required: true, ref: 'categories'},
    address: {type: String, required: true},
    imageURL: {type: String},
    approvedBy: {type: OBJECT_ID, ref: 'admins'}
    }, {
    timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
});

businessSchema.index({
    businessName: "text"
});

businessSchema.plugin(aggregatePaginate);
const businessModel = mongoose.model('businesses', businessSchema);
export default businessModel;