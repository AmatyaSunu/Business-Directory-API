/**
 * schema for token
 */

import mongoose from 'mongoose';
const SCHEMA = mongoose.Schema;
let tokenSchema = new SCHEMA(
    {
    status: {type: Boolean, default: true},
    userId: {type: String, required: true},
    accessToken: {type: String, required: true},
    refreshToken: {type: String, required: true}
    }, {
    timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
});
const tokenModel = mongoose.model('loginTokens', tokenSchema);
export default tokenModel;