/**
 * schema for claim businesses
 */

import mongoose from 'mongoose';
const SCHEMA = mongoose.Schema;
const OBJECT_ID = SCHEMA.Types.ObjectId;

let claimBusinessSchema = new SCHEMA(
    {
    status: {type: Boolean, default: true},
    contactName: {type: String, required: true},
    businessId:{ type: OBJECT_ID, required: true, ref: 'businesses'},
    businessName: {type: String, required: true},
    email: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    category: {type: OBJECT_ID, required: true, ref: 'categories'},
    address: {type: String, required: true},
    image: {type: String}
}, {
    timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
});
const claimBusinessModel = mongoose.model('claimBusinesses', claimBusinessSchema);
export default claimBusinessModel;