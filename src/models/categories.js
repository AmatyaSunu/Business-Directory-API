/**
 * schema for categories
 */

import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
const SCHEMA = mongoose.Schema;
const OBJECT_ID = SCHEMA.Types.ObjectId;

let categorySchema = new SCHEMA(
    {
    status: {type: Boolean, default: true},
    title: {type: String, required: true, unique: true},
    createdBy: {type: OBJECT_ID, ref: 'admin', required: true},
    imageURL: {type: String, default: "https://www.kindpng.com/imgv/Jwxwib_avatar-michael-jordan-jersey-clip-art-michael-jordan/"}
    }, {
    timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
});

categorySchema.plugin(aggregatePaginate);
const categoryModel = mongoose.model('categories', categorySchema);
export default categoryModel;