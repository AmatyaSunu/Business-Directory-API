/**
 * schema for token
 */

import mongoose from 'mongoose';
const SCHEMA = mongoose.Schema;
let tokenSchema = new SCHEMA(
    {
        status: {type: Boolean, default: true},
        adminId: {type: String, required: true},
        resetToken: {type: String, required: true}
    }, {
        timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
    });
const resetTokenModel = mongoose.model('resetTokens', tokenSchema);
export default resetTokenModel;