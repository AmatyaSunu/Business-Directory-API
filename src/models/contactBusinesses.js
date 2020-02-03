/**
 * schema for contact businesses
 */

import mongoose from 'mongoose';
const SCHEMA = mongoose.Schema;
const OBJECT_ID = SCHEMA.Types.ObjectId;

let contactBusinessSchema = new SCHEMA(
    {
    status: {type: Boolean, default: true},
    businessId: {type: OBJECT_ID, ref:'businesses', required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    address: {type: String, required: true},
    message: {type: String, required: true}
    }, {
        timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
});
const contactBusinessModel = mongoose.model('contactBusinesses', contactBusinessSchema);
export default contactBusinessModel;