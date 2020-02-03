/**
 * schema for new business addition
 */

import mongoose from 'mongoose';
const SCHEMA = mongoose.Schema;
const OBJECT_ID = SCHEMA.Types.ObjectId;
let newBusinessSchema = new SCHEMA(
    {
    status: {type: Boolean, default: true},
    contactName: {type: String, required: true},
    businessName: {type: String, required: true},
    email: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    category: {type: OBJECT_ID, required: true, ref: 'categories'},
    address: {type: String, required: true},
    imageURL: {type: String},
    addBusinessToken: { type: String, required: true}
    }, {
        timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
});
const newBusinessModel = mongoose.model('newBusinesses', newBusinessSchema);
export default newBusinessModel;