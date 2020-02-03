/**
 * schema for admin users
 */

import mongoose from 'mongoose';
const SCHEMA = mongoose.Schema;
let adminSchema = new SCHEMA(
    {
        status: {type: Boolean, default: true},
        firstName: {type: String, required:true},
        lastName: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String, required:true},
        imageURL: {type: String, default: "https://www.kindpng.com/imgv/Jwxwib_avatar-michael-jordan-jersey-clip-art-michael-jordan/"},
        token: {type: String}
    }, {
        timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
    });
const adminModel = mongoose.model("admins", adminSchema);
export default adminModel;