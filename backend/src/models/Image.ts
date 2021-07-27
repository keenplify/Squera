import { model, Schema } from 'mongoose'
import mongooseAudit from '../utils/Mongoose-Audit';

import { ImageInterface } from '../interfaces/Image.interface';
  
const ImageSchema = new Schema<ImageInterface>({
    type: { type: String },
    description: { type: String, minlength: 3 },
    forId: { type: String, required: true },
    isVerified: { type: Boolean, default: false},
    path: {type: String, required: true}
}, {
    timestamps: true
})

ImageSchema.plugin(mongooseAudit, {userModel: "User"});

const Image = model('Image', ImageSchema);

export default Image;